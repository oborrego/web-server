console.log('Client side javascript is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMessage = document.querySelector('#error-message');
const forecastMessage = document.querySelector('#forecast-message');
forecastMessage.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('testing');
    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        response.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error;
            } else{
                forecastMessage.textContent = 'The temperature in ' + data.location + ' is ' + data.temperature
                    + 'ºF. The probability of precipitations is: ' + data.precipProbability + '%';
            }

        });
    });
});
