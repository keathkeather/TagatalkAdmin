import React, { useState, useEffect } from 'react';
import { useUserData } from './calls/UsersFunctions';
import Image from 'next/image';
import Sidebar from './navs/Sidebar';
import Navbar from './navs/Navbar';

const Dashboard = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const usersData = useUserData();

    useEffect(() => {
        setTotalUsers(usersData.length);
    }, [usersData]);

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F5F6FA' }}>
            <Sidebar />
            <Navbar />
            <div style={{ flex: 1 }}>
                <h2 className="font-semibold text-white my-4 font-poppins" 
                    style={{ color: '#202224', fontSize: '30px', marginTop: '100px', marginLeft: '300px' }}>
                    Dashboard
                </h2>
                <div className="flex flex-row items-center" 
                     style={{ marginLeft: '300px', marginTop: '20px' }}>
                    <div className="bg-white rounded-xl shadow-md p-4 flex flex-row items-center justify-between" 
                         style={{ width: '360px', height: '115px', marginRight: '50px' }}>
                        <div className="flex flex-col">
                            <span className="font-nunito" 
                                  style={{ color: '#545F71', fontSize: '16px', marginBottom: '15px' }}>
                                Total Users
                            </span>
                            <span className="font-nunito font-bold" 
                                  style={{ color: '#202224', fontSize: '28px' }}>
                                {totalUsers}
                            </span>
                        </div>
                        <Image src="/dicon1.svg" 
                               alt="Dashboard Icon 1" 
                               width={60} 
                               height={60} 
                               style={{ marginRight: '10px', width: '20%', height: 'auto' }}/>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-4 flex flex-row items-center justify-between" 
                         style={{ width: '360px', height: '115px', marginRight: '50px' }}>
                        <div className="flex flex-col">
                            <span className="font-nunito" 
                                  style={{ color: '#545F71', fontSize: '16px', marginBottom: '15px' }}>
                                Avg. User Logins Per Day
                            </span>
                            <span className="font-nunito font-bold" 
                                  style={{ color: '#202224', fontSize: '28px' }}>
                                80%
                            </span>
                        </div>
                        <Image src="/dicon2.svg" 
                               alt="Dashboard Icon 2" 
                               width={60} 
                               height={60} 
                               style={{ marginRight: '10px', width: '20%', height: 'auto' }}/>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-4 flex flex-row items-center justify-between" 
                         style={{ width: '360px', height: '115px' }}>
                        <div className="flex flex-col">
                            <span className="font-nunito" 
                                  style={{ color: '#545F71', fontSize: '16px', marginBottom: '15px' }}>
                                Avg. Usage Time For Users
                            </span>
                            <span className="font-nunito font-bold" 
                                  style={{ color: '#202224', fontSize: '28px' }}>
                                30.2 mins.
                            </span>
                        </div>
                        <Image src="/dicon3.svg" 
                               alt="Dashboard Icon 3" 
                               width={60} 
                               height={60} 
                               style={{ marginRight: '10px', width: '20%', height: 'auto' }}/>
                    </div>
                </div>
                <div style={{ marginLeft: '300px', marginTop: '20px' }}>
                    <div className="bg-white rounded-xl shadow-md p-4" 
                         style={{ width: '1180px', height: '390px', marginRight: '50px', marginTop: '35px' }}>
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col">
                                <span className="font-nunito font-bold" 
                                      style={{ color: '#464255', fontSize: '30px' }}>
                                    User Logins
                                </span>
                                <span className="font-nunito" 
                                      style={{ color: '#B9BBBD', fontSize: '18px' }}>
                                    Number Of User Logins Per Day
                                </span>
                            </div>
                            <button type="button" 
                                    className="text-[#2D9CDB] bg-[#ffffff] hover:bg-[#E6E6E6] hover:text-[#2782B5] font-bold px-4 py-2 rounded-xl border font-cairo" 
                                    style={{ width: '210px', color: '#2D9CDB', borderColor: '#2D9CDB', fontSize: '20px', marginRight: '10px' }}>
                                <div className="flex flex-row items-center justify-between">
                                    <svg style={{ color: '#2D9CDB', marginLeft: '10px', width: 'auto', height: 'auto' }} 
                                         className="color-[#2D9CDB] hover:color-[#2782B5] w-8 h-8 text-gray-800 dark:text-white" 
                                         aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
                                         width="24" 
                                         height="24" 
                                         fill="none" 
                                         viewBox="0 0 24 24">
                                        <path stroke="currentColor" 
                                              strokeLinecap="round" 
                                              strokeLinejoin="round" 
                                              strokeWidth="2" 
                                              d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
                                    </svg>
                                    <p style={{ marginRight: '10px' }}>
                                        Save Report
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
