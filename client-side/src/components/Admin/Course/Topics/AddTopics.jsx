import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { BACKEND_URL } from '../../../constant';

const AddAdminTopic = () => {
    const location = useLocation();
    const { chapter_id, course_name,title } = location.state || {};
    const navigate = useNavigate();

    const notifySuccess = (message) =>
        toast.success(message, {
            position: "top-center",
            autoClose: 2000,
        });

    const notifyError = (message) =>
        toast.error(message, {
            position: 'top-center',
            autoClose: 2000,
        });

    const [formData, setFormData] = useState({
        title: '', // Add title field
        content: '' // Add content field
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const addData = async (e) => {
        e.preventDefault();
        // Send data with chapter_id, title, and content
        const data = {
            chapter_id: chapter_id,
            title: formData.title,
            content: formData.content,
        };
        addServiceData(data);
    };

    const addServiceData = async (data) => {
        try {
            // Send the data to the backend
            const response = await axios.post(
                `${BACKEND_URL}/admin/topic/add_topic`,
                data
            );

            const { status, data: responseData } = response;

            if (status === 201) { // Status code for successful creation
                notifySuccess(responseData.message);
                setTimeout(() => {
                    navigate('/admintopic/', { 
                        state: { 
                            course_name, 
                            chapter_id, 
                            title
                        } 
                    });
                    
                }, 1500);
            } else if (status === 400) { // Bad request, usually due to missing fields
                notifyError(responseData.message);
            } else if (status === 404) { // Chapter not found
                notifyError(responseData.message);
            } else if (status === 409) { // Conflict, topic already exists
                notifyError(responseData.message);
            } else {
                notifyError('Unexpected error occurred.');
            }
        } catch (error) {
            console.error('Error adding topic:', error);
            notifyError('Error adding topic.');
        }
    };

    return (
        <div className='service-changes'>
            <div className="service-changes-container">
                <h1>Add Topic</h1>
                <form action="" className='service-changes-form' onSubmit={addData}>
                    <div>
                        <p>Title</p>
                        <input
                            type="text"
                            value={formData.title}
                            name='title'
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <p>Content</p>
                        <textarea
                            value={formData.content}
                            name='content'
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button className='admin-btn'>Submit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddAdminTopic;
