const API_KEY = "c0cd417c93e33e4bbc57c808982bc938"
const weatherIcon = document.getElementById("weatherIcon")
const local = document.getElementById("local")
const weatherMain = document.getElementById("weatherMain")
const temp = document.getElementById("temp")


function geoOk(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    console.log(`you live in ${lat} and ${lon}`)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url).then(response => response.json()).then(data => {
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        local.innerText = data.name
        weatherMain.innerText = data.weather[0].main
        temp.innerText = Math.round(data.main.temp) + "°C"
        console.log(typeof (data.main.temp))
    })
}
function geoError() {
    alert("can't fount")
}

navigator.geolocation.getCurrentPosition(geoOk, geoError)