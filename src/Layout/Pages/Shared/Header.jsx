import { Link, NavLink } from "react-router-dom";
import logo from '../../../assets/task_master.jpg'

const Header = () => {
    const navLinks = <>
        <li><NavLink className={({ isActive }) => isActive ? "text-sky-500 font-semibold border-b-4 rounded-none pb-1 pl-0 pr-0 border-sky-500" : "hover:text-sky-500 font-semibold"} to='/'>Home</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? "text-sky-500 font-semibold border-b-4 rounded-none pb-1 pl-0 pr-0 border-sky-500" : "hover:text-sky-500 font-semibold"} to='/login'>Login</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? "text-sky-500 border-b-4 rounded-none pb-1 pl-0 pr-0 border-sky-500 font-semibold" : "hover:text-sky-500 font-semibold"} to='/register'>Register</NavLink></li>
    </>
    return (
        <div className="bg-gray-900 navbar text-gray-200 z-10 opacity-70">
            <div className="w-5/6 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 space-y-4 rounded-box w-52 text-lg">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl">
                        <img src={logo} className="w-1/4 rounded-lg" alt="Task Master" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal space-x-4 px-1 text-lg">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn btn-outline btn-info">Watch Demo</a>
                </div>
            </div>
        </div>
    );
};

export default Header;