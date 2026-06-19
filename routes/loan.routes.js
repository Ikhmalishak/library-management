const express = require('express');
const loanController = require('../controllers/loan.controller');
const { auth } = require('../middlewares/auth.middleware');
const requireAdmin = require('../middlewares/role.middleware');

const router = express.Router();

// Member routes (authenticated)
router.post('/borrow', auth, loanController.borrowBook);
router.post('/return', auth, loanController.returnBook);
router.get('/me', auth, loanController.getMyLoans);

// Admin only routes
router.get('/', auth, requireAdmin, loanController.getAllLoans);

module.exports = router;
