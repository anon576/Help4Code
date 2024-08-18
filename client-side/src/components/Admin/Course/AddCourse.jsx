import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../constant';

const AddAdminCourse = () => {
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
        course_name: '',
        course_introduction: '',
        course_img: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            course_img: e.target.files[0],
        });
    };

    const addCourse = async (e) => {
        e.preventDefault();
        const { course_name, course_introduction, course_img } = formData;

        // Basic form validation
        if (!course_name || !course_introduction || !course_img) {
            notifyError('All fields are required.');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('course_name', course_name);
        formDataToSend.append('course_introduction', course_introduction);
        formDataToSend.append('course_img', course_img);

        try {
            const response = await axios.post(`${BACKEND_URL}/admin/course/add_course`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                notifySuccess(response.data.message);
                setTimeout(() => {
                    navigate('/admin_course');
                }, 1500);
            } else {
                notifyError(response.data.message || 'Unexpected error occurred.');
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                notifyError(error.response.data.message || 'Server error occurred.');
            } else if (error.request) {
                // Request was made but no response received
                notifyError('No response from server.');
            } else {
                // Something went wrong in setting up the request
                notifyError('Error in sending request.');
            }
        }
    };

    return (
        <div className='service-changes'>
            <div className="service-changes-container">
                <h1>Add Course</h1>
                <form className='service-changes-form' onSubmit={addCourse}>
                    <div>
                        <p>Course Name</p>
                        <input
                            type="text"
                            value={formData.course_name}
                            name='course_name'
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <p>Course Introduction</p>
                        <textarea
                            value={formData.course_introduction}
                            name='course_introduction'
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <p>Course Image</p>
                        <input
                            type="file"
                            name='course_img'
                            accept="image/*"
                            onChange={handleFileChange}
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

export default AddAdminCourse;
