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

    let precioTotal = datastorage.reduce((total, producto) => {
    return total + (Number(producto.price) * Number(producto.qtty));
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
        let cantidad = Number(e.qtty);
        let precioFinal = Number(e.price) * cantidad;
        template += `
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-4 d-flex align-items-center justify-content-center">
              <img src="${e.image}" class="rounded-start imagen-carrito" alt="${e.title}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${e.title}</h5>
                <div class="d-flex align-items-center gap-2 my-3">
                  <button 
                    class="btn btn-outline-secondary btn-sm"
                    id="decrement-${e.id}"
                    ${cantidad === 1 ? 'disabled' : ''}>
                    -
                  </button>

                  <span class="fw-bold" id="count-${e.id}">
                    ${cantidad}
                  </span>

                  <button 
                    class="btn btn-outline-secondary btn-sm"
                    id="increment-${e.id}">
                    +
                  </button>
                </div>
              </div>
              <div class= "d-flex justify-content-between align-items-center">
                  <small class="text-body-secondary">Precio final: $${precioFinal.toFixed(2)}</small>
                  <button class="btn btn-danger border-0" id="removeItemBtn-${e.id}"><i class="bi bi-trash2-fill"></i></button>
              </div>
            </div>
          </div>
        </div>
  `})

    // Actualizar el contenido del offcanvas con las tarjetas generadas
    offcanvasbody.innerHTML = template + `
    <div class="border-top pt-3 mt-3">
      <div class="d-flex justify-content-between align-items-center">
        <h6 class="mb-0">
          Total de productos: ${totalProductos}
        </h6>

        <h6 class="mb-0">
          Precio final: $${precioTotal.toFixed(2)}
        </h6>
      </div>

      <div class="d-flex gap-2 mt-3">
        <button class="btn btn-success w-100" 
          id="finishPurchase"
          data-bs-toggle="modal"
          data-bs-target="#shippingModal">
          Finalizar compra
        </button>

        <button class="btn btn-danger w-100" id="deleteCart">
          Eliminar carrito
        </button>
      </div>
    </div>
    `;

    // Agregar la funcionalidad para los botones de eliminar
    addCartEventListeners(datastorage);
}

// Función para agregar los eventos a los botones del carrito
function addCartEventListeners(productos) {

    let offcanvasbody = document.querySelector(".offcanvas-body");

    productos.forEach((producto) => {

        let btnIncrement = offcanvasbody.querySelector(`#increment-${producto.id}`);
        let btnDecrement = offcanvasbody.querySelector(`#decrement-${producto.id}`);
        let btnRemove = offcanvasbody.querySelector(`#removeItemBtn-${producto.id}`);

        // Aumentar cantidad
        btnIncrement.addEventListener('click', () => {
            updateQuantity(producto.id, 1);
        });

        // Disminuir cantidad
        btnDecrement.addEventListener('click', () => {
            updateQuantity(producto.id, -1);
        });

        // Eliminar producto
        btnRemove.addEventListener('click', () => {
            deleteItemFromStorage(producto.id);
            Toast(`Se eliminó ${producto.title} del carrito`, 'danger');
            cartList();
        });
    });

    // Eliminar todo el carrito
    let btnDeleteCart = document.querySelector('#deleteCart');

    btnDeleteCart.addEventListener('click', () => {
        setItemToLocalStorage([]);
        Toast('Se eliminaron todos los productos del carrito', 'danger');
        cartList();
    });
}


// Función para actualizar la cantidad del producto
function updateQuantity(productId, cambio) {

    let productos = getFromLocalStorage() || [];

    let producto = productos.find((p) => p.id === productId);

    if (producto) {

        let nuevaCantidad = Number(producto.qtty) + cambio;

        if (nuevaCantidad >= 1) {

            producto.qtty = nuevaCantidad;

            // Guardar los cambios en Local Storage
            setItemToLocalStorage(productos);

            // Actualizar el carrito
            cartList();
        }
    }
}