import { NavLink, Outlet } from 'react-router-dom';
import {
    FaHome, FaList, FaBook, FaUser, FaCalendar,
    FaShoppingCart, FaAd, FaCoins, FaBell
} from 'react-icons/fa';
import logo from '../../../assets/task_master.jpg'
import useUserRole from '../../../Hooks/useUserRole';
import './Dashboard.css'
import Footer from '../Footer/Footer';
import useAuth from '../../../Hooks/useAuth';
import useCoin from '../../../Hooks/useCoin';
import useNotifications from '../../../Hooks/useNotifications';

const Dashboard = () => {
    const { user } = useAuth();
    const role = useUserRole();
    const [coin] = useCoin();
    const [notifications] = useNotifications();
    console.log(notifications)
    return (
        <div className="flex">
            <div className="w-64 bg-sky-900 text-white min-h-screen flex flex-col">
                <div className="p-4">
                    <img src={logo} alt="Logo" className="w-full" />
                </div>
                <ul className="menu flex-grow">
                    {
                        role.role === 'Admin' ? <>
                            <li>
                                <NavLink to='/dashboard/adminHome'><FaHome className="text-xl"></FaHome>Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manageUsers'><FaUser className="text-xl"></FaUser>Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manageTasks'><FaList className="text-xl"></FaList>Manage Tasks</NavLink>
                            </li>
                        </> : role.role === 'Task Creator' ? <>
                            <li>
                                <NavLink to='/dashboard/creatorHome'><FaHome className="text-xl"></FaHome>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/myTasks'><FaList className="text-xl"></FaList>My Tasks</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/addTasks'><FaList className="text-xl"></FaList>Add New Tasks</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/purchaseCoin'><FaCoins className="text-xl"></FaCoins>Purchase Coin</NavLink>
                            </li>

                            <li>
                                <NavLink to='/dashboard/paymentHistory'><FaCoins className="text-xl"></FaCoins>Payment History</NavLink>
                            </li>
                        </> : role.role === 'Worker' ? <>
                            <li>
                                <NavLink to='/dashboard/workerHome'><FaHome className="text-xl"></FaHome>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/taskList'><FaList className="text-xl"></FaList>Task List</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/mySubmissions'><FaBook className="text-xl"></FaBook>My Submissions</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/withdrawals'><FaCoins className="text-xl"></FaCoins>Withdrawals</NavLink>
                            </li>
                        </> : <>
                            <li>
                                <NavLink to="/dashboard/userHome">
                                    <FaHome className="text-xl"></FaHome>User Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/reservation">
                                    <FaCalendar className="text-xl"></FaCalendar>Reservation</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/cart">
                                    <FaShoppingCart className="text-xl"></FaShoppingCart>My Cart </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/review">
                                    <FaAd className="text-xl"></FaAd>Add a Review</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaList className="text-xl"></FaList>My Bookings</NavLink>
                            </li>
                        </>
                    }
                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'><FaHome className="text-xl"></FaHome>Home</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <div className="text-right flex gap-6 justify-end items-center mb-4 p-8">
                    <div className="">
                        <div className='flex gap-2'>
                            <div className="flex items-center space-x-2">
                                <FaCoins className="text-xl" />
                                <span>{coin.coin} |</span>
                            </div>
                            <img className='w-10 h-10 rounded-full' src={user.photoURL} alt={user.displayName} />
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="flex gap-2">
                                <span>{role.role} |</span>
                                <span>{user.displayName}</span>
                            </div>
                        </div>
                    </div>
                    
                    <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}><FaBell className="text-xl" /></button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            {
                                notifications.map((notification,idx)=><div key={notification._id}>
                                   {idx+1}. Dear {notification.to_email}, <br />
                                    {notification.message} <br /> <br />

                                    Time: {notification.current_time}
                                </div>)
                            }
                            <p className="py-4 text-gray-400">Press ESC key or click outside to close</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <Outlet className="p-8" />
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Dashboard;
