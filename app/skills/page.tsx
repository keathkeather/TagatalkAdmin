'use client'

import { useRouter } from 'next/navigation';
import EditorSidebar from '../navs/EditorSidebar';
import EditorNavbar from '../navs/EditorNavbar';

const Skills = () => {
    const router = useRouter();

    const handleReadingClick = () => {
        console.log(`Clicked on Reading`);
        router.push('/skills/reading');
    };

    const handleSpeakingClick = () => {
        console.log(`Clicked on Speaking`);
        router.push('/skills/speaking');
    };

    const handleListeningClick = () => {
        console.log(`Clicked on Listening`);
        router.push('/skills/listening');
    };

    const handleWritingClick = () => {
        console.log(`Clicked on Writing`);
        router.push('/skills/writing');
    };

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F5F6FA' }}>
            <EditorSidebar />
            <EditorNavbar />
            <div style={{ flex: 1 }}>
                <h2 className="font-semibold text-white my-4 font-poppins" 
                    style={{ color: '#202224', fontSize: '30px', marginTop: '100px', marginLeft: '300px' }}>
                    Skill Modules
                </h2>
                <div className="flex flex-col" 
                     style={{ marginLeft: '300px', marginTop: '20px' }}>
                    <div className="flex flex-row">
                        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105" 
                             style={{ width: '565px', height: '225px', marginRight: '50px', background: 'linear-gradient(to right, #E33230, #FE6F42)', transition: 'background-color 0.3s ease' }}
                             onClick={() => handleReadingClick()}>
                            <span className="font-poppins" 
                                  style={{ color: '#F8F8FF', fontSize: '30px', fontWeight: 'bold', marginTop: '70px', transition: 'color 0.3s ease' }}>
                                Reading
                            </span>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105" 
                             style={{ width: '565px', height: '225px', marginRight: '50px', background: 'linear-gradient(to right, #9028F8, #BF85FA)', transition: 'background-color 0.3s ease' }}
                             onClick={() => handleSpeakingClick()}>
                            <span className="font-poppins" 
                                  style={{ color: '#F8F8FF', fontSize: '30px', fontWeight: 'bold', marginTop: '70px', transition: 'color 0.3s ease' }}>
                                Speaking
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-row"
                         style={{ marginTop: '40px' }}>
                        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105" 
                             style={{ width: '565px', height: '225px', marginRight: '50px', background: 'linear-gradient(to right, #007FDB, #00C9FF)', transition: 'background-color 0.3s ease' }}
                             onClick={() => handleListeningClick()}>
                            <span className="font-poppins" 
                                  style={{ color: '#F8F8FF', fontSize: '30px', fontWeight: 'bold', marginTop: '70px', transition: 'color 0.3s ease' }}>
                                Listening
                            </span>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105" 
                             style={{ width: '565px', height: '225px', marginRight: '50px', background: 'linear-gradient(to right, #58CC02, #93DD5C)', transition: 'background-color 0.3s ease' }}
                             onClick={() => handleWritingClick()}>
                            <span className="font-poppins" 
                                  style={{ color: '#F8F8FF', fontSize: '30px', fontWeight: 'bold', marginTop: '70px', transition: 'color 0.3s ease' }}>
                                Writing
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;
