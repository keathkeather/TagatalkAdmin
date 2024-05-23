'use client'

import React, { useState } from 'react';
import { useUserData, useBannedUserData, useDeleteUser, useBanUser, useUnbanUser } from '../calls/UsersFunctions';
import Sidebar from '../navs/Sidebar';
import Navbar from '../navs/Navbar';

type Tab = 'allUsers' | 'bannedUsers'; 

const Users: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'allUsers' | 'bannedUsers'>('allUsers');
    const allUsersItemsPerPage = 5;
    const bannedUsersItemsPerPage = 5;
    const [allUsersCurrentPage, setAllUsersCurrentPage] = useState(1);
    const [bannedUsersCurrentPage, setBannedUsersCurrentPage] = useState(1);
    const [isBanModalVisible, setBanModalVisible] = useState(false);
    const [isUnbModalVisible, setUnbModalVisible] = useState(false);
    const [isDelModalVisible, setDelModalVisible] = useState(false);
    const allUsersModalVisible = isBanModalVisible || isDelModalVisible || isUnbModalVisible;
    const users = useUserData();
    const bannedUsers = useBannedUserData();
    const [selectedDelUserId, setSelectedDelUserId] = useState<string>("");
    const [selectedBanUserId, setSelectedBanUserId] = useState<string>("");
    const [selectedMonths, setSelectedMonths] = useState<number | null>(null);
    const [selectedDays, setSelectedDays] = useState<number | null>(null);
    const [selectedUnbUserId, setSelectedUnbUserId] = useState<string>("");
    const { deleteUser } = useDeleteUser(selectedDelUserId);
    const { banUser } = useBanUser(selectedBanUserId, selectedMonths ?? 0, selectedDays ?? 0);
    const { unbanUser } = useUnbanUser(selectedUnbUserId);

    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
    };

    const toggleDelModal = (userId: string) => {
        setSelectedDelUserId(userId);
        setDelModalVisible(!isDelModalVisible);
    };

    const toggleBanModal = (userId: string) => {
        setSelectedBanUserId(userId);
        setBanModalVisible(!isBanModalVisible);
    };

    const toggleUnbModal = (userId: string) => {
        setSelectedUnbUserId(userId);
        setUnbModalVisible(!isUnbModalVisible);
    };
    
    const getAllUsersForCurrentPage = () => {
        const startIndex1 = (allUsersCurrentPage - 1) * allUsersItemsPerPage;
        const endIndex1 = startIndex1 + allUsersItemsPerPage;
        return users.slice(startIndex1, endIndex1);
    };

    const getBannedUsersForCurrentPage = () => {
        const startIndex2 = (bannedUsersCurrentPage - 1) * bannedUsersItemsPerPage;
        const endIndex2 = startIndex2 + bannedUsersItemsPerPage;
        return bannedUsers.slice(startIndex2, endIndex2);
    };

    const handleConfirmDeleteUser = async () => {
        try {
            await deleteUser();
            setDelModalVisible(false);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleConfirmBanUser = async () => {
        try {
            console.log("Selected months:", selectedMonths);
            console.log("Selected days:", selectedDays);
            await banUser();
            setBanModalVisible(false);
            window.location.reload();
        } catch (error) {
            console.error('Error banning user:', error);
        }
    };

    const handleConfirmUnbanUser = async () => {
        try {
            await unbanUser();
            setUnbModalVisible(false);
            window.location.reload();
        } catch (error) {
            console.error('Error unbanning user:', error);
        }
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
                className={`u-modal ${isDelModalVisible ? '' : 'hidden'}`}
            >
                <div className="w-full max-w-md max-h-full"
                    style={{width: '300px'}}>
                    <div className="relative bg-white border border-white rounded-xl">
                        <div className="flex flex-col items-center mt-4 mb-4 p-4">
                            <div className="mt-2 font-bold font-poppins text-xl text-[#CF453B]">
                                Delete User
                            </div>
                            <div className="font-semibold font-poppins text-md text-center text-[#344054] p-4">
                                Are you sure you want to delete the user?
                            </div>
                            <div className="flex flex-row mt-2 mb-2">
                                <button type="button" 
                                        onClick={() => setDelModalVisible(false)} 
                                        style={{ width: '120px' }} 
                                        className="mr-5 px-8 py-2 rounded text-[#344054] bg-[#E6E6E6] hover:bg-[#C4C4C4] hover:text-[#000000] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Cancel
                                </button>
                                <button type="button" 
                                        onClick={handleConfirmDeleteUser} 
                                        style={{ width: '120px' }} 
                                        className="px-8 py-2 rounded text-[#CF453B] bg-[#F9DAD8] hover:bg-[#E2C7C5] hover:text-[#B83F36] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="u-modal"
                className={`u-modal ${isBanModalVisible ? '' : 'hidden'}`}
            >
                <div className="w-full max-w-md max-h-full"
                    style={{width: '300px'}}>
                    <div className="relative bg-white border border-white rounded-xl">
                        <div className="flex flex-col items-center mt-4 mb-4 p-4">
                            <div className="mt-2 font-bold font-poppins text-xl text-[#E33230]">
                                Ban User
                            </div>
                            <div className="font-semibold font-poppins text-md text-center text-[#344054] p-6">
                                {/* Container for input fields */}
                                <div className="flex flex-col items-center relative">
                                    {/* Input field for monthsVal */}
                                    <div className="flex items-center">
                                        <label htmlFor="monthsInput" 
                                               className="mr-2 text-left">
                                            Months:
                                        </label>
                                        <input
                                            id="monthsInput"
                                            type="number"
                                            value={selectedMonths?.toString() ?? ""}
                                            onChange={(event) => {
                                                let value = parseInt(event.target.value);
                                                if (isNaN(value)) {
                                                    setSelectedMonths(null);
                                                } else {
                                                    setSelectedMonths(Math.max(0, value)); // Ensure it doesn't go below 0
                                                }
                                            }}
                                            className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
                                            style={{ width: '60px' }}
                                        />
                                    </div>
                                    {/* Input field for daysVal */}
                                    <div className="flex items-center mt-2">
                                        <label htmlFor="daysInput" 
                                               className="mr-2 ml-5 text-left">
                                            Days:
                                        </label>
                                        <input
                                            id="daysInput"
                                            type="number"
                                            value={selectedDays?.toString() ?? ""}
                                            onChange={(event) => {
                                                let value = parseInt(event.target.value);
                                                if (isNaN(value)) {
                                                    setSelectedDays(null);
                                                } else {
                                                    setSelectedDays(Math.max(0, value)); // Ensure it doesn't go below 0
                                                }
                                            }}
                                            className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
                                            style={{ width: '60px' }}
                                        />
                                    </div>
                                </div>
                                {/* Warning text */}
                                {(selectedMonths !== null && selectedDays !== null) && 
                                 ((selectedMonths ?? 0) <= 0 && (selectedDays ?? 0) <= 0 || 
                                  (selectedMonths ?? 0) < 0 && (selectedDays ?? 0) > 0 || 
                                  (selectedMonths ?? 0) > 0 && (selectedDays ?? 0) < 0 || 
                                  (selectedMonths ?? 0) < 0 || (selectedDays ?? 0) < 0) && (
                                    <div style={{ fontSize: '12px', 
                                                  marginBottom: '-26px' }} 
                                         className="font-poppins font-normal text-[#E31A11] mt-2">
                                        Values must be greater than 0.
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-row mt-2 mb-2">
                                <button type="button" 
                                        onClick={() => setBanModalVisible(false)} 
                                        style={{ width: '120px' }} 
                                        className="mr-5 px-8 py-2 rounded text-[#344054] bg-[#E6E6E6] hover:bg-[#C4C4C4] hover:text-[#000000] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Cancel
                                </button>
                                <button type="button" 
                                        onClick={handleConfirmBanUser} 
                                        style={{ width: '120px' }} 
                                        className="px-8 py-2 rounded text-[#ffffff] bg-[#E33230] hover:bg-[#B22927] hover:text-[#E2E2E2] font-semibold font-poppins cursor-pointer text-center text-sm"
                                        disabled={
                                            selectedMonths === null ||
                                            selectedDays === null ||
                                            (selectedMonths <= 0 && selectedDays <= 0) ||
                                            (selectedMonths < 0 && selectedDays > 0) ||
                                            (selectedMonths > 0 && selectedDays < 0) ||
                                            selectedMonths < 0 ||
                                            selectedDays < 0
                                        }>
                                    Ban
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
                            <div className="mt-2 font-bold font-poppins text-xl text-[#344054]">
                                Unban User
                            </div>
                            <div className="font-semibold font-poppins text-md text-center text-[#344054] p-6">
                                Are you sure you want to unban the user?
                            </div>
                            <div className="flex flex-row mt-2 mb-2">
                                <button type="button" 
                                        onClick={() => setUnbModalVisible(false)} 
                                        style={{ width: '120px' }} 
                                        className="mr-5 px-8 py-2 rounded text-[#344054] bg-[#E6E6E6] hover:bg-[#C4C4C4] hover:text-[#000000] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Cancel
                                </button>
                                <button type="button" 
                                        onClick={handleConfirmUnbanUser} 
                                        style={{ width: '120px' }} 
                                        className="px-8 py-2 rounded text-[#ffffff] bg-[#344054] hover:bg-[#202732] hover:text-[#E2E2E2] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Unban
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ flex: 1 }}>
                <h2 className="font-semibold font-poppins text-white my-4" 
                    style={{ color: '#202224', 
                             fontSize: '30px', 
                             marginTop: '100px',
                             marginLeft: '300px' }}>
                    Users
                </h2>
                {/* Toggle for All Users and Banned Users */}
                <div className="flex flex-row items-center" 
                     style={{ fontSize: '14px', 
                              marginTop: '20px', 
                              marginLeft: '300px' }}>
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
                    <div style={{ marginLeft: '300px', 
                                  marginTop: '20px' }} 
                        className="p-0 pb-0 pt-4">
                        {/* All Users Table */}
                        <table style={{ width: '1180px', 
                                        borderSpacing: '0 10px' }}>
                            <colgroup>
                                <col style={{ width: '300px' }} />
                                <col style={{ width: '300px' }} />
                                <col style={{ width: '240px' }} />
                                <col style={{ width: '240px' }} />
                            </colgroup>
                            <thead style={{ color: '#344054', 
                                            backgroundColor: '#FFFFFF', 
                                            fontSize: '16px' }} 
                                   className="font-bold font-poppins shadow-md">
                                <tr style={{ height: '60px' }}>
                                    <th scope="col" 
                                        className="px-5 py-3 text-left">
                                        Username
                                    </th>
                                    <th scope="col" 
                                        className="px-5 py-3 text-left">
                                        Email
                                    </th>
                                    <th scope="col" 
                                        className="px-5 py-3 text-left">
                                        {/* Hours Played */}
                                        Created On
                                    </th>
                                    <th scope="col" 
                                        className="px-3 py-3 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {getAllUsersForCurrentPage().map((user, index) => (
                                    <React.Fragment key={user.userId}>
                                        {/* Empty row for spacing */}
                                        {index !== getAllUsersForCurrentPage().length && (
                                            <tr style={{ height: '10px' }}></tr>
                                        )}
                                        <tr style={{ color: '#344054', 
                                                     backgroundColor: '#FFFFFF', 
                                                     fontSize: '16px' }} 
                                            className="font-poppins shadow-md">
                                            <td scope="row" 
                                                className="px-5 py-3 text-left">
                                                {user.name}
                                            </td>
                                            <td scope="row" 
                                                className="px-5 py-3 text-left">
                                                {user.email}
                                            </td>
                                            <td scope="row" 
                                                className="px-5 py-3 text-left">
                                                {/* {user.hoursPlayed} */}
                                                {new Date(user.createdAt).toLocaleString('en-US', { month: 'numeric', 
                                                                                                                  day: 'numeric', 
                                                                                                                  year: 'numeric', 
                                                                                                                  hour: 'numeric', 
                                                                                                                  minute: 'numeric', 
                                                                                                                  hour12: true })}
                                            </td>
                                            <td scope="row" 
                                                className="py-2 flex items-center justify-center">
                                                <button
                                                    onClick={() => toggleBanModal(user.userId)}
                                                    style={{ width: '80px' }}
                                                    className="focus:outline-none text-xs text-[#ffffff] bg-[#E33230] hover:bg-[#B22927] hover:text-[#E2E2E2] font-medium font-poppins rounded-lg px-5 py-2 mb-1 mt-1 mr-3 ml-2"
                                                >
                                                    Ban
                                                </button>
                                                <button
                                                    onClick={() => toggleDelModal(user.userId)}
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
                                    onClick={() => setAllUsersCurrentPage(index + 1)}>
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === 'bannedUsers' && (
                    <div style={{ marginLeft: '300px', 
                                  marginTop: '20px' }} 
                        className="p-0 pb-0 pt-4">
                        {/* Banned Users Table */}
                        <table style={{ width: '1180px' }}>
                            <colgroup>
                                <col style={{ width: '300px' }} />
                                <col style={{ width: '300px' }} />
                                <col style={{ width: '240px' }} />
                                <col style={{ width: '240px' }} />
                            </colgroup>
                            <thead style={{ color: '#344054', 
                                   backgroundColor: '#FFFFFF', 
                                   fontSize: '16px' }} 
                                   className="font-bold font-poppins shadow-md">
                                <tr style={{  height: '60px' }}>
                                    <th scope="col" 
                                        className="px-5 py-3 text-left"
                                        >Username
                                    </th>
                                    <th scope="col" 
                                        className="px-5 py-3 text-left">
                                        Email
                                    </th>
                                    <th scope="col" 
                                        className="px-5 py-3 text-left">
                                        Banned Until
                                    </th>
                                    <th scope="col" 
                                        className="px-3 py-3 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {getBannedUsersForCurrentPage().map((bannedUser, index) => (
                                    <React.Fragment key={bannedUser.userId}>
                                        {/* Empty row for spacing */}
                                        {index !== getBannedUsersForCurrentPage().length && (
                                            <tr style={{ height: '10px' }}></tr>
                                        )}
                                        <tr style={{ color: '#344054', 
                                                     backgroundColor: '#FFFFFF', 
                                                     fontSize: '16px' }} 
                                            className="font-poppins shadow-md">
                                            <td scope="row" 
                                                className="px-5 py-3 text-left">
                                                {bannedUser.name}
                                            </td>
                                            <td scope="row" 
                                                className="px-5 py-3 text-left">
                                                {bannedUser.email}
                                            </td>
                                            <td scope="row" 
                                                className="px-5 py-3 text-left">
                                                {new Date(bannedUser.auth.banned_until).toLocaleString('en-US', { month: 'numeric', 
                                                                                                                  day: 'numeric', 
                                                                                                                  year: 'numeric', 
                                                                                                                  hour: 'numeric', 
                                                                                                                  minute: 'numeric', 
                                                                                                                  hour12: true })}
                                            </td>
                                            <td scope="row" 
                                                className="py-2 flex items-center justify-center">
                                                <button
                                                    onClick={() => toggleUnbModal(bannedUser.userId)}
                                                    style={{ width: '80px' }}
                                                    className="focus:outline-none text-xs text-[#ffffff] bg-[#344054] hover:bg-[#202732] hover:text-[#E2E2E2] font-medium font-poppins rounded-lg px-5 py-2 mb-1 mt-1 mr-3 ml-2"
                                                >
                                                    Unban
                                                </button>
                                                <button
                                                    onClick={() => toggleDelModal(bannedUser.userId)}
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
                            {Array.from({ length: Math.ceil(bannedUsers.length / bannedUsersItemsPerPage) }, (_, index) => (
                                <button
                                    key={index + 1}
                                    className={`mx-1 px-3 py-2 text-xs font-bold rounded-full ${
                                        bannedUsersCurrentPage === index + 1 ? 'bg-[#344054] text-white' : 'bg-[#E6E6E6] text-[#4C4C4C] hover:bg-[#344054] hover:text-white'
                                    }`}
                                    onClick={() => setBannedUsersCurrentPage(index + 1)}>
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
