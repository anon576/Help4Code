import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { BACKEND_URL } from '../../../constant';

const UpdateAdminTopic = () => {
    const location = useLocation();
    const { chapter_id, course_name, chapter_title,title, content, sub_chapter_id } = location.state || {};
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
        title: title || '', // Initialize with the current title
        content: content || '', // Initialize with the current content
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const updateData = async (e) => {
        e.preventDefault();
        // Data to send to the backend
        const data = {
            sub_chapter_id: sub_chapter_id,
            title: formData.title,
            content: formData.content,
        };
        updateServiceData(data);
    };

    const updateServiceData = async (data) => {
        try {
            // Send the data to the backend
            const response = await axios.put(
                `${BACKEND_URL}/admin/topic/update_topic`,
                data
            );

            const { status, data: responseData } = response;

            if (status === 200) { // Status code for successful update
                notifySuccess(responseData.message);
                setTimeout(() => {
                    navigate('/admintopic/', { 
                        state: { 
                            course_name, 
                            chapter_id, 
                            title:chapter_title
                        } 
                    });
                }, 1500);
            } else if (status === 400) { // Bad request, usually due to missing fields
                notifyError(responseData.message);
            } else if (status === 404) { // Topic not found
                notifyError(responseData.message);
            } else {
                notifyError('Unexpected error occurred.');
            }
        } catch (error) {
            console.error('Error updating topic:', error);
            notifyError('Error updating topic.');
        }
    };

    return (
        <div className='service-changes'>
            <div className="service-changes-container">
                <h1>Update Topic</h1>
                <form action="" className='service-changes-form' onSubmit={updateData}>
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

export default UpdateAdminTopic;
