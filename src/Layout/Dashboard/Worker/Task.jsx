import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { FaEye, FaCalendarAlt, FaDollarSign, FaTasks } from 'react-icons/fa';
const Task = ({ task }) => {
    const { task_image_url, task_title, creator_name, completion_date, payable_amount, task_quantity } = task;
    return (
        <div key={task._id} className="border-gray-200 border-2 p-4 rounded-xl flex flex-col hover:shadow-lg transition-shadow duration-300">
            <div className="flex-grow">
                <img className='rounded-lg mx-auto' src={task_image_url} alt={task_title} />
                <div className="text-2xl font-bold my-3">{task_title}</div>
                <div className="text-lg my-1">Created By, {creator_name}</div>
                <div className="flex items-center my-1">
                    <FaCalendarAlt className="text-lg mr-2" />
                    <span>Completion Date: {completion_date}</span>
                </div>
                <div className='flex justify-between'>
                    <div className="flex items-center my-1">
                        <FaDollarSign className="text-lg mr-2" />
                        <span>Payable Amount: ${payable_amount}</span>
                    </div>
                    <div className="flex items-center my-1">
                        <FaTasks className="text-lg mr-2" />
                        <span>Task Quantity: {task_quantity}</span>
                    </div>
                </div>
            </div>
            <div className="text-center mx-auto mt-5">
                <Link to={`/dashboard/tasks/${task._id}`}>
                    <button className="btn bg-sky-600 text-white flex items-center justify-center">
                        <FaEye className="mr-2" /> View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Task;
Task.propTypes = {
    task: PropTypes.object,
}