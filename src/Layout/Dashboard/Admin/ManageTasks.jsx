import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";


const ManageTasks = () => {
    const [tasks, setTasks] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/tasks')
            .then(res => setTasks(res.data))
    }, [axiosSecure]);

    const handleDelete = async (taskId) => {
          const res = await axiosSecure.delete(`/tasks/${taskId}`);
          if(res.data.deletedCount > 0){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Task has been deleted",
                showConfirmButton: false,
                timer: 1500
              });
              setTasks(tasks.filter(task => task._id !== taskId));
          }
          
    };

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Task Title</th>
                        <th>Task Creator</th>
                        <th>Task Quantity</th>
                        <th>Coin Needed</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={task._id}>
                            <td>{index + 1}</td>
                            <td>{task.task_title}</td>
                            <td>{task.creator_name}</td>
                            <td>{task.task_quantity}</td>
                            <td>{task.payable_amount}</td>
                            <td>{new Date(task.completion_date) > new Date() ? 'Available' : 'Expired'}</td>
                            <td>
                                <button className="btn bg-sky-600 text-white" onClick={() => {
                                    document.getElementById('my_modal_1').showModal();
                                }}><FaEye className="mr-2" /> View</button>
                                <dialog id="my_modal_1" className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">{task.task_title}</h3>
                                        <p className="py-4">{task.task_detail}</p>
                                        <p className="py-2"><strong>Payable Amount:</strong> {task.payable_amount}</p>
                                        <p className="py-2"><strong>Completion Date:</strong> {new Date(task.completion_date).toLocaleDateString()}</p>
                                        <p className="py-2"><strong>Task Quantity:</strong> {task.task_quantity}</p>
                                        <p className="py-2"><strong>Task Creator:</strong> {task.creator_name} ({task.creator_email})</p>
                                        <div className="modal-action">
                                            <button className="btn" onClick={() => document.getElementById('my_modal_1').close()}>Close</button>
                                        </div>
                                    </div>
                                </dialog>
                                <button className="btn btn-danger ml-2" onClick={() => handleDelete(task._id)}>
                                    <FaTrash className="mr-2 text-red-600" /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageTasks;