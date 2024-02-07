import toast from '../../templates/toastify';
import user from '../../api/user';
import useAuth from '../../hooks/useAuth';
import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useMutation } from 'react-query';
import CustomInput from './CustomInput';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiEdit  } from "react-icons/bi";

const UpdateUserModal = ({ onClose, userIds }) => {
    const { auth } = useAuth();
    const [newUserData, setNewUser] = useState({});
    const [isRender, setRenderTo] = useState(false);

    const handleClose = () => {
        setNewUser("");
        setRenderTo(false);
        onClose();
    }

    const handleShow = () => {
        setRenderTo(true);
        fetchUserById(userIds);
    }

    const handleChangeName = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUserData, [name]: value });
    }
    const handleChangeOptionId = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUserData, [name]: parseInt(value) });
    }

    const fetchUserById = async (userId) => {
        await user.userProfile(auth?.token.accessToken, userId)
        .then(response => response?.data?.user)
        .then(user => {
            setNewUser(user);
        })
        .catch(error => {
            setLoad(false);
            toast.error(error.response?.data?.message);
        });
    }

    const { mutate, isLoading } = useMutation(user.userUpdate, {
        onSuccess: (data) => {
            toast.success(data.message);
            handleClose();
        },
        onError: (error) => {
            // for debugging purposes only
            console.log(error);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutate({ token: auth?.token.accessToken, userData: newUserData });
    }
    

    return (
        <>
            <button title='Edit' onClick={handleShow} className="p-1 border text-2xl cursor-pointer text-blue-400 rounded-md">
                <BiEdit />
            </button>

            {isRender && (
                <>
                    {/* <div className="flex backdrop-brightness-75 justify-center items-center fixed inset-0 z-50">
                        <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
                            <div className="flex flex-col w-full rounded-lg shadow-lg bg-white">
                                <div className="inline-flex items-start justify-between p-5 border-b border-solid border-gray-300 bg-cgreen rounded-t">
                                    <h3 className="text-3xl text-white font-semibold">Update User</h3>
                                </div>
                                <div className="">
                                    <form onSubmit={handleSubmit} className='p-6 flex flex-col'>
                                        <div className='inline-flex gap-x-4 mb-2 w-full'>
                                            <div className='w-full'>
                                                <label className='block text-lg font-medium text-gray-600 mb-2' htmlFor="firstName">
                                                    First Name
                                                </label>
                                                <input name='firstName' value={newUserData.firstName?? ''} onChange={handleChangeName}
                                                    className='shadow border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:shadow-outline 
                                                    focus:outline-dark-green' id="firstName" type="text" required/>
                                            </div>
                                            <div className='w-3/4'>
                                                <label className='block text-lg font-medium text-gray-600 mb-2' htmlFor="middleInit">
                                                    Middle Initial
                                                </label>
                                                <input name='middleInit' value={newUserData.middleInit?? ''} onChange={handleChangeName}
                                                    className='shadow border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:shadow-outline 
                                                    focus:outline-dark-green' id="middleInit" type="text" required/>
                                            </div>
                                        </div>
                                        <div className='mb-2'>
                                            <label className='block text-lg font-medium text-gray-600 mb-2' htmlFor="lastname">
                                                Last Name
                                            </label>
                                            <input
                                                name='lastName'
                                                value={newUserData.lastName?? ''}
                                                onChange={handleChangeName}
                                                className='shadow border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:shadow-outline 
                                                focus:outline-dark-green' id="lastName" type="text" autoComplete='off' required/>
                                        </div>
                                        <div className="mb-2">
                                            <label className='block text-lg font-medium text-gray-600 mb-2' htmlFor="gender">
                                                Gender
                                            </label>
                                            <select 
                                                name='gender'
                                                value={newUserData.gender}
                                                onChange={handleChangeName}
                                                className="shadow border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:shadow-outline 
                                                focus:outline-dark-green" id='gender' required>
                                                <option className='text-gray-700'>Male</option>
                                                <option className='text-gray-700'>Female</option>
                                            </select>
                                        </div>
                                        <div className="inline-flex items-center justify-end border-t border-solid border-gray-300 rounded-b py-3">
                                            <button
                                                className="text-gray-800 text-md border border-cgreen font-semibold rounded-lg hover:bg-cgreen hover:text-white hover:shadow-md w-40 px-10 py-3 mr-2 mb-1"
                                                type="button"
                                                aria-label='Close'
                                                onClick={handleClose}>
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSubmit}
                                                aria-label='Create user'
                                                className="text-white bg-cgreen font-semibold text-md rounded-lg shadow hover:shadow-md hover:bg-dark-green w-40 px-10 py-3 mb-1"
                                                type="submit">
                                                Create
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="flex backdrop-brightness-75 justify-center items-center fixed inset-0 z-50 overflow-auto">
                        <div className="relative w-full sm:w-3/4 lg:w-2/6 lg:mx-5 mx-4">
                            <div className="flex flex-col rounded-lg shadow-lg bg-white">
                                <div className="px-8 border-b rounded-t-md bg-gray-100">
                                    <span className='flex mb-2 items-center justify-between'>
                                        <h1 className="heading mb-2 pt-3 text-gray-700 text-2xl">Update User</h1>
                                        <RiCloseFill 
                                            onClick={handleClose}
                                            title='Close'
                                            className='cursor-pointer text-3xl text-red-500'
                                        />
                                    </span>
                                    <p className='text-md text-gray-600 mb-2'>
                                        <span className='text-blue-500 tracking-wide mr-1'>Note:</span>You are about to update the user data. 
                                        Before confirming, please double check the inputs you made.
                                    </p>
                                </div>
                                <div className="">
                                    <form onSubmit={handleSubmit} className='p-6 flex flex-col'>
                                        <div className='inline-flex gap-x-4 mb-2 w-full'>
                                            <div className='w-full'> 
                                                <CustomInput
                                                    labelName="Firstname"
                                                    id="firstName"
                                                    name='firstName'
                                                    type="text"
                                                    values={newUserData.firstName?? ''}
                                                    isRequired={true}
                                                    onChange={handleChangeName}
                                                />
                                            </div>
                                            <div className='w-1/2'>
                                                <CustomInput
                                                    labelName="Middle Initials"
                                                    id="middleInit"
                                                    name='middleInit'
                                                    type="text"
                                                    values={newUserData.middleInit?? ''}
                                                    onChange={handleChangeName}
                                                />
                                            </div>
                                        </div>
                                        <div className='inline-flex gap-x-4 mb-2 w-full'>
                                            <div className='w-full'>
                                                <CustomInput
                                                    labelName="Lastname"
                                                    id="lastName"
                                                    name='lastName'
                                                    type="text"
                                                    values={newUserData.lastName?? ''}
                                                    isRequired={true}
                                                    onChange={handleChangeName}
                                                />
                                            </div>
                                        </div>
                                        <div className='inline-flex gap-x-4 mb-2 w-full'>
                                            <div className='w-full'>
                                                <label className='block text-md font-normal text-gray-700 mb-1' htmlFor="gender">
                                                    Gender
                                                </label>
                                                <select 
                                                    id="gender"
                                                    name='gender'
                                                    required
                                                    value={newUserData.gender}
                                                    onChange={handleChangeName}
                                                    className={`tracking-wide font-sans text-md font-normal shadow border border-gray-300 rounded w-full 
                                                    h-11 py-1 px-3 text-gray-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-cgreen ring-offset-2`}
                                                >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Transgender">Transgender</option>
                                                    <option value="Non-binary">Non-binary</option>
                                                    <option value="Prefer not to say">Prefer not to say</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex mt-2 items-center justify-end rounded-b">
                                            <button
                                                disabled={isLoading}
                                                title='Create user'
                                                className={`${isLoading && 'bg-dark-green cursor-not-allowed'} mb-2 border 
                                                border-cgreen bg-cgreen text-white hover:bg-dark-green text-md font-medium
                                                outline-cgreen focus:outline focus:outline-offset-2 rounded-lg shadow 
                                                hover:shadow-md w-full px-10 py-3`}
                                                type="submit">
                                                { isLoading? <div className="inline-flex justify-center items-center gap-3">
                                                    <AiOutlineLoading3Quarters className="animate-spin font-bold"/>
                                                        Saving...
                                                    </div> : 'Save changes'
                                                }
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

export default UpdateUserModal;