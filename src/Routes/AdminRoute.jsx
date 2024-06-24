import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate state={location} to='/login'></Navigate>
};

export default AdminRoute;
AdminRoute.propTypes = {
    children: PropTypes.node,
}