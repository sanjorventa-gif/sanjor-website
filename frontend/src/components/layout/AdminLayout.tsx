import { Box, Flex, Icon, Link, Text, useColorModeValue, VStack, Button } from '@chakra-ui/react';
import { Link as RouterLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaBox, FaSignOutAlt, FaPlus, FaUsers } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const bg = useColorModeValue('white', 'gray.900');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const handleLogoClick = () => {
        navigate('/');
        // Small timeout to ensure navigation happens before logout triggers re-render of ProtectedRoute
        setTimeout(logout, 50);
    };

    const NavItem = ({ icon, children, to }: { icon: any; children: string; to: string }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                as={RouterLink}
                to={to}
                style={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
                w="full"
            >
                <Flex
                    align="center"
                    p="4"
                    mx="4"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    bg={isActive ? 'brand.500' : 'transparent'}
                    color={isActive ? 'white' : 'inherit'}
                    _hover={{
                        bg: isActive ? 'brand.600' : 'brand.50',
                        color: isActive ? 'white' : 'brand.600',
                    }}
                >
                    <Icon
                        mr="4"
                        fontSize="16"
                        as={icon}
                    />
                    {children}
                </Flex>
            </Link>
        );
    };

    return (
        <Flex minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            {/* Sidebar */}
            <Box
                transition="3s ease"
                bg={bg}
                borderRight="1px"
                borderRightColor={borderColor}
                w={{ base: 'full', md: 60 }}
                pos="fixed"
                h="full"
            >
                <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                    <Text
                        fontSize="2xl"
                        fontFamily="monospace"
                        fontWeight="bold"
                        color="brand.600"
                        cursor="pointer"
                        _hover={{ color: 'brand.500' }}
                        onClick={handleLogoClick}
                        title="Cerrar sesión e ir al inicio"
                    >
                        SAN JOR
                    </Text>
                </Flex>
                <VStack spacing={2} align="stretch" mt={4}>
                    <NavItem icon={FaBox} to="/admin">Productos</NavItem>
                    <NavItem icon={FaPlus} to="/admin/new">Nuevo Producto</NavItem>
                    {user?.role === 'admin' && (
                        <NavItem icon={FaUsers} to="/admin/users">Usuarios</NavItem>
                    )}
                </VStack>
                <Box position="absolute" bottom={8} w="full" px={4}>
                    <Button
                        leftIcon={<FaSignOutAlt />}
                        colorScheme="red"
                        variant="ghost"
                        w="full"
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </Button>
                </Box>
            </Box>

            {/* Content */}
            <Box ml={{ base: 0, md: 60 }} p="4" w="full">
                <Outlet />
            </Box>
        </Flex>
    );
}
