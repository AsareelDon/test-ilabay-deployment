import { useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMailUnreadOutline } from "react-icons/io5";
import user from "../../api/user";
import { useMutation } from 'react-query';

const VerifyOTPCode = ({ nextPage, previousPage, handleOnDataChange, values }) => {
    const passwordOtpInputRef = useRef(false);
    const [error_message, setMessage] = useState('');

    const { mutate, isLoading, isError } = useMutation(user.confirmOTPCode, {
        onSuccess: (data) => {
            sessionStorage.setItem('uuid', JSON.stringify(data.userId));
            // navigate to the next page
            nextPage();
        },
        onError: (error) => {
            setMessage(error.response.data.message);
            passwordOtpInputRef.current.focus();
        },
    });

    const censoredEmail = (email) => {
        const [user, domain] = email.split('@');
        return user.slice(0, 2) + '*'.repeat(user.length - 3) + user.slice(-1) + '@' + domain;
    }
      
    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(values.passwordOtp);
    };

    const handleReturn = () => {
        previousPage();
    }

    return (
        <>
            <div className='shadow-xl border rounded-md w-96 mx-10 sm:mx-10 bg-white'>
                <div className="border-b bg-gray-100 px-8">
                    <h1 className="heading mb-2 pt-3 text-gray-700 text-2xl">Reset your password</h1>
                    <p className='text-md text-gray-600 mb-2'> Enter your password reset code that we've just sent in your email.</p>
                    <span className="flex items-center gap-x-2 text-md text-blue-500 mb-2">
                        <IoMailUnreadOutline className="text-2xl"/>
                        {censoredEmail(values.email)}
                    </span> 
                </div>
                <div className="flex flex-col w-full gap-4 py-5">
                    { isError && 
                        <p className='rounded py-4 mx-8 px-3 border-l-2 border-red-400 bg-red-200 text-red-400 font-medium text-sm'>
                            {error_message}
                        </p>
                    }
                    <div className='flex flex-col justify-start mx-8'>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col mb-2 gap-2'>
                                <label className='text-lg text-gray-700' htmlFor="passwordOtp">
                                    Password Reset Code
                                </label>
                                <input 
                                    id="passwordOtp" 
                                    name="passwordOtp"
                                    ref={passwordOtpInputRef}
                                    type="text" 
                                    autoComplete='off' 
                                    required
                                    placeholder="XXXXXX"
                                    onChange={handleOnDataChange('passwordOtp')}
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
                                </div> : 'Verify code'
                            }
                            </button>
                            <button type='submit' onClick={handleReturn}
                                className='border border-[#69a35c] botton_text flex justify-center mt-2 w-full bg-white 
                                hover:bg-[#548349] hover:text-white text-gray-600 font-medium py-2 px-4 rounded 
                                focus:outline-none focus:shadow-outline'
                            >
                                Re-send OTP
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>  
    );
}

export default VerifyOTPCode;