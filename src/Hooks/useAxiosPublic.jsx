import axios from "axios";

const axiosPublicInstance = axios.create({
    baseURL: 'http://localhost:5000',
})

export default axiosPublicInstance;