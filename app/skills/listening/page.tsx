'use client'

import EditorSidebar from '../../navs/EditorSidebar';
import EditorNavbar from '../../navs/EditorNavbar';

const Listening = () => {

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F5F6FA' }}>
            <EditorSidebar />
            <EditorNavbar />
            <div style={{ flex: 1 }}>
                <h2 className="font-semibold text-white my-4 font-poppins" 
                    style={{ color: '#202224', fontSize: '30px', marginTop: '100px', marginLeft: '300px' }}>
                    Listening
                </h2>

            </div>
        </div>
    );
};

export default Listening;
