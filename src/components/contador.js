export function count(id) {  
    let template = `
        <div class="d-flex justify-content-center align-items-center gap-3 my-3">
            <button id="decrement-${id}" class="btn btn-dark">-</button>
            <span id="count-${id}" class="fs-5">1</span>
            <button id="increment-${id}" class="btn btn-dark">+</button>
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