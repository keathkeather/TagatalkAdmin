'use client'

import EditorSidebar from '../../navs/EditorSidebar';
import EditorNavbar from '../../navs/EditorNavbar';
import { useRouter } from 'next/navigation';

const Reading = () => {

    const router = useRouter();
    
    const handleSkills = () => {
        
        router.push('/skillModules/reading');
    };


    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F5F6FA' }}>
        <EditorSidebar />
        <EditorNavbar />

        <div style={{ flex: 1 }}>

        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" 
            onClick={() => handleSkills()}
            style={{ position: 'absolute', left: '36vh', top: '14vh', cursor: 'pointer' }}>
                    <path d="M22.5 28.5L12 18L22.5 7.5" stroke="#545F71" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
            <h2 className="font-poppins" 
                style={{ color: '#545f71', fontSize: '18px', marginTop: '100px', marginLeft: '350px', fontWeight: '700' }}>
                Reading
            </h2>
            
            <h2 className="font-poppins" 
                style={{ color: '#545f71', fontSize: '24px', marginLeft: '350px', fontWeight: '700' }}>
                Unit 1
            </h2>

            <div style={{ marginLeft: '350px', marginTop: '20px' }}>
                
            </div>
        </div>
    </div>
    );
};

export default Reading;
