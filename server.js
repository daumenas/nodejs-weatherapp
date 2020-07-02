const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");
db.sequelize.sync().then(() => {
});

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/weather.routes")(app);

var importWeather = require("./app/service/import");

var schedule = require('node-schedule');

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

  importWeather.monthlyData(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());

  var rule = new schedule.RecurrenceRule();
  schedule.scheduleJob('0 */1 * * *', function () {
    importWeather.hourlyData();
  });
});