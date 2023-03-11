const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

////////////////////////////////////////
// MIDDLEWARES
////////////////////////////////////////

app.use(morgan('dev'));

app.use(express.json());

app.use((request, response, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next();
});

////////////////////////////////////////
// ROUTE HANDLERS
////////////////////////////////////////

////////////////////////////////////////
// ROUTES
////////////////////////////////////////

// Mounting a new router

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

////////////////////////////////////////
// START SERVER
////////////////////////////////////////

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
