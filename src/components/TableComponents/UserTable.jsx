import { useState, useEffect } from "react";
import user from "../../api/user";
import userAuth from "../../hooks/useAuth";
import toast from '../../templates/toastify'
import CreateUserModal from "../modals/Create";
import { BiTrash } from "react-icons/bi";
import UpdateUserModal from "../modals/Update";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PaginationButton from '../BinComponent/PaginationButton';
import usePagination from '../../hooks/usePagination';
import { useQuery } from 'react-query';
import { ROLES } from "../../context/MenuContext";

const getUsers = async (token) => {
    const response = await user.fetchUsers(token);
    if (!response) {
        throw new Error(response?.data?.message);
    }
    return response?.data?.users;
};

const UserTable = () => {
    const { auth } = userAuth();
    const [page, setPage] = useState(1);
    const [userMetadata, setMetada] = useState({
        firstname: '',
        middleInit: '',
        lastname: '',
        gender: 'Male',
        roleId: 2,
        email: '',
        password: ''
    });

    const { data: users, error, isLoading, refetch } = useQuery('userLists', () => getUsers(auth?.token.accessToken));
    const { numOfRowPerPage, numOfPages } = usePagination(users, page, 6);

    if (isLoading) {
        return <div className='flex flex-col gap-y-2 mt-2 items-center justify-center text-gray-500'>
            <AiOutlineLoading3Quarters className="animate-spin font-bold text-6xl"/>
            Retrieving data...
        </div>;
    }
      
    if (error) {
        return <div className='flex flex-col gap-y-2 mt-2 items-center justify-center text-gray-500'>
            {error.message}
        </div>;
    }
      
    const handleOnChange = (inputName) => (e) => {
        const { value } = e.target;
        // updates previous metadata state using the key:value pair
        setMetada({
            ...userMetadata,
            [inputName] : value
        })
    }

    const handleDelete = async (userId) => {
        await user.userDelete(auth?.token.accessToken, userId)
        .then(response => response?.data?.message)
        .then(message => {
            refetch();
            toast.success(message);
        })
        .catch(error => {
            toast.error(error.response?.data?.errorMessage);
        });
    }

    const handleReactivate = async (userId) => {
        await user.userReactivate(auth?.token.accessToken, userId)
        .then(response => response?.data?.message)
        .then(message => {
            refetch();
            toast.success(message);
        })
        .catch(error => {
            toast.error(error.response?.data?.errorMessage);
        });
    }

    return (
        <div className="flex flex-col">
            <h1 className='flex items-end mb-2 text-gray-700 text-xl tracking-wide'>User Table</h1>
            <CreateUserModal 
                userMetada={userMetadata} 
                setMetadata={setMetada} 
                handleOnChange={handleOnChange} 
                refreshData={refetch}
            />
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border shadow bg-white rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase">Gender</th>
                                    <th className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase">Role</th>
                                    <th className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-end text-sm font-medium text-gray-500 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {numOfRowPerPage?.map(data => {
                                    if (ROLES.adminPrivilege(data.Role.name) && ROLES.hasSectionPrivilege(auth?.userRole)) {
                                        return null;
                                    }
                                    return (
                                        <>
                                            <tr key={data.id} className="hover:bg-gray-100">
                                                <td className="px-6 py-2">
                                                    <span className="flex flex-col whitespace-nowrap">
                                                        <h1 className="font-medium text-md text-gray-700">{`${data.firstName} ${data.lastName}`}</h1>
                                                        <p className="text-sm text-gray-700">{data.email}</p>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-2 whitespace-nowrap text-md text-gray-700">{data.gender}</td>
                                                <td className="px-6 py-2 whitespace-nowrap text-md text-gray-700">{data.Role.name}</td>
                                                <td className="px-4">
                                                    <p className={`${data.accountStatus === 'deactivated' && 'bg-gray-400'} 
                                                        flex items-center justify-center lowercase rounded-full w-32 font-medium text-white bg-cgreen`
                                                    }>
                                                        {data.accountStatus}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-2 flex justify-end">
                                                    { ROLES.hasNoPrivilege(auth?.userRole) && ROLES.secHeadPrivilege(data.Role.name) ? (
                                                        <p className="text-sm text-gray-700">Action unavailable</p>
                                                    ) : (
                                                        <>
                                                            <UpdateUserModal onClose={refetch} userIds={data.id}/>
                                                            <button title="Deactivate" onClick={() => handleDelete(data.id)} className="ml-2 p-1 border text-2xl cursor-pointer text-red-400 rounded-md">
                                                                <BiTrash />
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                        <PaginationButton numOfData={users.length} numOfPages={numOfPages} numOfRowPerPage={numOfRowPerPage} setPage={setPage} page={page}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserTable;