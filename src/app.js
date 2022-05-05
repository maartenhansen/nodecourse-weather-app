const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { handlebars } = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views/views')
const partialsPath = path.join(__dirname, '../views/partials')

const app = express()

// setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
console.log(partialsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Render pages
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Maarten Hansen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Maarten'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpQuestion: 'Help, ik ben het noorden kwijt. Wat nu?',
        helpAnswer: 'Gebruik een kompas!',
        title: 'Help',
        name: 'Maarten'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an adress!'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error})
            }

            res.send({
                location: address,
                forecast: forecastData
            })

        })
    })
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    } else {
        console.log(req.query.search)
        res.send({
            products: []
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        name: 'Maarten'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        name: 'Maarten'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})