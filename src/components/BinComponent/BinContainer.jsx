import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import useAuth from '../../hooks/useAuth';
import { fetchBinReadings, fetchBinLists } from '../../api/bin';
import useCardPagination from '../../hooks/useCardPagnation';
import CardPagination from './CardPagination';

function BinContainer({ storeSensorReading }) {
    const { auth } = useAuth();
    const [fillPercentage, setFillPercentage] = useState(0);
    const [fillLevel, setFillLevel] = useState(0);
    const [wasteVolume, setWasteVolume] = useState(0);
    const [page, setPage] = useState(1);
    const { data: bins } = useQuery('binData', () => fetchBinLists(auth?.token.accessToken));
    const { numOfRowPerPage, numOfPages } = useCardPagination(bins, page, 1);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const interval = setInterval(async () => {
            await fetchBinReadings(auth?.token.accessToken, numOfRowPerPage[0]?.id)
            .then(response => response?.data?.binReading)
            .then(bin => {
                setFillPercentage(bin?.wasteVolumeByPercentage);
                setFillLevel(bin?.wasteLevel);
                setWasteVolume(bin?.approximateWasteVolume);
                storeSensorReading([bin]);
            })
            .catch(error => {
                console.log(`Sensor No. ${numOfRowPerPage[0]?.id} has no data`);
            });

        }, 2000);

        setAnimate(true);
        return () => {
            clearInterval(interval);
        };
    }, [page, numOfRowPerPage]);

    return (
        <div>
            <div className='h-[800px] sm:h-[450px] flex flex-col sm:flex-row items-center gap-y-16 sm:gap-x-5 px-4 sm:px-3 py-4 sm:py-2 rounded-md bg-white shadow overflow-hidden'>
                { bins && numOfRowPerPage ?
                    numOfRowPerPage?.map((data, index) => (
                        <>
                            <div key={index} className={`transition-all ${animate ? 'animate-slideIn' : ''} mt-12 sm:mt-2 duration-500 drop-shadow-xl shadow-black`}
                                onAnimationEnd={() => setAnimate(false)}
                            >
                                <div className="rounded-t-lg">
                                    <div className="relative w-full h-6">
                                        <div className="absolute left-0 -top-1 bg-gray-500 w-24 h-6 rounded-lg"></div>
                                        <div className={`relative left-[80px] ${fillPercentage === 100 ? '-top-1' : '-top-[29px] transform -rotate-12'} 
                                            duration-500 bg-gray-500 w-56 h-6 rounded-lg`}>
                                        <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 border-4 border-white w-6 h-6 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="relative bg-gray-300 rounded-t-lg w-72 h-72">
                                        <div
                                            style={{ height: `${fillPercentage}%` }}
                                            className={`${fillPercentage === 100 && 'rounded-t-lg'} absolute bottom-0 bg-cgreen w-full transition-all duration-500 ease-in-out`}
                                        />
                                        <div className="flex items-center justify-center absolute inset-0 m-8 border-4 border-gray-50 rounded-lg">
                                            <span className='text-white font-medium text-5xl'>{fillPercentage}%</span>
                                        </div>
                                        <div className="absolute left-0 -bottom-10 rounded-b-lg bg-gray-500 w-8 h-10"></div>
                                        <div className="absolute right-0 -bottom-10 rounded-b-lg bg-gray-500 w-8 h-10"></div>
                                    </div>
                                </div>
                            </div> 
                            <div className='flex flex-col items-start h-full borde w-full whitespace-normal'>
                                <CardPagination 
                                    numOfPages={numOfPages} 
                                    setPage={setPage} 
                                    page={page} 
                                    numOfRowPerPage={numOfRowPerPage} 
                                />
                                <ul>
                                    <li className='text-lg text-gray-500'>
                                        Approximate waste volume
                                    </li>
                                    <li className='flex flex-col items-start gap-x-2 text-5xl text-gray-500'>
                                        {wasteVolume}
                                        <p className='text-2xl'>of {68150} cm³</p>
                                    </li>
                                    <li className='flex flex-col items-start gap-x-2 mt-2 text-5xl text-gray-500'>
                                        {fillLevel}
                                        <p className='text-xl'>cm waste height</p>
                                    </li>
                                    <li className='flex flex-col items-start gap-x-2 mt-4 mb-4 text-xl text-gray-500'>
                                        <p className='text-xl'>Bin Name: {data?.binName}</p>
                                        <p className='text-xl'>Address: {data?.address}</p>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ))
                    
                    : <div className='h-[455px] flex items-center justify-center mx-auto text-gray-600'>
                        There`s no registered bin.
                    </div>
                }
            </div>
        </div>
    );
}

export default BinContainer;
