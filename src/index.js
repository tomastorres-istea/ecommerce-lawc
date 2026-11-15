import {RenderdsCards} from './components/cards.js';
import { cartList } from './components/cartList.js';
import { getProducts } from './services/api.js';
import {initLocalStorage} from './storage/storage.js';

cartList();
initLocalStorage();


async function iniciarTienda() {
    const listaProductos = document.querySelector('#listaProductos');
    const inputSearch = document.querySelector('#inputSearch');
    const formSearch = document.querySelector('#formSearch');


    try {
        listaProductos.textContent = 'Cargando productos...';
        const products = await getProducts();

        // 1. Mostrar todos los productos al iniciar
        RenderdsCards(products);

        // 2. Filtrar en tiempo real mientras escribes en el input
        inputSearch.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();

            if (query !== '') {
                const result = products.filter((p) =>
                    p.title.toLowerCase().includes(query)
                );
                RenderdsCards(result);
            } else {
                RenderdsCards(products);
            }
        });

        // 3. Evitar que el botón de la lupa o Enter recargue toda la página
        if (formSearch) {
            formSearch.addEventListener('submit', (event) => {
                event.preventDefault();
            });
        }

    } catch (error) {
        listaProductos.textContent =
            'No se pudieron cargar los productos. Intentá nuevamente más tarde.';
    }
}

iniciarTienda();
