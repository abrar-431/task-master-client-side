import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-awesome-reveal';
import { FaTasks, FaInfoCircle, FaCalendarAlt, FaDollarSign, FaClipboard } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const UpdateTask = () => {
    const { register, handleSubmit,  formState: { errors } } = useForm();
    const { theme } = useAuth();
    const { _id,task_title, task_quantity, submission_info, payable_amount, completion_date, task_detail, task_image_url } = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const onSubmit = (data) => {
        axiosSecure.put(`/tasks/${_id}`, data)
            .then(response => {
                if(response.data.modifiedCount > 0){
                    toast.success('Task updated successfully')
                }
            })
            .catch(error => {
                console.error(error);
                toast.error('Failed to update task');
            });
    };

    return (
        <div className='flex flex-col md:flex-row gap-6 my-6 pl-6'>
            <Helmet>
                <title>Task Master | Update {task_title}</title>
            </Helmet>
            <div className='md:w-1/2 w-full flex-1 my-auto'>
                <Slide damping={0.8}>
                    <h2 className="text-xl font-bold text-center mb-2">{task_title}</h2>
                    <img className='rounded-2xl shadow-xl w-full' src={task_image_url} alt="Task Master" />
                </Slide>
            </div>
            <div className='md:w-1/2 w-full '>
                <Slide damping={0.8} direction="right">
                    <div className='shadow-xl bg-gray-100 flex flex-col'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" d="M0,128L26.7,149.3C53.3,171,107,213,160,192C213.3,171,267,85,320,48C373.3,11,427,21,480,32C533.3,43,587,53,640,69.3C693.3,85,747,107,800,138.7C853.3,171,907,213,960,202.7C1013.3,192,1067,128,1120,133.3C1173.3,139,1227,213,1280,229.3C1333.3,245,1387,203,1413,181.3L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg>
                        <h2 className="text-2xl font-bold text-center">Update {task_title}</h2>
                        <hr className='w-1/6 mx-auto mt-2 bg-blue-800 border-0 h-1 rounded-full' />
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Task Title</span>
                                </label>
                                <div className=' relative'>
                                    <input {...register("task_title", { required: true })} type="text" defaultValue={task_title} placeholder="Task Title" className={theme === 'sunset' ? "input input-bordered w-full pl-12 bg-gray-50" : "input input-bordered w-full pl-12"} required />
                                    <div className='absolute top-1/3 left-3'>
                                        <FaTasks className='text-xl' />
                                    </div>
                                </div>
                                {errors.task_title && <span className="text-red-700">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Task Detail</span>
                                </label>
                                <div className=' relative'>
                                    <input {...register("task_detail", { required: true })} defaultValue={task_detail} type="text" placeholder="Task Detail" className={theme === 'sunset' ? "input input-bordered w-full pl-12 bg-gray-50" : "input input-bordered w-full pl-12"} required />
                                    <div className='absolute top-1/3 left-3'>
                                        <FaInfoCircle className='text-xl' />
                                    </div>
                                </div>
                                {errors.task_detail && <span className="text-red-700">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Task Quantity</span>
                                </label>
                                <div className=' relative'>
                                    <input {...register("task_quantity", { required: true })} readOnly defaultValue={task_quantity} type="number" placeholder="Task Quantity" className={theme === 'sunset' ? "input input-bordered w-full pl-12 bg-gray-50" : "input input-bordered w-full pl-12"} required />
                                    <div className='absolute top-1/3 left-3'>
                                        <FaClipboard className='text-xl' />
                                    </div>
                                </div>
                                {errors.task_quantity && <span className="text-red-700">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Payable Amount</span>
                                </label>
                                <div className=' relative'>
                                    <input {...register("payable_amount", { required: true })} readOnly defaultValue={payable_amount} type="number" placeholder="Payable Amount" className={theme === 'sunset' ? "input input-bordered w-full pl-12 bg-gray-50" : "input input-bordered w-full pl-12"} required />
                                    <div className='absolute top-1/3 left-3'>
                                        <FaDollarSign className='text-xl' />
                                    </div>
                                </div>
                                {errors.payable_amount && <span className="text-red-700">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Completion Date</span>
                                </label>
                                <div className=' relative'>
                                    <input {...register("completion_date", { required: true })} readOnly defaultValue={completion_date} type="date" placeholder="Completion Date" className={theme === 'sunset' ? "input input-bordered w-full pl-12 bg-gray-50" : "input input-bordered w-full pl-12"} required />
                                    <div className='absolute top-1/3 left-3'>
                                        <FaCalendarAlt className='text-xl' />
                                    </div>
                                </div>
                                {errors.completion_date && <span className="text-red-700">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Submission Info</span>
                                </label>
                                <div className=' relative'>
                                    <input {...register("submission_info", { required: true })} defaultValue={submission_info} type="text" placeholder="Submission Info" className={theme === 'sunset' ? "input input-bordered w-full pl-12 bg-gray-50" : "input input-bordered w-full pl-12"} required />
                                    <div className='absolute top-1/3 left-3'>
                                        <FaInfoCircle className='text-xl' />
                                    </div>
                                </div>
                                {errors.submission_info && <span className="text-red-700">This field is required</span>}
                            </div>
                            <div className="form-control mt-6 w-1/2 mx-auto">
                                <button className='rounded-lg btn btn-primary bg-sky-700 text-white' type="submit">Update Task</button>
                            </div>
                        </form>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" d="M0,128L26.7,149.3C53.3,171,107,213,160,192C213.3,171,267,85,320,48C373.3,11,427,21,480,32C533.3,43,587,53,640,69.3C693.3,85,747,107,800,138.7C853.3,171,907,213,960,202.7C1013.3,192,1067,128,1120,133.3C1173.3,139,1227,213,1280,229.3C1333.3,245,1387,203,1413,181.3L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg>
                    </div>
                </Slide>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UpdateTask;
