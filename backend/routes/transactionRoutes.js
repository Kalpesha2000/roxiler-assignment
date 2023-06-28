const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const paginationMiddleware = require('../middleware/paginationMiddleware');

router.get('/initialize', transactionController.initializeDatabase);
router.get('/', paginationMiddleware, transactionController.listTransactions);

module.exports = router;
