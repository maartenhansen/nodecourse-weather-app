const request = require('request')

// example with console.log ** see app.js
// const forecast = (longitude, latitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=88f0687242fb1bd8cc08fe0c1f2ef251&query=' + latitude + ',' + longitude + '&units=m'

//     request({ url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('Could not connect to weathery services.')
//         } else if (response.body.success === false) {
//             callback('These longitudes and latitudes do not match a correct set. Try again please.')
//         } else {
//             callback(`It is currently ${response.body.current.temperature} degrees in ${response.body.location.name}`)
//         }
//     })
// }

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=88f0687242fb1bd8cc08fe0c1f2ef251&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Could not connect to weathery services.', undefined)
        } else if (body.success === false) {
            callback('These longitudes and latitudes do not match a correct set. Try again please.', undefined)
        } else {
            callback(undefined, `It is currently ${body.current.temperature} degrees in ${body.location.name}.`)
        //    callback(undefined, response.body)
        }
    })
}

module.exports = forecast