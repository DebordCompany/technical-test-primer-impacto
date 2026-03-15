import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export type EnergyData = {
    id: string;
    energy_type: string;
    group_id: string;
    value: string;
    percentage: number;
    datetime: string;
};

type Props = {
    dataArr: EnergyData[];
};

export function DashboardChart({ dataArr }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {

        const series: Record<string, Record<string, number>> = {};
        dataArr.forEach(item => {
            const type = item.energy_type;
            const time = item.datetime;
            const value = Number(item.value);
            if (!series[type]) series[type] = {};
            series[type][time] = value;
        });

        const allDates = Array.from(new Set(dataArr.map(item => item.datetime))).sort();

        const colors = [
            'rgb(53,162,235)',
            'rgb(255,99,132)',
            'rgb(255,206,86)',
            'rgb(75,192,192)',
            'rgb(153,102,255)',
            'rgb(255,159,64)'
        ];

        const datasets = Object.entries(series).map(([type, values], idx) => ({
            label: type,
            data: allDates.map(date => values[date] ?? null),
            borderColor: colors[idx % colors.length],
            backgroundColor: colors[idx % colors.length],
            fill: false,
            tension: 0.3,
            spanGaps: true,
        }));

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: allDates.map(d => new Date(d).toLocaleString()),
                        datasets
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { display: true }
                        },
                        scales: {
                            x: { title: { display: true, text: 'Fecha y hora' } },
                            y: { title: { display: true, text: 'Producción (MWh)' } }
                        }
                    }
                });
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [dataArr]);

    return <canvas ref={canvasRef} height={400} />;
}