import { useState } from 'react';
import { AwesomeButton } from "react-awesome-button";
import { Slide } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { FaClipboardUser, FaEyeSlash, FaRegEye, FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-awesome-button/dist/styles.css';
import { LuMousePointerClick } from "react-icons/lu";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;

const Register = () => {
    const [show, setShow] = useState(false);
    const { theme, updateUserProfile, signUp } = useAuth();
    const navigate = useNavigate();
    const handleShow = () => {
        setShow(!show);
    }
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        const imageFile = data.photo[0];
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                const photoURL = res.data.data.display_url;
                let totalCoin;
                if (data.role === 'Worker') {
                    totalCoin = 10;
                } else {
                    totalCoin = 50;
                }

                await signUp(data.email, data.password);
                await updateUserProfile(data.name, photoURL);
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    photo: photoURL,
                    role: data.role,
                    coin: totalCoin,
                };

                const response = await axiosPublic.post('/users', userInfo);
                if (response.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User created successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                    navigate('/');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col md:flex-row gap-6 my-6'>
            <Helmet>
                <title>Task Master | Register</title>
            </Helmet>
            <div className='md:w-1/2 w-full flex-1 my-auto'>
                <Slide damping={0.8}>
                    <img className='rounded-2xl shadow-xl' src='https://i.ibb.co/6W79Nzn/register-Artboard-1.jpg' alt="Task Master" />
                </Slide>
            </div>
            <div className='md:w-1/2 w-full '>
                <Slide damping={0.8} direction="right">
                    <div className='shadow-xl bg-gray-100 flex flex-col'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" d="M0,128L26.7,149.3C53.3,171,107,213,160,192C213.3,171,267,85,320,48C373.3,11,427,21,480,32C533.3,43,587,53,640,69.3C693.3,85,747,107,800,138.7C853.3,171,907,213,960,202.7C1013.3,192,1067,128,1120,133.3C1173.3,139,1227,213,1280,229.3C1333.3,245,1387,203,1413,181.3L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg>
                        <h2 className="text-2xl font-bold text-center">Welcome to, Task Master</h2>
                        <hr className='w-1/6 mx-auto mt-2 bg-blue-800 border-0 h-1 rounded-full' />
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Name</span>
                                </label>
                                <div className=' relative'>
                                    <input {...register("name", { required: true })} type="text" placeholder="Name" className={theme === 'sunset' ?
                                        "input input-bordered w-full pl-12 bg-gray-50"
                                        :
                                        "input input-bordered w-full pl-12"
                                    } required />
                                    <div className='absolute top-1/3 left-3'>
                                        <FaUser className='text-xl' />
                                    </div>
                                </div>
                                {errors.name && <span className="text-red-700">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Email</span>
                                </label>
                                <div className=' relative'>
                                    <input type="text" placeholder="Email" {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Invalid email format"
                                        }
                                    })} className={theme === 'sunset' ?
                                        "input input-bordered w-full pl-12 bg-gray-50"
                                        :
                                        "input input-bordered w-full pl-12"
                                    } required />
                                    <div className='absolute top-1/3 left-3'>
                                        <MdEmail className='text-xl' />
                                    </div>
                                </div>
                                {errors.email && (
                                    <span className="text-red-700">{errors.email.message}</span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Password</span>
                                </label>
                                <div className=' relative'>
                                    <input type={show ? "text" : "password"} placeholder="Password" {...register("password" ,{
                                            required: true,
                                            minLength: 6,
                                            pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
                                        })} className={theme === 'sunset' ?
                                        "input input-bordered w-full pl-12 bg-gray-50"
                                        :
                                        "input input-bordered w-full pl-12"
                                    } required />
                                    <div className='absolute top-1/3 left-3'>
                                        {
                                            show ? <FaRegEye onClick={handleShow} className='text-xl' />
                                                :
                                                <FaEyeSlash onClick={handleShow} className='text-xl' />
                                        }
                                    </div>
                                </div>
                                {errors.password?.type === 'minLength' && <span className="text-red-700">The password must be at least 6 characters</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-700">The password should have one uppercase, one lowercase, one number and one special character</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Photo URL</span>
                                </label>
                                <div>
                                    <input type="file" placeholder="Photo URL"  {...register("photo", { required: true })} className={theme === 'sunset' ?
                                        "input-bordered w-full file-input bg-gray-50"
                                        :
                                        "input-bordered w-full file-input"
                                    } required />
                                </div>
                                {errors.photo && <span className="text-red-700">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Role</span>
                                </label>
                                <div className=' relative'>
                                    <select defaultValue="default" {...register("role", { required: true })} className="select select-bordered pl-12 w-full">
                                        <option disabled value="default">Select your role</option>
                                        <option value="Worker">Worker</option>
                                        <option value="Task Creator">Task Creator</option>
                                    </select>
                                    <div className='absolute top-1/3 left-3'>
                                        <FaClipboardUser className='text-xl' />
                                    </div>
                                </div>
                                {errors.role && <span className="text-red-700">This field is required</span>}
                            </div>
                            <div className="form-control mt-6 w-1/2 mx-auto">
                                <AwesomeButton className='rounded-lg' type="primary">Register</AwesomeButton>
                            </div>
                            <p className='mt-2 text-blue-800 text-center'>Already have an account?
                                <Link to='/login' className="link link-hover text-blue-900">  Login <LuMousePointerClick className='text-xl inline-flex' /></Link>
                            </p>
                        </form>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" d="M0,128L26.7,149.3C53.3,171,107,213,160,192C213.3,171,267,85,320,48C373.3,11,427,21,480,32C533.3,43,587,53,640,69.3C693.3,85,747,107,800,138.7C853.3,171,907,213,960,202.7C1013.3,192,1067,128,1120,133.3C1173.3,139,1227,213,1280,229.3C1333.3,245,1387,203,1413,181.3L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg>
                    </div>
                </Slide>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
