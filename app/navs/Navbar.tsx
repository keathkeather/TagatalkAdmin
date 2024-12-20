import React from 'react';

interface NavbarProps {
    pageTitle: string;
}

const Navbar: React.FC<NavbarProps> = ({ pageTitle }) => {
    return (
        <nav className="fixed top-0 left-0 z-30 w-full h-30 shadow-sm" style={{ backgroundColor: '#FFFFFF', marginLeft: '250px' }}>
            <div className="flex items-center justify-between w-full">
                <div style={{ width: '350px', marginLeft: '50px', marginTop: '5px' }} className="relative">
                    <h1 className="font-semibold text-white my-6 font-poppins" 
                        style={{ color: '#202224', fontSize: '30px' }}>
                        {pageTitle}
                    </h1>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

