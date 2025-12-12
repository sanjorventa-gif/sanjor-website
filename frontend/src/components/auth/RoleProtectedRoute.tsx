import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Flex, Spinner } from '@chakra-ui/react';

interface RoleProtectedRouteProps {
    allowedRoles: string[];
}

export default function RoleProtectedRoute({ allowedRoles }: RoleProtectedRouteProps) {
    const { isAuthenticated, isLoading, user } = useAuth();

    if (isLoading) {
        return (
            <Flex justify="center" align="center" h="100vh">
                <Spinner size="xl" color="brand.500" />
            </Flex>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    if (user && !allowedRoles.includes(user.role)) {
        // Redirect based on role if possible, or just to home/default admin
        if (user.role === 'servicio_tecnico') {
            return <Navigate to="/admin/service-requests" replace />;
        }
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
