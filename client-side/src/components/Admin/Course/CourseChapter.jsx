import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { BACKEND_URL } from '../../constant';

const AdminChapterCourse = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const courseName = query.get('name');

    const [chapters, setChapters] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/admin/course/get_chapter`, {
                    params: {
                        course_name: courseName
                    }
                });

                console.log('API Response:', response.data); // Debug: Log the response

                if (response.status === 200) {
                    setChapters(response.data.chapters); // Set chapters from response data
                    setErrorMessage(''); // Clear any existing error messages
                } else {
                    setErrorMessage(response.data.message || 'Unexpected error occurred');
                    setChapters([]); // Clear chapters on error
                }
            } catch (error) {
                console.error('Error fetching chapters:', error);
                setErrorMessage('Error fetching chapters.');
                setChapters([]); // Clear chapters on error
            }
        };

        fetchChapters();
    }, [courseName]);

    return (
        <div className='admin-services'>
            <h1>Chapters of {courseName}</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            <div className="admin-all-services">
                {chapters.map((chapter, index) => (
                    <div key={index} className="admin-service-card">
                        <img src={chapter.imgurl} alt="" />
                        <h2>{chapter.title}</h2>
                        <Link
                            to={{
                                pathname: `/admintopic`,
                            }}
                            state={{ course_name: courseName, title: chapter.title, chapter_id: chapter.chapter_id }}>
                            <button className='admin-btn'>Veiw Subtopic</button>
                        </Link>
                        <Link
                            to={{
                                pathname: `/updateadminchaptercourse`,
                            }}
                            state={{ course_name: courseName, course_id: chapter.course_id, title: chapter.title, chapter_id: chapter.chapter_id }}>
                            <button className='admin-btn'>Update</button>
                        </Link>
                    </div>
                ))}

                <div className="admin-service-card add-service">
                    <Link
                        to={{
                            pathname: `/addadminchaptercourse`,
                        }}
                        state={{ course_name: courseName }}
                    >
                        <h1>+</h1>
                    </Link>
                    <h3>Add New Chapter</h3>
                </div>
            </div>
        </div>
    );
};

export default AdminChapterCourse;
