const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fetch = require('node-fetch')

const getGeocode = require('../utils/geocode')
const getForecast = require('../utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Diego Cuenca'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Diego Cuenca'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'Address must be provided.'
        })
    }

    getGeocode(address)
        .then(({ latitude, longitude, location } = {}) => getForecast(latitude, longitude, location))
        .then((data) => {
            res.send({...data})
        })  
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Diego Cuenca',
        helpText: 'Some helpfull text'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Diego Cuenca',
        errorMessage: 'Help article no tfound'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Diego Cuenca',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server up and runing on port ${port}!`)
})