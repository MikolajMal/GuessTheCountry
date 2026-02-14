export function setUpFlagBanner(data, imageContainers, amountOfFlagsOnBanner) {
    imgContainers = imageContainers;
    amountOfFlags = amountOfFlagsOnBanner;
    setupCountries(data);
}

let imgContainers;
let amountOfFlags;

function setupCountries(data) {
    let flag;
    while (!flag) {
        const random = Math.floor(Math.random() * data.length);
        flag = data[random].flags.svg;
    }

    setUpView(flag, data);
}

function setUpView(flag, countryData) {
    flagButton.querySelector('img').src = flag;
    Array.from(imgContainers).forEach(element => {
        for (let i = 0; i < amountOfFlags; i++) {
            const randomIndex = Math.floor(Math.random() * countryData.length);
            element.innerHTML += `<img height=100% src="${countryData[randomIndex].flags.svg}">`;
        }
    });
}