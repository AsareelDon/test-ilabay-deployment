import { useMutation } from 'react-query';
import { useState } from "react";
import auth from '../../api/auth';
import useAuth from '../../hooks/useAuth';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import appLogo from '../../assets/waste_control.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
    const navigateTo = useNavigate();

    const [metaData, setMetaData ] = useState({
        userEmail : '',
        password : '',
    })
    const { setAuth } = useAuth();

    const { mutate, isLoading, isError, error } = useMutation(auth.userAuth, {
        onSuccess: (data) => {
            // stored in session
            setAuth(data.user);
            // navigate to dashboard base on their role
            (data.user.userRole !== 'Administrator') 
                ? navigateTo('/dashboard') 
                : navigateTo(`/${(data.user.userRole).toLowerCase()}/dashboard`);
        },
        onError: (error) => {
            // for debugging purposes only
            console.log(error);
        },
    });

    const handleDataChange = (e) => {
        setMetaData({
            ...metaData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(metaData);
    };

    return (
        <div className='flex flex-col gap-2 justify-center items-center h-screen bg-gray-200'>
            <div className="flex flex-col gap-y-2 mb-4 justify-center items-center">
                <img src={appLogo} height={60} width={60} alt="Logo" />
                <p className="flex flex-col justify-center items-center text-4xl tracking-wide font-semibold text-dark-green">
                    iLabay
                    <span className='text-2xl tracking-wide text-gray-500'>Waste Monitoring App</span>
                </p>
            </div>
            <div className='py-5 shadow-xl border rounded-md w-96 mx-10 sm:mx-10 bg-white'>
                <p className="text-start mx-8 mb-5 text-gray-700 text-xl">Login to your account</p>
                <div className="flex flex-col w-full gap-4">
                    { isError && 
                        <p className='rounded py-3 mx-8 px-3 border-l-2 border-red-400 bg-red-200 text-red-400 text-md'>
                            {error?.response?.data?.errorMessage}
                        </p>
                    }
                    <div className='flex flex-col justify-start mx-8'>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <input 
                                    id="email" 
                                    name="userEmail" 
                                    type="email"
                                    placeholder="Email Address"
                                    autoComplete='off'
                                    required
                                    onChange={handleDataChange}
                                    className='shadow border border-gray-300 rounded w-full h-12 py-1 px-3 text-gray-700 focus:shadow-outline 
                                    focus:outline-none focus:ring-2 ring-cgreen ring-offset-2'
                                />
                            </div>
                            <div className='mb-4'>
                                <input 
                                    id="password" 
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    required
                                    onChange={handleDataChange}
                                    className='shadow border border-gray-300 rounded w-full h-12 py-1 px-3 text-gray-700 focus:shadow-outline 
                                    focus:outline-none focus:ring-2 ring-cgreen ring-offset-2'
                                />
                            </div>
                            <button type='submit' disabled={isLoading} 
                                className={`${isLoading && 'bg-[#548349]'} h-12 w-full bg-[#69a35c] hover:bg-[#548349] tracking-wider 
                                    text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
                                    focus:shadow-outline focus:ring-2 ring-cgreen ring-offset-2`}
                                >
                                { isLoading? <div className="inline-flex justify-center items-center gap-3">
                                    <AiOutlineLoading3Quarters className="animate-spin font-bold"/>
                                    Loading...
                                </div> : 'Login Now'}
                            </button>
                            <Link 
                                to={'/password_reset'}
                                className='cursor-pointer block my-4 font-medium text-sm text-dark-green hover:underline'
                            >
                                Forgot Password?
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;