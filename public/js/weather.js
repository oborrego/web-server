const request = require('request');
const print = require('./print-color.js');

const weather = (longitude, latitude, location, callback) => {
    const weatherUrl = `https://api.darksky.net/forecast/009c0762802ec0291d60397a5104bfef/${latitude},${longitude}?unit=auto`;

    request({url: weatherUrl, json: true}, (error, response) => {
        if (error) {
            print('Unable to connect to the weather service', 'red');

            callback('Unable to connect to the weather service', undefined);
        } else if (response.body.error) {
            print('Unable to find location', 'red');
            callback('Unable to find location', undefined);
        } else {
          const  {temperature, precipProbability} = response.body.currently;
            callback(undefined, {location, temperature, precipProbability})


        }

    });
};

module.exports = weather;
