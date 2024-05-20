'use client'

import EditorSidebar from '../../navs/EditorSidebar';
import EditorNavbar from '../../navs/EditorNavbar';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import Pagination from '../../calls/PaginationFunctions';

interface Lesson {
    id: number;
    title: string;
}

const Reading = () => {

    const router = useRouter();
    const [lessonTitle, setLessonTitle] = useState('');
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
    const [showOptions, setShowOptions] = useState(false);
    const optionsRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    
    const lessonsPerPage = 5;
    const indexOfLastLesson = currentPage * lessonsPerPage;
    const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
    const currentLessons = lessons.slice(indexOfFirstLesson, indexOfLastLesson);

    const totalPages = Math.ceil(lessons.length / lessonsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };


    const handleSkills = () => {
        router.push('/skillModules/reading');
    };


    const handleSaveLesson = () => {
        if (lessonTitle.trim() !== '') {
            if (editMode && selectedOptionIndex !== null) {
                handleEditLesson(selectedOptionIndex, lessonTitle);
            } else {
               
                const newLesson = { id: lessons.length + 1, title: lessonTitle };
                const newLessons = [...lessons, newLesson];
     
                const newTotalPages = Math.ceil(newLessons.length / lessonsPerPage);
    
               
                if (newTotalPages > totalPages) {
                    setCurrentPage(newTotalPages);
                }
                setLessons(newLessons);
            }
            setLessonTitle('');
            setEditMode(false);
        }
    };
    

    const handleEditLesson = (index: number, newTitle: string) => {
        const updatedLessons = [...lessons];
        const lessonIndex = indexOfFirstLesson + index; 
        if (lessonIndex >= 0 && lessonIndex < lessons.length) {
            updatedLessons[lessonIndex].title = newTitle;
            setLessons(updatedLessons);
        }
        setSelectedOptionIndex(null);
    };
    
    

    const handleDeleteLesson = (index: number) => {
        const updatedLessons = lessons.filter((_, i) => i !== index);
        setLessons(updatedLessons);
        setSelectedOptionIndex(null);
    };


const handleToggleOptions = (index: number) => {
    setSelectedOptionIndex(index);
    setShowOptions(true);
    
   
    if (index >= 0 && index < currentLessons.length) {
        const lessonToEdit = currentLessons[index];
        setLessonTitle(lessonToEdit.title);
        setEditMode(true);
    }
};


const handleOptionClick = (action: string) => {
    if (selectedOptionIndex !== null) {
        const actualIndex = indexOfFirstLesson + selectedOptionIndex; 
        switch (action) {
            case 'open':
                const selectedLesson = lessons[actualIndex];
                    router.push(`/lessons/reading?lessonId=${selectedLesson.id}&lessonTitle=${selectedLesson.title}`);
                    break;
            case 'edit':
                setLessonTitle(lessons[actualIndex].title); 
                setEditMode(true);
                
                if (editMode) {
                    document.getElementById('textbox')?.focus();
                }
                break;
            case 'delete':
                handleDeleteLesson(actualIndex); 
                break;
            default:
                break;
        }
    }
    setShowOptions(false);
};

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
                setShowOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        
        if (editMode && selectedOptionIndex !== null) {
          
            const inputElement = document.getElementById('textbox');
            if (inputElement) {
                inputElement.focus();
            }
        }
    }, [editMode, selectedOptionIndex]);

    return (
        <div style={{ display: 'flex', height: '150vh', backgroundColor: '#F5F6FA' }}>
            <EditorSidebar />
            <EditorNavbar />

            <div style={{ flex: 1, position: 'relative' }}>

                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '300px', marginTop: '100px' }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" 
                        onClick={() => handleSkills()}
                        style={{ cursor: 'pointer', marginRight: '20px' }}>
                        <path d="M22.5 28.5L12 18L22.5 7.5" stroke="#545F71" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <div>
                        <h2 className="font-poppins" 
                            style={{ color: '#545f71', fontSize: '18px', fontWeight: '700' }}>
                            Reading
                        </h2>
                        
                        <h2 className="font-poppins" 
                            style={{ color: '#545f71', fontSize: '24px', fontWeight: '700' }}>
                            Unit 1
                        </h2>
                    </div>
                </div>

                {/* Render Table */}
                <div style={{ marginLeft: '300px', marginTop: '20px', borderRadius: '20px', overflow: 'hidden', padding: '10px', border: '1px solid #d0d5dd', backgroundColor: '#FFFFFF', width:'75%' }}>

                    {/* Title Table */}
                    <table style={{ width: '95%', borderSpacing: '0 10px', borderRadius: '20px', overflow: 'hidden' }}>
                        <colgroup>
                            <col style={{ width: '60px' }} />
                            <col style={{ width: '780px' }} /> 
                            <col style={{ width: '140px' }} />
                        </colgroup>
                        <thead style={{ color: '#344054', backgroundColor: '#FFFFFF', fontSize: '24px' }} 
                            className="font-bold font-poppins shadow-md">
                            <tr style={{ height: '60px' }}>
                                <th scope="col" className="px-6 py-6 text-center">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-6 text-center">
                                    <input
                                        type="text"
                                        id="textbox"
                                        name="textbox"
                                        value={lessonTitle}
                                        onChange={(e) => setLessonTitle(e.target.value)}
                                        style={{ fontSize: '16px', fontWeight: '200', width: '100%', color: '#9ba5b7', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #d0d5dd' }}
                                        className="font-inter mt-1 p-3 block"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-6 text-center">
                                    <button
                                        onClick={handleSaveLesson}
                                        style={{
                                            width: '100%',
                                            position: 'relative',
                                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                                            borderRadius: '20px',
                                            backgroundColor: '#344054',
                                            height: '45px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '16px',
                                            boxSizing: 'border-box',
                                            textAlign: 'left',
                                            fontSize: '16px',
                                            color: '#fff',
                                            fontFamily: 'Poppins',
                                        }}
                                    >
                                        Save
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                           
                        </tbody>
                    </table>
                </div>

                {/* Lessons Section */}
                <div style={{ marginLeft: '300px', marginTop: '40px', width: '75%', borderRadius: '20px', overflow: 'hidden', padding: '20px', border: '1px solid #d0d5dd', backgroundColor: '#FFFFFF' }}>
                    <h2 className="font-poppins" 
                        style={{ color: '#545f71', fontSize: '24px', fontWeight: '700', margin: '20px 10px' }}>
                        Lessons
                    </h2>

                    <table style={{ width: '95%', borderSpacing: '0', overflow: 'hidden' }}>
                        <colgroup>
                            <col style={{ width: '180px' }} />
                            <col style={{ width: '760px' }} /> 
                            <col style={{ width: '140px' }} />
                        </colgroup>
                        <thead style={{ color: '#797d8c', backgroundColor: '#FFFFFF', fontSize: '16px' }} 
                            className="font-poppins shadow-md">
                            <tr style={{ height: '60px'}}>
                                <th scope="col" className="px-6 py-6 text-center">
                                    Lesson No.
                                </th>
                                <th scope="col" className="px-6 py-6 text-center">
                                    Lesson Title
                                </th>
                                <th scope="col" className="px-6 py-6 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody style={{ fontSize: '16px', color: '#344054', backgroundColor: '#FFFFFF', fontFamily: 'Poppins' }}>
                        </tbody>

                    </table>
                    
                    <div style={{ width: '100%', margin: '0 auto' }}>
                        {currentLessons.map((lesson, index) => (
                                   <div key={index} style={{marginBottom: '20px', borderRadius: '20px', overflow: 'hidden', border: '1px solid #d0d5dd', padding: '10px', backgroundColor: '#FFFFFF', cursor: 'pointer' }} >

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderRadius: '10px', backgroundColor: '#FFFFFF' }}>
                                    <div style={{ width: '140px', textAlign: 'center', color: '#344054', fontFamily: 'Poppins', fontWeight: '600' }}>{lesson.id}</div>
                                    <div style={{ width: '680px', textAlign: 'center', color: '#344054', fontFamily: 'Poppins', fontWeight: '600' }}>{lesson.title}</div>
                                    <div style={{ width: '120px', textAlign: 'center', color: '#344054', fontFamily: 'Poppins', fontWeight: '600'}}>

                                 <div style={{position: 'absolute'}}>
                                    {/* SVG Icon for Action */}
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{ cursor: 'pointer', marginTop: '-12px' }}
                                        onClick={() => handleToggleOptions(index)}
                                        
                                    >
                                        <path
                                            d="M12 5L12 5.01M12 12L12 12.01M12 19L12 19.01M12 6C11.4477 6 11 5.55228 11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6ZM12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13ZM12 20C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20Z"
                                            stroke="#344054"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
 

                             {/* Options Menu */}
                                {showOptions && selectedOptionIndex === index && (
                                    <div
                                        ref={optionsRef}
                                        style={{
                                            position: 'absolute',
                                            top: '5px',
                                            fontWeight: '200',
                                            left: '20px',
                                            marginTop: '-40px', 
                                            backgroundColor: '#FFFFFF',
                                            border: '1px solid #d0d5dd',
                                            borderRadius: '8px',
                                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                                            zIndex: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            
                                        }}
                                    >
                                    {/* Option: Open */}
                                    <div
                                        onClick={() => handleOptionClick('open')}
                                        style={{
                                            padding: '10px 30px',
                                            cursor: 'pointer',
                                            color: '#000000',
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.target as HTMLDivElement).style.backgroundColor = '#f0f2f5';
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.target as HTMLDivElement).style.backgroundColor = '#FFFFFF';
                                        }}
                                    >
                                        Open
                                    </div>
                                    {/* Option: Edit */}
                                    <div
                                        onClick={() => handleOptionClick('edit')}
                                        style={{
                                            padding: '10px 30px',
                                            cursor: 'pointer',
                                            color: '#000000',
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.target as HTMLDivElement).style.backgroundColor = '#f0f2f5';
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.target as HTMLDivElement).style.backgroundColor = '#FFFFFF';
                                        }}
                                    >
                                        Edit
                                            </div>
                                            {/* Option: Delete */}
                                            <div
                                                onClick={() => handleOptionClick('delete')}
                                                style={{
                                                    padding: '10px 30px',
                                                    cursor: 'pointer',
                                                    color: '#FF0000',
                                                }}
                                                onMouseEnter={(e) => {
                                                    (e.target as HTMLDivElement).style.backgroundColor = '#f0f2f5';
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.target as HTMLDivElement).style.backgroundColor = '#FFFFFF';
                                                }}
                                            >
                                                Delete
                                            </div>
                                        </div>
                                    )}
                    
                              </div>
                             <div> 
                         </div>
                                    
                     </div>
                    </div>
                 </div> 
                                        
                  ))}
             </div>

             {/* Pagination Section */}
             <Pagination
                        totalPages={totalPages > 0 ? totalPages : 1}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                />

         </div>
    </div> 
 </div>
    );
};

export default Reading;
