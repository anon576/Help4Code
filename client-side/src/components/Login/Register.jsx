import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import "../../style/register.css";
import registerImage from '../../images/registerpage.png';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from '../constant';

const Register = (props) => {

    const { setProgress } = props;

    useEffect(() => {
        setProgress(40);

        setTimeout(() => {
            setProgress(100);
        }, 200);

    }, [setProgress]);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const notifySuccess = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 2000,
    });

    const notifyError = (message) => toast.error(message, {
        position: "top-center",
        autoClose: 2000,
    });

    const onSubmit = (data) => {
        const { name, email, password } = data;

        // Store name and password in localStorage
        localStorage.setItem('name', name);
        localStorage.setItem('password', password);
        localStorage.setItem('email', email);

        // Send email and a value (e.g., a hardcoded string 'val')
        const requestData = { email, val: 0 };
        userRegister(requestData);
    };

    const userRegister = async (data) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/otp`, data);

            if (response.status === 200) {
                console.log(response.data.message);
                notifySuccess(response.data.message);

                // Store OTP in localStorage
                localStorage.setItem('otp', response.data.otp);

                setTimeout(() => {
                    navigate('/otp/registerotp', { state: { email: data.email } });
                }, 2000);
            } else {
                console.error('Registration failed:', response.data.message);
                notifyError(response.data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error.message);
            notifyError(error.response.data.message);
        }
    };

    return (
        <div className='register'>
            <div className="register-image">
                <img src={registerImage} alt="" />
            </div>

            <form action="" className='login-form' onSubmit={handleSubmit(onSubmit)}>
                <h1>SignUp</h1>
                <div className="login-inputs">
                    <div>
                        <span>Name:</span>
                        <input type="text" name='name' placeholder='Enter your Name' {...register("name", {
                            required: "Name is required",
                            minLength: {
                                value: 6,
                                message: "Enter your full name",
                            }
                        })} />
                        <p>{errors?.name?.message}</p>
                    </div>

                    <div>
                        <span>Email:</span>
                        <input type="email" name='email' placeholder='Enter your Email' {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'Invalid email address',
                            },
                        })} />
                        <p>{errors?.email?.message}</p>
                    </div>

                    <div>
                        <span>Password:</span>
                        <input type={showPassword ? "text" : "password"} name='password' placeholder='Enter password' {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long",
                            },
                            maxLength: {
                                value: 12,
                                message: "Length of password must be less than 12 characters",
                            }
                        })} />
                        <p>{errors?.password?.message}</p>
                    </div>

                    <div className="password">
                        <input type="checkbox" id='showpassword' value={showPassword}
                            onChange={() =>
                                setShowPassword((prev) => !prev)
                            } />
                        <label htmlFor="showpassword">Show password</label>
                    </div>

                    <input type="submit" className='login-button' />
                </div>

                <div className="reg-btn">
                    <p>Already have an account? <span><Link onClick={() => props.trigger(true)}>Login</Link></span></p>
                </div>
            </form>

            <ToastContainer />
        </div>
    );
};

export default Register;
