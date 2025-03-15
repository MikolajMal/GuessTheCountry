export function getRandomNamesAndFlags(flagsAmount) {
    const countryData = JSON.parse(localStorage.getItem('fetchedData'));
    const indexes = [];
    const namesAndFlags = [];

    if (flagsAmount > countryData.length) {
        flagsAmount = countryData.length;
    }

    for (let i = 0; i < flagsAmount; i++) {
        let random;
        do {
            random = Math.floor(Math.random() * countryData.length);
        }
        while (indexes.includes(random));

        indexes.push(random);
        namesAndFlags.push([countryData[random].name.common, countryData[random].flags.svg]);
    }

    return namesAndFlags;
}