import { deleteItemFromStorage, getFromLocalStorage, setItemToLocalStorage } from "../storage/storage.js";
import { Toast } from "./toast.js";

// Función para mostrar la lista de productos en el carrito
export function cartList() {
    // Seleccionar el contenedor del offcanvas
    let offcanvasbody = document.querySelector(".offcanvas-body");
    let template = '';
    
    //  Obtener los datos del carrito desde el almacenamiento local 
    let datastorage = getFromLocalStorage() || [];

    // Actualizar la cantidad total de productos del carrito
    let cartBadge = document.querySelector('#cartBadge');

    let totalProductos = datastorage.reduce((total, producto) => {
        return total + Number(producto.qtty || 0);
    }, 0);

    cartBadge.textContent = totalProductos;
    cartBadge.classList.toggle('d-none', totalProductos === 0);

    // Si el carrito está vacío, mostrar un mensaje
    if (datastorage.length === 0) {
      offcanvasbody.innerHTML = '<p class="text-center text-muted my-4">El carrito está vacío.</p>';
      return;
  }
    
    // Iterar sobre los productos en el carrito y generar la tarjeta
    datastorage.forEach((e) => {
        template += `
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4 d-flex align-items-center align-items-center justify-content-center">
              <img src="${e.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${e.title}</h5>
                <p class="card-text">Cantidad: ${e.qtty}</p>
              </div>
              <div class= "d-flex justify-content-between align-items-center">
                  <small class="text-body-secondary">Precio: $${e.price}</small>
                  <button class="btn btn-danger border-0" id="removeItemBtn-${e.id}"><i class="bi bi-trash2-fill"></i></button>
              </div>
            </div>
          </div>
        </div>
  `})

    // Actualizar el contenido del offcanvas con las tarjetas generadas
    offcanvasbody.innerHTML = template + `
    <div class="border-top pt-3 mt-3">
        <h5 class="text-end">
            Total de productos: ${totalProductos}
        </h5>
    </div>
    `;
    // Agregar la funcionalidad para los botones de eliminar
    removeItemFromCart(datastorage);
}


// Función para eliminar un producto del carrito
function removeItemFromCart(productoStorage) {
  productoStorage.forEach((producto) => {
    let btn = document.querySelector(`#removeItemBtn-${producto.id}`);
    btn.addEventListener('click', () => {
      deleteItemFromStorage(producto.id);
      Toast(`Se agrego ${producto.title} al carrito`, 'danger');
      cartList(); 
    })
  })
}