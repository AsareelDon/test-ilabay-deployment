import useAuth from '../../hooks/useAuth';
import { fetchBinWasteVolumeReadings } from '../../api/bin';
import { Bar } from 'react-chartjs-2';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useQuery } from 'react-query';
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
} from 'chart.js';
  
ChartJS.register(
    CategoryScale,
    BarController,
    BarElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MonthlyWasteVolumeChart = () => {
    const { auth } = useAuth();

    const { data: readings, isLoading } = useQuery('accumulatedWasteData', () => fetchBinWasteVolumeReadings(auth?.token.accessToken), {
        refetchInterval: 2000,
    });

    if (isLoading) {
        return <div className='flex flex-col gap-y-2 items-center justify-center text-gray-500'>
            <AiOutlineLoading3Quarters className="animate-spin font-bold text-6xl"/>
            Retrieving data...
        </div>;
    }

    const chartData = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
            {
                label: 'Bin Status',
                fill: true,
                borderColor: '#4a9ccb',
                backgroundColor: '#569956',
                tension: 0.1,
                data: readings?.map(data => data?.totalAccumulatedWaste),
            },
        ],
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
            min: 0,
            ticks: {
              callback: function(value) {
                return value + 'cm³';
              }
            }
          },
        }
    };
    
    return (
        <>
            <Bar 
                data={chartData}
                options={options}
            />
        </>
    );
    
};





export default MonthlyWasteVolumeChart;