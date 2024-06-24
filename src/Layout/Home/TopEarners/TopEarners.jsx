import  { useState, useEffect } from 'react';
import { FaCoins, FaTasks, FaUserAlt } from 'react-icons/fa';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Title from '../../../Components/Title';

const TopEarners = () => {
  const [topUsers, setTopUsers] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
      axiosPublic.get('/top-user')
      .then(res=>setTopUsers(res.data))
  }, [axiosPublic]);
  console.log(topUsers)

  return (
    <div className="p-6 bg-gray-100">
      <Title heading={'Top Earners'} subHeading={'Recognizing Our Highest Achievers'}></Title>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {topUsers.map(user => (
          <div key={user.email} className="bg-white rounded-xl shadow-lg p-6 m-4 transform transition-transform hover:scale-105">
            <img src={user.picture} alt={user.name} className="rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold text-center mb-2 flex items-center justify-center"><FaUserAlt className="mr-2" /> {user.name}</h3>
            <p className="text-lg flex items-center justify-center mb-2"><FaCoins className="mr-2" /> Coins: <strong className="ml-1">{user.coins}</strong></p>
            <p className="text-lg flex items-center justify-center"><FaTasks className="mr-2" /> Tasks Completed: <strong className="ml-1">{user.tasks_completed}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopEarners;
