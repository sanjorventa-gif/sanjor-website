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
    Badge,
    Select,
} from '@chakra-ui/react';
import { FaTrash, FaEye } from 'react-icons/fa';
import ExportButtons from '../../../components/common/ExportButtons';
import { getServiceRequests, deleteServiceRequest, updateServiceRequestStatus, type ServiceRequest } from '../../../api/services';

const ServiceRequests = () => {
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const fetchRequests = async () => {
        try {
            const data = await getServiceRequests();
            setRequests(data);
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
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Está seguro de eliminar esta solicitud?')) return;
        try {
            await deleteServiceRequest(id);
            toast({ title: 'Solicitud eliminada', status: 'success' });
            fetchRequests();
        } catch (error) {
            toast({ title: 'Error al eliminar', status: 'error' });
        }
    };

    const handleStatusChange = async (id: number, newStatus: string) => {
        try {
            await updateServiceRequestStatus(id, newStatus);
            toast({ title: 'Estado actualizado', status: 'success' });
            fetchRequests();
            if (selectedRequest && selectedRequest.id === id) {
                setSelectedRequest({ ...selectedRequest, status: newStatus });
            }
        } catch (error) {
            toast({ title: 'Error al actualizar estado', status: 'error' });
        }
    };

    const handleView = (request: ServiceRequest) => {
        setSelectedRequest(request);
        onOpen();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pendiente': return 'yellow';
            case 'En Proceso': return 'blue';
            case 'Finalizado': return 'green';
            case 'Rechazado': return 'red';
            default: return 'gray';
        }
    };

    const exportColumns = [
        { header: 'ID', key: 'id' },
        { header: 'Fecha', key: 'created_at', formatter: (val: string) => new Date(val).toLocaleDateString() },
        { header: 'Estado', key: 'status' },
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
                            <Th>Estado</Th>
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
                                <Td>
                                    <Badge colorScheme={getStatusColor(req.status || 'Pendiente')}>
                                        {req.status || 'Pendiente'}
                                    </Badge>
                                </Td>
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
                                <Flex justify="space-between" align="center" bg="gray.100" p={2} borderRadius="md">
                                    <Text fontWeight="bold">Estado Actual:</Text>
                                    <Select
                                        w="200px"
                                        bg="white"
                                        value={selectedRequest.status || 'Pendiente'}
                                        onChange={(e) => handleStatusChange(selectedRequest.id, e.target.value)}
                                    >
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="En Proceso">En Proceso</option>
                                        <option value="Finalizado">Finalizado</option>
                                        <option value="Rechazado">Rechazado</option>
                                    </Select>
                                </Flex>
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
