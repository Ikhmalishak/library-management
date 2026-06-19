const express = require('express');
const bookController = require('../controllers/book.controller');
const { auth } = require('../middlewares/auth.middleware');
const requireAdmin = require('../middlewares/role.middleware');

const router = express.Router();

// Public or member routes
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// Admin only routes
router.post('/', auth, requireAdmin, bookController.createBook);
router.put('/:id', auth, requireAdmin, bookController.updateBook);
router.delete('/:id', auth, requireAdmin, bookController.deleteBook);

module.exports = router;
