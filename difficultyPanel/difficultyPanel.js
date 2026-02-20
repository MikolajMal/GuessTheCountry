import { getRandomNamesAndFlags } from '../gameSetup.js'
import { setUpFlagBanner } from '../components/flagBanner.js'

const params = new URLSearchParams(window.location.search);

let gameType = params.get('gameType');

let data = JSON.parse(localStorage.getItem('fetchedData'));
const imageContainers = document.getElementsByClassName('bannerImageContainer');
let amountOfFlagsOnBanner = 16;

const easyButton = document.getElementById('easy');
const mediumButton = document.getElementById('medium');
const hardButton = document.getElementById('hard');

let easyFlagsGameAmountOfFlags = 10;
let mediumFlagsGameAmountOfFlags = 15;
let hardFlagsGameAmountOfFlags = 25;

easyButton.addEventListener('click', () => startGame('easy'));
mediumButton.addEventListener('click', () => startGame('medium'));
hardButton.addEventListener('click', () => startGame('hard'));

setUpFlagBanner(data, imageContainers, amountOfFlagsOnBanner);

function startGame(difficulty) {


    
    if (gameType === 'flagsGame') {
        switch (difficulty) {
            case 'easy':
                openFlagsGame(easyFlagsGameAmountOfFlags);
                break;
            case 'medium':
                openFlagsGame(mediumFlagsGameAmountOfFlags);
                break;
            case 'hard':
                openFlagsGame(hardFlagsGameAmountOfFlags);
                break;
            default:
                openFlagsGame(hardFlagsGameAmountOfFlags);
                break;
        }
    }
}

function openFlagsGame(amountOfCountriesToGuess) {
    localStorage.setItem('amountOfCountriesToGuess', amountOfCountriesToGuess);
    let flagsGameCollection = getRandomNamesAndFlags(amountOfCountriesToGuess);
    localStorage.setItem('currentCountry', "");
    localStorage.setItem('flagsGameCollection', JSON.stringify(flagsGameCollection));
    window.location.href = '../flagsGame/flagsGame.html';
}