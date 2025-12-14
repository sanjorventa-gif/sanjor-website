import {
    Box,
    Flex,
    Icon,
    Link,
    Text,
    useColorModeValue,
    VStack,
    Button,
    useDisclosure,
    Drawer,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
    IconButton,
    DrawerOverlay,
    type BoxProps,
} from '@chakra-ui/react';
import { Link as RouterLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaBox, FaSignOutAlt, FaPlus, FaUsers, FaBars, FaNewspaper, FaClock, FaFilePdf, FaImages, FaTools, FaShieldAlt, FaEnvelope, FaQuestionCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

export default function AdminLayout() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            {/* Sidebar for Desktop */}
            <Box display={{ base: 'none', md: 'block' }}>
                <SidebarContent onClose={() => { }} />
            </Box>

            {/* Drawer for Mobile */}
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton zIndex={20} />
                    <DrawerBody p={0}>
                        <SidebarContent onClose={onClose} w="full" pos="unset" h="full" />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Mobile Nav Button */}
            <Flex
                display={{ base: 'flex', md: 'none' }}
                position="fixed"
                top={4}
                left={4}
                zIndex={20}
            >
                <IconButton
                    aria-label="Open Menu"
                    icon={<FaBars />}
                    onClick={onOpen}
                    variant="outline"
                    bg="white"
                />
            </Flex>

            {/* Content */}
            <Box ml={{ base: 0, md: 60 }} p="4" w="full" pt={{ base: 16, md: 4 }}>
                <Outlet />
            </Box>
        </Flex>
    );
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
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
                onClick={onClose}
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
        <Flex
            direction="column"
            transition="3s ease"
            bg={bg}
            borderRight="1px"
            borderRightColor={borderColor}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between" flexShrink={0}>
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
            <VStack spacing={2} align="stretch" mt={4} flex="1" overflowY="auto" pb={4}>
                {user?.role === 'admin' && (
                    <>
                        <NavItem icon={FaBox} to="/admin">Productos</NavItem>
                        <NavItem icon={FaPlus} to="/admin/new">Nuevo Producto</NavItem>
                        <NavItem icon={FaUsers} to="/admin/users">Usuarios</NavItem>
                        <NavItem icon={FaNewspaper} to="/admin/news">Noticias</NavItem>
                        <NavItem icon={FaClock} to="/admin/history">Historia</NavItem>
                        <NavItem icon={FaImages} to="/admin/carousel">Carrusel Home</NavItem>
                        <NavItem icon={FaTools} to="/admin/service-requests">Solicitudes Service</NavItem>
                        <NavItem icon={FaShieldAlt} to="/admin/warranty-registrations">Registro Estufas</NavItem>
                        <NavItem icon={FaShieldAlt} to="/admin/warranty-extensions">Extensiones</NavItem>
                        <NavItem icon={FaFilePdf} to="/admin/downloads">Descargas</NavItem>
                        <NavItem icon={FaQuestionCircle} to="/admin/faqs">Preguntas Frecuentes</NavItem>
                        <NavItem icon={FaEnvelope} to="/admin/newsletter">Newsletter</NavItem>
                    </>
                )}
                {user?.role === 'servicio_tecnico' && (
                    <>
                        <NavItem icon={FaTools} to="/admin/service-requests">Solicitudes Service</NavItem>
                        <NavItem icon={FaShieldAlt} to="/admin/warranty-registrations">Registro Estufas</NavItem>
                        <NavItem icon={FaShieldAlt} to="/admin/warranty-extensions">Extensiones</NavItem>
                    </>
                )}
            </VStack>
            <Box p={4} flexShrink={0} bg={bg} borderTop="1px" borderTopColor={borderColor}>
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
        </Flex>
    );
};
