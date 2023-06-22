import React from "react";
import TransactionsTable from "./TransactionTable";
import TransactionStatistics from "./TransactionStatistics";
import TransactionBarChart from "./TransactionBarChart";


import "./App.css";

const App = () => {
  return (
    <div className='app-container'>
      <div className='heading-circle'>
        <h1 className='heading-text'>Transaction Dashboard</h1>
      </div>
      <TransactionsTable />
      <TransactionStatistics/>
      <TransactionBarChart/>
    </div>
  );
};

export default App;
