import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCoin = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: coin = {}, refetch } = useQuery({
        queryKey: [user?.email, 'coin'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/coin/${user.email}`);
            return res.data;
        }
    })
    return [coin,refetch];
};

export default useCoin;