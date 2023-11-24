
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

const TimeSeries = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'NDVI Real',
                    data: [0.009, 1.02, 0.89, -0.7899, 0.009, 0.255, 0.1999],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500')
                },
                {
                    label: 'NDVI Previsto',
                    data: [null, null, null, null, 0.01, 0.3, 0.2],
                    fill: false,
                    borderDash: [5, 5],
                    borderColor: documentStyle.getPropertyValue('--orange-500')
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card">
            <center>
                <h3>Série Temporal do NDVI com previsões do ARIMA</h3>
                <Chart type="line" data={chartData} options={chartOptions} />
            </center>
        </div>
    )
}

export default TimeSeries;