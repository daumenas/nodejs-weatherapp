exports.monthlyData = function (year, month, day) {
    var request = require("request");
    var startMonth = new Date();
    startMonth.setMonth(startMonth.getMonth() - 1);

    var now = new Date();
    now.setDate(now.getDate() - 1);
    var loop = new Date(startMonth);
    while (loop < now) {

        var previousDay = new Date(loop.setDate(loop.getDate() + 1));
        var newDate = loop.setDate(loop.getDate() + 1);

        var options = {
            method: 'GET',
            url: 'https://api.climacell.co/v3/weather/historical/station',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'yYzlUqvfs9NcfbBP5g8RIdKR67JA72XP'
            },
            qs:
            {
                start_time: previousDay,
                end_time: loop,
                lat: 54.676540,
                lon: 25.283541,
                fields: 'temp'
            }
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            const weathers = require("../controllers/weather.controller.js");

            var object = JSON.parse(body);
            weathers.create(object, response);
        });

        loop = new Date(newDate);
    }
}

exports.hourlyData = function () {
    var request = require("request");
    var now = new Date();
    var eightHoursAhead = new Date(now.setHours(now.getHours() + 8));
    var options = {
        method: 'GET',
        url: 'https://api.climacell.co/v3/weather/forecast/hourly',
        headers: {
            'Content-Type': 'application/json',
            'apikey': 'yYzlUqvfs9NcfbBP5g8RIdKR67JA72XP'
        },
        qs:
        {
            start_time: new Date(),
            end_time: eightHoursAhead,
            lat: 54.676540,
            lon: 25.283541,
            fields: ['temp', 'weather_code']
        }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        const weathers = require("../controllers/weather.controller.js");

        var object = JSON.parse(body);
        weathers.update(object, response);
    });
}