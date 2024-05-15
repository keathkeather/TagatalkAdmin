'use client'

import React, { useState } from 'react';
import { useUserData, useBannedUserData, useDeleteUser, useBanUser, useUnbanUser } from '../calls/UsersFunctions';
import EditorSidebar from '../navs/EditorSidebar';
import EditorNavbar from '../navs/EditorNavbar';

const Sandbox: React.FC = () => {
    const allUsersItemsPerPage = 5;
    const [allUsersCurrentPage, setAllUsersCurrentPage] = useState(1);
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isVieModalVisible, setVieModalVisible] = useState(false);
    const [isEdiModalVisible, setEdiModalVisible] = useState(false);
    const [isDelModalVisible, setDelModalVisible] = useState(false);
    const allUsersModalVisible = isAddModalVisible || isVieModalVisible || isEdiModalVisible || isDelModalVisible;
    const users = useUserData();
    const [selectedVieFeedbackId, setSelectedVieFeedbackId] = useState<string>("");
    const [selectedDelUserId, setSelectedDelUserId] = useState<string>("");
    const [selectedSavId, setSelectedSavId] = useState<string>("");
    const { deleteUser } = useDeleteUser(selectedDelUserId);

    const toggleAddModal = () => {
        setAddModalVisible(!isAddModalVisible);
    };

    const toggleVieModal = (id: string) => {
        setSelectedVieFeedbackId(id);
        setVieModalVisible(!isVieModalVisible);
    };

    const toggleDelModal = (userId: string) => {
        setSelectedDelUserId(userId);
        setDelModalVisible(!isDelModalVisible);
    };

    const toggleEdiModal = (userId: string) => {
        setSelectedSavId(userId);
        setEdiModalVisible(!isEdiModalVisible);
    };
    
    const getAllUsersForCurrentPage = () => {
        const startIndex1 = (allUsersCurrentPage - 1) * allUsersItemsPerPage;
        const endIndex1 = startIndex1 + allUsersItemsPerPage;
        return users.slice(startIndex1, endIndex1);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteUser();
            setDelModalVisible(false);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleConfirmEdit = async () => {
        try {
            setEdiModalVisible(false);
            window.location.reload();
        } catch (error) {
            console.error('Error editing:', error);
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

            <EditorSidebar />
            <EditorNavbar />

            <div
                id="u-modal"
                className={`u-modal ${isAddModalVisible ? '' : 'hidden'}`}
            >
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
                    <div className="w-[600px] h-[350px] bg-white rounded-xl">
                        {/* Header section */}
                        <div className="bg-[#FFFFFF] rounded-t-lg text-white p-6 flex justify-between items-center">
                            <h2 className="text-[#344054] text-2xl font-poppins font-semibold ml-2">
                                Add New Set
                            </h2>
                            <button
                                onClick={() => {
                                    setAddModalVisible(false);
                                }}
                                className="focus:outline-none float-right mr-1"
                            >
                                <svg style={{ color: '#344054' }} 
                                     className="w-10 h-10 text-gray-800 dark:text-white" 
                                     aria-hidden="true" 
                                     xmlns="http://www.w3.org/2000/svg" 
                                     width="24" 
                                     height="24" 
                                     fill="none" 
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" 
                                          strokeLinecap="round" 
                                          strokeLinejoin="round" 
                                          strokeWidth="2" 
                                          d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </button>
                        </div>
                        {/* Add Set Details */}
                        <div className='p-8 pt-2 font-poppins text-[#344054] overflow-y-auto' style={{ maxHeight: '250px' }}>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="u-modal"
                className={`u-modal ${isVieModalVisible ? '' : 'hidden'}`}
            >
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
                    <div className="w-[600px] h-[350px] bg-white rounded-xl">
                        {/* Header section */}
                        <div className="bg-[#FFFFFF] rounded-t-lg text-white p-6 flex justify-between items-center">
                            <h2 className="text-[#D0D5DD] text-xl font-poppins font-semibold ml-2">
                                Start Date to End Date
                            </h2>
                            <button
                                onClick={() => {
                                    setVieModalVisible(false);
                                }}
                                className="focus:outline-none float-right mr-1"
                            >
                                <svg style={{ color: '#344054' }} 
                                     className="w-10 h-10 text-gray-800 dark:text-white" 
                                     aria-hidden="true" 
                                     xmlns="http://www.w3.org/2000/svg" 
                                     width="24" 
                                     height="24" 
                                     fill="none" 
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" 
                                          strokeLinecap="round" 
                                          strokeLinejoin="round" 
                                          strokeWidth="2" 
                                          d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </button>
                        </div>
                        {/* View Images Details */}
                        <div className='p-8 pt-2 font-poppins text-[#344054] overflow-y-auto' style={{ maxHeight: '250px' }}>
                                
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="u-modal"
                className={`u-modal ${isDelModalVisible ? '' : 'hidden'}`}
            >
                <div className="w-full max-w-md max-h-full"
                    style={{width: '300px'}}>
                    <div className="relative bg-white border border-white rounded-xl">
                        <div className="flex flex-col items-center mt-4 mb-4 p-4">
                            <div className="mt-2 font-bold font-poppins text-xl text-[#CF453B]">
                                Delete Images
                            </div>
                            <div className="font-semibold font-poppins text-md text-center text-[#344054] p-4">
                                Are you sure you want to delete the images?
                            </div>
                            <div className="flex flex-row mt-2 mb-2">
                                <button type="button" 
                                        onClick={() => setDelModalVisible(false)} 
                                        style={{ width: '120px' }} 
                                        className="mr-5 px-8 py-2 rounded text-[#344054] bg-[#E6E6E6] hover:bg-[#C4C4C4] hover:text-[#000000] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Cancel
                                </button>
                                <button type="button" 
                                        onClick={handleConfirmDelete} 
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
                className={`u-modal ${isEdiModalVisible ? '' : 'hidden'}`}
            >
                <div className="w-full max-w-md max-h-full"
                    style={{width: '350px'}}>
                    <div className="relative bg-white border border-white rounded-xl">
                        <div className="flex flex-col items-center p-8">
                            <div className="flex flex-row justify-between w-full">
                                <div className="font-bold font-poppins text-xl text-[#344054]">
                                    Edit Set
                                </div>
                            </div>
                            <div className="font-semibold font-poppins text-md text-center text-[#344054] p-6">
                                {/* Container for date fields */}
                                <div className="flex flex-col items-center relative">
                                    <div style={{ height: '100px' }}></div>{/* Space placeholder for Start and End dates. Replace with actual code. */}
                                </div>
                            </div>
                            <div className="flex flex-row mt-2 mb-2">
                                <button type="button" 
                                        onClick={() => setEdiModalVisible(false)} 
                                        style={{ width: '130px' }} 
                                        className="text-sm font-semibold text-[#344054] bg-[#ffffff] hover:bg-[#E6E6E6] hover:text-[#1E2530] px-4 py-2 rounded-md border border-gray-300 font-poppins">
                                    Discard
                                </button>
                                <button type="button" 
                                        onClick={handleConfirmEdit} 
                                        style={{ width: '130px' }} 
                                        className="text-sm font-semibold text-[#ffffff] bg-[#FD9F10] hover:bg-[#D8890F] hover:text-[#E2E2E2] px-4 py-2 rounded-md font-poppins ml-5">
                                    Save
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
                {/* Add Set Button */}
                <div className="flex flex-row items-center" 
                     style={{ fontSize: '14px', 
                              marginTop: '20px', 
                              marginLeft: '300px' }}>
                    <button type="button" 
                            className="text-[#FFFFFF] bg-[#FD9F10] hover:bg-[#D8890F] hover:text-[#E2E2E2] px-4 py-2 rounded-xl font-poppins" 
                            style={{ width: '140px', height: '40px', color: '#FFFFFF', fontSize: '14px', marginRight: '10px' }}
                            onClick={toggleAddModal} >
                        <div className="flex flex-row items-center justify-between">
                            <svg className="w-6 h-6 transition-colors duration-100 ease-in-out group-hover:[#E2E2E2]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
                                 style={{ color: '#FFFFFF', marginLeft: '10px', width: 'auto', height: 'auto' }}>
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"/>
                            </svg>
                            <p style={{ marginRight: '10px' }}>
                                Add Set
                            </p>
                        </div>
                    </button>
                </div>
                {/* Render Table */}
                <div style={{ marginLeft: '300px', 
                                marginTop: '20px' }} 
                    className="p-0 pb-0 pt-4">
                    {/* Sandbox Table */}
                    <table style={{ width: '1180px', 
                                    borderSpacing: '0 10px' }}>
                        <colgroup>
                            <col style={{ width: '240px' }} />
                            <col style={{ width: '300px' }} />
                            <col style={{ width: '300px' }} />
                            <col style={{ width: '240px' }} />
                        </colgroup>
                        <thead style={{ color: '#344054', 
                                        backgroundColor: '#FFFFFF', 
                                        fontSize: '16px' }} 
                                className="font-bold font-poppins shadow-md">
                            <tr style={{ height: '60px' }}>
                                <th scope="col" 
                                    className="px-3 py-3 text-center">
                                    Set Images
                                </th>
                                <th scope="col" 
                                    className="px-3 py-3 text-center">
                                    Start Date
                                </th>
                                <th scope="col" 
                                    className="px-3 py-3 text-center">
                                    End Date
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
                                            className="px-3 py-3 text-center">
                                            <button
                                                onClick={() => toggleVieModal(user.userId)}
                                                style={{ background: 'none', 
                                                         border: 'none', 
                                                         padding: 0, 
                                                         margin: 0, 
                                                         color: '#344054', 
                                                         fontSize: '16px', 
                                                         textDecoration: 'none', 
                                                         cursor: 'pointer' }}
                                                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                                                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                                            >
                                                View Images
                                            </button>
                                        </td>
                                        <td scope="row" 
                                            className="px-3 py-3 text-center">
                                            {user.email}{/* replace with Start Date */}
                                        </td>
                                        <td scope="row" 
                                            className="px-3 py-3 text-center">
                                            {/* replace with End Date */}
                                        </td>
                                        <td scope="row" 
                                            className="py-2 flex items-center justify-center">
                                            <button
                                                onClick={() => toggleEdiModal(user.userId)}
                                                style={{ width: '80px' }}
                                                className="focus:outline-none text-xs text-[#427A5B] bg-[#DEEDE5] hover:bg-[#C0CCC6] hover:text-[#2F5640] font-medium font-poppins rounded-lg px-5 py-2 mb-1 mt-1 mr-3 ml-2"
                                            >
                                                Edit
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
            </div>
        </div>
    );
};

export default Sandbox;
