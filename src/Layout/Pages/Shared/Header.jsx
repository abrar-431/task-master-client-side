import { Link, NavLink } from "react-router-dom";
import logo from '../../../assets/task_master.jpg'
import useAuth from "../../../Hooks/useAuth";
import useCoin from "../../../Hooks/useCoin";

const Header = () => {
    const { user, logOut } = useAuth();
    const [coin] = useCoin();

    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }
    return (
        <div className="bg-gray-900 navbar text-gray-200 z-10 opacity-70">
            <div className="w-5/6 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        {
                            user ?
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 space-y-4 rounded-box w-52 text-lg">
                                    <li><NavLink className={({ isActive }) => isActive ? "text-sky-500 font-semibold border-b-4 rounded-none pb-1 pl-0 pr-0 border-sky-500" : "hover:text-sky-500 font-semibold"} to='/dashboard'>Dashboard</NavLink></li>
                                    <li className="tooltip tooltip-bottom" data-tip={user.displayName}>
                                        <img className='w-10 h-10 rounded-full' src={user.photoURL} alt={user.displayName} />
                                    </li>
                                </ul>
                                :
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 space-y-4 rounded-box w-52 text-lg">
                                    <li><NavLink className={({ isActive }) => isActive ? "text-sky-500 font-semibold border-b-4 rounded-none pb-1 pl-0 pr-0 border-sky-500" : "hover:text-sky-500 font-semibold"} to='/login'>Login</NavLink></li>
                                    <li><NavLink className={({ isActive }) => isActive ? "text-sky-500 border-b-4 rounded-none pb-1 pl-0 pr-0 border-sky-500 font-semibold" : "hover:text-sky-500 font-semibold"} to='/register'>Register</NavLink></li>
                                </ul>
                        }
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl">
                        <img src={logo} className="w-1/4 rounded-lg" alt="Task Master" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    {
                        user ?
                            <ul className="menu menu-horizontal space-x-4 px-1 text-lg">
                                <li><NavLink className={({ isActive }) => isActive ? "text-sky-500 font-semibold border-b-4 rounded-none pb-1 pl-0 pr-0 border-sky-500" : "hover:text-sky-500 font-semibold"} to='/dashboard'>Dashboard</NavLink></li>

                            </ul>
                            :
                            <ul className="menu menu-horizontal space-x-4 px-1 text-lg">
                                <li><NavLink className={({ isActive }) => isActive ? "text-sky-500 font-semibold border-b-4 rounded-none pb-1 pl-0 pr-0 border-sky-500" : "hover:text-sky-500 font-semibold"} to='/login'>Login</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? "text-sky-500 border-b-4 rounded-none pb-1 pl-0 pr-0 border-sky-500 font-semibold" : "hover:text-sky-500 font-semibold"} to='/register'>Register</NavLink></li>
                            </ul>
                    }
                </div>
                <div className="navbar-end text-lg">
                    {
                        user ?
                            <div className='md:flex hidden gap-2 items-center'>
                                <button onClick={handleLogOut} className='hover:text-sky-500 font-semibold'>Logout</button>
                                <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
                                    <img className='w-10 h-10 rounded-full' src={user.photoURL} alt={user.displayName} />
                                </div>
                                <p>+{coin.coin}</p>
                            </div>
                            :
                            <a className="hover:text-sky-500 font-semibold ml-0 md:ml-4">Watch Demo</a>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;