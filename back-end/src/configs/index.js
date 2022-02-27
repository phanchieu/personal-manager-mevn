const dotenv = require('dotenv');

const envPath = __dirname + `/../.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envPath });
console.log(envPath);

const MONGO_URI = process.env.MONGO_URI;

module.exports = {
  MONGO_URI,
};
