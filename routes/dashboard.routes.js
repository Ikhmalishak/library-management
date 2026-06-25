const dashboardController = require("../controllers/dashboard.controller");
const express = require('express');
const router = express.Router();

router.get('/', dashboardController.getDashboardStats);

module.exports = router;