import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { displayTutorilas } from '../../constant';

const AdminCourse = () => {


    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
    
            setServices(displayTutorilas)
           
        };

        fetchServices();

    }, []);




    return (
        <div className='admin-services'>
            <h1>Courses</h1>
            <div className="admin-all-services">

                {services.map(service => (
                    <div className="admin-service-card">
                        <img src={service.imgurl} alt="" />
                        <h2>{service.name}</h2>
                        <h4>Introduction : {service.description}</h4>
                        <Link to={`/adminchaptercourse/?name=${encodeURIComponent(service.name)}`}>
                            <button className='admin-btn'>View</button>
                        </Link>
                    </div>
                ))}

                <div className="admin-service-card add-service ">
                    <Link to={`/servicechanges/noid/addservice`}><h1>+</h1></Link>
                    <h3>Add New Service</h3>
                </div>

            </div>
        </div>
    )
}

export default AdminCourse
