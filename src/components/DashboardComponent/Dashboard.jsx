import useAuth from '../../hooks/useAuth';
import user from '../../api/user';
import { fetchBinLists } from '../../api/bin';
import toast from '../../templates/toastify';
import BinContainer from '../BinComponent/BinContainer';
import { ROLES } from '../../context/MenuContext';
import { useQuery } from 'react-query';
import BinLocation from '../BinComponent/BinLocation';

const fetchUsers = async (token) => {
    const response = await user.fetchUsers(token);
    if (!response) {
        throw new Error(response?.data?.message);
    }
    return response?.data?.users.length;
};

const Dashboard = () => {
    const { auth } = useAuth();
    const { data: userCount, isError: userError } = useQuery('users', () => fetchUsers(auth?.token.accessToken), {
        enabled: ROLES.hasPrivilege(auth?.userRole),
    });
    const { data: bins, isError: binError, refetch } = useQuery('binData', () => fetchBinLists(auth?.token.accessToken));

    if (userError || binError) {
        toast.error(userError ? userError.message : binError.message);
    }
    console.log(bins);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-3">
            <div className="row-span-2 grid grid-cols-1 grid-flow-rows gap-y-3">
                <div className="grid grid-cols-1 grid-flow-rows gap-y-2">
                    { ROLES.hasPrivilege(auth?.userRole) && (
                        <>
                            <h1 className='flex items-end text-gray-700 tracking-wide'>Activity Summary</h1>
                            <div className='grid grid-cols-1 sm:grid-cols-2 grid-flow-rows gap-y-2 gap-x-3'>
                                <div className='w-full h-16 flex items-center justify-between rounded-md px-4 bg-white shadow'>
                                    <h1 className='tracking-wide font-bold text-3xl text-amber-500'>Users</h1>
                                    <span className='pr-10 text-gray-700 text-2xl'>{userCount?? 0}</span>
                                </div>
                                <div className='w-full h-16 flex items-center justify-between rounded-md px-4 bg-white shadow'>
                                    <h1 className='tracking-wide font-bold text-3xl text-amber-500'>Bins</h1>
                                    <span className='pr-10 text-gray-700 text-2xl'>{bins?.length?? 0}</span>
                                </div>
                            </div>
                        </>
                        )
                    }
                </div>

                <div className='grid grid-cols-1 grid-flow-rows gap-y-2'>
                    <div className='h-[600px]'>
                        <BinLocation />
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 mt-0 sm:mt-3 grid-flow-rows gap-y-2'>
                <h1 className='text-gray-700 tracking-wide'>Bin Status Level</h1>
                <BinContainer />
            </div>
        </div>
    );
}
export default Dashboard;