import { getRandomNamesAndFlags } from '/gameSetup.js'
import { setUpFlagBanner } from '/components/flagBanner.js'

const flagButton = document.getElementById('flagButton');

flagButton.addEventListener('click', openDifficultyPanel);

function openDifficultyPanel(){
    window.location.href = 'difficultyPanel/difficultyPanel.html';
}

let amountOfFlagsOnBanner = 16;

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

async function fetchCountries() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if(data){
            localStorage.setItem('fetchedData', JSON.stringify(data));
            setUpFlagBanner(data, imageContainers, amountOfFlagsOnBanner);
        }
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

fetchCountries();