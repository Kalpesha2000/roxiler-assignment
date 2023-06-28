import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsBarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('March');

  useEffect(() => {
    fetchChartData();
  }, [selectedMonth]);

  const fetchChartData = async () => {
    try {
      const response = await axios.get('/chart', {
        params: {
          month: selectedMonth,
        },
      });

      setChartData(response.data.chartData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div>
      <h2>Bar Chart</h2>

      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        {/* Add more months */}
      </select>

      <ul>
        {chartData.map((data) => (
          <li key={data.range}>
            {data.range}: {data.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsBarChart;
