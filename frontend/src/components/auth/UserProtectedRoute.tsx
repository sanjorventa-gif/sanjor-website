import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { ReactNode } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

interface ProtectedRouteProps {
    children?: ReactNode;
}

export default function UserProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <Flex justify="center" align="center" h="100vh">
                <Spinner size="xl" color="brand.500" />
            </Flex>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children ? <>{children}</> : <Outlet />;
}
