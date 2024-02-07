import { useState, useRef } from 'react';
import { RiCloseFill } from "react-icons/ri";
import toast from '../../templates/toastify';
import user from '../../api/user';
import useAuth from '../../hooks/useAuth';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useMutation } from 'react-query';
import CustomInput from './CustomInput';

const CreateUserModal = ({ userMetada, handleOnChange, refreshData }) => {
    const { auth } = useAuth();
    const [isModalRender, setRenderModalTo] = useState(false);
    const passwordInputRef = useRef(false);
    const emailRef = useRef(false);
    const confirmPasswordInputRef = useRef(false);
    const [confirmPwd, setConfirmPwd] = useState('');
    const [error_message, setMessage] = useState('');
    const [error_emailMessage, setEmailMessage] = useState('');

    const handleClose = () => {
        setRenderModalTo(false);
        setMessage('');
        setMessage('')
        refreshData();
    };
    const handleShow = () => setRenderModalTo(true);

    const { mutate, isLoading } = useMutation(user.createUser, {
        onSuccess: (data) => {
            toast.success(data.message);
            handleClose();
        },
        onError: (error) => {
            // for debugging purposes only
            if (error?.response?.status === 409) {
                setEmailMessage(error?.response?.data?.message);
                emailRef.current.focus();
            } else {
                setMessage(error?.response?.data?.errorMessage);
                confirmPasswordInputRef.current.focus();
            }
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userMetada.password === confirmPwd) {
            mutate({ token: auth?.token.accessToken, userData: userMetada });
        } else {
            setMessage('Your password and confirmation password do not match.');
            confirmPasswordInputRef.current.focus();
            setConfirmPwd('');
        }
    }
   

    return (
        <>
            <button 
                onClick={handleShow} 
                className="rounded-md px-3 py-1 w-40 mb-2 border border-cgreen 
                bg-cgreen text-white hover:bg-dark-green text-md font-medium
                outline-cgreen focus:outline focus:outline-offset-2"
            >
                Create New
            </button>

            {isModalRender && (
                <>
                    <div className="flex backdrop-brightness-75 justify-center items-center fixed inset-0 z-50 overflow-auto">
                        <div className="relative w-full sm:w-3/4 lg:w-2/6 lg:mx-5 mx-4">
                            <div className="flex flex-col rounded-lg shadow-lg bg-white">
                                <div className="flex items-center justify-between px-8 border-b rounded-t-md bg-gray-100">
                                    <h1 className="heading mb-2 pt-3 text-gray-700 text-2xl">Create new User</h1>
                                    <RiCloseFill 
                                    onClick={handleClose}
                                        title='Close'
                                        className='cursor-pointer text-3xl text-red-500'
                                    />
                                </div>
                                <div className="">
                                    <form onSubmit={handleSubmit} className='p-6 flex flex-col'>
                                        <div className='inline-flex gap-x-4 mb-2 w-full'>
                                            <div className='w-full'> 
                                                <CustomInput
                                                    labelName="Firstname"
                                                    id="firstname"
                                                    name='firstname'
                                                    type="text"
                                                    isRequired={true}
                                                    onChange={handleOnChange('firstname')}
                                                />
                                            </div>
                                            <div className='w-1/2'>
                                                <CustomInput
                                                    labelName="Middle Initials"
                                                    id="middleInit"
                                                    name='middleInit'
                                                    type="text"
                                                    onChange={handleOnChange('middleInit')}
                                                />
                                            </div>
                                        </div>
                                        <div className='inline-flex gap-x-4 mb-2 w-full'>
                                            <div className='w-full'>
                                                <CustomInput
                                                    labelName="Lastname"
                                                    id="lastname"
                                                    name='lastname'
                                                    type="text"
                                                    isRequired={true}
                                                    onChange={handleOnChange('lastname')}
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
                                                    onChange={handleOnChange('gender')}
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
                                            <div className='w-full'>
                                                <label className='block text-md font-normal text-gray-700 mb-1' htmlFor="role">
                                                    Role
                                                </label>
                                                <select 
                                                    id="role"
                                                    name='role'
                                                    required
                                                    onChange={handleOnChange('roleId')}
                                                    className={`tracking-wide font-sans text-md font-normal shadow border border-gray-300 rounded w-full 
                                                    h-11 py-1 px-3 text-gray-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-cgreen ring-offset-2`}
                                                >
                                                    <option value="2">Section Head</option>
                                                    <option value="3">Section Head Assistant</option>
                                                    <option value="4">Section Staff</option>
                                                    <option value="5">Garbage Collector</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='inline-flex gap-x-4 mb-2 w-full'>
                                            <div className='w-full'>
                                                <CustomInput
                                                    labelName="Email"
                                                    id="email"
                                                    name='email'
                                                    type="email"
                                                    isRequired={true}
                                                    ref={emailRef}
                                                    error={error_emailMessage}
                                                    onChange={handleOnChange('email')}
                                                />
                                            </div>
                                        </div>
                                        { error_emailMessage &&
                                            <p className='text-red-400 font-medium text-sm mb-2'>
                                                {error_emailMessage}
                                            </p>
                                        }
                                        <div className='inline-flex gap-x-4 mb-2 w-full'>
                                            <div className='w-full'>
                                                <CustomInput
                                                    labelName="Password"
                                                    id="password"
                                                    name='password'
                                                    type="password"
                                                    isRequired={true}
                                                    onChange={handleOnChange('password')}
                                                    ref={passwordInputRef}
                                                    error={error_message}
                                                />
                                            </div>
                                            <div className='w-full'>
                                                <CustomInput
                                                    labelName="Confirm Password"
                                                    id="confirmPass"
                                                    name='confirmPass'
                                                    type="password"
                                                    isRequired={true}
                                                    onChange={(e) => setConfirmPwd(e.target.value)}
                                                    ref={confirmPasswordInputRef}
                                                    error={error_message}
                                                />
                                            </div>
                                        </div>
                                        { error_message ? ( 
                                                <p className='text-red-400 font-medium text-sm mb-2'>
                                                    {error_message}
                                                </p>
                                            ) : (
                                                <ol className='text-sm text-gray-600 mb-2'>
                                                    <li>8 - 20 characters only</li>
                                                    <li>At least one uppercase letter (A to Z)</li>
                                                    <li>At least one lowercase letter (a to z)</li>
                                                    <li>At least one number (0 to 9)</li>
                                                    <li>At least one special character ( $!?@$%# )</li>
                                                </ol>
                                            )
                                        }
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
                                                    </div> : 'Create User'
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

export default CreateUserModal;