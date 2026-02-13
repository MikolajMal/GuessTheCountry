import { getRandomNamesAndFlags } from './gameSetup.js'

const flagButton = document.getElementById('flagButton');

flagButton.addEventListener('click', openFlagsGame);

let amountOfCountriesToGuess = 25;

function openFlagsGame() {
    localStorage.setItem('amountOfCountriesToGuess', amountOfCountriesToGuess);
    let flagsGameCollection = getRandomNamesAndFlags(amountOfCountriesToGuess);
    localStorage.setItem('currentCountry', "");
    localStorage.setItem('flagsGameCollection', JSON.stringify(flagsGameCollection));
    window.location.href = 'flagsGame/flagsGame.html';
}

const url = `https://restcountries.com/v3.1/all?fields=name,flags`;

const imageContainers = document.getElementsByClassName('bannerImageContainer');

let flagsCollection;

async function fetchCountries() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if(data){
            localStorage.setItem('fetchedData', JSON.stringify(data));
            setupCountries(data);
        }
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

function setupCountries(data) {
    flagsCollection = data;
    let flag;
    while (!flag) {
        const random = Math.floor(Math.random() * data.length);
        flag = data[random].flags.svg;
    }
    setUpView(flag, data);
}

function setUpView(flag, countryData) {
    flagButton.querySelector('img').src = flag;
    Array.from(imageContainers).forEach(element => {
        for (let i = 0; i < 16; i++) {
            const randomIndex = Math.floor(Math.random() * countryData.length);
            element.innerHTML += `<img height=100% src="${countryData[randomIndex].flags.svg}">`;
        }
    });
}

fetchCountries();