const audio = document.getElementById('cancion-fondo');
const btnControl = document.getElementById('btn-control');
const sliderVolumen = document.getElementById('slider-volumen');

// Volumen inicial moderado
audio.volume = 0.5;

// --- Función para reproducir audio ---
function reproducirMusica() {
    audio.play().then(() => {
        btnControl.textContent = '⏸';
    }).catch(error => {
        // El navegador bloqueó el autoplay, se reproducirá al primer toque de pantalla
        console.log("Autoplay bloqueado. Esperando interacción del usuario.");
    });
}

// Intentar reproducir apenas cargue
window.addEventListener('DOMContentLoaded', reproducirMusica);

// Si el navegador lo bloquea, reproducirá automáticamente al primer toque/click en la pantalla
document.addEventListener('click', () => {
    if (audio.paused) {
        reproducirMusica();
    }
}, { once: true }); // 'once: true' hace que este detector solo funcione la primera vez

// Control manual del botón Play/Pause
btnControl.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que interfiera con el evento de arriba
    if (audio.paused) {
        audio.play();
        btnControl.textContent = '⏸';
    } else {
        audio.pause();
        btnControl.textContent = '▶';
    }
});

// Control manual de la barra de volumen
sliderVolumen.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});


// --- Generador de Lluvia de Corazones Sutiles ---
const contenedor = document.getElementById('contenedor-corazones');
// Diferentes tonos de rosa para que sea dinámico
const coloresRosa = ['#ffb3c6', '#ffc2d1', '#ffe5ec', '#fb6f92', '#ff8fab'];

function crearCorazon() {
    const corazon = document.createElement('div');
    corazon.classList.add('corazon-cayendo');
    corazon.innerHTML = '❤';
    
    // Configuración aleatoria para que se vea natural y sutil
    const tamaño = Math.random() * 12 + 8; // Tamaños pequeños entre 8px y 20px
    const posicionIzquierda = Math.random() * 100; // Posición horizontal aleatoria
    const duracionCaida = Math.random() * 4 + 4; // Velocidad de caída suave (entre 4 y 8 segundos)
    const colorAleatorio = coloresRosa[Math.floor(Math.random() * coloresRosa.length)];
    
    corazon.style.left = `${posicionIzquierda}vw`;
    corazon.style.fontSize = `${tamaño}px`;
    corazon.style.animationDuration = `${duracionCaida}s`;
    corazon.style.color = colorAleatorio;
    
    contenedor.appendChild(corazon);
    
    // Eliminar el corazón después de terminar la animación para no saturar la memoria
    setTimeout(() => {
        corazon.remove();
    }, duracionCaida * 1000);
}

// Crear un corazón nuevo cada 400 milisegundos (ritmo suave y sutil)
setInterval(crearCorazon, 400);