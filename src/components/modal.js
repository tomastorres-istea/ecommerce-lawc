import { getFromLocalStorage, setItemToLocalStorage} from '../storage/storage.js';
import { count, addCounterEventListeners } from './contador.js';
import { Modal as BootstrapModal } from
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/+esm';

export function Modal(producto) {
    const contenedor = document.querySelector('#productoModal');

    const precio = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(producto.price);

    contenedor.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title" id="productoModalLabel"></h5>

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Cerrar">
                    </button>
                </div>

                <div class="modal-body">
                    <div class="row">
                    <div class="col-md-6">
                        <img class="modal-image">
                    </div>
                    <div class="col-md-6">
                        <p class="modal-descripcion"></p>
                    </div>
                    <div class="d-flex justify-content-md-end">
                        <p class="modal-precio fw-bold"></p>
                    </div>
                </div>
                
                <!-- Agregar el contador al modal -->
                ${count(producto.id)}

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="closeModalBtn"> Cerrar </button>
                    <button type="button" class="btn btn-primary" id="addToCartBtn-${producto.id}"> Agregar a carrito </button>
                </div>

            </div>
        </div>
    `;

    // Cargar la información del producto seleccionado
    contenedor.querySelector('.modal-title').textContent =
        producto.title;

    contenedor.querySelector('.modal-descripcion').textContent =
        producto.description;

    contenedor.querySelector('.modal-precio').textContent = `Precio: ${precio}`;

    contenedor.querySelector('.modal-image').src = producto.image;

    addCounterEventListeners(producto.id, 1);
    let btnAddToCart = document.querySelector(`#addToCartBtn-${producto.id}`);
    btnAddToCart.addEventListener('click', () => {
        producto.quantity = parseInt(document.querySelector(`#count-${producto.id}`).textContent);
        let dataStorage = getFromLocalStorage();
        let filteredData = dataStorage.filter(p => p.id !== producto.id);
        filteredData.push(producto);
        setItemToLocalStorage(filteredData);
    });

    // Mostrar la ventana modal
    const bootstrapModal = new BootstrapModal(contenedor);
    bootstrapModal.show();

    const btnCerrar = contenedor.querySelector('#closeModalBtn');

    btnCerrar.addEventListener('click', () => {
        bootstrapModal.hide();
    });
}

