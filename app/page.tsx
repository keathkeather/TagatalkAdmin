'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClearEntries = () => {
        setUsername('');
        setPassword('');
    };

    const handleAdminLogin = () => {
        // add here logic for authentication
        router.push('/dashboard');
    };

    const handleContentEditorLogin = () => {
        // add here logic for authentication
        router.push('/skillModules');
    };

    return (
        <div className="relative w-full h-screen">
            {/* Background Image */}
            <div className="absolute inset-0" 
                 style={{ backgroundImage: 'url(/albg.svg)', 
                 backgroundSize: 'cover', 
                 backgroundPosition: 'center', 
                 backgroundRepeat: 'no-repeat' }}>
            </div>
            {/* Form Container */}
            <div className="absolute z-10 flex flex-col justify-center items-center w-full h-full">
                {/* Admin Access Module Text */}
                <h2 className="font-semibold text-white my-4 font-poppins" 
                    style={{ fontSize: '25px', 
                             marginTop: '-40px' }}>
                    Admin Access Module
                </h2>
                {/* Form */}
                <div className="bg-white rounded-3xl p-16 shadow-lg" 
                     style={{ width: '40%' }}>
                    <form>
                        {/* Tagatalk Logo */}
                        <div className="flex justify-center" 
                             style={{ marginTop: '-20px' }}>
                            <Image src="/ttlogo.svg" 
                                   alt="TT Logo" 
                                   width={300} 
                                   height={150} 
                                   style={{ width: "65%", 
                                            height: "auto" }} 
                                   priority/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" 
                                   className="block text-sm font-semibold font-poppins" 
                                   style={{ color: '#344054' }}>
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ fontSize: '16px', 
                                         color: '#344054', 
                                         backgroundColor: '#F8F8F8' }}
                                className="font-poppins mt-1 p-3 block w-full rounded-3xl"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" 
                                   className="block text-sm font-semibold font-poppins" 
                                   style={{ color: '#344054' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ fontSize: '16px', 
                                         color: '#344054', 
                                         backgroundColor: '#F8F8F8' }}
                                className="font-poppins mt-1 p-3 block w-full rounded-3xl"
                            />
                        </div>
                        <div className="flex justify-between mt-8">
                            <button type="button" 
                                    onClick={handleClearEntries} 
                                    className="text-sm font-semibold text-[#344054] bg-[#ffffff] hover:bg-[#E6E6E6] hover:text-[#1E2530] px-4 py-2 rounded-3xl border border-gray-300 font-poppins" 
                                    style={{ width: '150px' }}>
                                Clear Entries
                            </button>
                            {/*
                            <button type="button" 
                                    onClick={handleContentEditorLogin} 
                                    className="text-sm font-semibold text-[#ffffff] bg-[#FD9F10] hover:bg-[#D8890F] hover:text-[#E2E2E2] px-4 py-2 rounded-3xl font-poppins" 
                                    style={{ width: '150px' }}>
                                Editor Login
                            </button> 
                            */}    
                            <button type="button" 
                                    onClick={handleAdminLogin} 
                                    className="text-sm font-semibold text-[#ffffff] bg-[#212121] hover:bg-[#000000] hover:text-[#E2E2E2] px-4 py-2 rounded-3xl font-poppins" 
                                    style={{ width: '150px' }}>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;