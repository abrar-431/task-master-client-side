import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import useCoin from '../../../Hooks/useCoin';

const MyTask = () => {
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [,refetch] = useCoin();

    useEffect(() => {
        axiosSecure.get(`/tasks/user/${user.email}`)
            .then(res => setTasks(res.data))
    }, [user, axiosSecure]);


    const handleDeleteTask = (taskId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tasks/${taskId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            const newTasks = tasks.filter(task => task._id !== taskId);
                            setTasks(newTasks);
                        }
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your task has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    })
            }
        });

    };

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Task Title</th>
                        <th>Task Quantity</th>
                        <th>Payable Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={task._id}>
                            <th>{index + 1}</th>
                            <td>
                                {task.task_title}
                            </td>
                            <td>{task.task_quantity}</td>
                            <td>{task.payable_amount}</td>
                            <td>
                                <>
                                    <Link to={`/dashboard/updateTasks/${task._id}`}>
                                        <button className='mr-2'>
                                            <FaEdit className='text-lg text-sky-600' />
                                        </button>
                                    </Link>
                                    <button className='text-lg text-red-600' onClick={() => handleDeleteTask(task._id)}>
                                        <FaTrash />
                                    </button>
                                </>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyTask;
