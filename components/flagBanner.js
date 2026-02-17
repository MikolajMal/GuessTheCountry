let imgContainers;
let amountOfFlags;

export function setUpFlagBanner(countryData, imageContainers, amountOfFlagsOnBanner) {
    imgContainers = imageContainers;
    amountOfFlags = amountOfFlagsOnBanner;
    Array.from(imgContainers).forEach(element => {
        for (let i = 0; i < amountOfFlags; i++) {
            const randomIndex = Math.floor(Math.random() * countryData.length);
            element.innerHTML += `<img height=100% src="${countryData[randomIndex].flags.svg}">`;
        }
    });
}