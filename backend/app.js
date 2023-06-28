const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactionRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const chartRoutes = require('./routes/chartRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const PORT = 5000;


mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(express.json());

app.use('/transactions', transactionRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/chart', chartRoutes);
app.use('/categories', categoryRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
