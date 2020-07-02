module.exports = app => {
  const weathers = require("../controllers/weather.controller.js");

  var router = require("express").Router();

  router.get("/", weathers.findFive);

  router.get("/allWeather", weathers.findAll);

  app.use('/api/weathers', router);
};