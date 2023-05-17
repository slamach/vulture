import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartOptions,
  ChartData,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { IData } from '@vulture/core';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  TimeScale
);

export interface MetricGraphProps {
  className?: string;
  data?: IData[];
}

export const MetricGraph = (props: MetricGraphProps) => {
  const { className, data } = props;
  // TODO: Support no payload data items
  const filteredData = data?.filter((item) => item.payload);

  if (!filteredData?.length) {
    return (
      <div className={className}>
        <p>No data</p>
      </div>
    );
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
      },
    },
  };

  const chartData: ChartData<'line'> = {
    datasets: filteredData.reduce(
      (prev, dataItem) => {
        for (const property in dataItem.payload) {
          prev
            .find((item) => item.label === property)
            ?.data.push({
              x: dataItem.timestamp,
              y: dataItem.payload[property],
            });
        }
        return prev;
      },
      Object.keys(filteredData[0].payload!).map((property) => ({
        label: property,
        data: [] as any[],
      }))
    ),
  };

  return (
    <div className={className}>
      <Line options={options} data={chartData} />
    </div>
  );
};
