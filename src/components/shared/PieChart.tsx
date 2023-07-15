import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  width: '100%',
  legend: {
    display: false,
  },
  plugins: {
    legend: {
      position: 'right' as const,
    },
  },
};
const defaultChartData = {
  labels: ['IOS', 'Android', 'Autre'],
  datasets: [
    {
      label: 'Terminaux',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 1,
    },
  ],
};
const getAgent = (label: string) => {
  if (label.toLocaleLowerCase().indexOf('android') > -1) {
    return 'android';
  } else if (label.toLocaleLowerCase().indexOf('ios') > -1) {
    return 'ios';
  } else {
    return 'autre';
  }
};
function PieClart({ data = [] }: { data: any[] }) {
  const [chartData, setChartData] = useState(defaultChartData);
  useEffect(() => {

    const statistics = data
      .filter((entry: any) => entry.agent !== undefined)
      .map((entry: any) => {
        return getAgent(entry.agent);
      })
      .reduce(function (acc: any, curr: string) {
        return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
      }, {});
    setChartData({
      labels: ['IOS', 'Android', 'Autre'],
      datasets: [
        {
          label: 'Terminaux',
          data: [statistics['ios'], statistics['android'], statistics['autre']],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1,
        },
      ],
    });
  }, [data]);

  return <Doughnut options={options} data={chartData} />;
}

export default PieClart;
