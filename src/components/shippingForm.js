import { Modal as BootstrapModal } from 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/+esm';
import { setItemToLocalStorage } from '../storage/storage.js';
import { cartList } from './cartList.js';
import { Toast } from './toast.js';

// Validación del formulario de envío
export function validateShippingForm() {

    let shippingForm = document.querySelector('#shippingForm');
    let sendShippingBtn = document.querySelector('#sendShippingBtn');

    shippingForm.addEventListener('input', (e) => {

        let campo = e.target;

        if (campo.checkValidity()) {
            campo.classList.add('is-valid');
            campo.classList.remove('is-invalid');
        } else {
            campo.classList.add('is-invalid');
            campo.classList.remove('is-valid');
        }

        if (shippingForm.checkValidity()) {
            sendShippingBtn.disabled = false;
        } else {
            sendShippingBtn.disabled = true;
        }

    });

    shippingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (shippingForm.checkValidity()) {

            document.querySelector('#confirmNombre').textContent =
                document.querySelector('#inputNombre').value;

            document.querySelector('#confirmApellido').textContent =
                document.querySelector('#inputApellido').value;

            document.querySelector('#confirmDireccion').textContent =
                document.querySelector('#inputDireccion').value;

            // Cerrar modal de envío
            let shippingModalElement = document.querySelector('#shippingModal');

            let shippingModal = BootstrapModal.getInstance(shippingModalElement);

            shippingModalElement.addEventListener('hidden.bs.modal', () => {

                // Abrir modal de confirmación
                let confirmationModal = new BootstrapModal(
                    document.querySelector('#confirmationModal')
                );

                confirmationModal.show();

                // Vaciar carrito
                setItemToLocalStorage([]);
                cartList();

                Toast('¡Compra finalizada correctamente!', 'success');

                // Limpiar formulario
                shippingForm.reset();
                sendShippingBtn.disabled = true;

            }, { once: true });

            shippingModal.hide();
        }
    });


}