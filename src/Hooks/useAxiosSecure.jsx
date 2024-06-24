import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create(
    {
        baseURL: 'https://b9a12-server-side-abrar-431.vercel.app'
    }
)
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use(function (config){
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error){
        return Promise.reject(error);
    })
    // error status 401 and 403
    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, async (error)=>{
        const status = error.response.status;
        if(status===401 || status===403){
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error)
    })
    return axiosSecure;
};

export default useAxiosSecure;