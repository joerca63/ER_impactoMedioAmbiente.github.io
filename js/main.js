// Función para cargar datos desde el archivo CSV (simulado)
function cargarDatos() {
    // En un caso real, aquí se haría una petición al archivo CSV
    // Para este ejemplo, usaremos datos simulados
    
    const datosSimulados = [
        { año: 2022, solar: 1200, eolica: 1800, hidro: 4500, bio: 800, geo: 150 },
        { año: 2021, solar: 1000, eolica: 1600, hidro: 4400, bio: 750, geo: 140 },
        { año: 2020, solar: 850, eolica: 1400, hidro: 4300, bio: 700, geo: 130 }
    ];
    
    // Crear tabla HTML
    let tablaHTML = '<table><thead><tr><th>Año</th><th>Solar (TWh)</th><th>Eólica (TWh)</th><th>Hidroeléctrica (TWh)</th><th>Biocombustibles (TWh)</th><th>Geotérmica (TWh)</th></tr></thead><tbody>';
    
    datosSimulados.forEach(dato => {
        tablaHTML += `
            <tr>
                <td>${dato.año}</td>
                <td>${dato.solar}</td>
                <td>${dato.eolica}</td>
                <td>${dato.hidro}</td>
                <td>${dato.bio}</td>
                <td>${dato.geo}</td>
            </tr>
        `;
    });
    
    tablaHTML += '</tbody></table>';
    
    document.getElementById('tablaDatos').innerHTML = tablaHTML;
}

// Evento para cargar datos al hacer clic en el botón
document.getElementById('cargarDatos')?.addEventListener('click', cargarDatos);

// Navegación activa
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});