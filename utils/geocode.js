const fetch = require('node-fetch')

const getGeocode = (adress) => {
    const access_token = 'pk.eyJ1IjoiZGllZ28tY3VlbmNhIiwiYSI6ImNrbnU0cWN6YzA5aG8yd29jbTVkMDc0djkifQ._Cvl3HxKqCxxonhR1WFhhw'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?limit=2&access_token=${access_token}`

    return fetch(url)
        .then(res => res.json())
        .then(body => {
            if(body.message) {
                return body.message
            } else if (body.features.length === 0) {
                return 'Unable to find location. Try another search'
            } else {
                const { center, place_name: location } = body.features[0]
                const [ longitude, latitude ] = center
                return {
                    longitude,
                    latitude,
                    location
                }
            }
        })
        .catch(err => console.log('Unable to connect to geolocation service'))
}

module.exports = getGeocode