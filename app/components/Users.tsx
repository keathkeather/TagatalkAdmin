import React, { useState } from 'react';
import useUserData from './AllUsers';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

type Tab = 'allUsers' | 'bannedUsers'; 

const Users: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'allUsers' | 'bannedUsers'>('allUsers');

    const allUsersItemsPerPage = 5;
    const [allUsersCurrentPage, setAllUsersCurrentPage] = useState(1);
    const [isBanModalVisible, setBanModalVisible] = useState(false);
    const [isADelModalVisible, setADelModalVisible] = useState(false);
    const [isUnbModalVisible, setUnbModalVisible] = useState(false);
    const [isBDelModalVisible, setBDelModalVisible] = useState(false);
    const allUsersModalVisible = isBanModalVisible || isADelModalVisible || isUnbModalVisible || isBDelModalVisible;

    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
    };

    const toggleBanModal = (userId: number) => {
        //setSelectedBanUserId(userId);
        setBanModalVisible(!isBanModalVisible);
    };

    const toggleADelModal = (userId: number) => {
        //setSelectedADelUserId(bookRequestId);
        setADelModalVisible(!isADelModalVisible);
    };

    const toggleUnbModal = (userId: number) => {
        //setSelectedBanUserId(userId);
        setUnbModalVisible(!isUnbModalVisible);
    };

    const toggleBDelModal = (userId: number) => {
        //setSelectedADelUserId(bookRequestId);
        setBDelModalVisible(!isBDelModalVisible);
    };

    const users = useUserData();
    
    const getAllUsersForCurrentPage = () => {
        const startIndex1 = (allUsersCurrentPage - 1) * allUsersItemsPerPage;
        const endIndex1 = startIndex1 + allUsersItemsPerPage;
        return users.slice(startIndex1, endIndex1);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F5F6FA' }}>
            {allUsersModalVisible && (
                <div className="u-overlay"></div>
            )}

            <style>
                {`
                .u-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 100;
                }

                .u-modal {
                    position: fixed;
                    top: 31%;
                    left: 40%;
                    z-index: 101;
                }

                .u-modal-open {
                    overflow: hidden;
                }
                `}
            </style>

            <Sidebar />
            <Navbar />

            <div
                id="u-modal"
                className={`u-modal ${isBanModalVisible ? '' : 'hidden'}`}
            >
                <div className="w-full max-w-md max-h-full"
                    style={{width: '300px'}}>
                    <div className="relative bg-white border border-white rounded-xl">
                        <div className="flex flex-col items-center mt-4 mb-4 p-4">
                            <div className="mt-2 font-bold font-poppins text-xl text-[#E33230]">Ban User</div>
                            <div className="font-semibold font-poppins text-md text-center text-[#344054] p-6">Are you sure you want to ban the user?</div>
                            <div className="flex flex-row mt-2 mb-2">
                                <button type="button" onClick={() => setBanModalVisible(false)} style={{ width: '120px' }} className="mr-5 px-8 py-2 rounded text-[#344054] bg-[#E6E6E6] hover:bg-[#C4C4C4] hover:text-[#000000] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Cancel
                                </button>
                                <button type="button" /* onClick={() => handleBanUser()} */ style={{ width: '120px' }} className="px-8 py-2 rounded text-[#ffffff] bg-[#E33230] hover:bg-[#B22927] hover:text-[#E2E2E2] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Ban
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="u-modal"
                className={`u-modal ${isADelModalVisible ? '' : 'hidden'}`}
            >
                <div className="w-full max-w-md max-h-full"
                    style={{width: '300px'}}>
                    <div className="relative bg-white border border-white rounded-xl">
                        <div className="flex flex-col items-center mt-4 mb-4 p-4">
                            <div className="mt-2 font-bold font-poppins text-xl text-[#CF453B]">Delete User</div>
                            <div className="font-semibold font-poppins text-md text-center text-[#344054] p-4">Are you sure you want to delete the user?</div>
                            <div className="flex flex-row mt-2 mb-2">
                                <button type="button" onClick={() => setADelModalVisible(false)} style={{ width: '120px' }} className="mr-5 px-8 py-2 rounded text-[#344054] bg-[#E6E6E6] hover:bg-[#C4C4C4] hover:text-[#000000] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Cancel
                                </button>
                                <button type="button" /* onClick={() => handleADeleteUser()} */ style={{ width: '120px' }} className="px-8 py-2 rounded text-[#CF453B] bg-[#F9DAD8] hover:bg-[#E2C7C5] hover:text-[#B83F36] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="u-modal"
                className={`u-modal ${isUnbModalVisible ? '' : 'hidden'}`}
            >
                <div className="w-full max-w-md max-h-full"
                    style={{width: '300px'}}>
                    <div className="relative bg-white border border-white rounded-xl">
                        <div className="flex flex-col items-center mt-4 mb-4 p-4">
                            <div className="mt-2 font-bold font-poppins text-xl text-[#344054]">Unban User</div>
                            <div className="font-semibold font-poppins text-md text-center text-[#344054] p-6">Are you sure you want to unban the user?</div>
                            <div className="flex flex-row mt-2 mb-2">
                                <button type="button" onClick={() => setUnbModalVisible(false)} style={{ width: '120px' }} className="mr-5 px-8 py-2 rounded text-[#344054] bg-[#E6E6E6] hover:bg-[#C4C4C4] hover:text-[#000000] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Cancel
                                </button>
                                <button type="button" /* onClick={() => handleUnbanUser()} */ style={{ width: '120px' }} className="px-8 py-2 rounded text-[#ffffff] bg-[#344054] hover:bg-[#202732] hover:text-[#E2E2E2] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Unban
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="u-modal"
                className={`u-modal ${isBDelModalVisible ? '' : 'hidden'}`}
            >
                <div className="w-full max-w-md max-h-full"
                    style={{width: '300px'}}>
                    <div className="relative bg-white border border-white rounded-xl">
                        <div className="flex flex-col items-center mt-4 mb-4 p-4">
                            <div className="mt-2 font-bold font-poppins text-xl text-[#CF453B]">Delete User</div>
                            <div className="font-semibold font-poppins text-md text-center text-[#344054] p-4">Are you sure you want to delete the user?</div>
                            <div className="flex flex-row mt-2 mb-2">
                                <button type="button" onClick={() => setBDelModalVisible(false)} style={{ width: '120px' }} className="mr-5 px-8 py-2 rounded text-[#344054] bg-[#E6E6E6] hover:bg-[#C4C4C4] hover:text-[#000000] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Cancel
                                </button>
                                <button type="button" /* onClick={() => handleBDeleteUser()} */ style={{ width: '120px' }} className="px-8 py-2 rounded text-[#CF453B] bg-[#F9DAD8] hover:bg-[#E2C7C5] hover:text-[#B83F36] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ flex: 1 }}>
                <h2 className="font-semibold font-poppins text-white my-4" style={{ color: '#202224', fontSize: '30px', marginTop: '100px', marginLeft: '300px' }}>Users</h2>
                {/* Toggle for All Users and Banned Users */}
                <div className="flex flex-row items-center" style={{ fontSize: '14px', marginTop: '20px', marginLeft: '300px' }}>
                    <button
                        style={{ width: '150px' }}
                        className={`px-4 py-2 focus:outline-none ${activeTab === 'allUsers' ? 'text-[#1D1929] font-bold font-poppins border-b-2 border-[#1D1929]' : 'text-[#1D1929]'}`}
                        onClick={() => handleTabChange('allUsers')}
                    >
                        All Users
                    </button>
                    <button
                        style={{ width: '150px' }}
                        className={`px-4 py-2 focus:outline-none ${activeTab === 'bannedUsers' ? 'text-[#1D1929] font-bold font-poppins border-b-2 border-[#1D1929]' : 'text-[#1D1929]'}`}
                        onClick={() => handleTabChange('bannedUsers')}
                    >
                        Banned Users
                    </button>
                </div>
                {/* Render Selected Table */}
                {activeTab === 'allUsers' && (
                    <div style={{ marginLeft: '300px', marginTop: '20px' }} className="p-0 pb-0 pt-4">
                        {/* All Users Table */}
                        <table style={{ width: '1180px', borderSpacing: '0 10px' }}>
                            <colgroup>
                                <col style={{ width: '300px' }} />
                                <col style={{ width: '300px' }} />
                                <col style={{ width: '240px' }} />
                                <col style={{ width: '240px' }} />
                            </colgroup>
                            <thead style={{ color: '#344054', backgroundColor: '#FFFFFF', fontSize: '16px' }} className="font-bold font-poppins shadow-md">
                                <tr style={{  height: '60px' }}>
                                    <th scope="col" className="px-5 py-3 text-left">Username</th>
                                    <th scope="col" className="px-5 py-3 text-left">Email</th>
                                    <th scope="col" className="px-3 py-3 text-center">Hours Played</th>
                                    <th scope="col" className="px-3 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getAllUsersForCurrentPage().map((user, index) => (
                                    <React.Fragment key={user.userId}>
                                        {/* Empty row for spacing */}
                                        {index !== getAllUsersForCurrentPage().length && (
                                            <tr style={{ height: '10px' }}></tr>
                                        )}
                                        <tr style={{ color: '#344054', backgroundColor: '#FFFFFF', fontSize: '16px' }} className="font-poppins shadow-md">
                                            <td scope="row" className="px-5 py-3 text-left">{user.name}</td>
                                            <td scope="row" className="px-5 py-3 text-left">{user.email}</td>
                                            <td scope="row" className="px-3 py-3 text-center">{/* {user.hoursPlayed} */}</td>
                                            <td scope="row" className="py-2 flex items-center justify-center">
                                                <button
                                                    onClick={() => toggleBanModal(user.userId)}
                                                    style={{ width: '80px' }}
                                                    className="focus:outline-none text-xs text-[#ffffff] bg-[#E33230] hover:bg-[#B22927] hover:text-[#E2E2E2] font-medium font-poppins rounded-lg px-5 py-2 mb-1 mt-1 mr-3 ml-2"
                                                >
                                                    Ban
                                                </button>
                                                <button
                                                    onClick={() => toggleADelModal(user.userId)}
                                                    style={{ width: '80px' }}
                                                    className="focus:outline-none text-xs text-[#CF453B] bg-[#F9DAD8] hover:bg-[#E2C7C5] hover:text-[#B83F36] font-medium font-poppins rounded-lg px-5 py-2 me-2 mb-1 mt-1"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination for All Users */}
                        <div className="mt-2 p-2 rounded-lg">
                            {Array.from({ length: Math.ceil(users.length / allUsersItemsPerPage) }, (_, index) => (
                                <button
                                key={index + 1}
                                className={`mx-1 px-3 py-2 text-xs font-bold rounded-full ${
                                    allUsersCurrentPage === index + 1 ? 'bg-[#344054] text-white' : 'bg-[#E6E6E6] text-[#4C4C4C] hover:bg-[#344054] hover:text-white'
                                }`}
                                onClick={() => setAllUsersCurrentPage(index + 1)}
                                >
                                {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === 'bannedUsers' && (
                    <div style={{ marginLeft: '300px', marginTop: '20px' }} className="p-0 pb-0 pt-4">
                        {/* Banned Users Table */}
                        <table style={{ width: '1180px' }}>
                            <colgroup>
                                <col style={{ width: '300px' }} />
                                <col style={{ width: '300px' }} />
                                <col style={{ width: '240px' }} />
                                <col style={{ width: '240px' }} />
                            </colgroup>
                            <thead style={{ color: '#344054', backgroundColor: '#FFFFFF', fontSize: '16px' }} className="font-bold font-poppins shadow-md">
                                <tr style={{  height: '60px' }}>
                                    <th scope="col" className="px-5 py-3 text-left">Username</th>
                                    <th scope="col" className="px-5 py-3 text-left">Email</th>
                                    <th scope="col" className="px-3 py-3 text-center">Hours Played</th>
                                    <th scope="col" className="px-3 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getAllUsersForCurrentPage().map((user, index) => (
                                    <React.Fragment key={user.userId}>
                                        {/* Empty row for spacing */}
                                        {index !== getAllUsersForCurrentPage().length && (
                                            <tr style={{ height: '10px' }}></tr>
                                        )}
                                        <tr style={{ color: '#344054', backgroundColor: '#FFFFFF', fontSize: '16px' }} className="font-poppins shadow-md">
                                            <td scope="row" className="px-5 py-3 text-left">{user.name}</td>
                                            <td scope="row" className="px-5 py-3 text-left">{user.email}</td>
                                            <td scope="row" className="px-3 py-3 text-center">{/* {user.hoursPlayed} */}</td>
                                            <td scope="row" className="py-2 flex items-center justify-center">
                                                <button
                                                    onClick={() => toggleUnbModal(user.userId)}
                                                    style={{ width: '80px' }}
                                                    className="focus:outline-none text-xs text-[#ffffff] bg-[#344054] hover:bg-[#202732] hover:text-[#E2E2E2] font-medium font-poppins rounded-lg px-5 py-2 mb-1 mt-1 mr-3 ml-2"
                                                >
                                                    Unban
                                                </button>
                                                <button
                                                    onClick={() => toggleBDelModal(user.userId)}
                                                    style={{ width: '80px' }}
                                                    className="focus:outline-none text-xs text-[#CF453B] bg-[#F9DAD8] hover:bg-[#E2C7C5] hover:text-[#B83F36] font-medium font-poppins rounded-lg px-5 py-2 me-2 mb-1 mt-1"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination for Banned Users */}
                        <div className="mt-2 p-2 rounded-lg">
                            {Array.from({ length: Math.ceil(users.length / allUsersItemsPerPage) }, (_, index) => (
                                <button
                                key={index + 1}
                                className={`mx-1 px-3 py-2 text-xs font-bold rounded-full ${
                                    allUsersCurrentPage === index + 1 ? 'bg-[#344054] text-white' : 'bg-[#E6E6E6] text-[#4C4C4C] hover:bg-[#344054] hover:text-white'
                                }`}
                                onClick={() => setAllUsersCurrentPage(index + 1)}
                                >
                                {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
