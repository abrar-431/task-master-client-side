import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const [workers, setWorkers] = useState([]);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get('/users/worker')
            .then(res => setWorkers(res.data))
    }, [axiosSecure])
    const handleRemove = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${userId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            axiosSecure.get('/users/worker')
                                .then(res => setWorkers(res.data))

                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });

    };

    const handleChangeRole = async (e, userId) => {
        const selectedRole = e.target.value;
        const res = await axiosSecure.put(`/users/${userId}/update-role`, { newRole: selectedRole });
        if(res.data.modifiedCount > 0){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User role has been updated",
                showConfirmButton: false,
                timer: 1500
              });
        }
        const response = await axiosSecure.get('/users/worker');
        setWorkers(response.data);
    };
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Display Name</th>
                        <th>User Email</th>
                        <th>Photo</th>
                        <th>Role</th>
                        <th>Coin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {workers.map((worker, index) => (
                        <tr key={worker._id}>
                            <td>{index + 1}</td>
                            <td>{worker.name}</td>
                            <td>{worker.email}</td>
                            <td>
                                {worker.photo && <img src={worker.photo} alt="User" style={{ width: '50px', height: 'auto' }} />}
                            </td>
                            <td>
                                <select
                                    className="form-control"
                                    value={worker.role}
                                    onChange={(e) => handleChangeRole(e, worker._id)}
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Task Creator">Task Creator</option>
                                    <option value="Worker">Worker</option>
                                </select>
                            </td>
                            <td>{worker.coin}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleRemove(worker._id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;