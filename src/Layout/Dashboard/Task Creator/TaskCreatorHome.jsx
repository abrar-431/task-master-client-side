import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useCoin from "../../../Hooks/useCoin";
import Title from "../../../Components/Title";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const TaskCreatorHome = () => {
    const [pendingTasks, setPendingTasks] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    useEffect(() => {
        axiosSecure.get(`/submissions/creator/${user.email}`)
            .then(res => setPendingTasks(res.data))
    }, [axiosSecure, user])
    const [coin] = useCoin();
    console.log(coin.coin, pendingTasks)

    const handleApprove = (id) => {
        axiosSecure.patch(`/submissions/${id}`, { status: 'approved' })
            .then(res => console.log(res))
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Approval Successful",
            showConfirmButton: false,
            timer: 1500
        });
    }
    const handleReject = id => {
        axiosSecure.patch(`/submissions/${id}`, { status: 'rejected' })
            .then(res => console.log(res))
    }
    return (
        <div className="space-y-2 px-6">
            <h2 className="text-lg font-semibold">Task-Creator Dashboard</h2>
            <div className="flex justify-between">
                <p>Available Coins: {coin.coin}</p>
                <p>Total Pending Tasks: {pendingTasks.length}</p>
                <p>Total Payment Paid by Users: $0</p>
            </div>

            <Title heading={'Review Requests'}></Title>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Worker Name</th>
                            <th>Task Title</th>
                            <th>Payable Amount</th>
                            <th>View Submission</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingTasks.map((submission, index) => (
                            <tr key={submission._id}>
                                <td>{index + 1}</td>
                                <td>{submission.worker_name} ({submission.worker_email})</td>
                                <td>{submission.task_title}</td>
                                <td>${submission.payable_amount}</td>
                                <td>
                                    <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>View Submission</button>
                                    <dialog id="my_modal_1" className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Submission details: {submission.submission_details}</h3>
                                            <p className="py-4">Press ESC key or click the button below to close</p>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </td>
                                <td className="flex gap-2">
                                    <button className="btn mx-2 flex" onClick={() => handleApprove(submission._id)}><FaCheckCircle className='text-lg mr-2 text-green-600' />
                                        Approved</button>
                                    <button className="btn mx-2 flex" onClick={() => handleReject(submission._id)}><FaTimesCircle className='text-lg text-red-700 mr-2' />Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskCreatorHome;