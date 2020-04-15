const APIservice = (() => {
  const apiKey = '4d565bdd1c6faf252fc97311023351eb';
  return {
    getWeather: async city => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      if (response.status == 200) {
        const data = await response.json();
        return data;
      }
      throw new Error(`${response.status} ${response.statusText}`);
    }
  }
})();