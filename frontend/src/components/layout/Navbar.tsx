import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Container,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Avatar,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';



export default function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = NAV_ITEMS;

    return (
        <Box>
            <Flex
                bg={useColorModeValue('whiteAlpha.800', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
                position="fixed"
                w="100%"
                zIndex={1000}
                top={0}
                backdropFilter="blur(10px)"
            >
                <Container maxW="container.xl" display="flex" alignItems="center">
                    <Flex
                        flex={{ base: 1, lg: 'auto' }}
                        ml={{ base: -2 }}
                        display={{ base: 'flex', lg: 'none' }}
                    >
                        <IconButton
                            onClick={onToggle}
                            icon={
                                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                            }
                            variant={'ghost'}
                            aria-label={'Toggle Navigation'}
                        />
                    </Flex>
                    <Flex flex={{ base: 1 }} justify={{ base: 'center', lg: 'start' }}>
                        <Text
                            textAlign={useBreakpointValue({ base: 'center', lg: 'left' })}
                            fontFamily={'heading'}
                            color={useColorModeValue('brand.500', 'white')}
                            fontWeight="bold"
                            fontSize="xl"
                            as={RouterLink}
                            to="/"
                        >
                            SAN JOR
                        </Text>

                        <Flex display={{ base: 'none', lg: 'flex' }} ml={10}>
                            <DesktopNav navItems={navItems} />
                        </Flex>
                    </Flex>

                    <Stack
                        flex={{ base: 1, lg: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}
                    >
                        {isAuthenticated ? (
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}
                                >
                                    <Avatar
                                        size={'sm'}
                                        name={user?.name || user?.email}
                                        src={'https://bit.ly/broken-link'}
                                    />
                                </MenuButton>
                                <MenuList zIndex={1001}>
                                    <MenuItem cursor="default" fontWeight="bold">
                                        {user?.name ? `Hola, ${user.name}` : user?.email}
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem as={RouterLink} to="/mis-solicitudes">
                                        Mis Solicitudes
                                    </MenuItem>
                                    {user?.role === 'admin' && (
                                        <MenuItem as={RouterLink} to="/admin">
                                            Panel Admin
                                        </MenuItem>
                                    )}
                                    {user?.role === 'servicio_tecnico' && (
                                        <MenuItem as={RouterLink} to="/admin/service-requests">
                                            Panel Técnico
                                        </MenuItem>
                                    )}
                                    <MenuItem onClick={handleLogout}>
                                        Cerrar Sesión
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <Button
                                as={RouterLink}
                                to="/login"
                                display={{ base: 'none', lg: 'inline-flex' }}
                                fontSize={'sm'}
                                fontWeight={600}
                                variant={'link'}
                                color={useColorModeValue('gray.600', 'gray.200')}
                            >
                                Ingresar
                            </Button>
                        )}
                        <Button
                            as={RouterLink}
                            to="/contacto"
                            display={{ base: 'none', lg: 'inline-flex' }}
                            fontSize={'sm'}
                            fontWeight={600}
                            color={'white'}
                            bg={'brand.500'}
                            _hover={{
                                bg: 'brand.400',
                            }}
                        >
                            Contacto
                        </Button>
                    </Stack>
                </Container>
            </Flex>

            <Box
                position="fixed"
                top="60px"
                w="full"
                zIndex={999}
                display={{ lg: 'none' }}
            >
                <Collapse in={isOpen} animateOpacity>
                    <MobileNav onToggle={onToggle} navItems={navItems} />
                </Collapse>
            </Box>

            {/* NewsletterDrawer is now global in App.tsx */}

            {/* Spacer to prevent content from being hidden behind fixed navbar */}
            <Box h="60px" />
        </Box >
    );
}

const DesktopNav = ({ navItems }: { navItems: Array<NavItem> }) => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {navItems.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                    cursor: 'pointer'
                                }}
                                as={navItem.href ? RouterLink : 'span'}
                                {...(navItem.href ? { to: navItem.href } : {})}
                                display="block"
                            >
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            as={RouterLink}
            to={href ?? '#'}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('brand.50', 'gray.900') }}
        >
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'brand.500' }}
                        fontWeight={500}
                    >
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}
                >
                    <Icon color={'brand.500'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = ({ onToggle, navItems }: { onToggle: () => void, navItems: Array<NavItem> }) => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    // Hook calls must be at the top level, unconditional
    const bg = useColorModeValue('whiteAlpha.900', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const accountTextColor = useColorModeValue('gray.900', 'white');

    return (
        <Stack
            bg={bg}
            p={4}
            display={{ lg: 'none' }}
            backdropFilter="blur(10px)"
            borderBottomWidth={1}
            borderColor={borderColor}
            shadow="lg"
        >
            {navItems.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} onToggleMenu={onToggle} />
            ))}

            <Box borderTopWidth={1} borderColor={borderColor} my={2} />

            {isAuthenticated ? (
                <>
                    <Box py={2}>
                        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" color="gray.500" mb={1}>
                            Cuenta
                        </Text>
                        <Text fontWeight="medium" color={accountTextColor} isTruncated>
                            {user?.name ? `Hola, ${user.name}` : user?.email}
                        </Text>
                    </Box>
                    <MobileNavItem label="Mis Solicitudes" href="/mis-solicitudes" onToggleMenu={onToggle} />
                    {user?.role === 'admin' && (
                        <MobileNavItem label="Panel Admin" href="/admin" onToggleMenu={onToggle} />
                    )}
                    {user?.role === 'servicio_tecnico' && (
                        <MobileNavItem label="Panel Técnico" href="/admin/service-requests" onToggleMenu={onToggle} />
                    )}
                </>
            ) : (
                <MobileNavItem label="Ingresar" href="/login" onToggleMenu={onToggle} />
            )}

            <MobileNavItem label="Contacto" href="/contacto" onToggleMenu={onToggle} />

            {isAuthenticated && (
                <>
                    <Box borderTopWidth={1} borderColor={borderColor} my={2} />
                    <Stack spacing={4} onClick={() => { logout(); navigate('/'); onToggle(); }} cursor="pointer" py={2}>
                        <Flex justify={'space-between'} align={'center'} px={4}>
                            <Text fontWeight={600} color="red.500">
                                Cerrar Sesión
                            </Text>
                        </Flex>
                    </Stack>
                </>
            )}

            <Stack direction="row" spacing={6} justify="center" mt={6} pt={4} borderTopWidth={1} borderColor={borderColor}>
                <IconButton
                    as={Link}
                    href="https://instagram.com"
                    isExternal
                    aria-label="Instagram"
                    icon={<FaInstagram size="24px" />}
                    variant="ghost"
                    colorScheme="brand"
                />
                <IconButton
                    as={Link}
                    href="https://facebook.com"
                    isExternal
                    aria-label="Facebook"
                    icon={<FaFacebook size="24px" />}
                    variant="ghost"
                    colorScheme="brand"
                />
                <IconButton
                    as={Link}
                    href="https://linkedin.com"
                    isExternal
                    aria-label="LinkedIn"
                    icon={<FaLinkedin size="24px" />}
                    variant="ghost"
                    colorScheme="brand"
                />
            </Stack>
        </Stack >
    );
};

const MobileNavItem = ({ label, children, href, onToggleMenu }: NavItem & { onToggleMenu: () => void }) => {
    const { isOpen, onToggle } = useDisclosure();

    const handleToggle = (e: React.MouseEvent) => {
        if (children) {
            e.preventDefault();
            onToggle();
        } else {
            onToggleMenu();
        }
    };

    return (
        <Stack spacing={0} onClick={handleToggle}>
            <Flex
                py={2}
                as={children ? 'div' : RouterLink}
                {...(children ? {} : { to: href ?? '#' })}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}
                cursor="pointer"
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={0}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}
                >
                    {children &&
                        children.map((child) => (
                            <Link
                                key={child.label}
                                py={2}
                                as={RouterLink}
                                to={child.href ?? '#'}
                                _hover={{ textDecoration: 'none' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleMenu();
                                }}
                            >
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    shortLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Productos',
        // href: '/productos', // Removed to prevent clicking
        children: [
            {
                label: 'Estufas de Cultivo',
                shortLabel: 'Cultivo',
                href: '/productos/cultivo',
            },
            {
                label: 'Estufas de Esterilización',
                shortLabel: 'Esterilización',
                href: '/productos/esterilizacion',
            },
            {
                label: 'Estufas de Secado',
                shortLabel: 'Secado',
                href: '/productos/secado',
            },
            {
                label: 'Buscando su Estufa ideal',
                shortLabel: 'Buscador',
                href: '/productos/asesor',
            },
            {
                label: 'Sistema BLAST',
                shortLabel: 'Sistema BLAST',
                href: '/productos/sistema-blast',
            },
            {
                label: 'Productos de Acero Inoxidable',
                shortLabel: 'Acero Inoxidable',
                href: '/productos/acero',
            },
        ],
    },
    {
        label: 'Empresa',
        children: [
            {
                label: 'La Empresa',
                href: '/empresa',
            },
            {
                label: 'Historia',
                href: '/historia',
            },
        ]
    },
    {
        label: 'Servicios',
        href: '/servicios',
        children: [
            {
                label: 'Soporte Técnico',
                href: '/servicios/tecnico',
            },
            {
                label: 'Registro de Estufas',
                href: '/servicios/registro',
            },
            {
                label: 'Extensión de Garantía',
                href: '/servicios/garantia',
            },
            {
                label: 'Preguntas Frecuentes',
                href: '/preguntas-frecuentes',
            },
        ],
    },
    {
        label: 'Descargas',
        href: '/descargas',
    },
    {
        label: 'Noticias',
        href: '/novedades',
    },
];
