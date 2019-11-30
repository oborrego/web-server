const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('/public/geocode.js');
const forecast = require('/public/weather.js');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '../templates/views');
const partialssPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialssPath);

//Setup public directory path for express
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather',
        name: 'Olga Borrego'
    });
});

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About me',
        name: 'Olga Borrego'
    });
});

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help page',
        message: 'You can ask your questions here',
        name: 'Olga Borrego'

    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'Address must be provided'});
    }
    const address = req.query.address;
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error: error});
        }
        forecast(longitude, latitude, location, (error, data) => {
            if (error) {
                return res.send({error: error});
            }
            const {temperature, precipProbability} = data;
            res.send({
                address,
                location,
                temperature,
                precipProbability
            });

        });

    });

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provided a search term'
        });
    }
    res.send({
        products: []
    });

});
app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Olga Borrego'
    });
});

app.get('*', (req, res) => {

    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Olga Borrego'
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
