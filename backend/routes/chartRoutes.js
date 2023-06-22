const express = require('express');
const chartController = require('../controllers/chartController');

const router = express.Router();

// Route for bar chart
router.get('/bar-chart', chartController.getBarChartData);

// Route for pie chart
router.get('/pie-chart', chartController.getPieChartData);

module.exports = router;
