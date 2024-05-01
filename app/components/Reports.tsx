"use client";

import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Reports = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F5F6FA' }}>
            <Sidebar />
            <Navbar />
            <div style={{ flex: 1 }}>
                <h2 className="font-semibold text-white my-4 font-poppins" style={{ color: '#202224', fontSize: '30px', marginTop: '100px', marginLeft: '300px' }}>Reports</h2>
                <div style={{ marginLeft: '300px', marginTop: '20px' }} className="p-0 pb-0 pt-4">
                    {/* Reports Table */}
                    <table style={{ width: '1180px' }}>
                        <colgroup>
                            <col style={{ width: '300px' }} />
                            <col style={{ width: '300px' }} />
                            <col style={{ width: '240px' }} />
                            <col style={{ width: '240px' }} />
                        </colgroup>
                        <thead style={{ color: '#344054', backgroundColor: '#FFFFFF', fontSize: '16px' }} className="font-poppins font-bold shadow-md">
                            <tr style={{  height: '60px' }}>
                                <th scope="col" className="px-5 py-3 text-left">Username</th>
                                <th scope="col" className="px-5 py-3 text-left">Email</th>
                                <th scope="col" className="px-3 py-3 text-center">Hours Played</th>
                                <th scope="col" className="px-3 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {/* Render Reports data rows here */}
                        </tbody>
                    </table>
                    {/* Pagination for Reports */}
                    <div className="flex justify-center mt-4 p-2 rounded-lg">
                        {/* Pagination buttons */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
