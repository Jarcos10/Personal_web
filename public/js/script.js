// Selección de elementos del DOM
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section'); // Esto se cambió a una lista con querySelectorAll
let navLinks = document.querySelectorAll('header nav a');

// Evento de scroll para cambiar la clase activa del menú
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id'); // Ahora getAttribute recupera el 'id'

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active'); // Remueve la clase activa de todos los enlaces
            });
            document.querySelector(`header nav a[href="#${id}"]`).classList.add('active'); // Agrega la clase activa al enlace actual
        }
    });
};

// Alternar el icono del menú y la clase activa de la barra de navegación
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Crear un FormData con los datos del formulario
    const formData = new FormData(this);

    // Enviar los datos con fetch
    fetch(this.action, {
        method: this.method,
        body: formData,
    })
    .then(response => response.json()) // Parsear la respuesta JSON
    .then(data => {
        if (data.success) {
            // Usar SweetAlert para mostrar mensaje de éxito con tema oscuro
            Swal.fire({
                icon: 'success',
                title: 'Mensaje enviado',
                text: 'Tu mensaje ha sido enviado correctamente.',
                background: '#2e2e2e',  // Fondo oscuro
                color: '#ffffff',        // Texto blanco
                confirmButtonColor: '#3085d6',  // Color del botón
                customClass: {
                    popup: 'dark-popup',
                    confirmButton: 'dark-confirm-button'
                }
            });

            // Limpiar el formulario si se envió correctamente
            this.reset();
        } else {
            // Usar SweetAlert para mostrar mensaje de error con tema oscuro
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al enviar el mensaje.',
                background: '#2e2e2e',  // Fondo oscuro
                color: '#ffffff',        // Texto blanco
                confirmButtonColor: '#d33',  // Color del botón
                customClass: {
                    popup: 'dark-popup',
                    confirmButton: 'dark-confirm-button'
                }
            });
        }
    })
    .catch(error => {
        console.error('Error al enviar el formulario:', error);

        // Usar SweetAlert para mostrar mensaje de error con tema oscuro
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al enviar el mensaje. Inténtalo de nuevo más tarde.',
            background: '#2e2e2e',  // Fondo oscuro
            color: '#ffffff',        // Texto blanco
            confirmButtonColor: '#d33',  // Color del botón
            customClass: {
                popup: 'dark-popup',
                confirmButton: 'dark-confirm-button'
            }
        });
    });
});



