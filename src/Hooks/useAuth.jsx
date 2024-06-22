import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useAuth = () => {
    const AuthInfo = useContext(AuthContext);
    return AuthInfo;
};

export default useAuth;