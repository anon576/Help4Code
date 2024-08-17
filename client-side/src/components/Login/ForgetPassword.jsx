import { React, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from '../constant';

const Forgetpassword = (props) => {

    const { setProgress } = props;

    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        setProgress(40);

        setTimeout(() => {
            setProgress(100);
        }, 200);

    }, [setProgress]);

    const [stage, setStage] = useState(1);

    const notifySuccess = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 2000,
    });

    const notifyError = (message) => toast.error(message, {
        position: "top-center",
        autoClose: 2000,
    });

    const hashOtp = (otp) => {
        return CryptoJS.SHA256(otp).toString(CryptoJS.enc.Hex);
    };

    const onSubmit = async (data) => {
        if (stage === 1) {
            data.val = 1;
            await sendOTP(data);
        } else if (stage === 2) {
            // Verifying OTP
            await verifyOtp(data);
        } else if (stage === 3) {
            // Submitting new password
            await submitNewPassword(data);
        }
    };

    const sendOTP = async (data) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/otp`, data);

            if (response.status === 200) {
                console.log(response.data.message);
                notifySuccess(response.data.message);
                localStorage.setItem('otp', response.data.otp);
                setStage(2); // Move to OTP verification stage
            } else {
                notifyError(response.data.message);
            }
        } catch (error) {
            notifyError(error.response.data.message);
        }
    };

    const verifyOtp = async (data) => {
        const storedOtp = localStorage.getItem('otp');
        const hash_otp = await hashOtp(data.otp);
        if (hash_otp === storedOtp) {
            setStage(3); // Move to new password submission stage
            notifySuccess("OTP Verified, please enter your new password");
        } else {
            notifyError("Invalid OTP");
        }
    };

    const submitNewPassword = async (data) => {
        if (data.password !== data.confirmPassword) {
            notifyError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/auth/forget_password`, data);

            if (response.status === 200) {
                console.log(response.data.message);
                notifySuccess(response.data.message);
                localStorage.clear()
                localStorage.setItem("token",response.data.token)
                navigate('/');
            } else {
                localStorage.clear()
                notifyError(response.data.message);
            }
        } catch (error) {
            localStorage.clear()
            notifyError(error.response.data.message);
        }
    };

    return (
        <div className='register'>
            <form action="" className='login-form otp-main-form' onSubmit={handleSubmit(onSubmit)}>
                <h1>Forget Password</h1>
                <div className="login-inputs">
                    {stage === 1 && (
                        <div>
                            <input
                                type="email"
                                name='email'
                                placeholder='Enter Registered Email'
                                {...register("email", {
                                    required: "Please Enter Registered Email"
                                })}
                            />
                            <p>{errors?.email?.message}</p>
                        </div>
                    )}
                    {stage === 2 && (
                        <div>
                            <input
                                type="text"
                                name='otp'
                                placeholder='Enter OTP'
                                {...register("otp", {
                                    required: "Please Enter OTP"
                                })}
                            />
                            <p>{errors?.otp?.message}</p>
                        </div>
                    )}
                    {stage === 3 && (
                        <>
                            <div>
                                <input
                                    type="password"
                                    name='password'
                                    placeholder='Enter New Password'
                                    {...register("password", {
                                        required: "Please Enter New Password",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters long"
                                        }
                                    })}
                                />
                                <p>{errors?.password?.message}</p>
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name='confirmPassword'
                                    placeholder='Confirm New Password'
                                    {...register("confirmPassword", {
                                        required: "Please Confirm Your Password",
                                        validate: value => value === watch('password') || "Passwords do not match"
                                    })}
                                />
                                <p>{errors?.confirmPassword?.message}</p>
                            </div>
                        </>
                    )}
                    <input type="submit" className='login-button' value={stage === 1 ? "Send OTP" : stage === 2 ? "Verify OTP" : "Reset Password"} />
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Forgetpassword;
