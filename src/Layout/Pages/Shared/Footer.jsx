import { Link } from 'react-router-dom';
import logo from '../../../assets/task_master.jpg'

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-gray-900 text-gray-200 opacity-70 rounded mt-10">
            <aside>
                <img className='rounded-md w-1/3' src={logo} alt="Task Master" />
                <p className='font-bold mt-1'>Task Master: Master Your Day, Every Day</p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <Link to='https://github.com/abrar-431'> <svg height="24" viewBox="0 0 16 16"
                        width="24" aria-hidden="true" fill='currentColor' className="octicon octicon-mark-github v-align-middle">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27 7.6 7.6 0 0 1 2 .27c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.45.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                        ></path>
                    </svg>
                    </Link>
                    <Link to='https://www.linkedin.com/in/abrar-hafiz'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16"> <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" /></svg></Link>
                    <Link to='https://web.facebook.com/abrarhafiz.rabbani'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></Link>
                </div>
            </nav>
            <aside>
                <p>Copyright © 2024 - All right reserved by Task Master</p>
            </aside>
        </footer>
    );
};

export default Footer;