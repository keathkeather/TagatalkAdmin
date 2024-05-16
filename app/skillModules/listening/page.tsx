'use client'

import EditorSidebar from '../../navs/EditorSidebar';
import EditorNavbar from '../../navs/EditorNavbar';
import { useRouter } from 'next/navigation';

const Listening = () => {

    const router = useRouter();

    const handleUnit = () => {
        
        router.push('/unit/listening');
    };


    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F5F6FA' }}>
        <EditorSidebar />
        <EditorNavbar />

        <div style={{ flex: 1 }}>
            <h2 className="font-semibold text-white my-4 font-poppins" 
                style={{ color: '#202224', fontSize: '30px', marginTop: '100px', marginLeft: '300px' }}>
                Listening
            </h2>
            <div className="flex flex-row items-center" 
                 style={{ marginLeft: '300px', marginTop: '20px' }}>
                
                <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105" 
                    onClick={() => handleUnit()}
                    style={{   width: '360px', 
                               height: '162px',
                               marginRight: '50px',
                               position: 'relative',
                               boxShadow: '0px 4px 1px rgba(0, 0, 0, 0.1)',
                               borderRadius: '20px',
                               background: 'linear-gradient(to right, #007FDB, #00C9FF)',
                               transition: 'color 0.3s ease'}}>
                    <div className="flex flex-col">
                       
                        <span className="font-nunito font-bold" 
                              style={{ color: '#', fontSize: '28px', textAlign: 'center', marginTop:'30px'}}>
                            Unit 1
                        </span>

                        <span className="font-Poppins" 
                              
                              style={{ color: '#ffffff', fontSize: '14px', textAlign: 'center',  fontWeight: '300', marginTop:'10px'}}>
                            Let’s learn basic conversations!
                        </span>
                    </div>

                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            style={{ color: '#FFFFFF', marginTop: '10px', position: 'absolute', top: '10px', right: '10px', marginRight:'20px', transition: 'transform 0.3s ease' }}
                            onMouseOver={(event) => event.currentTarget.style.transform = 'scale(1.1)'} 
                            onMouseOut={(event) => event.currentTarget.style.transform = 'scale(1)'} 
                        >
                                <path d="M10 15L10 12" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round"/>
                                <path d="M14 15L14 12" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round"/>
                                <path d="M3 7H21V7C20.0681 7 19.6022 7 19.2346 7.15224C18.7446 7.35523 18.3552 7.74458 18.1522 8.23463C18 8.60218 18 9.06812 18 10V16C18 17.8856 18 18.8284 17.4142 19.4142C16.8284 20 15.8856 20 14 20H10C8.11438 20 7.17157 20 6.58579 19.4142C6 18.8284 6 17.8856 6 16V10C6 9.06812 6 8.60218 5.84776 8.23463C5.64477 7.74458 5.25542 7.35523 4.76537 7.15224C4.39782 7 3.93188 7 3 7V7Z" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round"/>
                                <path d="M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105" 
                    style={{   width: '360px', 
                               height: '162px',
                               marginRight: '50px',
                               position: 'relative',
                               boxShadow: '0px 4px 1px rgba(0, 0, 0, 0.1)',
                               borderRadius: '20px',
                               background: 'linear-gradient(to right, #007FDB, #00C9FF)',
                               transition: 'color 0.3s ease'}}>

                     <div className="flex flex-col">
                       
                       <span className="font-nunito font-bold" 
                             style={{ color: '#', fontSize: '28px', textAlign: 'center', marginTop:'30px'}}>
                           Unit 2
                       </span>

                       <span className="font-Poppins" 
                             
                             style={{ color: '#ffffff', fontSize: '14px', textAlign: 'center',  fontWeight: '300', marginTop:'10px'}}>
                           Try talking about your daily activities!
                       </span>

                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            style={{ color: '#FFFFFF', marginTop: '10px', position: 'absolute', top: '10px', right: '10px', marginRight:'20px', transition: 'transform 0.3s ease' }}
                            onMouseOver={(event) => event.currentTarget.style.transform = 'scale(1.1)'} 
                            onMouseOut={(event) => event.currentTarget.style.transform = 'scale(1)'} 
                        >
                                <path d="M10 15L10 12" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round"/>
                                <path d="M14 15L14 12" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round"/>
                                <path d="M3 7H21V7C20.0681 7 19.6022 7 19.2346 7.15224C18.7446 7.35523 18.3552 7.74458 18.1522 8.23463C18 8.60218 18 9.06812 18 10V16C18 17.8856 18 18.8284 17.4142 19.4142C16.8284 20 15.8856 20 14 20H10C8.11438 20 7.17157 20 6.58579 19.4142C6 18.8284 6 17.8856 6 16V10C6 9.06812 6 8.60218 5.84776 8.23463C5.64477 7.74458 5.25542 7.35523 4.76537 7.15224C4.39782 7 3.93188 7 3 7V7Z" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round"/>
                                <path d="M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round"/>
                        </svg>

                   </div>
                    
                </div>
                <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105" 
                     style={{   width: '360px', 
                                height: '162px',
                                position: 'relative',
                                boxShadow: '0px 4px 1px rgba(0, 0, 0, 0.1)',
                                borderRadius: '20px',
                                backgroundColor: '#d0d5dd',
                                transition: 'color 0.3s ease'}}>

                    <svg width="102" height="110" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg" 
                    style={{ color: '#FFFFFF', marginTop: '10px', width: 'auto', height: 'auto' }}>
                        <path d="M51 25.5V51M51 51V76.5M51 51H76.5M51 51L25.5 51" stroke="#ffffff" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>      
                </div>
            </div>
            <div style={{ marginLeft: '300px', marginTop: '20px' }}>
                
            </div>
        </div>
    </div>
    );
};

export default Listening;
