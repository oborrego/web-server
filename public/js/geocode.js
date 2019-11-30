const request = require('request');
const print = require('./print-color.js');

const geocode = (location, callback) => {
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoib2JvcnJlZ28iLCJhIjoiY2syOHNyNGl1MG10ejNtb2JhNmxiaXV4NyJ9.pcHbAWq6vagdSfKt7Pp9qQ`;
    request({url: geocodingUrl, json: true}, (err, res) => {
        if (err) {
            print('Unable to connect to geoconding service', 'red');
            callback('Unable to connect to geoconding service', undefined);
        } else if (res.body.error) {
            print('Unable to find location', 'red');
            callback('Unable to find location', undefined)
        } else {
            if(res.body.features){
                const data = res.body.features[0].center;
                callback(undefined, {latitude: data[0], longitude: data[1], location: res.body.features[0].place_name});
            } else{
                callback('You must provide a right address', undefined);
            }

        }
    })
};
module.exports = geocode;
