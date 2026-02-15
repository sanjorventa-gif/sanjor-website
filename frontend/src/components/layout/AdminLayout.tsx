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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Switch,
    FormControl,
    FormLabel,
    Stack,
    type BoxProps,
} from '@chakra-ui/react';
import { Link as RouterLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaBox, FaSignOutAlt, FaPlus, FaUsers, FaBars, FaNewspaper, FaClock, FaFilePdf, FaImages, FaTools, FaShieldAlt, FaEnvelope, FaQuestionCircle, FaCog } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const ADMIN_MENU_ITEMS = [
    { id: 'products', label: 'Productos', icon: FaBox, path: '/admin' },
    { id: 'new-product', label: 'Nuevo Producto', icon: FaPlus, path: '/admin/new' },
    { id: 'users', label: 'Usuarios', icon: FaUsers, path: '/admin/users' },
    { id: 'news', label: 'Noticias', icon: FaNewspaper, path: '/admin/news' },
    { id: 'history', label: 'Historia', icon: FaClock, path: '/admin/history' },
    { id: 'carousel', label: 'Carrusel Home', icon: FaImages, path: '/admin/carousel' },
    { id: 'service', label: 'Solicitudes Service', icon: FaTools, path: '/admin/service-requests' },
    { id: 'registrations', label: 'Registro Estufas', icon: FaShieldAlt, path: '/admin/warranty-registrations' },
    { id: 'extensions', label: 'Extensiones', icon: FaShieldAlt, path: '/admin/warranty-extensions' },
    { id: 'downloads', label: 'Descargas', icon: FaFilePdf, path: '/admin/downloads' },
    { id: 'faqs', label: 'Preguntas Frecuentes', icon: FaQuestionCircle, path: '/admin/faqs' },
    { id: 'newsletter', label: 'Newsletter', icon: FaEnvelope, path: '/admin/newsletter' },
];

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

    // Modal state for configuration
    const { isOpen: isConfigOpen, onOpen: onConfigOpen, onClose: onConfigClose } = useDisclosure();

    // Config state
    const [visibleItems, setVisibleItems] = useState<string[]>(() => {
        const saved = localStorage.getItem('adminMenuConfig');
        return saved ? JSON.parse(saved) : ADMIN_MENU_ITEMS.map(i => i.id);
    });

    const handleToggleItem = (id: string) => {
        const newItems = visibleItems.includes(id)
            ? visibleItems.filter(item => item !== id)
            : [...visibleItems, id];
        setVisibleItems(newItems);
        localStorage.setItem('adminMenuConfig', JSON.stringify(newItems));
    };

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
                    VICKING
                </Text>
            </Flex>

            <VStack spacing={2} align="stretch" mt={4} flex="1" overflowY="auto" pb={4} px={2}>
                {user?.role === 'admin' && (
                    <>
                        {ADMIN_MENU_ITEMS.filter(item => visibleItems.includes(item.id)).map(item => (
                            <NavItem key={item.id} icon={item.icon} to={item.path}>{item.label}</NavItem>
                        ))}
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
                {user?.role === 'admin' && (
                    <Button
                        leftIcon={<FaCog />}
                        variant="ghost"
                        w="full"
                        size="sm"
                        justifyContent="flex-start"
                        mb={2}
                        onClick={onConfigOpen}
                        color="gray.500"
                    >
                        Configurar Menú
                    </Button>
                )}
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

            {/* Configuration Modal */}
            <Modal isOpen={isConfigOpen} onClose={onConfigClose} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Configurar Menú</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <Text fontSize="sm" color="gray.500" mb={2}>
                                Seleccione los elementos que desea ver en la barra lateral.
                            </Text>
                            {ADMIN_MENU_ITEMS.map((item) => (
                                <FormControl key={item.id} display="flex" alignItems="center" justifyContent="space-between">
                                    <Flex align="center">
                                        <Icon as={item.icon} mr={3} color="gray.500" />
                                        <FormLabel htmlFor={`switch-${item.id}`} mb="0" cursor="pointer">
                                            {item.label}
                                        </FormLabel>
                                    </Flex>
                                    <Switch
                                        id={`switch-${item.id}`}
                                        isChecked={visibleItems.includes(item.id)}
                                        onChange={() => handleToggleItem(item.id)}
                                        colorScheme="brand"
                                    />
                                </FormControl>
                            ))}
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="brand" onClick={onConfigClose}>
                            Listo
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};
