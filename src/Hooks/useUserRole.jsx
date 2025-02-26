import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: role = {}} = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/user/${user?.email}`);
            return res.data;
        },
    })
    return role;
};

export default useUserRole;