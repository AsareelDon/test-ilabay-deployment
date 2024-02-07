import { useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import user from "../../api/user";
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';

const VerifyEmail = ({ nextPage, handleOnDataChange, values }) => {
    const emailInputRef = useRef(false);
    const [error_message, setMessage] = useState('');

    const { mutate, isLoading, isError } = useMutation(user.confirmEmail, {
        onSuccess: (data) => {
            sessionStorage.setItem('resetPid', JSON.stringify(data.pid));
            // navigate to the next page
            nextPage();
        },
        onError: (error) => {
            switch (error.response.data.status) {
                case 503:
                    setMessage('Connection lost. Check your network cables, modem, and routers');
                    break;
                case 404:
                    setMessage(error.response.data.errorMessage);
                    break;
                default:
                    setMessage('503 Service Unavailable');
                    break;
            }
            emailInputRef.current.focus();
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(values.email);
    };

    return (
        <>
            <div className='shadow-xl border rounded-md w-96 mx-10 sm:mx-10 bg-white'>
                <div className="border-b bg-gray-100">
                    <h1 className="heading mx-8 mb-2 pt-3 text-gray-700 text-2xl">Reset your password</h1>
                        <p className='mx-8 text-md text-gray-600 mb-2'>
                            Enter your user account's <span className="text-blue-500">email address</span> and we will send you a password reset code.
                        </p>
                </div>
                <div className="flex flex-col w-full gap-4 py-5">
                    { isError && 
                        <p className='rounded py-4 mx-8 px-3 border-l-2 border-red-400 bg-red-200 text-red-400 font-medium text-sm'>
                            {error_message}
                        </p>
                    }
                    <div className='flex flex-col justify-start mx-8'>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-2'>
                                <input 
                                    id="email" 
                                    name="email"
                                    ref={emailInputRef}
                                    type="email" 
                                    autoComplete='off' 
                                    required
                                    defaultValue={values?.email}
                                    placeholder="Email Address"
                                    onChange={handleOnDataChange('email')}
                                    className={`${isError && 'ring-red-400'} shadow border border-gray-300 rounded w-full h-12 py-1 px-3 
                                    text-gray-900 focus:shadow-outline focus:outline-none focus:ring-2 ring-cgreen ring-offset-2`} 
                                />
                            </div>
                            <button type='submit' disabled={isLoading} 
                                className={`${isLoading && 'bg-[#548349]'} ${!isLoading && 'hover:bg-[#548349]'} mt-4 w-full bg-[#69a35c] text-white font-medium py-2 px-4 
                                rounded focus:outline-none focus:shadow-outline`}
                            >
                            { isLoading? <div className="inline-flex justify-center items-center gap-3">
                                <AiOutlineLoading3Quarters className="animate-spin font-bold"/>
                                    Sending...
                                </div> : 'Send password reset code'
                            }
                            </button>
                            <Link to={'/signin'}
                                className='border border-[#69a35c] botton_text flex justify-center mt-2 w-full bg-white 
                                hover:bg-[#548349] hover:text-white text-gray-600 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            >
                                Return to Login
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>  
    );
}

export default VerifyEmail;