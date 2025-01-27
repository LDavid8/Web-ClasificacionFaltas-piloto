const config = {
    persistenciaLocal: true,
    modoOscuro: false
};

let datosGlobales;
let grafico;

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
    await cargarDatos();
    inicializarSelectores();
    configurarBuscador();
    if(config.persistenciaLocal) cargarEstadoAnterior();
    inicializarGrafico();
});

async function cargarDatos() {
    try {
        const respuesta = await fetch('data.json');
        datosGlobales = await respuesta.json();
        generarListaBusqueda();
    } catch (error) {
        console.error('Error cargando datos:', error);
    }
}

function inicializarSelectores() {
    const selectorCategorias = document.getElementById('selector-categorias');
    selectorCategorias.innerHTML = '<option value="">-- Seleccione categoría --</option>';
    
    Object.keys(datosGlobales.faltas).forEach(categoria => {
        const opcion = document.createElement('option');
        opcion.value = categoria;
        opcion.textContent = datosGlobales.faltas[categoria].nombre;
        selectorCategorias.appendChild(opcion);
    });

    selectorCategorias.addEventListener('change', function() {
        const selectorFaltas = document.getElementById('selector-faltas');
        selectorFaltas.innerHTML = '<option value="">-- Seleccione falta --</option>';
        
        if(this.value) {
            datosGlobales.faltas[this.value].faltas.forEach((falta, index) => {
                const opcion = document.createElement('option');
                opcion.value = index;
                opcion.textContent = falta.texto;
                selectorFaltas.appendChild(opcion);
            });
        }
    });
}

function configurarBuscador() {
    const buscador = document.getElementById('buscador');
    buscador.addEventListener('input', function(e) {
        const termino = e.target.value.toLowerCase();
        const resultados = document.querySelectorAll('#lista-faltas option');
        
        resultados.forEach(opcion => {
            if(opcion.value.toLowerCase().includes(termino)) {
                opcion.style.display = 'block';
            } else {
                opcion.style.display = 'none';
            }
        });
    });
}

// [Funciones restantes de generación de PDF, gráficos, etc. disponibles en el paquete completo]