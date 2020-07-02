const db = require("../models");
const Weather = db.weathers;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (req.length > 0) {
    req.forEach(element => {
      const weather = {
        observation_time: element.observation_time.value,
        temp: element.temp.value
      }
      Weather.create(weather)
        .then(data => {
        })
    });
  }
};

exports.findAll = (req, res) => {
  Weather.findAll({ order: [['observation_time', 'DESC']] })
    .then(data => {
      res.send(data);
    })
};

exports.findFive = (req, res) => {
  Weather.findAll({ limit: 5, order: [['observation_time', 'DESC']] })
    .then(data => {
      res.send(data);
    })
}

exports.update = (req, res) => {
  req.forEach(element => {
    var weather = this.findByDate(element.observation_time.value);
    if (weather !== null) {
      Weather.destroy({
        where: { observation_time: element.observation_time.value }
      })
    }
      weather = {
        observation_time: element.observation_time.value,
        temp: element.temp.value,
        weather_code: element.weather_code.value
      }
      Weather.create(weather)
        .then(data => {
        })
  });
}

exports.findByDate = (date) => {
  Weather.findAll({ where: { observation_time: date } })
    .then(data => {
      return data;
    })
};

