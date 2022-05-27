const mongoose = require('mongoose');

const mongodb_URI = "mongoDB-database-link";

mongoose.connect(mongodb_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
    .then(db => console.log("base de datos conectada"))
    .catch(err => console.log(err));
