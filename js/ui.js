// find web elements
const city = document.querySelector('#city');
const wDescription = document.querySelector('#weather');
const wIcon = document.querySelector('#wicon');
const temperature = document.querySelector('#temperature');
const temp = document.querySelector('#temp');
const sun = document.querySelector('#sun');
const other = document.querySelector('#other');


// display weather data on the UI
function displayResults(results) {

    // show main results
    city.textContent = results.name;
    wDescription.textContent = results.weather[0].description;
    wIcon.src= `http://openweathermap.org/img/w/${results.weather[0].icon}.png`;
    temperature.textContent = parseTemp(results.main.temp);

    // set correct img
    setImg(results.weather[0].id);

    // show temp info
    let tempList = `
    <ul id="tempUl" class="collection">
    <li class="collection-item">Min: ${parseTemp(results.main.temp_min)}</li>
    <li class="collection-item">Max: ${parseTemp(results.main.temp_max)}</li>
    <li class="collection-item">Feels like: ${parseTemp(results.main.feels_like)}</li>
    </ul>
    `;
    temp.innerHTML = tempList;

    // show sun info
    let sunList = `
    <ul id="sunUl" class="collection">
    <li class="collection-item">Sunrise: ${parseDate(results.sys.sunrise)}</li>
    <li class="collection-item">Sunset: ${parseDate(results.sys.sunset)}</li>
    </ul>
    `;
    sun.innerHTML = sunList;

    // show other info
    let otherList = `
    <ul id="otherUl" class="collection">
    <li class="collection-item">Pressure: ${results.main.pressure} mBar</li>
    <li class="collection-item">Humidity: ${results.main.humidity} %</li>
    <li class="collection-item">Wind speed: ${results.wind.speed} meter/sec</li>
    </ul>
    `;
    other.innerHTML = otherList;
}

// convert unix_timestamp to local time hh:mm:ss
function parseDate(unix_timestamp) {
    return new Date(unix_timestamp * 1000).toISOString().slice(-13, -5);
}

// convert kelvin to °C
function parseTemp(kelvin) {
    return parseInt(kelvin - 273.15) + '°C';
}

// show error
function showError(errorMsg) {
    document.querySelector('.input-field').appendChild(createSpan(errorMsg));
}

// remove error for no input
function removeError() {
    const span = document.getElementById('error-msg');
    if(span) {
        span.remove();
    }
}

// create placeholder for err messages
function createSpan(msg) {
    const span = document.createElement('span');
    span.id = 'error-msg';
    span.textContent = msg;
    return span;
}

// Set correct image
function setImg(id) {
    if(id === 800) {
        changeBackground('clear');
    } else if(id >= 200 && id < 300) {
        changeBackground('thunderstorm');
        document.getElementById('weather').style.color = '#26a69a';
    } else if(id >= 300 && id < 600) {
        changeBackground('rain');
    } else if(id >= 600 && id < 700) {
        changeBackground('snow');
    } else if(id > 700 && id < 800) {
        changeBackground('fog');
    } else if(id > 800) {
        changeBackground('clouds');
    }
}

// change css
function changeBackground(img) {
    document.querySelector('.custom-background').style.backgroundImage = `url("img/${img}.jpg")`;
}
