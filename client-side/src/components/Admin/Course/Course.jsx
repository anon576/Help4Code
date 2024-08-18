import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../constant';

const AdminCourse = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/public/get_course`);
                setCourses(response.data.data); // Assuming the API returns the courses in a 'data' property
            } catch (error) {
                console.error('Error fetching courses:', error);
                // Optionally, set some error state or show an error message
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className='admin-services'>
            <h1>Courses</h1>
            <div className="admin-all-services">
                {courses.length > 0 ? (
                    courses.map(course => (
                        <div key={course.course_id} className="admin-service-card">
                            <img src={course.course_img || 'default-image-url'} alt={course.course_name} />
                            <h2>{course.course_name}</h2>
                            <h4>Introduction: {course.course_introduction}</h4>
                            <Link
                            to={{
                                pathname: `/adminchaptercourse`,
                            }}
                            state={{ course_name:course.course_name,
                            course_id:course.course_id }}>
                            <button className='admin-btn'>Veiw</button>
                        </Link>
                           
                        </div>
                    ))
                ) : (
                    <p>No courses available.</p>
                )}
                <div className="admin-service-card add-service">
                    <Link to={`/addcourse`}><h1>+</h1></Link>
                    <h3>Add New Course</h3>
                </div>
            </div>
        </div>
    );
};

export default AdminCourse;
