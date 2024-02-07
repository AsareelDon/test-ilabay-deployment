import { useState, useRef, useEffect } from 'react';
import { LuWrench, LuLogOut, LuLightbulb } from "react-icons/lu";
import avatar from '../../assets/avatar-pixel.jpg';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
    const [dropedMenu, setIsDropMenu] = useState(false);
    const { auth } = useAuth();
    const dropdownRef = useRef(null);
    const navigateTo = useNavigate();

    const toggleDropdown = () => {
        setIsDropMenu(!dropedMenu);
    };

    const handleUserLogout = () => {
        sessionStorage.clear();
        console.log('logout');
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropMenu(false);
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative block">
            <button className='flex cursor-pointer rounded-full border ml-4 h-11 w-42'
                onClick={toggleDropdown}
                type="button"
                aria-haspopup="true"
                aria-expanded={dropedMenu}>
                <img className='rounded-full h-10 w-10' src={avatar} alt="default avatar"/>
            </button>

            {dropedMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" style={{ zIndex: 2000 }}>
                    <div className="py-1" role="menu" aria-labelledby="menu">
                        <a className="cursor-default block px-4 py-2" href="#">
                            <span className='flex flex-col justify-start'>
                                <p className="mb-1 text-gray-500 text-sm font-medium tracking-wider">Signed in as</p>
                                <h1 className="text-gray-700 text-md font-medium tracking-wider">{auth['username']}</h1>
                                <p className="text-gray-600 text-sm font-medium tracking-wider">{auth['email']}</p>
                            </span>
                        </a>
                        <hr />
                        <a onClick={handleUserLogout} 
                            className="flex gap-2 justify-start items-center px-4 py-2 text-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100" 
                            href="/signin">
                            <LuLogOut className='text-lg'/>
                            Logout
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
