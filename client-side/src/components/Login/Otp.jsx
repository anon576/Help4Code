import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import "../../style/register.css";
import CryptoJS from 'crypto-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from '../constant';

const Otp = (props) => {
    const { setProgress } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        setProgress(40);
        setTimeout(() => {
            setProgress(100);
        }, 200);
    }, [setProgress]);

    const notifySuccess = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 2000,
    });

    const notifyError = (message) => toast.error(message, {
        position: "top-center",
        autoClose: 2000,
    });

    // Function to hash OTP using SHA-256
    const hashOtp = (otp) => {
        return CryptoJS.SHA256(otp).toString(CryptoJS.enc.Hex);
    };

    const onSubmit = async (data) => {
        const storedOtpHash = localStorage.getItem("otp");
        data.email = localStorage.getItem("email");
        data.password = localStorage.getItem("password");
        data.name = localStorage.getItem("name");

        // Hash the OTP entered by the user
        const enteredOtpHash = await hashOtp(data.otp);
        console.log(enteredOtpHash);
        console.log(storedOtpHash);
        // Compare the hashed OTP with the stored hashed OTP
        if (enteredOtpHash === storedOtpHash) {
            console.log("here")
            try {
                const response = await axios.post(`${BACKEND_URL}/auth/user`, data);

                if (response.status === 201) {
                    console.log(response.data)
                    notifySuccess(response.data.message);
                    localStorage.clear()
                    localStorage.setItem("token",response.data.token)
                    console.log(response.data.token)
                    navigate("/")
                } else {
                    console.error('OTP verification failed:', response.data.message);
                    notifyError(response.data.message);
                }
            } catch (error) {
                console.error('Error during verification:', error.message);
                notifyError(error.response.data.message);
            }
        } else {
            notifyError("Invalid OTP");
        }
    };

    return (
        <div className='register'>
            <form action="" className='login-form otp-main-form' onSubmit={handleSubmit(onSubmit)}>
                <h1>OTP Verification</h1>
                <div className="login-inputs">
                    <div className='otp-form'>
                        <input
                            type="text"
                            name='otp'
                            placeholder='Enter OTP'
                            {...register("otp", {
                                required: "Please enter a valid OTP"
                            })}
                        />
                        <p>{errors?.otp?.message}</p>
                    </div>
                    <input type="submit" className='login-button' />
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Otp;
