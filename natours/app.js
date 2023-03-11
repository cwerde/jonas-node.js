const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Bu bir yorum satırıdır.

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

////////////////////////////////////////
// ROUTE HANDLERS
////////////////////////////////////////

const getAllTours = (request, response) => {
  console.log(request.requestTime);

  response.status(200).json({
    status: 'success',
    requestedAt: request.requestTime,
    result: tours.length,
    data: { tours: tours },
  });
};

const getTour = (request, response) => {
  console.log(request.params);
  const id = request.params.id * 1;
  const tour = tours.find((x) => x.id === id);

  if (!tour) {
    return response.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  response.status(200).json({ status: 'success', data: { tour } });
};

const createTour = (request, response) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, request.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (error) => {
      response.status(201).json({ status: 'success', tour: newTour });
    }
  );
};

const updateTour = (request, response) => {
  if (request.params.id * 1 > tours.length) {
    return response.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  response
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour here...>' } });
};

const deleteTour = (request, response) => {
  if (request.params.id * 1 > tours.length) {
    return response.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  response.status(204).json({ status: 'success', data: null });
};

const getAllUsers = (request, response) => {
  response.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const getUser = (request, response) => {
  response.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const createUser = (request, response) => {
  response.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const updateUser = (request, response) => {
  response.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const deleteUser = (request, response) => {
  response.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

////////////////////////////////////////
// ROUTES
////////////////////////////////////////

// Mounting a new router

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

////////////////////////////////////////
// START SERVER
////////////////////////////////////////

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
