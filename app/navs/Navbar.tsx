import React from 'react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 z-30 w-full h-16 shadow-sm" style={{ backgroundColor: '#FFFFFF', marginLeft: '250px' }}>
            <div className="flex items-center justify-between w-full">
                <div style={{ width: '350px', marginLeft: '50px', marginTop: '13px' }} className="relative"> {/*
                    <input
                        type="text"
                        placeholder="Search"
                        // value={searchInput}
                        // onChange={(e) => setSearchInput(e.target.value)}
                        style={{ fontSize: '14px', color: '#344054', backgroundColor: '#F8F8F8' }}
                        className="font-nunito w-full border rounded-3xl p-1 py-2 px-3 text-left"/>
                    <button className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent">
                        <svg style={{ color: '#B9BBBD' }} className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                        </svg>
                    </button> */}
                </div>
                <div style={{ marginRight: '300px', marginTop: '13px' }}>
                    <div className="flex flex-row items-end font-nunito">
                        <svg style={{ color: '#404040' }} className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>
                        <div className="flex flex-col ml-3" style={{ color: '#B9BBBD' }}>
                            {/*<p style={{ fontSize: '14px', color: '#404040' }} className="font-semibold">12-3456-789</p>*/}
                            <p style={{ fontSize: '12px', color: '#565656', marginRight: '5px', marginBottom: '10px' }}>Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

