const fetch = require('node-fetch')

const getForecast = (latitude, longitude, location) => {
    const key = '80afef838d209189fb31eaf9fa425a5e'
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}`

    // Fetch data
    return fetch(url)
        .then(res => res.json())
        .then(body => {
            if(body.error) {
                return {
                    error: 'Unable to find location. Try another search'
                }
            } else {
                const { weather_descriptions: descriptions, temperature, feelslike } = body.current
                return {
                    forecast: `${descriptions[0]}. It is currently ${temperature} degress out. It feels like ${feelslike} degrees.`,
                    location
                }
            }
        })
        .catch(err => ({ error: 'Unable to connect to weather service' }))
}

module.exports = getForecast