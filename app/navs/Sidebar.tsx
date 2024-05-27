import React from 'react';
import Link from 'next/link';
import { handleLogout } from '../api/auth';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <aside style={{ backgroundColor: '#FFFFFF' }} className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 dark:bg-gray-800 border-r">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <img src="/ttlogo.svg" alt="Tagatalk Logo" className="w-[10rem] h-[5rem] ml-8"/>
        
        <ul className="space-y-4 mt-2">
          <li>
            <Link
              href="/dashboard"
              style={{ color: '#344054' }}
              className="flex items-center p-3 text-gray-700 dark:text-white hover:bg-[#FD9F10] dark:hover:bg-orange-400 group"
            >
              <svg className="w-6 h-6 transition-colors duration-100 ease-in-out group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-poppins font-semibold transition-colors duration-100 ease-in-out group-hover:text-white">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/users"
              style={{ color: '#344054' }}
              className="flex items-center p-3 text-gray-700 dark:text-white hover:bg-[#FD9F10] dark:hover:bg-orange-400 group"
            >
              <svg className="w-6 h-6 transition-colors duration-100 ease-in-out group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              </svg>
              <span className="flex-1 ms-3 font-poppins font-semibold transition-colors duration-100 ease-in-out group-hover:text-white whitespace-nowrap">Users</span>
            </Link>
          </li>
          <li>
            <Link
              href="/feedback"
              style={{ color: '#344054' }}
              className="flex items-center p-3 text-gray-700 dark:text-white hover:bg-[#FD9F10] dark:hover:bg-orange-400 group"
            >
              <svg className="w-6 h-6 transition-colors duration-100 ease-in-out group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
              </svg>
              <span className="flex-1 ms-3 font-poppins font-semibold whitespace-nowrap transition-colors duration-100 ease-in-out group-hover:text-white">Feedback</span>
            </Link>
          </li>
          <li>
            <Link
              href="/reports"
              style={{ color: '#344054' }}
              className="flex items-center p-3 text-gray-700 dark:text-white hover:bg-[#FD9F10] dark:hover:bg-orange-400 group"
            >
              <svg className="w-6 h-6 transition-colors duration-100 ease-in-out group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
              </svg>
              <span className="flex-1 ms-3 font-poppins font-semibold whitespace-nowrap transition-colors duration-100 ease-in-out group-hover:text-white">Reports</span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              style={{ color: '#344054' }}
              className="flex items-center p-3 text-gray-700 dark:text-white hover:bg-[#FD9F10] dark:hover:bg-orange-400 group"
              onClick={async (e) => {
                  e.preventDefault();  // Prevent the default link behavior
                  try {
                      await handleLogout();
                      window.location.href = '/login';
                  } catch (error) {
                      console.error('Logout failed', error);
                  }
              }}
            >
              <svg className="w-6 h-6 transition-colors duration-100 ease-in-out group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
              </svg>
              <span className="flex-1 ms-3 font-poppins font-semibold whitespace-nowrap transition-colors duration-100 ease-in-out group-hover:text-white">Log out</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
