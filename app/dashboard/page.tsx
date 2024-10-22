'use client'

import React, { useState, useEffect } from 'react';
import { useUserData, useBannedUserData } from '../calls/UsersFunctions';
import { useFeedbackData } from '../calls/FeedbackFunctions';
import { useReportsData } from '../calls/ReportsFunctions';
import { useLeaderboardData } from '../calls/LeaderboardFunctions';
import { useLoginSummaryData, useProgressSummaryData, useSkillProgressData } from '../calls/AnalyticsFuntions';
import Image from 'next/image';
import Sidebar from '../navs/Sidebar';
import Navbar from '../navs/Navbar';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

const Dashboard = () => {
    const [totalActiveUsers, setTotalActiveUsers] = useState(0);
    const [totalBannedUsers, setTotalBannedUsers] = useState(0);
    const [totalFeedback, setTotalFeedback] = useState(0);
    const [totalCompletedLessons, setTotalCompletedLessons] = useState(0);
    const [totalReports, setTotalReports] = useState(0);
    const usersData = useUserData();
    const bannedUsersData = useBannedUserData();    
    const feedbackData = useFeedbackData();
    const reportsData = useReportsData();
    const leaderboardData = useLeaderboardData();
    const dailyLoginSummary = useLoginSummaryData('DAY');
    const weeklyLoginSummary = useLoginSummaryData('WEEK');
    const skillProgress = useSkillProgressData();
    const progressSummary = useProgressSummaryData();

    useEffect(() => {
        setTotalActiveUsers(usersData.length);
        setTotalBannedUsers(bannedUsersData.length);
        setTotalFeedback(feedbackData.length);
        setTotalReports(reportsData.length);
        if (progressSummary.length > 0) {
            const totalProgress = progressSummary.reduce((total, entry) => total + entry.progressCount, 0);
            setTotalCompletedLessons(totalProgress);
        }
    }, [usersData, bannedUsersData, feedbackData, reportsData, progressSummary]);

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD

    // Convert to text format (e.g., "October 22, 2024")
    const [year, month, day] = today.split('-'); // Split into year, month, day
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const todayText = `${monthNames[parseInt(month) - 1]} ${parseInt(day) + 1}, ${year}`; // Format to "Month Day, Year"

    // Line chart data for the current day, displaying every 4-hour login trends
    const hours = Array.from({ length: 6 }, (_, i) => i * 4); // Creates an array [0, 4, 8, 12, 16, 20]

    const lineData = {
        labels: hours.map(hour => {
            return hour.toString().padStart(2, '0') + ':00'; // Format as "00:00", "04:00", ..., "20:00"
        }),
        datasets: [
            {
                label: 'User Logins',
                data: hours.map(hour => {
                    // Find the entry for the current 4-hour interval in dailyLoginSummary
                    const entry = dailyLoginSummary.find(entry => {
                        const date = new Date(entry.periodStart); // Parse the UTC time
                        return date.getUTCHours() === hour; // Compare in UTC to get the correct hour interval
                    });
                    return entry ? entry.loginCount : 0; // Return the login count or 0 if not found
                }),
                borderColor: '#2D9CDB',
                backgroundColor: '#d1f1ff',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true
                },
                grid: {
                    display: false
                },
            },
            y: {
                title: {
                    display: true
                },
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                },
                beginAtZero: true,
                min: 0,
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderWidth: 1,
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        },
    };

    // data for the doughnut chart
    const doughnutData = {
        labels: skillProgress ? Object.keys(skillProgress) : ['Reading', 'Speaking', 'Listening', 'Writing'], // Default labels if API data isn't available yet
        datasets: [
            {
                label: 'Completed Lessons',
                data: skillProgress ? Object.values(skillProgress).map(skill => skill.progressCount) : [25, 30, 20, 25], // Using API data for progress
                backgroundColor: ['#E33230', '#BF85FA', '#02B7E8', '#58CC02'],
                borderWidth: 0,
            },
        ],
    }; 

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true, 
                position: 'right' as const,
                labels: {
                    boxWidth: 10,
                    padding: 5,
                },
            },
            tooltip: {
                backgroundColor: 'rgba(75, 75, 75, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
            },
        },
        cutout: '75%',
    };

    // Array of days of the week (Sunday to Saturday)
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Assuming weeklyLoginSummary contains entries for each day, with `periodStart` in UTC
    const barData = {
        labels: daysOfWeek,
        datasets: [
            {
                label: 'User Logins',
                data: daysOfWeek.map((day, index) => {
                    // Get the target day of the week based on UTC time
                    const today = new Date();
                    const currentDayUTC = today.getUTCDay(); // Current UTC day (0 = Sun, 1 = Mon, ..., 6 = Sat)

                    // Calculate the correct date for the given day of the week in UTC
                    const targetDate = new Date(today);
                    targetDate.setUTCDate(today.getUTCDate() - (currentDayUTC - index));

                    // Format the target date to 'YYYY-MM-DD' in UTC to match weeklyLoginSummary
                    const formattedDate = targetDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'

                    // Find the entry for the formatted date in weeklyLoginSummary
                    const entry = weeklyLoginSummary.find(entry => {
                        return entry.periodStart.split('T')[0] === formattedDate; // Compare only the date part
                    });

                    // Return the login count or 0 if no entry is found for that day
                    return entry ? entry.loginCount : 0;
                }),
                backgroundColor: '#FD9F10',
                borderRadius: 20,
                borderWidth: 0,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, 
            },
            tooltip: {
                backgroundColor: 'rgba(75, 75, 75, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
            },
        },
        scales: {
            x: {
                title: {
                    display: false,
                    text: 'Days of the Week',
                },
                grid: {
                    display: false,
                },
            },
            y: {
                title: {
                    display: false,
                    text: 'Number of New Users',
                },
                ticks: {
                    display: false
                },
                grid: {
                    display: false,
                },
                beginAtZero: true,  // Ensure Y-axis starts from zero
                min: 0,
            },
        },
    };

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#F5F6FA', overflowX: 'hidden' }}>
            <Sidebar />
            <Navbar pageTitle="Dashboard" />
            <div style={{ flex: 1 }}>
                <div className="flex flex-row items-center" 
                     style={{ marginLeft: '300px', marginTop: '145px' }}>
                    <div className="bg-white rounded-xl shadow-md p-4 flex flex-row items-center justify-between" 
                         style={{ width: '260px', height: '115px', marginRight: '47px' }}>
                        <div className="flex flex-col">
                            <span className="font-nunito" 
                                  style={{ color: '#545F71', fontSize: '15px', marginRight: '50px' }}>
                                Total Active Users
                            </span>
                            <span className="font-nunito font-bold" 
                                  style={{ color: '#202224', fontSize: '28px' }}>
                                {totalActiveUsers}
                            </span>
                        </div>
                        <Image src="/dicon1.svg" 
                               alt="Dashboard Icon 1" 
                               width={60} 
                               height={60} 
                               style={{ marginRight: '10px', width: '30%', height: '100%' }}/>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-4 flex flex-row items-center justify-between" 
                         style={{ width: '260px', height: '115px', marginRight: '47px' }}>
                        <div className="flex flex-col">
                            <span className="font-nunito" 
                                  style={{ color: '#545F71', fontSize: '15px', marginRight: '30px' }}>
                                Total Completed Lessons
                            </span>
                            <span className="font-nunito font-bold" 
                                  style={{ color: '#202224', fontSize: '28px' }}>
                                {totalCompletedLessons}
                            </span>
                        </div>
                        <Image src="/dicon6.svg" 
                               alt="Dashboard Icon 6" 
                               width={60} 
                               height={60} 
                               style={{ marginRight: '10px', width: '30%', height: '100%' }}/>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-4 flex flex-row items-center justify-between" 
                         style={{ width: '260px', height: '115px', marginRight: '47px' }}>
                        <div className="flex flex-col">
                            <span className="font-nunito" 
                                  style={{ color: '#545F71', fontSize: '15px', marginRight: '50px' }}>
                                Current No. Of Reports
                            </span>
                            <span className="font-nunito font-bold" 
                                  style={{ color: '#202224', fontSize: '28px' }}>
                                {totalReports}
                            </span>
                        </div>
                        <Image src="/dicon5.svg" 
                               alt="Dashboard Icon 5" 
                               width={60} 
                               height={60} 
                               style={{ marginRight: '10px', width: '30%', height: '100%' }}/>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-4 flex flex-row items-center justify-between" 
                         style={{ width: '260px', height: '115px', marginRight: '47px' }}>
                        <div className="flex flex-col">
                            <span className="font-nunito" 
                                  style={{ color: '#545F71', fontSize: '15px', marginRight: '50px' }}>
                                Total Banned Users
                            </span>
                            <span className="font-nunito font-bold" 
                                  style={{ color: '#202224', fontSize: '28px' }}>
                                {totalBannedUsers}
                            </span>
                        </div>
                        <Image src="/dicon4.svg" 
                               alt="Dashboard Icon 4" 
                               width={60} 
                               height={60} 
                               style={{ marginRight: '10px', width: '30%', height: '100%' }}/>
                    </div>
                </div>
                <div className="flex flex-row"
                     style={{ marginRight: '47px' }}>

                    <div className="flex flex-col"
                        style={{ marginLeft: '300px', marginTop: '10px' }}>

                        <div className="bg-white rounded-xl shadow-md p-4" 
                            style={{ width: '874px', height: '350px', marginTop: '35px' }}>
                            <div className="flex flex-col"
                                 style={{ marginLeft: '25px', marginBottom: '25px' }}>
                                <span className="font-nunito font-bold" 
                                    style={{ color: '#464255', fontSize: '20px' }}>
                                    Daily User Logins Trend
                                </span>
                                <span className="font-nunito" 
                                    style={{ color: '#B9BBBD', fontSize: '15px' }}>
                                    Number of user logins every 4 hours in {todayText}
                                </span>
                            </div>
                            {/* Line Chart */}
                            <div style={{ marginLeft: '-5px', marginTop: '10px', width: '100%', height: '85%'}}>
                                <Line data={lineData} options={lineOptions} width={800} height={270}/>
                            </div>
                        </div>

                        <div className="flex flex-row"
                            style={{ marginTop: '10px', marginBottom: '50px' }}>

                            <div className="bg-white rounded-xl shadow-md p-4" 
                                style={{ width: '414px', height: '250px', marginRight: '46px', marginTop: '35px' }}>
                                <div className="flex flex-col items-center justify-between"
                                     style={{ marginBottom: '10px' }}>
                                    <span className="font-nunito font-bold" 
                                        style={{ color: '#464255', fontSize: '15px' }}>
                                        Weekly Skill Completion Distribution
                                    </span>
                                </div>
                                {/* Doughnut Chart */}
                                <div style={{ marginLeft: '-25px', marginTop: '10px', width: '100%', height: '85%' }}>
                                    <Doughnut data={doughnutData} options={doughnutOptions} width={200} height={100}/>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-4" 
                                style={{ width: '414px', height: '250px', marginRight: '47px', marginTop: '35px' }}>
                                <div className="flex flex-col items-center justify-between"
                                     style={{ marginBottom: '20px' }}>
                                    <span className="font-nunito font-bold" 
                                        style={{ color: '#464255', fontSize: '15px' }}>
                                        Weekly User Logins Overview
                                    </span>
                                </div>
                                {/* Bar Chart */}
                                <div style={{ marginLeft: '-5px', marginTop: '10px', width: '100%', height: '85%' }}>
                                    <Bar data={barData} options={barOptions} width={200} height={100}/>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-4" 
                         style={{ width: '260px', height: '645px', marginRight: '47px', marginTop: '45px' }}>  
                        <div className="flex flex-col items-center justify-between">
                            <span className="font-nunito font-bold" 
                                style={{ color: '#464255', fontSize: '20px' }}>
                                Top 10 Users
                            </span>
                        </div>
                        <div className="flex flex-col mt-4 space-y-4">
                            {leaderboardData.map((user, index) => (
                                <div key={user.userId} className="flex items-center">
                                    {/* Rank, Username, and Score */}
                                    <div className="flex justify-between items-center w-full" style={{ marginTop: '16px' }}>
                                        {/* Rank */}
                                        <span className="font-nunito" style={{ color: '#808080', fontSize: '16px', width: '20px', textAlign: 'right', marginLeft: '-5px' }}>
                                            {user.rank}
                                        </span>
                                        {/* Username */}
                                        <span className="font-nunito font-bold" 
                                              style={{ color: '#464255',
                                                       fontSize: '16px',
                                                       maxWidth: '100px',
                                                       whiteSpace: 'nowrap', 
                                                       overflow: 'hidden', 
                                                       textOverflow: 'ellipsis',
                                                       flex: 1,
                                                       marginLeft: '-5px' }}
                                              title={user.name || 'Anonymous'}>
                                            {user.name || 'Anonymous'}
                                        </span>
                                        {/* Points */}
                                        <span className="font-nunito" 
                                              style={{ color: '#808080',
                                                       fontSize: '16px',
                                                       textAlign: 'right',
                                                       width: '70px',
                                                       maxWidth: '70px',
                                                       whiteSpace: 'nowrap', 
                                                       overflow: 'hidden', 
                                                       textOverflow: 'ellipsis' }}
                                              title={user.userPoints > 9999 ? `${user.userPoints} pts` : `${user.userPoints} pts`}>
                                            {user.userPoints > 9999 ? '9999+' : `${user.userPoints} pts`}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
