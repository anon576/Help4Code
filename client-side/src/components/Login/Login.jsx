import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle, FaXmark } from "react-icons/fa6";
import "../../style/login.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from '../constant';


const Login = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [userInfo, setUserInfo] = useState();

    const navigate = useNavigate()

    const notifySuccess = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 2000,
    });

    const notifyError = (message) => toast.error(message, {
        position: "top-center",
        autoClose: 2000,
    });

    const onSubmit = (data) => {
        setUserInfo(data)
        userLogin(data)
    }

    const userLogin = async (data) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/login`, data);

            if (response.status === 200) {
                const token = response.data.token
                localStorage.setItem('token', token)
                notifySuccess(response.data.message)
                setTimeout(() => {
                    navigate("/")
                    window.location.reload();
                }, 2000)
            } else {
                notifyError(response.data.message)
            }
        } catch (error) {
            notifyError(error.response.data.message)
        }

    }

    const [showPassword, setShowPassword] = useState(false)

    return (props.trigger) ? (
        <div className='login'>
            {/* <div className='login-container'> */}
            <form action="" className='login-form' onSubmit={handleSubmit(onSubmit)}>
                <div className="login-cross" onClick={() => props.close(false)}><FaXmark /></div>
                <h1>Login</h1>
                <div className="login-inputs">
                    <div>
                        <input type="email" placeholder='Enter email' name='email'
                            {...register("email", {
                                required: "Email is required"
                            })}
                        />
                        <p>{errors?.email?.message}</p>
                    </div>

                    <div>
                        <input type={showPassword ? "text" : "password"} placeholder='Enter password' name='password'
                            {...register("password", {
                                required: "Password is required"
                            })}
                        />
                        <p>{errors?.password?.message}</p>
                    </div>


                    <div className="password">
                        <input type="checkbox" id='showpassword' value={showPassword}
                            onChange={() =>
                                setShowPassword((prev) => !prev)
                            } />
                        <label htmlFor="showpassword">Show password</label>
                    </div>
                    <p className='forget-password'>Can't remember password try <span><Link to="/forgetpassword" onClick={() => props.close(false)}>Forget Password</Link></span></p>
                    <input type="submit" className='login-button' />


                </div>
              
                <div className="reg-btn">
                    <p>Don't have an account <span><Link to="/signup" onClick={() => props.close(false)}>Register</Link></span></p>
                </div>
            </form>
            <ToastContainer />
        </div>

        // </div>
    ) : "";
}

export default Login
