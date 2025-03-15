import { getRandomNamesAndFlags } from './gameSetup.js'

let flagsGame = document.getElementById('flagsGame');
let gridContainer = document.getElementById('gridContainer');
let countryNameElement = document.getElementById('countryName');
let scoreElements = Array.from(document.getElementsByClassName('score'));
let endGamePanel = document.getElementById('endGamePanel');
let countryName;
let score = 0;

let playAgainButton = document.getElementById('playAgainButton');
playAgainButton.addEventListener('click', () => getRandomNamesAndFlags(10));

let namesAndFlags;

function createButtons(data) {
    namesAndFlags = data;
    console.log(data);
    data.forEach(createButton);
}

function createButton(nameAndFlag) {
    let name = nameAndFlag[0];
    let flag = nameAndFlag[1];

    let btn = document.createElement('button');
    btn.classList.add('gridButton');

    let img = document.createElement('img');
    img.src = flag;

    btn.appendChild(img);

    let checkButton = () => {
        if (checkFlagButton(name, btn)) {
            btn.removeEventListener('click', checkButton);
        }
    };

    btn.addEventListener('click', checkButton);
    gridContainer.appendChild(btn);
}


let matchedButtonClass = 'gridButtonMatched';
let wrongButtonClass = 'gridButtonWrongAnimation';
let wrongButtons = [];
function checkFlagButton(buttonCountryName, button) {
    let result;
    console.log('buttonCountryName ' + buttonCountryName);
    console.log('countryName ' + countryName);
    if (buttonCountryName === countryName && !button.classList.contains(matchedButtonClass)) {
        button.classList.add(matchedButtonClass);
        showNextCountry();
        score += 10;
        wrongButtons.forEach(element => {
            element.classList.remove(wrongButtonClass);
        });
        wrongButtons = [];
        result = true;
    }
    else {
        button.classList.add(wrongButtonClass);
        wrongButtons.push(button);
        score--;
        result = false;
    }
    scoreElements.forEach(e => e.innerHTML = score);
    return result;
}

function showNextCountry(country = "") {
    if (namesAndFlags.length > 0) {
        if(country.length !== 0){
            countryName = country;
            const index = namesAndFlags.findIndex(c => c[0] === countryName);
            namesAndFlags.splice(index, 1);
        }
        else{
            const randomIndex = Math.floor(Math.random() * namesAndFlags.length);
            countryName = namesAndFlags[randomIndex][0];
            namesAndFlags.splice(randomIndex, 1);
        }
        countryNameElement.innerHTML = countryName;
        localStorage.setItem('currentCountry', countryName);
    }
    else {
        countryNameElement.innerHTML = 'CONGRATULATIONS';
        endGamePanel.classList.add('flexVisibleElement');
        endGamePanel.classList.remove('hiddenElement');
        flagsGame.classList.add('blur');
        localStorage.setItem('currentCountry', "");
    }
}

endGamePanel.classList.remove('flexVisibleElement');
endGamePanel.classList.add('hiddenElement');

let data = JSON.parse(localStorage.getItem('flagsGameCollection'));
createButtons(data);

let currentCountry = localStorage.getItem('currentCountry');
showNextCountry(currentCountry);
