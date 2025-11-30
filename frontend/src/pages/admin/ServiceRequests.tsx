import { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useToast,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
    Stack,
} from '@chakra-ui/react';
import { FaTrash, FaEye } from 'react-icons/fa';
import api from '../../api/axios';

interface ServiceRequest {
    id: number;
    company: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    message: string;
    stove_model: string;
    serial_number: string;
    created_at: string;
}

export default function ServiceRequests() {
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await api.get<ServiceRequest[]>('/services/requests');
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Está seguro de eliminar esta solicitud?')) return;
        try {
            await api.delete(`/services/requests/${id}`);
            setRequests(requests.filter((r) => r.id !== id));
            toast({
                title: 'Solicitud eliminada',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error al eliminar',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleView = (request: ServiceRequest) => {
        setSelectedRequest(request);
        onOpen();
    };

    return (
        <Box>
            <Heading mb={6}>Solicitudes de Service</Heading>
            <Box overflowX="auto">
                <Table variant="simple" bg="white" shadow="sm" rounded="lg">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th>Acciones</Th>
                            <Th>Fecha</Th>
                            <Th>Nombre</Th>
                            <Th>Empresa</Th>
                            <Th>Modelo</Th>
                            <Th>Email</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {requests.map((request) => (
                            <Tr key={request.id}>
                                <Td>
                                    <Stack direction="row" spacing={2}>
                                        <IconButton
                                            aria-label="Ver detalle"
                                            icon={<FaEye />}
                                            size="sm"
                                            colorScheme="blue"
                                            onClick={() => handleView(request)}
                                        />
                                        <IconButton
                                            aria-label="Eliminar"
                                            icon={<FaTrash />}
                                            size="sm"
                                            colorScheme="red"
                                            onClick={() => handleDelete(request.id)}
                                        />
                                    </Stack>
                                </Td>
                                <Td>{new Date(request.created_at).toLocaleDateString()}</Td>
                                <Td>{request.first_name} {request.last_name}</Td>
                                <Td>{request.company || '-'}</Td>
                                <Td>{request.stove_model || '-'}</Td>
                                <Td>{request.email}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detalle de Solicitud</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedRequest && (
                            <Stack spacing={4}>
                                <Box>
                                    <Text fontWeight="bold">Fecha:</Text>
                                    <Text>{new Date(selectedRequest.created_at).toLocaleString()}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Solicitante:</Text>
                                    <Text>{selectedRequest.first_name} {selectedRequest.last_name}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Empresa:</Text>
                                    <Text>{selectedRequest.company || '-'}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Contacto:</Text>
                                    <Text>{selectedRequest.email} / {selectedRequest.phone}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Equipo:</Text>
                                    <Text>Modelo: {selectedRequest.stove_model} / Serie: {selectedRequest.serial_number}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Mensaje:</Text>
                                    <Text whiteSpace="pre-wrap" p={2} bg="gray.50" rounded="md">{selectedRequest.message}</Text>
                                </Box>
                            </Stack>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="brand" onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}
