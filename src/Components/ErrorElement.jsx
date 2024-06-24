import { AwesomeButton } from "react-awesome-button";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import errorImage from '../assets/error.jpg'

const ErrorElement = () => {
    return (
        <div>
            <Helmet>
                <title>Task Master | Page Not Found</title>
            </Helmet>
            <img className='mx-auto mt-10 w-1/2 rounded-lg' src={errorImage} alt="Error-Not Found" />
            <div className="mt-6 flex justify-center">
                <Link to='/'><AwesomeButton className='rounded-lg' type="danger">Return to Home</AwesomeButton></Link>
            </div>
        </div>
    );
};

export default ErrorElement;