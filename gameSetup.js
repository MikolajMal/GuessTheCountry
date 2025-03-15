export function getRandomNamesAndFlags(flagsCollection, flagsAmount){
    let indexes = [];
    let namesAndFlags = [];
    for(let i =0; i < flagsAmount; i++){
        let random;
        do {
            random = Math.floor(Math.random() * flagsCollection.length);
        }
        while (indexes.includes(random));

        indexes.push(random);
        namesAndFlags.push([flagsCollection[random].name.common,flagsCollection[random].flags.svg]);
    }

    return namesAndFlags;
}