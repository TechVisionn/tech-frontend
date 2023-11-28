
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import html2canvas from 'html2canvas';
import { Button } from 'primereact/button';
import SerieTemporalDataService from "../../src/data_service/SerieTemporalDataService.tsx"

const TimeSeries = (props) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({}); 
    const [carregarSerieTemporal, setCarregarSerieTemporal] = useState(false);

    function carregarSerieTemporalFunction() {

        SerieTemporalDataService.buscarSerieTemporal(props.nu_identificador).then(resp => {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
            const dados = resp.data[0];
            console.log(dados)
            const data = {
                labels: dados.data_teste,
                datasets: [
                    {
                        label: 'NDVI Real',
                        data: dados.NDVIReal,
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--blue-500')
                    },
                    {
                        label: 'NDVI Previsto',
                        data: dados.previsao,
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
        })
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
                    <Chart 
                        id='chart' type="line" data={chartData} options={chartOptions} 
                        style={{ width: "100%", height: "100%" }}
                    />
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