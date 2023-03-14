const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `./config.env`, encoding: 'utf-8' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((connection) =>
    console.log(connection.connections, 'DB connection is successful!')
  );

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
