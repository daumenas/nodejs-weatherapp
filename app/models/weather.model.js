module.exports = (sequelize, Sequelize) => {
  const Weather = sequelize.define("weather", {
    observation_time: {
      type: Sequelize.DATE
    },
    temp: {
      type: Sequelize.DOUBLE
    },
    weather_code: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true,
  });
  return Weather;
};