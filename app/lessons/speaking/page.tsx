'use client'

import EditorSidebar from '../../navs/EditorSidebar';
import EditorNavbar from '../../navs/EditorNavbar';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; 


const Speaking = () => {
    const router = useRouter();

    interface Lesson {
        id: string;
        title: string;
    }
    const pathname = usePathname();
    const params = useSearchParams();
    const lessonId = params.get('lessonId'); 
    const lessonTitle = params.get('lessonTitle');
    
    const handleUnit = () => {
        router.push('/unit/speaking');
    };

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F5F6FA' }}>
        <EditorSidebar />
        <EditorNavbar />

        <div style={{ flex: 1 }}>
     
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '300px', marginTop: '100px' }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" 
                        onClick={() => handleUnit()}
                        style={{ cursor: 'pointer', marginRight: '20px' }}>
                        <path d="M22.5 28.5L12 18L22.5 7.5" stroke="#545F71" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <div>
                        <h2 className="font-poppins" 
                            style={{ color: '#545f71', fontSize: '18px', fontWeight: '700' }}>
                            Lesson {lessonId}
                        </h2>
                        
                        <h2 className="font-poppins" 
                            style={{ color: '#545f71', fontSize: '24px', fontWeight: '700' }}>
                            {lessonTitle}
                        </h2>
                    </div>
                </div>

            <div className="flex flex-row items-center" 
                 style={{ marginLeft: '350px', marginTop: '20px' }}>
                
                <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105" 
                    style={{   width: '100%', 
                               height: '205px',
                               marginRight: '50px',
                               position: 'relative',
                               boxShadow: '0px 4px 1px rgba(0, 0, 0, 0.1)',
                               borderRadius: '20px',
                               background: 'linear-gradient(to right, #9028F8, #BF85FA)',
                               transition: 'color 0.3s ease',
                               justifyContent: 'center',
                               alignItems: 'center'}}>
                                
                    <div className="flex flex-col" >
                       
                        <span className="font-nunito font-bold" 
                              style={{ color: '#', fontSize: '28px', textAlign: 'center'}}>
                            Speak the sentence
                        </span>
                        
                    </div>
   
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105" 
                    style={{   width: '100%', 
                               height: '205px',
                               marginRight: '50px',
                               position: 'relative',
                               boxShadow: '0px 4px 1px rgba(0, 0, 0, 0.1)',
                               borderRadius: '20px',
                               background: 'linear-gradient(to right, #9028F8, #BF85FA)',
                               transition: 'color 0.3s ease',
                               justifyContent: 'center',
                               alignItems: 'center'}}>

                     <div className="flex flex-col">
                       
                       <span className="font-nunito font-bold" 
                             style={{ color: '#', fontSize: '28px', textAlign: 'center'}}>
                           Guess the image
                       </span>

                   </div>
                    
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105" 
                    style={{   width: '100%', 
                               height: '205px',
                               marginRight: '50px',
                               position: 'relative',
                               boxShadow: '0px 4px 1px rgba(0, 0, 0, 0.1)',
                               borderRadius: '20px',
                               background: 'linear-gradient(to right, #9028F8, #BF85FA)',
                               transition: 'color 0.3s ease',
                               justifyContent: 'center', 
                               alignItems: 'center'}}>
                    <div className="flex flex-col">
                       
                        <span className="font-nunito font-bold" 
                              style={{ color: '#', fontSize: '28px', textAlign: 'center'}}>
                            Complete the Conversation
                        </span>

                    </div>
   
                </div>
            </div>
            <div style={{ marginLeft: '350px', marginTop: '20px' }}>
                
            </div>
        </div>
    </div>
    );
};

export default Speaking;
