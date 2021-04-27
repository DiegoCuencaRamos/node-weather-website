const weatherForm = document.querySelector('form')
const search = document.querySelector('#search')
const msgLoading = document.querySelector('#msgLoading')
const msgData = document.querySelector('#msgData')


const fetchWeather = (address) => {
    const url = `http://localhost:3000/weather?address=${address}`
    fetch(url)
        .then(res => res.json())
        .then(body => {
            const { error, forecast, location } = body
            if(error) {
                return msgData.innerHTML = `<p>${error}</p>`
            }

            msgData.innerHTML = `<p>${forecast}</p> <p>${location}</p>`
        })
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    msgLoading.textContent = 'Loading...'
    fetchWeather(search.value)
    msgLoading.textContent = ''
})