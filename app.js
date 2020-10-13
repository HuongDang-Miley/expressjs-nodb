const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

// const logger = require('./middlewares/logger');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(logger)
const userRoutes = require('./routes/usersRoutes')

const port = process.env.PORT || 3000;


// general middelware:
app.use(morgan('dev'));

// middleware for post request
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// userRoutes middleware:
app.use('/api/v1/users', userRoutes);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
