import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useNotifications = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: notifications = [], refetch} = useQuery({
        queryKey: ['notification', user?.email],
        enabled: !loading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/notifications/${user?.email}`);
            return res.data;
        },
    })
    return [notifications, refetch];
};

export default useNotifications;