import { Navigate } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import type { ReactNode } from "react";
// import { tokenVerify } from "../../utils/tokenVerify";

type TProtectedRoute = {
    children: ReactNode;
    designation?: string;
};

const ProtectedRoute = ({ children }: TProtectedRoute) => {
    const token = useAppSelector((state) => state.auth.token);
    // const user = token ? tokenVerify(token) : null;
    if (!token) {
        if (token) {
            return <Navigate to="/access-denied" replace={true} />;
        }
        return <Navigate to="/login" replace={true} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;