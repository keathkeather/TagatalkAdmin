import React, { CSSProperties } from 'react';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const rectangleDivStyle: CSSProperties = {
        width: '100%',
        position: 'relative' as 'relative',
        borderRadius: '10px',
        backgroundColor: 'rgba(208, 213, 221, 0.3)',
        height: '64px',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        marginTop: '80px',
        padding: '0 20px'
    };

    const ellipseStyle = (isCurrent: boolean): CSSProperties => ({
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: isCurrent ? '#344054' : '#ffffff',
        color: isCurrent ? '#ffffff' : '#344054',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        margin: '0 5px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
        border: '1px solid #d0d5dd',
    });

    return (
        <div style={rectangleDivStyle}>
            {pageNumbers.map(page => (
                <div
                    key={page}
                    onClick={() => onPageChange(page)}
                    style={ellipseStyle(currentPage === page)}
                >
                    {page}
                </div>
            ))}
        </div>
    );
};

export default Pagination;
