import React, { useState, useEffect } from 'react';

const TransactionsStatistics = () => {
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('March');

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await fetch(`/statistics?month=${selectedMonth}`);
      const data = await response.json();
      setTotalSaleAmount(data.totalSaleAmount);
      setTotalSoldItems(data.totalSoldItems);
      setTotalNotSoldItems(data.totalNotSoldItems);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <div>
      <h2>Transactions Statistics</h2>
      <label>
        Select Month:
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value='April'>April</option>
          <option value='May'>May</option>
          <option value='June'>June</option>
          <option value='Jully'>Jully</option>
          <option value='August'>August</option>
          <option value='September'>September</option>
          <option value='October'>October</option>
          <option value='November'>November</option>
          <option value='December'>December</option>
        </select>
      </label>
      <br />
      <div>
        <p>Total Sale Amount: {totalSaleAmount}</p>
        <p>Total Sold Items: {totalSoldItems}</p>
        <p>Total Not Sold Items: {totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default TransactionsStatistics;
