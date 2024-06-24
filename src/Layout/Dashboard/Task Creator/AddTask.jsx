import { FaTasks, FaDollarSign, FaCalendarAlt, FaInfoCircle, FaClipboard} from 'react-icons/fa';
import { Slide } from 'react-awesome-reveal';
import { AwesomeButton } from 'react-awesome-button';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import addTask from '../../../assets/newtask.jpg'
import { Helmet } from 'react-helmet-async';
import useCoin from '../../../Hooks/useCoin';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTask = () => {
    const {theme, user} = useAuth();
    const [coin, refetch] = useCoin();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

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
                const { task_title, task_detail, task_quantity, payable_amount, completion_date, submission_info } = data;
                const task_image_url = res.data.data.display_url;
        
                // Calculate total cost
                const totalCost = task_quantity * payable_amount;
        
                // Check if user has enough coins
                if (totalCost > coin.coin) {
                    toast.error("Not enough coins. Please purchase more coins.");
                    return;
                }
        
                // Create new task object
                const NewTask = {
                    task_title,
                    task_detail,
                    task_quantity: parseInt(task_quantity),
                    payable_amount: parseFloat(payable_amount),
                    completion_date,
                    submission_info,
                    task_image_url,
                    creator_email: user.email,
                    creator_name: user.displayName,
                    created_at: new Date().toISOString()
                };
                axiosSecure.post('/tasks', NewTask)
                .then(res=>{
                    if(res.data.insertedId){
                        toast.success('Task added successfully')
                    }
                })

                axiosSecure.patch(`/coin/decrease/${user.email}`, {totalCost})
                .then(res=>{
                    if(res.data.modifiedCount>0){
                        toast('New Notification arrived');
                        refetch();
                    }
                })
                reset();
            }
            
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='flex flex-col md:flex-row gap-6 my-6'>
            <Helmet>
                <title>Task Master | Add New Task</title>
            </Helmet>
            <div className='md:w-1/2 w-full flex-1 my-auto'>
                <Slide damping={0.8}>
                    <img className='rounded-2xl shadow-xl' src={addTask} alt="Task Master" />
                </Slide>
            </div>
            <div className='md:w-1/2 w-full '>
                <Slide damping={0.8} direction="right">
                    <div className='shadow-xl bg-gray-100 flex flex-col'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" d="M0,128L26.7,149.3C53.3,171,107,213,160,192C213.3,171,267,85,320,48C373.3,11,427,21,480,32C533.3,43,587,53,640,69.3C693.3,85,747,107,800,138.7C853.3,171,907,213,960,202.7C1013.3,192,1067,128,1120,133.3C1173.3,139,1227,213,1280,229.3C1333.3,245,1387,203,1413,181.3L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg>
                        <h2 className="text-2xl font-bold text-center">Add New Task</h2>
                        <hr className='w-1/6 mx-auto mt-2 bg-blue-800 border-0 h-1 rounded-full' />
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Task Title</span>
                                </label>
                                <div className=' relative'>
                                    <input {...register("task_title", { required: true })} type="text" placeholder="Task Title" className={theme === 'sunset' ?
                                        "input input-bordered w-full pl-12 bg-gray-50"
                                        :
                                        "input input-bordered w-full pl-12"
                                    } required />
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
                                    <input {...register("task_detail", { required: true })} type="text" placeholder="Task Detail" className={theme === 'sunset' ?
                                        "input input-bordered w-full pl-12 bg-gray-50"
                                        :
                                        "input input-bordered w-full pl-12"
                                    } required />
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
                                    <input {...register("task_quantity", { required: true })} type="number" placeholder="Task Quantity" className={theme === 'sunset' ?
                                        "input input-bordered w-full pl-12 bg-gray-50"
                                        :
                                        "input input-bordered w-full pl-12"
                                    } required />
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
                                    <input {...register("payable_amount", { required: true })} type="number" placeholder="Payable Amount" className={theme === 'sunset' ?
                                        "input input-bordered w-full pl-12 bg-gray-50"
                                        :
                                        "input input-bordered w-full pl-12"
                                    } required />
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
                                    <input {...register("completion_date", { required: true })} type="date" placeholder="Completion Date" className={theme === 'sunset' ?
                                        "input input-bordered w-full pl-12 bg-gray-50"
                                        :
                                        "input input-bordered w-full pl-12"
                                    } required />
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
                                    <input {...register("submission_info", { required: true })} type="text" placeholder="Submission Info" className={theme === 'sunset' ?
                                        "input input-bordered w-full pl-12 bg-gray-50"
                                        :
                                        "input input-bordered w-full pl-12"
                                    } required />
                                    <div className='absolute top-1/3 left-3'>
                                        <FaInfoCircle className='text-xl' />
                                    </div>
                                </div>
                                {errors.submission_info && <span className="text-red-700">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Photo</span>
                                </label>
                                <div>
                                    <input type="file" placeholder="Photo"  {...register("photo", { required: true })} className={theme === 'sunset' ?
                                        "input-bordered w-full file-input bg-gray-50"
                                        :
                                        "input-bordered w-full file-input"
                                    } required />
                                </div>
                                {errors.photo && <span className="text-red-700">This field is required</span>}
                            </div>
                            <div className="form-control mt-6 w-1/2 mx-auto">
                                <AwesomeButton className='rounded-lg' type="primary">Add New Task</AwesomeButton>
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

export default AddTask;
