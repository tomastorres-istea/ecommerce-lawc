export function count(id) {  
    let template = `
        <div class="d-flex flex-column align-items-center my-4">

            <span class="text-secondary small mb-2">Cantidad de unidades</span>

            <div class="d-flex align-items-center justify-content-center my-4">
            <button id="decrement-${id}" class="btn btn-outline-secondary rounded-start"><i class="bi bi-dash-lg"></i></button>
            <span id="count-${id}" class="btn btn-light border fw-bold fs-5 px-3 py-2 position-relative" style="z-index: 1; transform: scaleY(1.2);">1</span>
            <button id="increment-${id}" class="btn btn-outline-secondary rounded-end"><i class="bi bi-plus-lg"></i></button>
            </div>

        </div>
    `;
    return template;
}

export function addCounterEventListeners(id,quantity) {

    let btnIncrement = document.querySelector(`#increment-${id}`);
    let btnDecrement = document.querySelector(`#decrement-${id}`);
    let countElement = document.querySelector(`#count-${id}`);
    btnIncrement.addEventListener('click', () => {
        countElement.textContent = ++quantity;
    });
    btnDecrement.addEventListener('click', () => {
        if (quantity > 1) {
            countElement.textContent = --quantity;
        }
        countElement.textContent = quantity;
    });
}