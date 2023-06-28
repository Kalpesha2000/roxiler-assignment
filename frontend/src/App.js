import React from 'react';
import TransactionsTable from './TransactionsTable';
import TransactionsStatistics from './TransactionsStatistics';
import TransactionsBarChart from './TransactionsBarChart';
import TransactionsPieChart from './TransactionsPieChart';

const App = () => {
  return (
    <div>
      <h1>Transactions</h1>
      <TransactionsStatistics />
      <TransactionsTable />
      <TransactionsBarChart />
      <TransactionsPieChart />
    </div>
  );
};

export default App;
