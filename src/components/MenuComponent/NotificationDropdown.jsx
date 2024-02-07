import { useEffect, useState, useRef } from 'react';
import { FaBell } from "react-icons/fa6";
import notif from '../../context/NotificationContext';
import useAuth from '../../hooks/useAuth';

const NotificatioDropdown = () => {
    const [dropedMenu, setIsDropMenu] = useState(false);
    const { auth } = useAuth();
    const dropdownRef = useRef(null);

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

    const toggleDropdown = () => {
        setIsDropMenu(!dropedMenu);
    };

    return (
        <div ref={dropdownRef} className="relative inline-block">
            <button className='flex cursor-pointer justify-between items-center pl-3 pr-2 h-10 w-42'
                onClick={toggleDropdown}
                type="button"
                aria-haspopup="true"
                aria-expanded={dropedMenu}>
                <FaBell className="text-gray-500 text-xl"/>
            </button>

            {dropedMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" style={{ zIndex: 2000 }}>
                    <div role="menu" aria-labelledby="menu">
                        {notif.icons.map(icons => {
                            return (
                                <a key={icons.id} className="block px-4 py-5 text-md text-gray-800 border-b hover:bg-gray-100 hover:rounded-t-md focus:outline-none" href="#">
                                    <span className='inline-flex gap-2 justify-center items-center'>
                                        <icons.icon className={`${icons.iconColor} text-[2.5rem] text-white rounded-full p-2`} />
                                        <span className='flex flex-col justify-start items-start'>
                                            <p className='text-gray-400 font-medium text-sm'>December 7, 2023</p>
                                            <h1 className='text-gray-700 font-medium text-md'>{icons.Labels}</h1>
                                        </span>
                                    </span>
                                </a>
                            );
                        })}
                        <hr />
                        <a className="flex justify-center px-4 py-2 text-md text-gray-400 hover:bg-gray-100 focus:outline-none focus:bg-gray-100" href="#">
                            Show more
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificatioDropdown;
