import {getProducts} from './api.js';

// constant para el contenedor donde se mostrarán los productos

const listaProductos = document.querySelector('#listaProductos');

// Función para mostrar los productos en la página

async function mostrarProductos() {
    try {
        listaProductos.textContent = 'Cargando productos...';

        const productos = await getProducts();

        listaProductos.innerHTML = '';

        productos.forEach(producto => {

            const columna = document.createElement('div');
            columna.className = 'col';

            const card = document.createElement('div');
            card.className = 'card h-100';

            const imagen = document.createElement('img');
            imagen.src = producto.image;
            imagen.alt = producto.title;
            imagen.className = 'card-img-top producto-imagen';

            const cuerpo = document.createElement('div');
            cuerpo.className = 'card-body';

            const titulo = document.createElement('h4');
            titulo.className = 'card-title';
            titulo.textContent = producto.title;

            const descripcion = document.createElement('p');
            descripcion.className = 'card-text';
            descripcion.textContent = producto.description;

            const precio = document.createElement('p');
            precio.className = 'card-text fw-bold';
            precio.textContent = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(producto.price);

            // Armamado de la card
            cuerpo.append(titulo, descripcion, precio);
            card.append(imagen, cuerpo);
            columna.append(card);

            // Agregar la card a la lista de productos
            listaProductos.append(columna);
        });

    } catch (error) {
        listaProductos.textContent =
            'No se pudieron cargar los productos. Intentá nuevamente más tarde.';

        console.error('Error al cargar los productos:', error);
    }
}

mostrarProductos();