import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { months } from '@/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  width:'100%',
  legend: {
    display: false
  },
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
  },
};


export const data = {
  labels: months,
  datasets: [
    {
      fill: true,
      label: 'Statistiques',
      data: [10, 34,16, 0, 10,  56, 10],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function AreaChart() {
  return <Line options={options} data={data} />;

}

export default AreaChart
