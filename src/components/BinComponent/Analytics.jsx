import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import SensorReadingChart from './SensorChart';
import BinContainer from './BinContainer';
import MonthlyWasteVolumeChart from './MonthlyWasteVolumeChart';

const Analytics = () => {
    const { auth } = useAuth();
    const [sensors, setSensors] = useState([]);

    const storeSensorReading = (data) => {
      setSensors(prevSensors => {
        if (prevSensors.length >= 5){
          prevSensors.shift();
        }
        return [...prevSensors, ...data];
      });
    };
    

    return (
        <div className='flex flex-col justify-center gap-y-2'>
          <div className='grid grid-cols-1 grid-flow-rows gap-y-2'>
            <h1 className='flex items-end text-gray-700 text-xl tracking-wide'>Waste Analytics</h1>
            <div className='flex items-center justify-center h-96 rounded-md p-3 bg-white shadow'>
              <MonthlyWasteVolumeChart />
            </div>
          </div>
          <h1 className='flex items-end text-gray-700 text-xl tracking-wide'>Bin Status</h1>
          <div className='flex flex-col sm:flex-row sm:gap-y-2 gap-y-2 gap-x-2'>
            <div className='sm:w-2/4 w-full'><BinContainer storeSensorReading={storeSensorReading} /></div>
            <div className='sm:w-2/4 w-full h-[500px] rounded-md p-3 bg-white shadow'>
              <SensorReadingChart chartData={sensors} />
            </div>
          </div>
        </div>
    );

}

export default Analytics;