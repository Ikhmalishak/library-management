const pool = require("../config/db");

async function getAllBooks() {
    const result = await pool.query(`SELECT * FROM books ORDER BY id ASC`);
    return {
        message: "Successfully fetched all books",
        data: result.rows
    };
}

async function getBookById(id) {
    const result = await pool.query(`SELECT * FROM books WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
        throw new Error("Book not found");
    }
    return {
        message: "Successfully fetched book",
        data: result.rows[0]
    };
}

async function createBook(title, author, isbn, quantity) {
    const result = await pool.query(
        `INSERT INTO books (title, author, isbn, quantity) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`,
        [title, author, isbn, quantity]
    );
    return {
        message: "Successfully created book",
        data: result.rows[0]
    };
}

async function updateBook(id, title, author, isbn, quantity) {
    const result = await pool.query(
        `UPDATE books 
         SET title = $1, author = $2, isbn = $3, quantity = $4 
         WHERE id = $5 
         RETURNING *`,
        [title, author, isbn, quantity, id]
    );
    if (result.rows.length === 0) {
        throw new Error("Book not found");
    }
    return {
        message: "Successfully updated book",
        data: result.rows[0]
    };
}

async function deleteBook(id) {
    const result = await pool.query(`DELETE FROM books WHERE id = $1 RETURNING *`, [id]);
    if (result.rows.length === 0) {
        throw new Error("Book not found");
    }
    return {
        message: "Successfully deleted book"
    };
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
