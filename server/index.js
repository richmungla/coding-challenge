const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const keys = require("./config/keys");

const app = express();
const PORT = process.env.PORT || 5000;

// import models
require("./models/User");
require("./models/Activity");

mongoose
  .connect(keys.localMongo, {
    useNewUrlParser: true,
    autoReconnect: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((_) => console.log("Connected Successfuly to DB"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// log all requests
app.use(morgan("dev"));

// route imports
require("./routes/activityRoutes")(app);
require("./routes/userRoutes")(app);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("====================================");
  console.log(`Server listening on port: ${PORT}`);
  console.log("====================================");
});

module.exports = app;
