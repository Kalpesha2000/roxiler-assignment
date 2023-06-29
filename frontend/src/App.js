import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalSale, setTotalSale] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchTransactions(selectedMonth);

    fetchStatistics(selectedMonth);

    fetchBarChartData(selectedMonth);
  }, [selectedMonth]);

  const fetchTransactions = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/transactions?month=${month}`
      );
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStatistics = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/statistics?month=${month}`
      );
      setTotalSale(response.data.totalSaleAmount);
      setTotalSoldItems(response.data.totalSoldItems);
      setTotalNotSoldItems(response.data.totalNotSoldItems);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBarChartData = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/barchart?month=${month}`
      );
      setBarChartData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.title.toLowerCase().includes(searchText.toLowerCase()) ||
      transaction.description
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      transaction.price.toString().includes(searchText)
  );

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className='App'>
      <h1>Transaction Dashboard</h1>
      <div>
        <input
          type='text'
          value={searchText}
          onChange={handleSearch}
          placeholder='Search transaction'
        />
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value='January'>January</option>
          <option value='February'>February</option>
          <option value='March'>March</option>
          <option value='April'>April</option>
          <option value='May'>May</option>
          <option value='June'>June</option>
          <option value='July'>July</option>
          <option value='August'>August</option>
          <option value='September'>September</option>
          <option value='October'>October</option>
          <option value='November'>November</option>
          <option value='December'>December</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td>
                <img src={transaction.image} alt={transaction.title} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        Page No: {currentPage}
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage * perPage >= filteredTransactions.length}
        >
          Next
        </button>
        Per Page: {perPage}
      </div>
      <div>
        <h2>Statistics - {selectedMonth}</h2>
        <p>Total sale: {totalSale}</p>
        <p>Total sold items: {totalSoldItems}</p>
        <p>Total not sold items: {totalNotSoldItems}</p>
      </div>
      <div>
        <h2>Bar Chart Stats - {selectedMonth}</h2>
        <ul>
          {barChartData.map((item) => (
            <li key={item._id}>
              {item._id}: {item.count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
