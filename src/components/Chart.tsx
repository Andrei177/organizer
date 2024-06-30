import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Регистрация элементов, контроллеров и плагинов
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

interface IPropsChart{
    notCompleted: number;
    completed: number
}

const Chart: React.FC<IPropsChart> = ({completed, notCompleted}) => {

  const pieChartData = {
    labels: ["Завершено", "Не завершено"],
    datasets: [{
      data: [completed, notCompleted],
      label: "Количество дел",
      backgroundColor: ["#2FDE00", "#00A6B4"],
      hoverBackgroundColor: ["#175000", "#003350"]
    }]
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top"
      },
      datalabels: {
        display: true,
        color: 'white',
        anchor: 'end',
        align: 'start',
        offset: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 25,
        backgroundColor: (context: any) => context.dataset.backgroundColor,
        font: {
          weight: 'bold',
          size: 17
        },
        formatter: (value: any) => `${value}`
      }
    }
  };

  return (
    <div>
      <Pie
        data={pieChartData}
        options={options}
        height={"300px"}
        width={"auto"}
      />
    </div>
  );
};

export default Chart;