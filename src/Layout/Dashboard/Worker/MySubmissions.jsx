import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaCheckCircle, FaHourglass, FaTimesCircle } from "react-icons/fa";


const MySubmissions = () => {
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get(`/submissions/worker/${user.email}`)
            .then(res => setTasks(res.data))
    }, [axiosSecure, user])
    console.log(tasks)
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Task Title</th>
                        <th>Task Details</th>
                        <th>Payable Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={task._id}>
                            <th>{index + 1}</th>
                            <td>
                                {task.task_title}
                            </td>
                            <td>{task.task_detail}</td>
                            <td>{task.payable_amount}</td>
                            <td>
                                {task.status === 'pending' && (
                                    <div className="flex">
                                        <FaHourglass className='text-lg mr-2 text-yellow-500' />
                                        Pending
                                    </div>
                                )}
                                {task.status === 'rejected' && (
                                    <div className="flex">
                                        <FaTimesCircle className='text-lg text-red-700 mr-2' />
                                        Rejected
                                    </div>
                                )}
                                {task.status === 'approved' && (
                                    <div className="flex">
                                        <FaCheckCircle className='text-lg mr-2 text-green-600' />
                                        Approved
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MySubmissions;