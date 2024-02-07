import appLogo from '../../assets/waste_control.png';
import { useState } from 'react';
import VerifyEmail from './VerifyEmail';
import VerifyOTPCode from './VerifyOTPCode';
import CreateNewPassword from './CreateNewPassword';
import SuccessPage from './SuccessPage';
import { useMutation } from 'react-query';
import user from "../../api/user";

const PasswordReset = () => {
    // define states 
    const [page, setPage] = useState(1);
    const [metaData, setMetaData] = useState({
        email: '',
        passwordOtp: '',
        newPassword: '',
    });
    
    // defining method that handle next/back action
    // by adding +1 to go next page state and subtracting -1 to go back in the previous state
    const nextPage = () => {
        setPage(page + 1);
    };
            
    const previousPage = () => {
        setPage(page - 1);
    };
    
    // handling inputs by taking onchange e.target.value and e.target.name
    const handleOnDataChange = (inputName) => (e) => {
        const { value } = e.target;
        // updates previous metadata state using the key:value pair
        setMetaData({
            ...metaData,
            [inputName] : value
        })
    }
    
    const renderComponent = (key) => {
        switch (key) {
            case 1:
                return <VerifyEmail 
                    nextPage={ nextPage } 
                    handleOnDataChange={ handleOnDataChange } 
                    values={ metaData } 
                />
            case 2:
                return <VerifyOTPCode 
                    nextPage={ nextPage }
                    previousPage={ previousPage }
                    handleOnDataChange={ handleOnDataChange }
                    values={ metaData } 
                />
            case 3:
                return <CreateNewPassword 
                    nextPage={ nextPage }
                    handleOnDataChange={ handleOnDataChange } 
                    values={ metaData } 
                />
            case 4:
                return <SuccessPage />
            default:
                break;
        }
    }
            
    return(
        <div className='flex flex-col justify-center items-center h-screen bg-gray-200'>
            <img src={appLogo} height={60} width={60} className="mb-12" alt="Logo" />
            { renderComponent(page) }    
        </div>
    );
        

}
export default PasswordReset;