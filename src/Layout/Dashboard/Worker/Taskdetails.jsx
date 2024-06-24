import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { MdEmail } from 'react-icons/md';
import { FaRegCalendarTimes, FaRegUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { FaMoneyCheckDollar, FaPeoplePulling } from "react-icons/fa6";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Countdown from "react-countdown";


const Taskdetails = () => {
    const task = useLoaderData();
    const [submissionDetails, setSubmissionDetails] = useState('');
    const { _id, task_title, task_image_url, task_detail, payable_amount, completion_date, task_quantity, creator_email, creator_name, } = task;
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span className="mt-2 mx-auto text-center text-4xl font-bold">Task Completed</span>;
        } else {
            return (
                <span className="mt-2 mx-auto text-center text-4xl font-bold">
                    {days}d {hours}h {minutes}m {seconds}s
                </span>
            );
        }
    };
    const date = new Date(completion_date);

    const handleSubmit = (e) => {
        e.preventDefault();
        const submission = {
            task_id: _id,
            task_title: task_title,
            task_detail: task_detail,
            task_img_url: task_image_url,
            payable_amount: payable_amount,
            worker_email: user.email,
            submission_details: submissionDetails,
            worker_name: user.displayName,
            creator_name: creator_name,
            creator_email: creator_email,
            current_date: new Date().toISOString(),
            status: 'pending'
        };
        console.log(submission)

        axiosSecure.post('/submissions', submission)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Submission successful!');
                }
            })
    };
    return (
        <div className="px-6">
            <Helmet>
                <title>Task Master | {task_title}</title>
            </Helmet>
            <ToastContainer />
            <div className="flex justify-center">
                <Countdown date={date} renderer={renderer} />
            </div>
            <h2 className="text-2xl font-bold my-4 text-center">{task_title}</h2>
            <img className='rounded-lg w-3/4 my-3 mx-auto' src={task_image_url} alt={task.task_title} />
            <p className="text-center my-2">{task_detail}</p>
            <h2 className="text-xl font-semibold text-center mt-10 mb-3">Task Information</h2>
            <div className="mt-4 flex md:flex-row flex-col justify-between">
                <div className='flex items-center'>
                    <FaMoneyCheckDollar className='text-lg mr-2'></FaMoneyCheckDollar>
                    <p>${payable_amount}</p>
                </div>
                <div className='flex items-center'>
                    <FaRegCalendarTimes className='text-lg mr-2'></FaRegCalendarTimes>
                    <p>{completion_date}</p>
                </div>
                <div className='flex items-center'>
                    <FaPeoplePulling className='text-lg mr-2'></FaPeoplePulling>
                    <p>Quantity: {task_quantity}</p>
                </div>
            </div>
            <h2 className="text-lg font-semibold mt-10 mb-2">Task Creator</h2>
            <div className="flex gap-6">
                <div className='flex items-center'>
                    <FaRegUser className='text-lg mr-2'></FaRegUser>
                    <p>{creator_name}</p>
                </div>
                <div className='flex items-center'>
                    <MdEmail className='text-lg mr-2'></MdEmail>
                    <p>{creator_email}</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="submissionDetails">
                        Submission Details
                    </label>
                    <textarea
                        id="submissionDetails"
                        value={submissionDetails}
                        onChange={(e) => setSubmissionDetails(e.target.value)}
                        placeholder="Enter your submission details here..."
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-sky-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Taskdetails;