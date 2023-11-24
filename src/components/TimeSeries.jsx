
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import html2canvas from 'html2canvas';
import { Button } from 'primereact/button';
import SerieTemporalDataService from "../../src/data_service/SerieTemporalDataService.tsx"

const TimeSeries = (props) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {

        SerieTemporalDataService.buscarSerieTemporal().then(resp => {
            console.log(resp.data)
        })
        //console.log(props.nu_identificador)

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

    function baixarImagem() {
        const chart = document.getElementById('chart');
        html2canvas(chart)
        .then((canvas) => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'chart.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error('Erro ao gerar imagem do gráfico:', error);
        });
    }

    return (
        <div className="card">
            <center>
                <h3>Série Temporal do NDVI com previsões do ARIMA</h3>
                <Chart id='chart' type="line" data={chartData} options={chartOptions} />
                <br />
                <Button
                    icon="pi pi-file-pdf"
                    severity="success"
                    size="small"
                    label="Baixar Gráfico"
                    onClick={(e) => { baixarImagem() }}
                />
            </center>
        </div>
    )
}

export default TimeSeries;