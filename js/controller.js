const Controller = ((APIservice, Model, View) => {
  // Load event listeners
  const loadEventListeners = () => {
    const UISelectors = View.getSelectors();
    document.querySelector(UISelectors.btn).addEventListener('click', searchWeather);
  }

  // fetch weather, model & save data, display them
  const searchWeather = (e) => {
    const input = View.getInput();
    if (input !== '') {
      View.removeError();
      APIservice.getWeather(input.toLowerCase())
        .then(response => {
          // save data 
          Model.setWeather(response);
          // get data
          const weather = Model.getWeather();
          // display data on UI
          View.displayResults(weather);
          // Clear fields
          View.clearInput();
        })
        .catch(error => {
          // handle http err
          View.showError(error);
        });
    } else {
      // handle no input err
      View.removeError();
      View.showError('Please type in a city')
    }
    e.preventDefault();
  }

  return {
    init: () => {
      // Fetch item from local storage
      const weather = Model.getWeather();

      // Only display if item available
      if (weather) {
        View.displayResults(weather);
      }

      // Load event listeners
      loadEventListeners();
    }
  }
})(APIservice, Model, View);

Controller.init();