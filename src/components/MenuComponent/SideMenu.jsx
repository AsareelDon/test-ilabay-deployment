import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMicrosoft } from "react-icons/fa6";
import { BsChevronRight } from 'react-icons/bs';
import { BiSolidLeaf } from "react-icons/bi";
import { RxDoubleArrowLeft, RxHamburgerMenu } from "react-icons/rx";
import useAuth from '../../hooks/useAuth';
import { ROLES, utils } from '../../context/MenuContext';


const SideMenu = () => {
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
    

    return (
        <div className={`${openSidebar ? 'w-60': 'w-14'} duration-300 hidden lg:flex md:flex items-start relative h-full bg-cgreen shadow`}>
            <ul className={`${!openSidebar && 'items-center'} flex flex-col justify-center w-full`}>
                <li className='flex items-center gap-3 px-3 pt-2 w-full mb-4 text-md text-white'
                >
                    <span onClick={() => setOpenSidebar(!openSidebar)} className='cursor-pointer absolute -right-10 top-2.5 text-gray-700 text-2xl'>
                        { !openSidebar ? <RxHamburgerMenu title={!openSidebar && 'Sidebar open'} /> : 
                        <RxDoubleArrowLeft /> }
                    </span>
                    <span><BiSolidLeaf className='text-3xl'/></span>
                    <p className={`${!openSidebar && 'hidden'} text-4xl duration-200 font-medium`}>iLabay</p>
                </li>
                <Link className='w-full' to={ auth?.userRole === 'Administrator' ? `/${(auth?.userRole).toLowerCase()}/dashboard` : '/dashboard'}>
                    <li className={`${openSidebar && 'bg-dark-green'} flex items-center gap-4 px-4 py-2 w-full mb-3 mt-2 hover:bg-dark-green text-sm text-white`}>
                        <span><FaMicrosoft title='Dashboard' className='text-xl'/></span>
                        <p className={`${!openSidebar && 'hidden'} duration-200 tracking-wide font-medium`}>Dashboard</p>
                    </li>
                </Link>
                <li className={`${!openSidebar && 'hidden'} mb-2 px-3 text-sm text-white`}>manage</li>
                {utils.sidebarMenu.map(menu => {
                    const isBinSubmenu = menu.id === 1 && menu.submenu && binSubmenu;
                    const isUserSubmenu = menu.id === 2 && menu.submenu && userSubmenu;
                    if (!ROLES.hasPrivilege(auth?.userRole) && menu.id === 2) {
                        return null;
                    }
                    return (
                        <>
                            <li key={menu.id} onClick={() => handleMenu(menu.id)}
                                className={`${isBinSubmenu || isUserSubmenu ? 'bg-dark-green' : ''}
                                    flex items-center gap-4 px-3.5 py-2 mb-1 w-full text-sm hover:bg-dark-green text-white cursor-pointer`}
                                >
                                <span><menu.icon title={ menu.Labels } className='text-2xl'/></span>
                                <p className={`${!openSidebar && 'hidden'} duration-200 w-full tracking-wide font-medium`}>{menu.Labels}</p>
                                {menu.submenu && ( <BsChevronRight className={
                                    `${(isBinSubmenu || isUserSubmenu) ? 'rotate-90' : ''}
                                    ${!openSidebar && 'hidden'} duration-200 absolute right-3`}/>
                                )}
                            </li>
                            {openSidebar && menu.submenu && (
                                <div>
                                    {(menu.id === 1 && binSubmenu) || (menu.id === 2 && userSubmenu) ? (
                                        <ul className='mb-1'>
                                            {menu.submenuItems.map(item => (
                                                <Link to={auth?.userRole !== 'Administrator' ? `/${item.path}` : `/${(auth?.userRole).toLowerCase()}/${item.path}`}>
                                                    <li key={item.id} className='flex w-full items-center text-white text-xl cursor-pointer py-2 px-4 gap-4 hover:bg-dark-green'>
                                                        <item.icons/>
                                                        <p className='text-white text-sm tracking-wide'>{item.Labels}</p>
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
            </ul>
        </div>
    );
}

export default SideMenu;