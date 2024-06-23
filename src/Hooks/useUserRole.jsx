import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: role = ''} = useQuery({
        queryKey: ['coin', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/user/${user?.email}`);
            return res.data.role;
        },
        enabled: !!user?.email
    })
    return role;
};

export default useUserRole;