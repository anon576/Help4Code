import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { BACKEND_URL } from '../../../constant';

const AdminTopicCourse = () => {
    const location = useLocation();
    const { course_name, chapter_id, title } = location.state || {};

    const [topics, setTopics] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/admin/topic/get_topics`, {
                    params: {
                        chapter_id: chapter_id
                    }
                });

                console.log('API Response:', response.data); // Debug: Log the response

                if (response.status === 200) {
                    setTopics(response.data.topics); // Set topics from response data
                    setErrorMessage(''); // Clear any existing error messages
                } else {
                    setErrorMessage(response.data.message || 'Unexpected error occurred');
                    setTopics([]); // Clear topics on error
                }
            } catch (error) {
                console.error('Error fetching topics:', error);
                setErrorMessage('Error fetching topics.');
                setTopics([]); // Clear topics on error
            }
        };

        fetchTopics();
    }, [chapter_id]);

    return (
        <div className='admin-services'>
            <h1>Topics in {title} ({course_name})</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            <div className="admin-all-services">
                {topics.map((topic, index) => (
                    <div key={index} className="admin-service-card">
                        <h2>{topic.title}</h2>
                        <p>{topic.content}</p>
                        <Link to={`/admintopicdetail/${topic.sub_chapter_id}`}>
                            <button className='admin-btn'>View Details</button>
                        </Link>
                        <Link
                            to={{
                                pathname: `/updateadmintopic`,
                            }}
                            state={{ course_name: course_name, chapter_id: chapter_id,chapter_title:title, title: topic.title, sub_chapter_id: topic.sub_chapter_id ,content:topic.content}}>
                            <button className='admin-btn'>Update</button>
                        </Link>
                    </div>
                ))}

                <div className="admin-service-card add-service">
                    <Link
                        to={{
                            pathname: `/addadmintopic`,
                        }}
                        state={{ chapter_id: chapter_id, course_name, title }}
                    >
                        <h1>+</h1>
                    </Link>
                    <h3>Add New Topic</h3>
                </div>
            </div>
        </div>
    );
};

export default AdminTopicCourse;
