const View = (() => {

  // define ui selectors
  const UISelectors = {
    input: 'input',
    city: '#city',
    wDescription: '#weather',
    wIcon: '#wicon',
    temperature: '#temperature',
    temp: '#temp',
    sun: '#sun',
    other: '#other',
    input_field: '.input-field',
    error: '#error-msg',
    btn: '.btn',
    inputTxt: '#search_city'
  }

  // Set correct image
  function setImg(id) {
    if (id === 800) {
      changeBackground('clear');
    } else if (id >= 200 && id < 300) {
      changeBackground('thunderstorm');
      document.getElementById('weather').style.color = '#26a69a';
    } else if (id >= 300 && id < 600) {
      changeBackground('rain');
    } else if (id >= 600 && id < 700) {
      changeBackground('snow');
    } else if (id > 700 && id < 800) {
      changeBackground('fog');
    } else if (id > 800) {
      changeBackground('clouds');
    }
  }

  function changeBackground(img) {
    document.querySelector('.custom-background').style.backgroundImage = `url("img/${img}.jpg")`;
  }

  // convert unix_timestamp to local time hh:mm:ss
  function parseDate(unix_timestamp) {
    return new Date(unix_timestamp * 1000).toISOString().slice(-13, -5);
  }

  // convert kelvin to °C
  function parseTemp(kelvin) {
    return parseInt(kelvin - 273.15) + '°C';
  }

  // create placeholder for err messages
  function createSpan(msg) {
    const span = document.createElement('span');
    span.id = 'error-msg';
    span.textContent = msg;
    return span;
  }

  return {
    getInput: () => {
      const input = document.querySelector(UISelectors.input).value;
      return input;
    },

    getSelectors: () => {
      return UISelectors;
    },

    // display weather data on the UI
    displayResults: weather => {

      // select web elements
      const city = document.querySelector(UISelectors.city);
      const wDescription = document.querySelector(UISelectors.wDescription);
      const wIcon = document.querySelector(UISelectors.wIcon);
      const temperature = document.querySelector(UISelectors.temperature);
      const temp = document.querySelector(UISelectors.temp);
      const sun = document.querySelector(UISelectors.sun);
      const other = document.querySelector(UISelectors.other);

      // show main results
      city.textContent = weather.city;
      wDescription.textContent = weather.description;
      wIcon.src = `http://openweathermap.org/img/w/${weather.icon}.png`;
      temperature.textContent = parseTemp(weather.temperature);

      // set correct img
      setImg(weather.imgId);

      // show temp info
      let tempList = `
          <ul id="tempUl" class="collection">
          <li class="collection-item">Min: ${parseTemp(weather.tempMin)}</li>
          <li class="collection-item">Max: ${parseTemp(weather.tempMax)}</li>
          <li class="collection-item">Feels like: ${parseTemp(weather.feel)}</li>
          </ul>
          `;
      temp.innerHTML = tempList;

      // show sun info
      let sunList = `
          <ul id="sunUl" class="collection">
          <li class="collection-item">Sunrise: ${parseDate(weather.sunrise)}</li>
          <li class="collection-item">Sunset: ${parseDate(weather.sunset)}</li>
          </ul>
          `;
      sun.innerHTML = sunList;

      // show other info
      let otherList = `
          <ul id="otherUl" class="collection">
          <li class="collection-item">Pressure: ${weather.pressure} mBar</li>
          <li class="collection-item">Humidity: ${weather.humidity} %</li>
          <li class="collection-item">Wind speed: ${weather.speed} meter/sec</li>
          </ul>
          `;
      other.innerHTML = otherList;

      // keep input text after page refresh
      // document.querySelector(UISelectors.inputTxt).value = weather.city;
    },

    // show error
    showError: errorMsg => {
      document.querySelector(UISelectors.input_field).appendChild(createSpan(errorMsg));
    },

    // remove error for no input
    removeError: () => {
      const span = document.querySelector(UISelectors.error);
      if (span) {
        span.remove();
      }
    },

    clearInput: () => {
      document.querySelector(UISelectors.inputTxt).value = '';
    },
  }
})();