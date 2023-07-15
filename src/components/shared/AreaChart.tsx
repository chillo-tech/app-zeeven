import { months } from '@/utils';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

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
  width: '100%',
  legend: {
    display: false,
  },
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
  },
};
const defaultChartData = {
  labels: months,
  datasets: [
    {
      fill: true,
      label: 'Statistiques',
      data: [],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function AreaChart({ data = [] }: { data: any[] }) {
  const [chartData, setChartData] = useState(defaultChartData);
  useEffect(() => {
    const monthsValues: number[] = Array(12).fill(0);

    const statistics = data
      .map(({ creation }: any) => {
        var dt = new Date(creation);
        return dt.getMonth();
      })
      .reduce((acc: any, curr: number) => {
        return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
      }, {});
    Object.keys(statistics).forEach(
      (element: string) => (monthsValues[Number(element)] = Number(statistics[element]))
    );
    setChartData({
      labels: months,
      datasets: [
        {
          fill: true,
          label: 'Statistiques',
          data: monthsValues as never[],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    })
  }, [data]);

  return <Line options={options} data={chartData} />;
}

export default AreaChart;
