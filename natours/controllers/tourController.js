const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkID = (request, response, next, value) => {
  console.log(`Tour id is: ${value}`);

  if (request.params.id * 1 > tours.length) {
    return response.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  next();
};

const checkBody = (request, response, next) => {
  if (!request.body.name || !request.body.price) {
    return response
      .status(400)
      .json({ status: 'fail', message: 'Missing name or price' });
  }

  next();
};

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
  response
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour here...>' } });
};

const deleteTour = (request, response) => {
  response.status(204).json({ status: 'success', data: null });
};

exports.checkID = checkID;
exports.checkBody = checkBody;
exports.getAllTours = getAllTours;
exports.getTour = getTour;
exports.createTour = createTour;
exports.updateTour = updateTour;
exports.deleteTour = deleteTour;
