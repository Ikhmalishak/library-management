const loanService = require('../services/loan.service');

async function borrowBook(req, res, next) {
    try {
        const { bookId } = req.body;
        const userId = req.user.id; // From auth.middleware
        const result = await loanService.borrowBook(userId, bookId);
        res.status(201).json(result);
    } catch (error) {
        if (error.message === "Book not found" || error.message === "Book is out of stock") {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
}

async function returnBook(req, res, next) {
    try {
        const { loanId } = req.body;
        const userId = req.user.id; // From auth.middleware
        const result = await loanService.returnBook(userId, loanId);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === "Loan record not found or does not belong to user" || error.message === "Book is already returned") {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
}

async function getMyLoans(req, res, next) {
    try {
        const userId = req.user.id; // From auth.middleware
        const result = await loanService.getMyLoans(userId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function getAllLoans(req, res, next) {
    try {
        const result = await loanService.getAllLoans();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    borrowBook,
    returnBook,
    getMyLoans,
    getAllLoans
};
