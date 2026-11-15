import { Modal } from "./modal.js";

export function RenderdsCards(productos) {
    const listaProductos = document.querySelector('#listaProductos');
    listaProductos.innerHTML = '';

    if (!productos || productos.length === 0) {
        listaProductos.innerHTML = '<p class="text-center text-muted my-4">No se encontraron productos.</p>';
        return;
    }

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
        cuerpo.className = 'card-body text-center d-flex flex-column';

        const titulo = document.createElement('h4');
        titulo.className = 'card-title';
        titulo.textContent = producto.title;

        // Botón para el Modal
        const boton = document.createElement('button');
        boton.className = "btn btn-dark mt-auto";
        boton.textContent = 'Mas Detalles';
        boton.id = producto.id;

        boton.addEventListener('click', () => {
            Modal(producto);
        });

        // Armado de la card
        cuerpo.append(titulo, boton);
        card.append(imagen, cuerpo);
        columna.append(card);

        listaProductos.append(columna);
    });
}
