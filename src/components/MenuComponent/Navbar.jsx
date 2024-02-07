import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";
import { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { ROLES, utils } from '../../context/MenuContext';

const Navbar = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [binSubmenu, setBinSubmenu] = useState(false);
    const [userSubmenu, setUserSubmenu] = useState(false);
    const { auth } = useAuth();

    const handleMenu = (id) => {
        const isSidebarClosed = !openSidebar;
        const isSubmenuClosed = id === 1 ? !binSubmenu : !userSubmenu;
        const setSubmenu = id === 1 ? setBinSubmenu : setUserSubmenu;
    
        if (isSidebarClosed && isSubmenuClosed) {
            setSubmenu(isSubmenuClosed);
            setOpenSidebar(isSidebarClosed);
        } else {
            setSubmenu(isSubmenuClosed);
        }
    }

    return(
        <nav className='flex justify-between sm:justify-end items-center px-3 border-b border-gray-300 bg-white shadow-md'>
            <span 
                onClick={() => setOpenSidebar(!openSidebar)}
                aria-haspopup="true"
                aria-expanded={openSidebar}
                className='flex sm:hidden cursor-pointer text-gray-700 text-2xl'
            >
                { !openSidebar ? <RxHamburgerMenu title={!openSidebar && 'Sidebar open'} /> : 
                <RxCross2 /> }
            </span>
            {openSidebar && (
                <div className="flex sm:hidden absolute right-0 top-10 mt-1 w-full rounded-b-md shadow-lg bg-white" style={{ zIndex: 2000 }}>
                    <div className="py-1 w-full" role="menu" aria-labelledby="menu">
                    <Link className='w-full' to={ auth?.userRole === 'Administrator' ? `/${(auth?.userRole).toLowerCase()}/dashboard` : '/dashboard'}>
                        <li className={`flex items-center gap-4 cursor-pointer bg-cgreen w-full px-4 py-2 text-white`}>
                            <p className={`${!openSidebar && 'hidden'} duration-200 tracking-wide font-medium`}>Home</p>
                        </li>
                    </Link>
                        {utils.sidebarMenu?.map((menu, index) => {
                            return (
                                <>
                                    <li key={index} onClick={() => handleMenu(menu.id)}
                                        className={`
                                            flex items-center gap-4 cursor-pointer hover:bg-gray-100 w-full px-4 py-2
                                            text-gray-700`}
                                        >
                                        <p className={`${!openSidebar && 'hidden'} duration-200 w-full tracking-wide font-medium`}>{menu.Labels}</p>
                                    </li>
                                    {openSidebar && menu.submenu && (
                                        <div>
                                            {(menu.id === 1 && binSubmenu) || (menu.id === 2 && userSubmenu) ? (
                                                <ul className='mb-1'>
                                                    {menu.submenuItems.map(item => (
                                                        <Link to={auth?.userRole !== 'Administrator' ? `/${item.path}` : `/${(auth?.userRole).toLowerCase()}/${item.path}`}>
                                                            <li key={item.id} className='flex w-full items-center text-gray-600 text-sm cursor-pointer py-2 pl-8 gap-4 hover:bg-gray-100'>
                                                                <p className='font-medium duration-200 tracking-wide'>{item.Labels}</p>
                                                            </li>
                                                        </Link>
                                                    ))}
                                                </ul>
                                            ) : null}
                                        </div>
                                    )}
                                </>
                            );
                        })}
                    </div>
                </div>
            )}
            <div className='flex items-center mr-5'>
                <ProfileDropdown/>
            </div>
        </nav>
    );
}
export default Navbar;