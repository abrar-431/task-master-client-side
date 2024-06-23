import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCoin = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: coin = 0} = useQuery({
        queryKey: ['coin', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/coin/${user?.email}`);
            console.log('user coin data ', res.data)
            return res.data.coin;
        },
        enabled: !!user?.email
    })
    return coin;
};

export default useCoin;