import { getRandomNamesAndFlags } from './gameSetup.js'

let flagButton = document.getElementById('flagButton');
let coatOfArmsButton = document.getElementById('coatOfArmsButton');

flagButton.addEventListener('click', openFlagsGame);

function openFlagsGame() {
    let flagsGameCollection = getRandomNamesAndFlags(5);
    localStorage.setItem('currentCountry', "");
    localStorage.setItem('flagsGameCollection', JSON.stringify(flagsGameCollection));
    window.location.href = 'flagsGame.html';
}

const url = `https://restcountries.com/v3.1/all?fields=name,flags,capital,coatOfArms`;

const imageContainers = document.getElementsByClassName('bannerImageContainer');

let flagsCollection;

async function fetchCountries(){
    try{
        const response = await fetch(url);
        const data = await response.json();
        localStorage.setItem('fetchedData', JSON.stringify(data));
        setupCountries(data);
    }catch(error){
        console.error('Error fetching countries:', error);
    }
}

function setupCountries(data){
    flagsCollection = data;
    let flag, coatOfArms;
    while (!(flag && coatOfArms)) {
        const random = Math.floor(Math.random() * data.length);
        flag = data[random].flags.svg;
        coatOfArms = data[random].coatOfArms.svg;
    }

    flagButton.querySelector('img').src = flag;
    coatOfArmsButton.querySelector('img').src = coatOfArms;
    Array.from(imageContainers).forEach(element => {
        for (let i = 0; i < 16; i++) {
            const randomIndex = Math.floor(Math.random() * data.length);
            element.innerHTML += `<img height=100% src="${data[randomIndex].flags.svg}">`;
        }
    });
}

fetchCountries();