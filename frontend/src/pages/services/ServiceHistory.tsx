import { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    SimpleGrid,
    Badge,
    Spinner,
    Alert,
    AlertIcon,
    Button,
    useColorModeValue,
    Divider,
    Icon,
} from '@chakra-ui/react';
import { getMyServiceRequests, type ServiceRequest } from '../../api/services';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaTools } from 'react-icons/fa';

const ServiceHistory = () => {
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const cardBg = useColorModeValue('white', 'gray.700');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getMyServiceRequests();
                setRequests(data);
            } catch (err) {
                console.error(err);
                setError('No se pudo cargar el historial.');
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pendiente': return 'yellow';
            case 'En Proceso': return 'blue';
            case 'Finalizado': return 'green';
            case 'Rechazado': return 'red';
            default: return 'gray';
        }
    };

    if (loading) {
        return (
            <Container centerContent py={20}>
                <Spinner size="xl" />
            </Container>
        );
    }

    return (
        <Container maxW="container.lg" py={10}>
            <Heading mb={6}>Mis Solicitudes de Service</Heading>

            {error && (
                <Alert status="error" mb={4}>
                    <AlertIcon />
                    {error}
                </Alert>
            )}

            {requests.length === 0 && !error ? (
                <VStack
                    textAlign="center"
                    py={16}
                    bg={cardBg}
                    borderRadius="xl"
                    shadow="sm"
                    spacing={6}
                    border="1px dashed"
                    borderColor="gray.200"
                >
                    <Box bg="blue.50" p={4} rounded="full">
                        <Icon as={FaClipboardList} w={10} h={10} color="blue.500" />
                    </Box>
                    <Box>
                        <Heading size="md" mb={2}>No tiene solicitudes activas</Heading>
                        <Text color="gray.500" maxW="md" mx="auto">
                            Actualmente no tiene ningún ticket de servicio técnico en proceso.
                            Si tiene problemas con algún equipo, puede generar una nueva solicitud aquí.
                        </Text>
                    </Box>
                    <Button
                        as={Link}
                        to="/servicios/tecnico"
                        colorScheme="brand"
                        size="lg"
                        leftIcon={<Icon as={FaTools} />}
                    >
                        Solicitar Servicio Técnico
                    </Button>
                </VStack>
            ) : (
                <VStack spacing={4} align="stretch">
                    {requests.map((req) => (
                        <Box key={req.id} p={6} bg={cardBg} borderRadius="lg" shadow="md" borderWidth="1px">
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                                <Box>
                                    <Text fontSize="sm" color="gray.500">Solicitud #{req.id}</Text>
                                    <Text fontWeight="bold" fontSize="lg">{req.stove_model}</Text>
                                    <Text fontSize="sm">{new Date(req.created_at).toLocaleDateString()}</Text>
                                </Box>
                                <Box textAlign={{ base: 'left', md: 'right' }}>
                                    <Badge colorScheme={getStatusColor(req.status || 'Pendiente')} fontSize="0.9em" px={3} py={1} borderRadius="full">
                                        {req.status || 'Pendiente'}
                                    </Badge>
                                </Box>
                            </SimpleGrid>
                            <Divider mb={4} />
                            <Text fontSize="sm" fontWeight="bold" mb={1}>Problema:</Text>
                            <Text fontSize="md" color="gray.700" whiteSpace="pre-wrap">{req.problem_description}</Text>
                        </Box>
                    ))}
                </VStack>
            )}
        </Container>
    );
};

export default ServiceHistory;
