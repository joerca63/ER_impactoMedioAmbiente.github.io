// Función para inicializar gráficos
function inicializarGraficos() {
    // Datos simulados para los gráficos
    const datos = {
        etiquetas: ['Solar', 'Eólica', 'Hidroeléctrica', 'Biocombustibles', 'Geotérmica'],
        valores: [1200, 1800, 4500, 800, 150],
        colores: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    };
    
    // Gráfico de barras
    const ctxBarras = document.getElementById('graficoBarras')?.getContext('2d');
    if (ctxBarras) {
        new Chart(ctxBarras, {
            type: 'bar',
            data: {
                labels: datos.etiquetas,
                datasets: [{
                    label: 'Producción de Energía (TWh)',
                    data: datos.valores,
                    backgroundColor: datos.colores,
                    borderColor: datos.colores.map(c => c.replace('0.6', '1')),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Producción de Energía Renovable por Fuente (2022)',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Teravatios-hora (TWh)'
                        }
                    }
                }
            }
        });
    }
    
    // Gráfico de torta
    const ctxTorta = document.getElementById('graficoTorta')?.getContext('2d');
    if (ctxTorta) {
        new Chart(ctxTorta, {
            type: 'pie',
            data: {
                labels: datos.etiquetas,
                datasets: [{
                    data: datos.valores,
                    backgroundColor: datos.colores,
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Participación de Energías Renovables (2022)',
                        font: {
                            size: 16
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value} TWh (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Inicializar gráficos cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', inicializarGraficos);