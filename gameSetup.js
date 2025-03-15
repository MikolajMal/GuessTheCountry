export function getRandomNamesAndFlags(flagsAmount){
    let contryData = JSON.parse(localStorage.getItem('fetchedData'));
    let indexes = [];
    let namesAndFlags = [];
    for(let i =0; i < flagsAmount; i++){
        let random;
        do {
            random = Math.floor(Math.random() * contryData.length);
        }
        while (indexes.includes(random));

        indexes.push(random);
        namesAndFlags.push([contryData[random].name.common,contryData[random].flags.svg]);
    }

    return namesAndFlags;
}