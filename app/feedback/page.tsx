'use client'

import React, { useState } from 'react';
import { useFeedbackData, useDeleteFeedback } from '../calls/FeedbackFunctions';
import Sidebar from '../navs/Sidebar';
import Navbar from '../navs/Navbar';

const Feedback = () => {
    const allFeedbackItemsPerPage = 7;
    const [allFeedbackCurrentPage, setFeedbackCurrentPage] = useState(1);
    const [isVieModalVisible, setVieModalVisible] = useState(false);
    const [isDelModalVisible, setDelModalVisible] = useState(false);
    const allFeedbackModalVisible = isVieModalVisible || isDelModalVisible;
    const feedbackData = useFeedbackData();
    const [selectedVieFeedbackId, setSelectedVieFeedbackId] = useState<string>("");
    const [selectedDelFeedbackId, setSelectedDelFeedbackId] = useState<string>("");
    const { deleteFeedback } = useDeleteFeedback(selectedDelFeedbackId);

    const toggleVieModal = (id: string) => {
        setSelectedVieFeedbackId(id);
        setVieModalVisible(!isVieModalVisible);
    };

    const selectedFeedback = feedbackData.find(feedback => feedback.id === selectedVieFeedbackId);

    const toggleDelModal = (id: string) => {
        setSelectedDelFeedbackId(id);
        setDelModalVisible(!isDelModalVisible);
    };

    const getFeedbackForCurrentPage = () => {
        const startIndex = (allFeedbackCurrentPage - 1) * allFeedbackItemsPerPage;
        const endIndex = startIndex + allFeedbackItemsPerPage;
        return feedbackData.slice(startIndex, endIndex);
    };

    const handleConfirmDeleteFeedback = async () => {
        console.log(selectedDelFeedbackId);
        try {
            await deleteFeedback();
            setDelModalVisible(false);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    return (
        <div style={{ display: 'flex', 
                      height: '100vh', 
                      backgroundColor: '#F5F6FA' }}>

            {allFeedbackModalVisible && (
                <div className="f-overlay"></div>
            )}

            <style>
                {`
                .f-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 100;
                }

                .f-modal {
                    position: fixed;
                    top: 31%;
                    left: 40%;
                    z-index: 101;
                }

                .f-modal-open {
                    overflow: hidden;
                }
                `}
            </style>

            <Sidebar />
            <Navbar pageTitle="Feedback" />

            <div
                id="f-modal"
                className={`f-modal ${isVieModalVisible ? '' : 'hidden'}`}
            >
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
                    <div className="w-[600px] h-[350px] bg-white rounded-xl">
                        {/* Header section */}
                        <div className="bg-[#FD9F10] rounded-t-lg text-white p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-poppins font-semibold ml-2">
                                Feedback Details
                            </h2>
                            <button
                                onClick={() => {
                                    setVieModalVisible(false);
                                }}
                                className="focus:outline-none float-right mr-1"
                            >
                                <svg style={{ color: '#ffffff' }} 
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
                        {/* Feedback Details */}
                        <div className='p-8 pt-2 font-poppins text-[#344054] overflow-y-auto' style={{ maxHeight: '250px' }}>
                            <div className="flex flex-row items-center justify-between mt-5">
                                <div className="flex flex-col">
                                    <h1 className="text-xl font-bold">
                                        Title
                                    </h1>
                                    <p className="mt-2 text-sm">
                                        {selectedFeedback?.feedbackTitle}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-xl font-bold">
                                        Submission
                                    </h1>
                                    <p className="mt-2 text-sm">
                                        {selectedFeedback ? 
                                            new Date(selectedFeedback.createdAt).toLocaleString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                            }) : ''}
                                    </p>
                                </div>
                            </div>
                            <h1 className="text-xl font-bold mt-6">
                                Feedback
                            </h1>
                            <p className="mt-2 text-sm">
                                {selectedFeedback?.feedbackDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="f-modal"
                className={`f-modal ${isDelModalVisible ? '' : 'hidden'}`}
            >
                <div className="w-full max-w-md max-h-full"
                    style={{width: '300px'}}>
                    <div className="relative bg-white border border-white rounded-xl">
                        <div className="flex flex-col items-center mt-4 mb-4 p-4">
                            <div className="mt-2 font-bold font-poppins text-xl text-[#CF453B]">
                                Delete Feedback
                            </div>
                            <div className="font-semibold font-poppins text-md text-center text-[#344054] p-4">
                                Are you sure you want to delete the feedback?
                            </div>
                            <div className="flex flex-row mt-2 mb-2">
                                <button type="button" 
                                        onClick={() => setDelModalVisible(false)} 
                                        style={{ width: '120px' }} 
                                        className="mr-5 px-8 py-2 rounded text-[#344054] bg-[#E6E6E6] hover:bg-[#C4C4C4] hover:text-[#000000] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Cancel
                                </button>
                                <button type="button" 
                                        onClick={() => handleConfirmDeleteFeedback()} 
                                        style={{ width: '120px' }} 
                                        className="px-8 py-2 rounded text-[#CF453B] bg-[#F9DAD8] hover:bg-[#E2C7C5] hover:text-[#B83F36] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ marginLeft: '300px', 
                              marginTop: '130px' }} 
                     className="p-0 pb-0 pt-4">
                    {/* Feedback Table */}
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
                               className="font-poppins font-bold shadow-md">
                            <tr style={{  height: '60px' }}>
                                <th scope="col" 
                                    className="px-5 py-3 text-left">
                                    Username
                                </th>
                                <th scope="col" 
                                    className="px-5 py-3 text-left">
                                    Email
                                </th>
                                <th scope="col" 
                                    className="px-3 py-3 text-center">
                                    Feedback
                                </th>
                                <th scope="col" 
                                    className="px-3 py-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {getFeedbackForCurrentPage().map((feedback, index) => (
                                <React.Fragment key={feedback.id}>
                                    {/* Empty row for spacing */}
                                    {index !== getFeedbackForCurrentPage().length && (
                                        <tr style={{ height: '10px' }}></tr>
                                    )}
                                    <tr style={{ color: '#344054', 
                                                 backgroundColor: '#FFFFFF', 
                                                 fontSize: '16px' }} 
                                        className="font-poppins shadow-md">
                                        <td scope="row" 
                                            className="px-5 py-3 text-left">
                                            {feedback.user.name}
                                        </td>
                                        <td scope="row" 
                                            className="px-5 py-3 text-left">
                                            {feedback.user.email}
                                        </td>
                                        <td scope="row" 
                                            className="px-3 py-3 text-center">
                                            <button
                                                onClick={() => toggleVieModal(feedback.id)}
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
                                                View Feedback
                                            </button>
                                        </td>
                                        <td scope="row" className="py-2 flex items-center justify-center">
                                            <button
                                                onClick={() => toggleDelModal(feedback.id)}
                                                style={{ width: '80px' }}
                                                className="focus:outline-none text-xs text-[#CF453B] bg-[#F9DAD8] hover:bg-[#E2C7C5] hover:text-[#B83F36] font-medium font-poppins rounded-lg px-5 py-2 me-2 mb-1 mt-1 ml-2"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination for Feedback */}
                    <div className="mt-2 p-2 rounded-lg">
                        {Array.from({ length: Math.ceil(feedbackData.length / allFeedbackItemsPerPage) }, (_, index) => (
                            <button key={index + 1}
                                    className={`mx-1 px-3 py-2 text-xs font-bold rounded-full ${
                                        allFeedbackCurrentPage === index + 1 ? 'bg-[#344054] text-white' : 'bg-[#E6E6E6] text-[#4C4C4C] hover:bg-[#344054] hover:text-white'
                                    }`}
                                    onClick={() => setFeedbackCurrentPage(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
