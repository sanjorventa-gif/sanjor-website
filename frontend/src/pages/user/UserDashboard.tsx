import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Stack,
    Icon,
    Button,
    useColorModeValue,
    Flex,
    Avatar,
} from '@chakra-ui/react';
import { FaClipboardList, FaDownload, FaPlusCircle, FaTools } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ActionCardProps {
    title: string;
    description: string;
    icon: any;
    link: string;
    actionText: string;
    color: string;
}

const ActionCard = ({ title, description, icon, link, actionText, color }: ActionCardProps) => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={6}
            rounded={'xl'}
            shadow={'sm'}
            borderLeft={'4px solid'}
            borderColor={color}
            transition="all 0.3s"
            _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
            justify="space-between"
            height="100%"
        >
            <Stack>
                <Flex
                    w={12}
                    h={12}
                    align={'center'}
                    justify={'center'}
                    bg={`${color.split('.')[0]}.100`}
                    color={color}
                    rounded={'lg'}
                    mb={2}
                >
                    <Icon as={icon} w={6} h={6} />
                </Flex>
                <Heading size="md">{title}</Heading>
                <Text color={'gray.500'} fontSize="sm">{description}</Text>
            </Stack>
            <Button
                as={RouterLink}
                to={link}
                mt={4}
                size="sm"
                variant="outline"
                colorScheme={color.split('.')[0]}
                alignSelf={'start'}
            >
                {actionText}
            </Button>
        </Stack>
    );
};

export default function UserDashboard() {
    const { user } = useAuth();
    const bg = useColorModeValue('gray.50', 'gray.900');

    return (
        <Box minH={'calc(100vh - 60px)'} bg={bg} py={10}>
            {/* Background Pattern */}
            <Box
                position="absolute"
                top="0"
                left="0"
                w="full"
                h="full"
                opacity={0.03}
                backgroundImage="radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)"
                backgroundSize="30px 30px"
                zIndex={0}
                pointerEvents="none"
            />

            <Container maxW={'container.xl'} position="relative" zIndex={1}>
                {/* Welcome Section */}
                <Flex
                    bgGradient="linear(to-r, brand.600, brand.400)"
                    color="white"
                    p={8}
                    rounded="xl"
                    shadow="lg"
                    mb={10}
                    align="center"
                    direction={{ base: 'column', md: 'row' }}
                >
                    <Avatar
                        size="xl"
                        name={user?.email}
                        mr={{ base: 0, md: 6 }}
                        mb={{ base: 4, md: 0 }}
                        bg="white"
                        color="brand.600"
                        src={'https://bit.ly/broken-link'}
                    />
                    <Stack spacing={2} textAlign={{ base: 'center', md: 'left' }}>
                        <Heading size="lg">¡Hola, {user?.name || user?.email?.split('@')[0]}!</Heading>
                        <Text fontSize="lg" opacity={0.9}>
                            Bienvenido a su Panel de {
                                {
                                    'admin': 'Administrador',
                                    'servicio_tecnico': 'Técnico',
                                    'distribuidor': 'Distribuidor'
                                }[user?.role as string] || 'Cliente'
                            }. Desde aquí puede gestionar sus productos y servicios.
                        </Text>
                    </Stack>
                </Flex>

                <Box mb={8}>
                    <Heading size="md" mb={2} color="gray.700">Centro de Control Personal</Heading>
                    <Text color="gray.600">
                        Desde este panel puede administrar toda su relación con SAN JOR. Aquí podrá:
                    </Text>
                    <Stack mt={2} pl={4} spacing={1}>
                        <Text fontSize="sm" color="gray.500">• <b>Solicitar servicio técnico</b> para sus equipos y dar seguimiento al estado de las reparaciones.</Text>
                        <Text fontSize="sm" color="gray.500">• <b>Registrar la garantía</b> de sus nuevos productos para asegurar su cobertura.</Text>
                        <Text fontSize="sm" color="gray.500">• <b>Descargar manuales y software</b> actualizados para su línea de productos.</Text>
                    </Stack>
                </Box>

                <Heading size="md" mb={6} color="gray.600">Accesos Rápidos</Heading>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                    <ActionCard
                        title="Mis Solicitudes"
                        description="Vea el estado de sus tickets de servicio técnico y reparaciones."
                        icon={FaClipboardList}
                        link="/mis-solicitudes"
                        actionText="Ver Historial"
                        color="blue.500"
                    />
                    <ActionCard
                        title="Solicitar Servicio"
                        description="Inicie una nueva solicitud de reparación o mantenimiento."
                        icon={FaTools}
                        link="/servicios/tecnico"
                        actionText="Nueva Solicitud"
                        color="orange.500"
                    />
                    <ActionCard
                        title="Registrar Garantía"
                        description="Active la garantía de su nuevo equipo SAN JOR."
                        icon={FaPlusCircle}
                        link="/servicios/registro"
                        actionText="Registrar Producto"
                        color="green.500"
                    />
                    <ActionCard
                        title="Descargas"
                        description="Acceda a manuales y software para sus equipos."
                        icon={FaDownload}
                        link="/descargas"
                        actionText="Ir a Descargas"
                        color="purple.500"
                    />
                </SimpleGrid>
            </Container>
        </Box>
    );
}
