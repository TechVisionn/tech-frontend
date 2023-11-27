
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import html2canvas from 'html2canvas';
import { Button } from 'primereact/button';
import SerieTemporalDataService from "../../src/data_service/SerieTemporalDataService.tsx"

const TimeSeries = (props) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [dadoSerieTemporal, setDadoSerieTemporal] = useState({});
    const [carregarSerieTemporal, setCarregarSerieTemporal] = useState(false);

    function carregarSerieTemporalFunction() {

        /*SerieTemporalDataService.buscarSerieTemporal(props.nu_identificador).then(resp => {
            setDadoSerieTemporal(resp.data)
        })*/

        setDadoSerieTemporal(
            {
                data: ["2023-11-21", "2023-11-22", "2023-11-23", "2023-11-24", "2023-11-25", "2023-11-26"],
                ndvi_real: [0.25, 0.35, 0.40, 0.50, 0.70, 0.75],
                ndvi_previsto: [null, null, null, null, 0.60, 0.70]
            }
        )
        console.log(dadoSerieTemporal)
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: dadoSerieTemporal.data,
            datasets: [
                {
                    label: 'NDVI Real',
                    data: dadoSerieTemporal.ndvi_real,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500')
                },
                {
                    label: 'NDVI Previsto',
                    data: dadoSerieTemporal.ndvi_previsto,
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

        setTimeout(() => {
            setCarregarSerieTemporal(true);    
        }, 3000);
        
    };

    useEffect(() => {
        carregarSerieTemporalFunction()
    }, [])

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
                { carregarSerieTemporal && 
                    <Chart id='chart' type="line" data={chartData} options={chartOptions} />
                }
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