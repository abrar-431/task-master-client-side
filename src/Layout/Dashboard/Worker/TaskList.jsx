import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Title from "../../../Components/Title";
import Task from "./Task";


const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const axiosSecure = useAxiosSecure();
    useEffect(()=>{
        axiosSecure.get('/tasks')
        .then(res=>setTasks(res.data))
    },[axiosSecure])

    console.log(tasks)
    return (
        <div className="px-6">
            <Title heading={'Available Tasks'} subHeading={'Explore and Complete Tasks to Earn Coins'}></Title>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-5">
                    {
                        tasks.map(task=><Task key={task._id} task={task}></Task>)
                    }
            </div>
        </div>
    );
};

export default TaskList;