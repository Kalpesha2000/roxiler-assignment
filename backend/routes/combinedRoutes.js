const express = require('express');
const combinedController = require('../controllers/combinedController');

const router = express.Router();

// Route for fetching combined data
router.get('/', combinedController.getCombinedData);

module.exports = router;
