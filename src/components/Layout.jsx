import { Outlet } from 'react-router-dom';
import Navbar from './MenuComponent/Navbar';
import SideMenu from './MenuComponent/SideMenu';

const Layout = () => {
  return (
    <div className='flex h-screen'>
      <SideMenu/>
      <div className='flex flex-col w-screen'>
        <Navbar />
        <main className='h-screen px-4 py-4 overflow-y-auto bg-gray-200'>
          <Outlet />
        </main>
        <footer>
          <h1 className='text-sm bg-white py-2 border-t text-center text-gray-700'>
            Copyright © 2023 | WasteMonitoring
          </h1>
        </footer>
      </div>
    </div>
  )
};

export default Layout;
