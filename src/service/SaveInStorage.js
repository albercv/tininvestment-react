export const SaveInStorage = (key, newObject) => {
    let storagedItems = JSON.parse(localStorage.getItem(key))

    if(Array.isArray(storagedItems)) {
        storagedItems.push()
    } else {
        storagedItems = newObject
    }

    localStorage.setItem(key, JSON.stringify(storagedItems))

    return newObject;
}

