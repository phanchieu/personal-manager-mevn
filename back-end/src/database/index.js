const mongoose = require('mongoose');
const configs = require('../configs');

async function connect() {
  // console.log('configs', configs.MONGO_URI);
  const url =
    'mongodb+srv://user_app:user_app@personalmanager.yjfkt.mongodb.net/PersonalManager?retryWrites=true&w=majority';

  await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log('Connect to database successfully!'))
    .catch((error) => console.log('Error: connect to database failed!!!', error));
}

module.exports = { connect };
