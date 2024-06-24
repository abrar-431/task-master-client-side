import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useCoin from "../../../Hooks/useCoin";
import { FaCheckCircle, FaHourglass, FaTimesCircle } from "react-icons/fa";

const WorkerHome = () => {
    const [approvedSubmissions, setapprovedSubmissions] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    useEffect(() => {
        axiosSecure.get(`/submissions/approved/${user.email}`)
            .then(res => setapprovedSubmissions(res.data))

        axiosSecure.get(`/submissions/worker/${user.email}`)
            .then(res => setSubmissions(res.data))
    }, [axiosSecure, user])

    const total = approvedSubmissions.reduce((acc, submission) => {
        return acc + submission.payable_amount;
    }, 0);
    const [coin] = useCoin();
    console.log(coin.coin, submissions, approvedSubmissions)
    return (
        <div className="space-y-2 px-6">
            <h2 className="text-lg font-semibold">{user.displayName}'s Profile</h2>
            <div className="flex justify-between">
                <p>Available Coins: {coin.coin}</p>
                <p>Total Submissions: {submissions.length}</p>
                <p>Total Earnings: ${total}</p>
            </div>
            <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Task Title</th>
            <th>Payable Amount</th>
            <th>Creator Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={submission._id}>
              <th>{index + 1}</th>
              <td>{submission.task_title}</td>
              <td>${submission.payable_amount}</td>
              <td>{submission.creator_name}</td>
              <td>
                {submission.status === 'pending' && (
                  <div className="flex">
                    <FaHourglass className='text-lg mr-2 text-yellow-500' />
                    Pending
                  </div>
                )}
                {submission.status === 'rejected' && (
                  <div className="flex">
                    <FaTimesCircle className='text-lg text-red-700 mr-2' />
                    Rejected
                  </div>
                )}
                {submission.status === 'approved' && (
                  <div className="flex">
                    <FaCheckCircle className='text-lg mr-2 text-green-600' />
                    Approved
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
    );
};

export default WorkerHome;