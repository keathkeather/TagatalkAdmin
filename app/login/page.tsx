// pages/login.tsx

"use client"

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { handleLogin } from '../api/auth';
const Login = () => {
    const router = useRouter();
    const formReference = useRef<HTMLFormElement>(null);
    const [email , setEmail] = useState<string>('');
    const [password , setPassword] = useState<string>('');
    const handleAdminLogin = async (event: React.FormEvent) => {
        event.preventDefault();  // Prevent default form submission

        try {
            const formData = new FormData(formReference.current!);
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            await handleLogin(email,password)
            router.push('/dashboard');
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                alert('Login Failed');
            }
        }
    };
    const handleClearEntries = () => {
        if (formReference.current) {
            formReference.current.reset();
        }
    };

    return (
        <div className="relative w-full h-screen">
            <div className="absolute inset-0"
                 style={{ backgroundImage: 'url(/albg.svg)', 
                          backgroundSize: 'cover', 
                          backgroundPosition: 'center', 
                          backgroundRepeat: 'no-repeat' }}>
            </div>
            <div className="absolute z-10 flex flex-col justify-center items-center w-full h-full">
                <h2 className="font-semibold text-white my-4 font-poppins" 
                    style={{ fontSize: '25px', 
                             marginTop: '-40px' }}>
                    Admin Access Module
                </h2>
                <div className="bg-white rounded-3xl p-16 shadow-lg" 
                     style={{ width: '40%' }}>
                    <form ref={formReference} onSubmit={handleAdminLogin}>
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
                            <label htmlFor="email" 
                                   className="block text-sm font-semibold font-poppins" 
                                   style={{ color: '#344054' }}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
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
                                style={{ fontSize: '16px', 
                                         color: '#344054', 
                                         backgroundColor: '#F8F8F8' }}
                                className="font-poppins mt-1 p-3 block w-full rounded-3xl"
                            />
                        </div>
                        <div className="flex justify-between mt-8">
                            <button type="button" 
                                    className="text-sm font-semibold text-[#344054] bg-[#ffffff] hover:bg-[#E6E6E6] hover:text-[#1E2530] px-4 py-2 rounded-3xl border border-gray-300 font-poppins" 
                                    style={{ width: '150px' }}
                                    onClick={handleClearEntries}>
                                Clear Entries
                            </button>
                            <button type="submit" 
                                    className="text-sm font-semibold text-[#ffffff] bg-[#FD9F10] hover:bg-[#D8890F] hover:text-[#E2E2E2] px-4 py-2 rounded-3xl font-poppins" 
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
