import React from 'react';
import Link from 'next/link';

interface SidebarProps {}

const EditorSidebar: React.FC<SidebarProps> = () => {
  return (
    <aside style={{ backgroundColor: '#FFFFFF' }} className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 dark:bg-gray-800 border-r">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <img src="/ttlogo.svg" alt="Tagatalk Logo" className="w-[10rem] h-[5rem] ml-8"/>
        
        <ul className="space-y-4 mt-2">
          <li>
            <Link
              href="/skillModules"
              style={{ color: '#344054' }}
              className="flex items-center p-3 text-gray-700 dark:text-white hover:bg-[#FD9F10] dark:hover:bg-orange-400 group"
            >
              <svg className="w-6 h-6 transition-colors duration-100 ease-in-out group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"/>
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-poppins font-semibold transition-colors duration-100 ease-in-out group-hover:text-white">Skill Modules</span>
            </Link>
          </li>
          <li>
            <Link
              href="/sandbox"
              style={{ color: '#344054' }}
              className="flex items-center p-3 text-gray-700 dark:text-white hover:bg-[#FD9F10] dark:hover:bg-orange-400 group"
            >
              <svg className="w-6 h-6 transition-colors duration-100 ease-in-out group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9"/>
              </svg>
              <span className="flex-1 ms-3 font-poppins font-semibold transition-colors duration-100 ease-in-out group-hover:text-white whitespace-nowrap">Sandbox</span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              style={{ color: '#344054' }}
              className="flex items-center p-3 text-gray-700 dark:text-white hover:bg-[#FD9F10] dark:hover:bg-orange-400 group"
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

export default EditorSidebar;
