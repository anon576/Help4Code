import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { BACKEND_URL } from '../../constant';

const UpdateAdminCourseChappter = () => {
    const location = useLocation();
    const { course_name, course_id, chapter_id, title } = location.state || {};
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
            course_id: course_id,
            chapter_id: chapter_id,
            title: formData.title,
        };
        updateServiceData(data);
    };

    const updateServiceData = async (data) => {
        try {
            // Send the data to the backend
            const response = await axios.put(
                `${BACKEND_URL}/admin/course/update_course_chapter`,
                data
            );

            const { status, data: responseData } = response;

            if (status === 200) { // Status code for successful update
                notifySuccess(responseData.message);
                setTimeout(() => {
                    navigate(`/adminchaptercourse/?name=${course_name}`);
                }, 1500);
            } else if (status === 400) { // Bad request, usually due to missing fields
                notifyError(responseData.message);
            } else if (status === 404) { // Course or chapter not found
                notifyError(responseData.message);
            } else {
                notifyError('Unexpected error occurred.');
            }
        } catch (error) {
            console.error('Error updating chapter:', error);
            notifyError('Error updating chapter.');
        }
    };

    return (
        <div className='service-changes'>
            <div className="service-changes-container">
                <h1>Update Chapter</h1>
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
                    <button className='admin-btn'>Submit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UpdateAdminCourseChappter;
