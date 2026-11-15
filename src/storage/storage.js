const STORAGE_KEY = 'cart';

export function initLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
}

export function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export function saveToLocalStorage(item) {
    initLocalStorage();
    let cart = getFromLocalStorage();
    cart.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function setItemToLocalStorage(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Actualiza la cantidad de un producto en el carrito, acumulando la cantidad si el producto ya existe en el carrito 
export function updateItemStorage(itemId, qtty){
  let dataStorage = getFromLocalStorage();
  let idx = dataStorage.findIndex((p) => p.id === itemId);
  console.log(idx);
  if (idx != -1) {
    dataStorage[idx].qtty += qtty;
    setItemToLocalStorage(dataStorage); 
  }

  return idx;

}


export function deleteItemFromStorage(itemId) {
  let productoStorage = getFromLocalStorage();
  let newDataStorage = productoStorage.filter((e) => e.id !== itemId);
  setItemToLocalStorage(newDataStorage);
}
