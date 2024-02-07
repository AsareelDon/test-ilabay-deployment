import toast from '../../templates/toastify';
import user from '../../api/user';
import useAuth from '../../hooks/useAuth';
import { useState, useEffect } from "react";
import { BiEdit  } from "react-icons/bi";

const UpdateBinModal = ({ onClose, userIds }) => {
    const { auth } = useAuth();
    const [newData, setNewData] = useState({});
    const userRole = [
        { id: 1, value: 'Admin' },
        { id: 2, value: 'Moderator' },
        { id: 3, value: 'User' },
    ];
    const [isRender, setRenderTo] = useState(false);

    const handleClose = () => {
        setNewData("");
        setRenderTo(false);
        onClose();
    }

    const handleShow = () => {
        console.log(userIds);
        setRenderTo(true);
        fetchUserById(parseInt(userIds));
    }

    const handleChangeName = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    }
    const handleChangeOptionId = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: parseInt(value) });
    }

    const fetchUserById = async (userId) => {
        await user.userProfile(auth?.token.accessToken, userId)
            .then(response => response?.data?.user)
            .then(user => {
                setNewData(user);
            })
            .catch(error => {
                setLoad(false);
                toast.error(error.response?.data?.message);
            });
    }

    const handleSubmit = async (e) => {
        await user.userUpdate(auth?.token.accessToken, newData)
            .then(response => response?.data?.message)
            .then(message => {
                toast.success(message);
                handleClose();
            })
            .catch(error => {
                toast.error(error.response?.data?.message);
            });
    }
    

    return (
        <>
            <button title='Edit' onClick={handleShow} className="p-1 border text-2xl cursor-pointer text-blue-400 rounded-md">
                <BiEdit />
            </button>
            
            { isRender && (
                <>
                    <div className="flex backdrop-brightness-75 justify-center items-center fixed inset-0 z-50">
                        <div className="relative w-full md:w-2/4 lg:w-2/6 lg:mx-5 mx-4">
                            <div className="flex flex-col rounded-lg shadow-lg bg-white">
                                <div className="border-b rounded-t-md bg-gray-100">
                                    <h1 className="heading mx-8 mb-2 pt-3 text-gray-700 text-2xl">Update Bin details</h1>
                                    <p className='mx-8 text-md text-gray-600 mb-2'>
                                        <span className='text-blue-500 tracking-wide mr-1'>Note:</span>You are going to make changes to the current data. 
                                        Before confirming, please check the changes you made.
                                    </p>
                                </div>
                                <div className="">
                                    <form onSubmit={handleSubmit} className='p-6 flex flex-col'>
                                        <div className='inline-flex gap-x-4 mb-2 w-full'>
                                            <div className='w-full'>
                                                <label className='block text-lg font-medium text-gray-600 mb-2' htmlFor="firstname">
                                                    Device name
                                                </label>
                                                <input name='lastname'
                                                    value={newData.lastname?? ''}
                                                    onChange={handleChangeName}
                                                    className={`shadow border border-gray-300 rounded w-full h-12 py-1 px-3 text-gray-900 focus:shadow-outline 
                                                    focus:outline-none focus:ring-2 ring-cgreen ring-offset-2`} 
                                                    id="firstname" type="text" autoComplete='off' required
                                                />
                                            </div>
                                        </div>
                                        <div className='inline-flex gap-x-4 mb-2 w-full'>
                                            <div className='w-full'>
                                                <label className='block text-lg font-medium text-gray-600 mb-2' htmlFor="address">
                                                    Address
                                                </label>
                                                <input name='lastname'
                                                    value={newData.lastname?? ''}
                                                    onChange={handleChangeName}
                                                    className={`shadow border border-gray-300 rounded w-full h-12 py-1 px-3 text-gray-900 focus:shadow-outline 
                                                    focus:outline-none focus:ring-2 ring-cgreen ring-offset-2`} 
                                                    id="address" type="address" autoComplete='off' required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex mt-2 items-center justify-end rounded-b">
                                            <button
                                                className="text-gray-500 text-md border border-cgreen font-medium rounded-lg 
                                                hover:bg-cgreen hover:text-white hover:shadow-md w-2/3 px-10 py-3 mr-2"
                                                type="button"
                                                aria-label='Close'
                                                onClick={() => handleClose(false)}>
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSubmit}
                                                aria-label='Create user'
                                                className="text-white bg-cgreen font-medium text-md rounded-lg shadow 
                                                hover:shadow-md hover:bg-dark-green w-full px-10 py-3"
                                                type="submit">
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default UpdateBinModal;