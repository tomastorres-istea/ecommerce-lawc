import { Toast as BootstrapToast } from 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/+esm';

export function Toast(message, color) {
    let template = `
        <div class="toast align-items-center text-bg-${color} border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `; 
    
    let toastContainer = document.getElementById('toastContainer');
    toastContainer.innerHTML += template;

    // captura el último toast agregado y lo muestra
    const toasts = document.querySelectorAll('.toast');
    let lastToast = toasts[toasts.length - 1];

    const bootstrapToast = new BootstrapToast(lastToast, { delay: 3000 });
    bootstrapToast.show();
}
