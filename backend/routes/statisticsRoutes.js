const express = require('express');
const statisticsController = require('../controllers/statisticsController');

const router = express.Router();

// Route for statistics
router.get('/', statisticsController.getStatistics);

module.exports = router;
