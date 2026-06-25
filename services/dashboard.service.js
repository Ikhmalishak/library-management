const pool = require("../config/db");

async function getDashboardStats() {
    const client = await pool.connect();

    //get totalbooks
    const totalBooksResult = await client.query(
        `SELECT COUNT(id) from books`
    );

    const totalBooks = parseInt(totalBooksResult.rows[0].count,10);

    //get total active user
    const totalUserResult = await client.query(
        `SELECT COUNT(id) from users`
    );
    const totalUser = parseInt(totalUserResult.rows[0].count,10);

    //get total loans
    const totalLoanResult = await client.query(
        `SELECT COUNT(id) from loans`
    );
    const totalLoan = parseInt(totalLoanResult.rows[0].count,10);

    //get total overdue loans
    const overdueLoanResult = await client.query(
        `SELECT COUNT(id) from loans`
    );
    const overdueLoan = parseInt(overdueLoanResult.rows[0].count,10);

    return {
        totalBooks,
        totalUser,
        totalLoan,
        overdueLoan,
    }

}

module.exports = {
    getDashboardStats
}