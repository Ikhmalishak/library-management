const pool = require("../config/db");

async function borrowBook(userId, bookId) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Check book availability
        const bookResult = await client.query(`SELECT * FROM books WHERE id = $1 FOR UPDATE`, [bookId]);
        if (bookResult.rows.length === 0) {
            throw new Error("Book not found");
        }

        const book = bookResult.rows[0];
        if (book.quantity <= 0) {
            throw new Error("Book is out of stock");
        }

        // Reduce quantity
        await client.query(`UPDATE books SET quantity = quantity - 1 WHERE id = $1`, [bookId]);

        // Create loan record
        const loanResult = await client.query(
            `INSERT INTO loans (user_id, book_id, status) VALUES ($1, $2, 'borrowed') RETURNING *`,
            [userId, bookId]
        );

        await client.query('COMMIT');

        return {
            message: "Successfully borrowed book",
            data: loanResult.rows[0]
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

async function returnBook(userId, loanId) {
    console.log(loanId,userId);
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Check loan
        const loanResult = await client.query(
            `SELECT * FROM loans WHERE id = $1 AND user_id = $2 FOR UPDATE`,
            [loanId, userId]
        );
        if (loanResult.rows.length === 0) {
            throw new Error("Loan record not found or does not belong to user");
        }

        const loan = loanResult.rows[0];
        if (loan.status === 'returned') {
            throw new Error("Book is already returned");
        }

        // Mark loan as returned
        await client.query(
            `UPDATE loans SET status = 'returned', returned_at = CURRENT_TIMESTAMP WHERE id = $1`,
            [loanId]
        );

        // Increase book quantity
        await client.query(`UPDATE books SET quantity = quantity + 1 WHERE id = $1`, [loan.book_id]);

        await client.query('COMMIT');

        return {
            message: "Successfully returned book"
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

async function getMyLoans(userId) {
    const result = await pool.query(
        `SELECT l.id, b.title, l.borrowed_at, l.returned_at, l.status 
         FROM loans l 
         JOIN books b ON l.book_id = b.id 
         WHERE l.user_id = $1 ORDER BY l.borrowed_at DESC`,
        [userId]
    );
    return {
        message: "Successfully fetched your loans",
        data: result.rows
    };
}

async function getAllLoans() {
    const result = await pool.query(
        `SELECT l.id, u.name as user_name, b.title as book_title, l.borrowed_at, l.returned_at, l.status 
         FROM loans l 
         JOIN users u ON l.user_id = u.id
         JOIN books b ON l.book_id = b.id 
         ORDER BY l.borrowed_at DESC`
    );
    return {
        message: "Successfully fetched all loans",
        data: result.rows
    };
}

module.exports = {
    borrowBook,
    returnBook,
    getMyLoans,
    getAllLoans
};
