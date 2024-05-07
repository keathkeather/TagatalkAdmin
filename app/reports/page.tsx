'use client'

import React, { useState } from 'react';
import { useReportsData, useDeleteReport } from '../calls/ReportsFunctions';
import Sidebar from '../navs/Sidebar';
import Navbar from '../navs/Navbar';

const Reports = () => {
    const allReportsItemsPerPage = 6;
    const [allReportsCurrentPage, setReportsCurrentPage] = useState(1);
    const [isVieModalVisible, setVieModalVisible] = useState(false);
    const [isDelModalVisible, setDelModalVisible] = useState(false);
    const allReportsModalVisible = isVieModalVisible || isDelModalVisible;
    const reportsData = useReportsData();
    const [selectedDelReportId, setSelectedDelReportId] = useState<string>("");
    const [selectedVieReportId, setSelectedVieReportId] = useState<string>("");
    const { deleteReport } = useDeleteReport(selectedDelReportId);

    const toggleVieModal = (id: string) => {
        setSelectedVieReportId(id);
        setVieModalVisible(!isVieModalVisible);
    };

    const selectedReport = reportsData.find(report => report.id === selectedVieReportId);

    const toggleDelModal = (id: string) => {
        setSelectedDelReportId(id);
        setDelModalVisible(!isDelModalVisible);
    };

    const getReportsForCurrentPage = () => {
        const startIndex = (allReportsCurrentPage - 1) * allReportsItemsPerPage;
        const endIndex = startIndex + allReportsItemsPerPage;
        return reportsData.slice(startIndex, endIndex);
    };

    const handleConfirmDeleteReport = async () => {
        console.log(selectedDelReportId);
        try {
            await deleteReport();
            setDelModalVisible(false);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting report:', error);
        }
    };

    return (
        <div style={{ display: 'flex', 
                      height: '100vh', 
                      backgroundColor: '#F5F6FA' }}>

            {allReportsModalVisible && (
                <div className="r-overlay"></div>
            )}

            <style>
                {`
                .r-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 100;
                }

                .r-modal {
                    position: fixed;
                    top: 31%;
                    left: 40%;
                    z-index: 101;
                }

                .r-modal-open {
                    overflow: hidden;
                }
                `}
            </style>

            <Sidebar />
            <Navbar />

            <div
                id="r-modal"
                className={`r-modal ${isVieModalVisible ? '' : 'hidden'}`}
            >
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
                    <div className="w-[600px] h-[350px] bg-white rounded-xl">
                        {/* Header section */}
                        <div className="bg-[#FD9F10] rounded-t-lg text-white p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-poppins font-semibold ml-2">
                                Report Details
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
                        {/* Report Details */}
                        <div className='p-8 pt-2 font-poppins text-[#344054] overflow-y-auto' style={{ maxHeight: '250px' }}>
                            <div className="flex flex-row items-center justify-between mt-5">
                                <div className="flex flex-col">
                                    <h1 className="text-xl font-bold">
                                        Title
                                    </h1>
                                    <p className="mt-2 text-sm">
                                        {selectedReport?.reportTitle}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-xl font-bold">
                                        Submission
                                    </h1>
                                    <p className="mt-2 text-sm">
                                        {selectedReport ? 
                                                new Date(selectedReport.createdAt).toLocaleString('en-US', {
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
                                Report
                            </h1>
                            <p className="mt-2 text-sm">
                                {selectedReport?.reportDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="r-modal"
                className={`r-modal ${isDelModalVisible ? '' : 'hidden'}`}
            >
                <div className="w-full max-w-md max-h-full"
                     style={{width: '300px'}}>
                    <div className="relative bg-white border border-white rounded-xl">
                        <div className="flex flex-col items-center mt-4 mb-4 p-4">
                            <div className="mt-2 font-bold font-poppins text-xl text-[#CF453B]">
                                Delete Report
                            </div>
                            <div className="font-semibold font-poppins text-md text-center text-[#344054] p-4">
                                Are you sure you want to delete the report?
                            </div>
                            <div className="flex flex-row mt-2 mb-2">
                                <button type="button" 
                                        onClick={() => setDelModalVisible(false)} 
                                        style={{ width: '120px' }} 
                                        className="mr-5 px-8 py-2 rounded text-[#344054] bg-[#E6E6E6] hover:bg-[#C4C4C4] hover:text-[#000000] font-semibold font-poppins cursor-pointer text-center text-sm">
                                    Cancel
                                </button>
                                <button type="button" 
                                        onClick={() => handleConfirmDeleteReport()} 
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
                <h2 className="font-semibold text-white my-4 font-poppins" 
                    style={{ color: '#202224', 
                             fontSize: '30px', 
                             marginTop: '100px', 
                             marginLeft: '300px' }}>
                    Reports
                </h2>
                <div style={{ marginLeft: '300px', 
                              marginTop: '20px' }} 
                     className="p-0 pb-0 pt-4">
                    {/* Reports Table */}
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
                                    className="px-3 py-3 text-center">
                                    Report
                                </th>
                                <th scope="col" 
                                    className="px-3 py-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {getReportsForCurrentPage().map((reports, index) => (
                                <React.Fragment key={reports.id}>
                                    {/* Empty row for spacing */}
                                    {index !== getReportsForCurrentPage().length && (
                                        <tr style={{ height: '10px' }}></tr>
                                    )}
                                    <tr style={{ color: '#344054', 
                                                 backgroundColor: '#FFFFFF', 
                                                 fontSize: '16px' }} 
                                        className="font-poppins shadow-md">
                                        <td scope="row" 
                                            className="px-5 py-3 text-left">
                                            {reports.user.name}
                                        </td>
                                        <td scope="row" 
                                            className="px-5 py-3 text-left">
                                            {reports.user.email}
                                        </td>
                                        <td scope="row" 
                                            className="px-3 py-3 text-center">
                                            <button
                                                onClick={() => toggleVieModal(reports.id)}
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
                                                View Report
                                            </button>
                                        </td>
                                        <td scope="row" 
                                            className="py-2 flex items-center justify-center">
                                            <button
                                                onClick={() => toggleDelModal(reports.id)}
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
                    {/* Pagination for Reports */}
                    <div className="mt-2 p-2 rounded-lg">
                        {Array.from({ length: Math.ceil(reportsData.length / allReportsItemsPerPage) }, (_, index) => (
                            <button key={index + 1}
                                    className={`mx-1 px-3 py-2 text-xs font-bold rounded-full ${
                                        allReportsCurrentPage === index + 1 ? 'bg-[#344054] text-white' : 'bg-[#E6E6E6] text-[#4C4C4C] hover:bg-[#344054] hover:text-white'
                                    }`}
                                    onClick={() => setReportsCurrentPage(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
