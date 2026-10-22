import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useAuth";

const PublicRoute = () => {
    const { data: user, isLoading } = useCurrentUser();

    // if (isLoading) return null

    if (user) {
        // Admin
        if (user.role === "admin") {
            return <Navigate to="/admin" replace />;
        }

        // Normal user
        return <Navigate to="/" replace />;
    }

    // Not logged in
    return <Outlet />;
};

export default PublicRoute;