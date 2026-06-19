const bookService = require('../services/book.service');

async function getAllBooks(req, res, next) {
    try {
        const result = await bookService.getAllBooks();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function getBookById(req, res, next) {
    try {
        const { id } = req.params;
        const result = await bookService.getBookById(id);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === "Book not found") {
            return res.status(404).json({ message: error.message });
        }
        next(error);
    }
}

async function createBook(req, res, next) {
    try {
        const { title, author, isbn, quantity } = req.body;
        const result = await bookService.createBook(title, author, isbn, quantity);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

async function updateBook(req, res, next) {
    try {
        const { id } = req.params;
        const { title, author, isbn, quantity } = req.body;
        const result = await bookService.updateBook(id, title, author, isbn, quantity);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === "Book not found") {
            return res.status(404).json({ message: error.message });
        }
        next(error);
    }
}

async function deleteBook(req, res, next) {
    try {
        const { id } = req.params;
        const result = await bookService.deleteBook(id);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === "Book not found") {
            return res.status(404).json({ message: error.message });
        }
        next(error);
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
