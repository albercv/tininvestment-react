export const SaveInStorage = (key, newObject) => {
    let storagedItems = JSON.parse(localStorage.getItem(key))

    if(Array.isArray(storagedItems)) {
        storagedItems.push(newObject)
    } else {
        storagedItems = [newObject]
    }

    localStorage.setItem(key, JSON.stringify(storagedItems))
    console.log("STORAGE ITEM SAVED :")
    console.log(storagedItems)

    return newObject;
}

