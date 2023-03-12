const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

////////////////////////////////////////
// MIDDLEWARES
////////////////////////////////////////

app.use(morgan('dev'));

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((request, response, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next();
});

////////////////////////////////////////
// ROUTES: Mounting the router
////////////////////////////////////////

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

////////////////////////////////////////
// START SERVER
////////////////////////////////////////

module.exports = app;
