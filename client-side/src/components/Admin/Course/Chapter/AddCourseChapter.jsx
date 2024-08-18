import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { BACKEND_URL } from '../../../constant';

const AddAdminCourseChappter = () => {
    const location = useLocation();
    const { course_name,course_id } = location.state || {};
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
    });

    useEffect(() => {
        console.log(course_name)
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const addData = async (e) => {
        e.preventDefault();
        // Send data with course_name and chapter_title
        const data = {
            course_id: course_id,
            chapter_title: formData.title,
        };
        addServiceData(data);
    };

    const addServiceData = async (data) => {
        try {
            // Send the data to the backend
            const response = await axios.post(
                `${BACKEND_URL}/admin/course/add_course_chapter`,
                data
            );

            const { status, data: responseData } = response;

            if (status === 201) { // Status code for successful creation
                notifySuccess(responseData.message);
                setTimeout(() => {
                    navigate(`/adminchaptercourse`,{
                        state: { 
                            course_name, 
                            course_id
                        } 
                    });
                }, 1500);
            } else if (status === 400) { // Bad request, usually due to missing fields
                notifyError(responseData.message);
            } else if (status === 404) { // Course not found
                notifyError(responseData.message);
            } else if (status === 409) { // Conflict, chapter already exists
                notifyError(responseData.message);
            } else {
                notifyError('Unexpected error occurred.');
            }
        } catch (error) {
            console.error('Error adding chapter:', error);
            notifyError('Error adding chapter.');
        }
    };

    return (
        <div className='service-changes'>
            <div className="service-changes-container">
                <h1>Add Chapter</h1>
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
                    <button className='admin-btn'>Submit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddAdminCourseChappter;
