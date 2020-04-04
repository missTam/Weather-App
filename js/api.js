// api keys
// private: 4d565bdd1c6faf252fc97311023351eb
// public:b6907d289e10d714a6e88b30761fae22

// create a weather api class
class Weather {
    constructor() {
        this.apiKey = '4d565bdd1c6faf252fc97311023351eb';
    }

    // get weather from OpenWeather API
    async getWeather(city) {
        this.city = city;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`);
        if(response.status == 200) {
            const data = await response.json();
            return data;
        }
        throw new Error(`${response.status} ${response.statusText}`);
    }

    // change city
    changeCity(city) {
        this.city = city;
    }
}