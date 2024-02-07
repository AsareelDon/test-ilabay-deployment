import { Link } from 'react-router-dom';

const SuccessPage = () => {
    return (
        <>
            <div className='shadow-xl border rounded-md w-96 mx-10 sm:mx-10 bg-white'>
                <div className="border-b bg-gray-100 px-8 ">
                    <h1 className="heading mb-2 pt-3 text-gray-700 text-2xl text-center">Password Changed</h1>
                    <p className='text-md text-gray-600 mb-2'>
                        Your password has been successfully changed. 
                        Please log in with your new password. Remember, for your security, it's 
                        important to never share your password with anyone. If you forget your password, 
                        you can always reset it. Thank you for keeping your account secure.
                    </p>
                    <Link to={'/signin'}
                        className='botton_text flex justify-center mt-4 mb-4 w-full bg-[#69a35c] hover:bg-[#548349] 
                        text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Return to Login
                    </Link>
                </div>
            </div>
        </>  
    );
}

export default SuccessPage;