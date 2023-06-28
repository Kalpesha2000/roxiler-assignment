import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsPieChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('March');

  useEffect(() => {
    fetchCategoryData();
  }, [selectedMonth]);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get('/categories', {
        params: {
          month: selectedMonth,
        },
      });

      setCategoryData(response.data.categoryData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div>
      <h2>Pie Chart</h2>

      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        {/* Add more months */}
      </select>

      <ul>
        {categoryData.map((data) => (
          <li key={data.category}>
            {data.category}: {data.count} (items)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsPieChart;
