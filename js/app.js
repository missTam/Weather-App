// instantiate weather object
const weather = new Weather();

// find web elements and add event listener
const input = document.querySelector('input');
const btn = document.querySelector('.btn').addEventListener('click', getWeather);

function getWeather(e) {
    if(input.value !== '') {
        removeError();
        weather.getWeather(`${input.value.toLowerCase()}`)
        .then(response => {
            console.log(response);
            displayResults(response);
            input.value = '';
        })
        .catch(error => {
            // handle http err
            showError(error);
        });
    } else {
        // handle no input err
        removeError();
        showError('Please type in a city');
    }
    e.preventDefault();
}


