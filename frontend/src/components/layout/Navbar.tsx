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
} from '@chakra-ui/react';
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
                        flex={{ base: 1, md: 'auto' }}
                        ml={{ base: -2 }}
                        display={{ base: 'flex', md: 'none' }}
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
                    <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                        <Text
                            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                            fontFamily={'heading'}
                            color={useColorModeValue('brand.500', 'white')}
                            fontWeight="bold"
                            fontSize="xl"
                            as={RouterLink}
                            to="/"
                        >
                            SAN JOR
                        </Text>

                        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                            <DesktopNav />
                        </Flex>
                    </Flex>

                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}
                    >
                        <Button
                            as={RouterLink}
                            to="/login"
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'sm'}
                            fontWeight={600}
                            variant={'link'}
                            color={useColorModeValue('gray.600', 'gray.200')}
                        >
                            Ingresar
                        </Button>
                        <Button
                            as={RouterLink}
                            to="/contacto"
                            display={{ base: 'none', md: 'inline-flex' }}
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
                display={{ md: 'none' }}
            >
                <Collapse in={isOpen} animateOpacity>
                    <MobileNav onToggle={onToggle} />
                </Collapse>
            </Box>

            {/* NewsletterDrawer is now global in App.tsx */}

            {/* Spacer to prevent content from being hidden behind fixed navbar */}
            <Box h="60px" />
        </Box >
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
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

const MobileNav = ({ onToggle }: { onToggle: () => void }) => {
    return (
        <Stack
            bg={useColorModeValue('whiteAlpha.900', 'gray.800')}
            p={4}
            display={{ md: 'none' }}
            backdropFilter="blur(10px)"
            borderBottomWidth={1}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            shadow="lg"
        >
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} onToggleMenu={onToggle} />
            ))}

            <Box borderTopWidth={1} borderColor={useColorModeValue('gray.200', 'gray.700')} my={2} />

            <MobileNavItem label="Ingresar" href="/login" onToggleMenu={onToggle} />
            <MobileNavItem label="Contacto" href="/contacto" onToggleMenu={onToggle} />

            <Stack direction="row" spacing={6} justify="center" mt={6} pt={4} borderTopWidth={1} borderColor={useColorModeValue('gray.200', 'gray.700')}>
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
        </Stack>
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
        <Stack spacing={4} onClick={handleToggle}>
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
                    mt={2}
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
        label: 'Inicio',
        href: '/',
    },
    {
        label: 'Empresa',
        children: [
            {
                label: 'La Empresa',
                subLabel: 'Conozca nuestra trayectoria y valores',
                href: '/empresa',
            },
            {
                label: 'Historia',
                subLabel: 'Nuestra evolución a través del tiempo',
                href: '/historia',
            },
        ]
    },
    {
        label: 'Productos',
        // href: '/productos', // Removed to prevent clicking
        children: [
            {
                label: 'Estufas de Cultivo',
                shortLabel: 'Cultivo',
                subLabel: 'Bacteriología y microbiología',
                href: '/productos/cultivo',
            },
            {
                label: 'Estufas de Esterilización',
                shortLabel: 'Esterilización',
                subLabel: 'Calor seco para instrumental',
                href: '/productos/esterilizacion',
            },
            {
                label: 'Estufas de Secado',
                shortLabel: 'Secado',
                subLabel: 'Eliminación de humedad y ensayos',
                href: '/productos/secado',
            },
            {
                label: 'Productos de Acero Inoxidable',
                shortLabel: 'Acero Inoxidable',
                subLabel: 'Cajas y accesorios',
                href: '/productos/cajas',
            },
            {
                label: 'Asesor de Estufas',
                shortLabel: 'Buscador / Asesor',
                subLabel: 'Encuentre su equipo ideal',
                href: '/productos/asesor',
            },
        ],
    },
    {
        label: 'Servicios',
        href: '/servicios',
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
