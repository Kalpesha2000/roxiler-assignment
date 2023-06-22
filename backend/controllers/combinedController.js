const axios = require("axios");

// API to fetch combined data from all the APIs
const getCombinedData = async (req, res) => {
  const { month } = req.query;

  try {
    const [
      transactionsResponse,
      statisticsResponse,
      barChartResponse,
      pieChartResponse,
    ] = await Promise.all([
      axios.get(`http://localhost:3000/transactions?month=${month}`),
      axios.get(`http://localhost:3000/statistics?month=${month}`),
      axios.get(`http://localhost:3000/bar-chart?month=${month}`),
      axios.get(`http://localhost:3000/pie-chart?month=${month}`),
    ]);

    const combinedData = {
      transactions: transactionsResponse.data,
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data,
      pieChart: pieChartResponse.data,
    };

    res.json(combinedData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching combined data" });
  }
};

module.exports = {
  getCombinedData,
};
