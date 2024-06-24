import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Title from "../../../Components/Title";
import Task from "./Task";


const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(9)
    const count = tasks.length;
    const numberOfPages = Math.ceil(count/itemsPerPage)
    const pages = [...Array(numberOfPages).keys()]
    const axiosSecure = useAxiosSecure();
    useEffect(()=>{
        axiosSecure.get('/tasks?page=${currentPage}&size=${itemsPerPage')
        .then(res=>setTasks(res.data))
    },[axiosSecure])

    console.log(tasks)
    const handleItemsPerPage = e =>{
        console.log(e.target.value)
        const val = parseInt(e.target.value)
        setItemsPerPage(val)
        setCurrentPage(0)
    }

    const handlePrevPage = ()=>{
        if(currentPage > 0){
            setCurrentPage(currentPage-1)
        }
    }
    const handleNextPage = ()=>{
        if(currentPage < pages.length-1){
            setCurrentPage(currentPage+1)
        }
    }
    return (
        <div className="px-6">
            <Title heading={'Available Tasks'} subHeading={'Explore and Complete Tasks to Earn Coins'}></Title>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-5">
                    {
                        tasks.map(task=><Task key={task._id} task={task}></Task>)
                    }
            </div>
            <div className='pagination'>
                <p>Current page: {currentPage}</p>
                <button onClick={handlePrevPage}>Prev</button>
                {
                    pages.map(page => <button
                        className={currentPage === page ? 'selected' : undefined}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >{page}</button>)
                }
                <button onClick={handleNextPage}>Next</button>
                <select value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
                    <option value="5">3</option>
                    <option value="10">9</option>
                    <option value="20">15</option>
                </select>
            </div>
        </div>
    );
};

export default TaskList;