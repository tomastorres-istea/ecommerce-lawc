import { RenderdsCards } from './components/cards.js';
import { cartList } from './components/cartList.js';
import { getProducts } from './services/api.js';
import { initLocalStorage } from './storage/storage.js';
import { validateShippingForm } from './components/shippingForm.js';

initLocalStorage();
cartList();

async function iniciarTienda() {
    const listaProductos = document.querySelector('#listaProductos');
    const inputSearch = document.querySelector('#inputSearch');
    const formSearch = document.querySelector('#formSearch');

    // Capturar los botones de categorías por su ID del HTML
    const btnInicio = document.querySelector('#inicio');
    const btnTodos = document.querySelector('#todosProductos');
    const btnElectronics = document.querySelector('#electronics');
    const btnJewelery = document.querySelector('#jewelery');
    const btnMens = document.querySelector('#men-s-clothing');
    const btnWomens = document.querySelector('#women-s-clothing');

    try {
        listaProductos.textContent = 'Cargando productos...';
        const products = await getProducts();

        // 1. Mostrar todos los productos apenas carga la página
        RenderdsCards(products);

        // 2. Filtros por categoría
        btnInicio.addEventListener('click', (e) => {
            e.preventDefault();
            RenderdsCards(products);
        });

        btnTodos.addEventListener('click', (e) => {
            e.preventDefault();
            RenderdsCards(products);
        });

        btnElectronics.addEventListener('click', (e) => {
            e.preventDefault();
            const result = products.filter((p) => p.category === 'electronics');
            RenderdsCards(result);
        });

        btnJewelery.addEventListener('click', (e) => {
            e.preventDefault();
            const result = products.filter((p) => p.category === 'jewelery');
            RenderdsCards(result);
        });

        btnMens.addEventListener('click', (e) => {
            e.preventDefault();
            const result = products.filter((p) => p.category === "men's clothing");
            RenderdsCards(result);
        });

        btnWomens.addEventListener('click', (e) => {
            e.preventDefault();
            const result = products.filter((p) => p.category === "women's clothing");
            RenderdsCards(result);
        });

        // 3. Filtrar en tiempo real mientras escribes en el input
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

        // 4. Evitar que el botón de la lupa o Enter recargue toda la página
        if (formSearch) {
            formSearch.addEventListener('submit', (event) => {
                event.preventDefault();
            });
        }

    } catch (error) {
        listaProductos.textContent =
            'No se pudieron cargar los productos. Intentá nuevamente más tarde.';
        console.error('Error al cargar los productos:', error);
    }
}

validateShippingForm();
iniciarTienda();
