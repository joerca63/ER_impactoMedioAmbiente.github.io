document.addEventListener('DOMContentLoaded', function() {
    const formCalculadora = document.getElementById('formCalculadora');
    
    if (formCalculadora) {
        formCalculadora.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const consumo = parseFloat(document.getElementById('consumo').value);
            const region = document.getElementById('region').value;
            const anio = document.getElementById('anio').value;
            
            // Validar entrada
            if (isNaN(consumo) || consumo <= 0) {
                alert('Por favor ingrese un valor válido para el consumo eléctrico');
                return;
            }
            
            // Calcular porcentaje de energía renovable (simulado)
            // En un caso real, estos valores vendrían de los datos del CSV
            let porcentajeRenovable;
            
            switch(region) {
                case 'colombia':
                    porcentajeRenovable = 70; // Colombia tiene alta participación hidroeléctrica
                    break;
                case 'europa':
                    porcentajeRenovable = 40;
                    break;
                case 'norteamerica':
                    porcentajeRenovable = 20;
                    break;
                case 'sudamerica':
                    porcentajeRenovable = 50;
                    break;
                case 'asia':
                    porcentajeRenovable = 25;
                    break;
                case 'africa':
                    porcentajeRenovable = 35;
                    break;
                case 'oceania':
                    porcentajeRenovable = 30;
                    break;
                default: // global
                    porcentajeRenovable = 30;
            }
            
            // Ajustar por año (simulación)
            if (anio === '2021') porcentajeRenovable *= 0.95;
            if (anio === '2020') porcentajeRenovable *= 0.9;
            
            // Calcular energía renovable en kWh
            const energiaRenovable = (consumo * porcentajeRenovable) / 100;
            const energiaNoRenovable = consumo - energiaRenovable;
            
            // Mostrar resultados
            const resultadoHTML = `
                <p>Para un consumo de <strong>${consumo} kWh</strong> en ${region === 'global' ? 'el mundo' : region} (${anio}):</p>
                <p><strong>${porcentajeRenovable.toFixed(1)}%</strong> de tu consumo provendría de fuentes renovables.</p>
                <p>Esto equivale a <strong>${energiaRenovable.toFixed(1)} kWh renovables</strong> y <strong>${energiaNoRenovable.toFixed(1)} kWh no renovables</strong>.</p>
            `;
            
            document.getElementById('resultadoContenido').innerHTML = resultadoHTML;
            document.getElementById('resultado').style.display = 'block';
            
            // Crear gráfico de resultado
            const ctxResultado = document.getElementById('graficoResultado').getContext('2d');
            new Chart(ctxResultado, {
                type: 'doughnut',
                data: {
                    labels: ['Energía Renovable', 'Energía No Renovable'],
                    datasets: [{
                        data: [energiaRenovable, energiaNoRenovable],
                        backgroundColor: ['#2c786c', '#f8b400'],
                        borderColor: '#fff',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Distribución de tu Consumo Energético',
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
                                    return `${label}: ${value.toFixed(1)} kWh (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        });
    }
});