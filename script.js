const ctx1 = document.getElementById('locationChart').getContext('2d');

        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: Array.from({ length: 11 }, (_, i) => `Point ${i + 1}`),
                datasets: [{
                    label: 'Farmers',
                    data: [6000, 8500, 7000, 10000, 12000, 9000, 11000, 7000, 11000, 15970, 14000],
                    borderColor: 'green',
                    fill: true,
                    backgroundColor: 'rgba(34,197,94,0.2)',
                    tension: 0,
                    pointBackgroundColor: 'white',
                    pointBorderColor: 'green',
                    pointBorderWidth: 3,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'category',
                        grid: {
                            drawOnChartArea: false,  
                            drawTicks: true
                        },
                        ticks: {
                            align: 'center',  
                            padding: 8,
                            maxRotation: 45,
                            minRotation: 0,
                            callback: (val, index) => {
                                const mainLabels = ['Bogura', 'Chattogram', 'Jashore', 'Khulna', 'Rajshahi', 'Rashmahi'];
                                if ([0, 2, 4, 6, 8, 10].includes(index)) {
                                    return mainLabels[Math.floor(index / 2)];
                                }
                                return '';
                            }
                        }
                    },
                    y: {
                        min: 0,
                        max: 16000,
                        ticks: {
                            stepSize: 4000,
                            callback: (value) => value === 0 ? '' : value / 1000 + 'k'
                        },
                        grid: {
                            drawOnChartArea: true
                        }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });

        const ctx2 = document.getElementById('cropChart').getContext('2d');
        const cropChart = new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: ['Rice', 'Jute', 'Wheat', 'Potato'],
                datasets: [{
                    data: [50, 20, 15, 15],
                    backgroundColor: ['#1CA322', '#44A23C', '#5AB249', '#98D773']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false 
                    },
                    datalabels: {
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 15
                        },
                        formatter: (value, context) => {
                            const label = context.chart.data.labels[context.dataIndex];
                            if (label === 'Rice') {
                                return `${value}%`;  // show only for rice
                            }
                            return '';  // hide others
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });