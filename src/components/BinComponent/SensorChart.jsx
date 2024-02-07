import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    BarController,
    BarElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors,
    Filler
} from 'chart.js';
import { useState } from 'react';
  
ChartJS.register(
    CategoryScale,
    BarController,
    BarElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors,
    Filler,
);

const SensorChart = ({ chartData }) => {
  const [showSensor, setShowSensor] = useState(1);

  const configs = {
    1: {
      label: 'Sensor 1',
      data: chartData?.map(data => (29 - data?.s1Distance <= 0)? 0 : (29 - data?.s2Distance)),
      fill: true,
      borderColor: '#569956',
      backgroundColor: 'rgba(173, 209, 173, 0.5)',
      tension: 0.1,
    },
    2: {
      label: 'Sensor 2',
      data: chartData?.map(data => (29 - data?.s2Distance <= 0)? 0 : (29 - data?.s2Distance)),
      fill: true,
      borderColor: '#4a9ccb',
      backgroundColor: 'rgb(196, 222, 238, 0.5)',
      tension: 0.1,
    },
    3: {
      label: 'Sensor 3',
      data: chartData?.map(data => (29 - data?.s3Distance <= 0)? 0 : (29 - data?.s3Distance)),
      fill: true,
      borderColor: '#569956',
      backgroundColor: 'rgba(173, 209, 173, 0.5)',
      tension: 0.1,
    },
    4: {
      label: 'Sensor 4',
      data: chartData?.map(data => (29 - data?.s4Distance <= 0)? 0 : (29 - data?.s4Distance)),
      fill: true,
      borderColor: '#4a9ccb',
      backgroundColor: 'rgb(196, 222, 238, 0.5)',
      tension: 0.1,
    },
  };
  
  const data = {
    labels: chartData?.map(data => {
      const date = new Date(data?.createdAt);
      const optionsDate = { month: '2-digit', day: '2-digit' };
      const optionsTime = { hour: '2-digit', minute: '2-digit' };
      return `${date.toLocaleDateString(undefined, optionsDate)} ${date.toLocaleTimeString(undefined, optionsTime)}`;
    }),
    datasets: [configs[showSensor]],
  };

    
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        max: 31,
        min: 0,
        title: {
          display: true,
          text: 'Waste Level ( in centimeter )',
          color: '#4b5563',
          font: {
            size: 14,
          }
        },
        ticks: {
          callback: function(value) {
            return value + 'cm';
          }
        }
      },
    }
  };

  return (
    <div className='h-full flex flex-col gap-y-2'>
      <div className='flex flex-row items-start'>
        {Object.keys(configs).map(index => (
          <button
            key={index}
            onClick={() => setShowSensor(index)}
            className='border-2 mr-2 h-10 text-gray-700 rounded-md px-2
            focus:outline-none focus:ring-2 focus:ring-cgreen'
          >
            Sensor {index}
          </button>
        ))}
      </div>
      <div className='flex-grow'>
        <Line 
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}


export default SensorChart;