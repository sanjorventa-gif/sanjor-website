import { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useToast,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    VStack,
    useDisclosure,
    Flex,
} from '@chakra-ui/react';
import { FaTrash, FaEye } from 'react-icons/fa';
import axios from 'axios';

interface ServiceRequest {
    id: number;
    name: string;
    email: string;
    phone: string;
    city: string;
    stove_model: string;
    problem_description: string;
    created_at: string;
    [key: string]: any;
}

import ExportButtons from '../../../components/common/ExportButtons';

const ServiceRequests = () => {
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const token = localStorage.getItem('token');

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/services/service-requests`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRequests(response.data);
        } catch (error) {
            console.error("Error fetching requests:", error);
            toast({
                title: 'Error',
                description: 'No se pudieron cargar las solicitudes.',
                status: 'error',
                duration: 3000,
            });
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [token]);

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Está seguro de eliminar esta solicitud?')) return;
        try {
            await axios.delete(`http://localhost:8000/api/v1/services/service-requests/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast({ title: 'Solicitud eliminada', status: 'success' });
            fetchRequests();
        } catch (error) {
            toast({ title: 'Error al eliminar', status: 'error' });
        }
    };

    const handleView = (request: ServiceRequest) => {
        setSelectedRequest(request);
        onOpen();
    };

    const exportColumns = [
        { header: 'ID', key: 'id' },
        { header: 'Fecha', key: 'created_at', formatter: (val: string) => new Date(val).toLocaleDateString() },
        { header: 'Nombre', key: 'name' },
        { header: 'Email', key: 'email' },
        { header: 'Teléfono', key: 'phone' },
        { header: 'Ciudad', key: 'city' },
        { header: 'Modelo', key: 'stove_model' },
    ];

    return (
        <Box>
            <Flex justify="space-between" align="center" mb={6}>
                <Heading>Solicitudes de Service</Heading>
                <ExportButtons
                    data={requests}
                    columns={exportColumns}
                    fileName="service_requests_sanjor"
                    title="Reporte de Solicitudes de Service"
                />
            </Flex>
            <Box overflowX="auto">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Fecha</Th>
                            <Th>Nombre</Th>
                            <Th>Modelo</Th>
                            <Th>Problema</Th>
                            <Th>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {requests.map((req) => (
                            <Tr key={req.id}>
                                <Td>{req.id}</Td>
                                <Td>{new Date(req.created_at).toLocaleDateString()}</Td>
                                <Td>{req.name}</Td>
                                <Td>{req.stove_model}</Td>
                                <Td maxW="300px" isTruncated>{req.problem_description}</Td>
                                <Td>
                                    <IconButton
                                        aria-label="Ver detalles"
                                        icon={<FaEye />}
                                        size="sm"
                                        colorScheme="blue"
                                        mr={2}
                                        onClick={() => handleView(req)}
                                    />
                                    <IconButton
                                        aria-label="Eliminar"
                                        icon={<FaTrash />}
                                        size="sm"
                                        colorScheme="red"
                                        onClick={() => handleDelete(req.id)}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detalle de Solicitud #{selectedRequest?.id}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {selectedRequest && (
                            <VStack align="stretch" spacing={4}>
                                <Box>
                                    <Text fontWeight="bold">Fecha:</Text>
                                    <Text>{new Date(selectedRequest.created_at).toLocaleString()}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Nombre:</Text>
                                    <Text>{selectedRequest.name}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Email:</Text>
                                    <Text>{selectedRequest.email}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Teléfono:</Text>
                                    <Text>{selectedRequest.phone}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Ciudad / Dirección:</Text>
                                    <Text>{selectedRequest.city} - {selectedRequest.address}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Modelo de Estufa:</Text>
                                    <Text>{selectedRequest.stove_model}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Fecha de Compra:</Text>
                                    <Text>{selectedRequest.purchase_date}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Descripción del Problema:</Text>
                                    <Text p={4} bg="gray.50" borderRadius="md">{selectedRequest.problem_description}</Text>
                                </Box>
                            </VStack>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ServiceRequests;
