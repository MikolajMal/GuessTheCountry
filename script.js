import { setUpFlagBanner } from './components/flagBanner.js'

const flagButton = document.getElementById('flagButton');

flagButton.addEventListener('click', () => openDifficultyPanel('flagsGame'));

function openDifficultyPanel(gameType) {
    localStorage.setItem('current', "");
    window.location.href = `difficultyPanel/difficultyPanel.html?gameType=${gameType}`;
}

let amountOfFlagsOnBanner = 16;

const url = `https://restcountries.com/v3.1/all?fields=name,flags`;

const imageContainers = document.getElementsByClassName('bannerImageContainer');

async function fetchCountries() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
            localStorage.setItem('fetchedData', JSON.stringify(data));
            setUpFlagBanner(data, imageContainers, amountOfFlagsOnBanner);

            let flag;
            while (!flag) {
                const random = Math.floor(Math.random() * data.length);
                flag = data[random].flags.svg;
            }
            flagButton.querySelector('img').src = flag;
        }
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

fetchCountries();