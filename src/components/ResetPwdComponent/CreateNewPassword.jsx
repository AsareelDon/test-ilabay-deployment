import { useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMailUnreadOutline } from "react-icons/io5";
import user from "../../api/user";
import { useMutation } from 'react-query';

const CreateNewPassword = ({ nextPage, handleOnDataChange, values }) => {
    const passwordInputRef = useRef(false);
    const confirmPasswordInputRef = useRef(false);
    const [confirmPwd, setConfirmPwd] = useState('');
    const [error_message, setMessage] = useState('');

    const { mutate, isLoading, isError } = useMutation(user.passwordReset, {
        onSuccess: () => {      
            sessionStorage.removeItem('uuid');
            sessionStorage.removeItem('resetPid');
            // navigate to the next page
            nextPage();
        },
        onError: (error) => {
            setMessage(error.response.data.errorMessage);
            passwordInputRef.current.focus();
            confirmPasswordInputRef.current.focus();

        },
    });
      
    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.newPassword === confirmPwd) {
            mutate(values.newPassword);
        } else {
            setMessage('Your password and confirmation password do not match.');
            confirmPasswordInputRef.current.focus();
            setConfirmPwd('');
        }
    };

    return (
        <>
            <div className='shadow-xl border rounded-md w-96 mx-10 sm:mx-10 bg-white'>
                <div className="border-b bg-gray-100 px-8">
                    <h1 className="heading mb-2 pt-3 text-gray-700 text-2xl">Reset your password</h1>
                    <ol className='text-sm text-gray-600 mb-2'>
                        <li>8 - 20 characters only</li>
                        <li>At least one uppercase letter (A to Z)</li>
                        <li>At least one lowercase letter (a to z)</li>
                        <li>At least one number (0 to 9)</li>
                        <li>At least one special character ( $!?@$%# )</li>
                    </ol>
                </div>
                <div className="flex flex-col w-full gap-4 py-5">
                    { error_message && 
                        <p className='rounded py-4 mx-8 px-3 border-l-2 border-red-400 bg-red-200 text-red-400 font-medium text-sm'>
                            {error_message}
                        </p>
                    }
                    <div className='flex flex-col justify-start mx-8'>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col mb-2 gap-2'>
                                <label className='text-lg text-gray-700' htmlFor="newPassword">
                                    New-Password
                                </label>
                                <input 
                                    id="newPassword" 
                                    name="newPassword"
                                    ref={passwordInputRef}
                                    type="password" 
                                    autoComplete='off' 
                                    required
                                    onChange={handleOnDataChange('newPassword')}
                                    className={`${isError && 'ring-red-400'} shadow border border-gray-300 rounded w-full h-12 py-1 px-3 
                                    text-gray-900 focus:shadow-outline focus:outline-none focus:ring-2 ring-cgreen ring-offset-2`} 
                                />
                            </div>
                            <div className='flex flex-col mb-2 gap-2'>
                                <label className='text-lg text-gray-700' htmlFor="confirmPassword">
                                    Confirm-Password
                                </label>
                                <input 
                                    id="confirmPassword" 
                                    name="confirmPassword"
                                    ref={confirmPasswordInputRef}
                                    type="password" 
                                    autoComplete='off' 
                                    required
                                    onChange={(e) => setConfirmPwd(e.target.value)}
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
                                </div> : 'Change Password'
                            }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>  
    );
}

export default CreateNewPassword;