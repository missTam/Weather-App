const Model = (() => {
  // Weather constructor
  class Weather {
    constructor(city, description, icon, temperature, imgId, tempMin, tempMax, feel, sunrise, sunset, pressure, humidity, speed) {
      this.city = city;
      this.description = description;
      this.icon = icon;
      this.temperature = temperature;
      this.imgId = imgId;
      this.tempMin = tempMin;
      this.tempMax = tempMax;
      this.feel = feel;
      this.sunrise = sunrise;
      this.sunset = sunset;
      this.pressure = pressure;
      this.humidity = humidity;
      this.speed = speed;
    }
  }
  return {
    // get Weather object from local storage
    getWeather: () => {
      const item = JSON.parse(localStorage.getItem('item'));
      return item;
    },

    // instantiate Weather object & save in local storage
    setWeather: results => {
      const weather = new Weather(results.name, results.weather[0].description,
        results.weather[0].icon, results.main.temp, results.weather[0].id, results.main.temp_min, results.main.temp_max, results.main.feels_like, results.sys.sunrise, results.sys.sunset, results.main.pressure, results.main.humidity, results.wind.speed);

      localStorage.setItem('item', JSON.stringify(weather));
    },
  }
})();