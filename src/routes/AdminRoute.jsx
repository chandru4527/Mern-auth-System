import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useAuth";

const AdminRoute = () => {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading) return null

    // Not logged in
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Logged in but not admin
    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    // Admin
    return <Outlet />;
};

export default AdminRoute;