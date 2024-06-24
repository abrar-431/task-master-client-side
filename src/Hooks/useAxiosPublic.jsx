import axios from "axios";

const axiosPublicInstance = axios.create({
    baseURL: 'https://b9a12-server-side-abrar-431.vercel.app',
})

const useAxiosPublic = () => {
    return axiosPublicInstance;
};

export default useAxiosPublic;