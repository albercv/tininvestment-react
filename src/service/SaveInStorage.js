export const SaveTimeStampInStorage = (key, timeStamp) => {
    let storagedItems = getItemFromStorage(key);
    storagedItems = timeStamp;

    SaveInStorage(key, storagedItems);
}

export const SaveInStorageArray = (key, newObject) => {
    let storagedItems = getItemFromStorage(key);
    storagedItems = [...newObject];
    
    SaveInStorage(key, storagedItems);
}

const getItemFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const SaveInStorage = (key, storagedItems) => {
    localStorage.setItem(key, JSON.stringify(storagedItems))
}

