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
    SimpleGrid,
} from '@chakra-ui/react';
import { FaTrash, FaEye } from 'react-icons/fa';
import axios from 'axios';

interface WarrantyRegistration {
    id: number;
    name: string;
    last_name?: string;
    company?: string;
    email: string;
    phone?: string;
    city: string;
    province?: string;
    country?: string;
    address?: string;
    stove_model: string;
    serial_number: string;
    vendor?: string;
    purchase_date?: string;
    rubro?: string;
    work_area?: string;
    created_at: string;
    registration_type: string;
    [key: string]: any;
}

import ExportButtons from '../../../components/common/ExportButtons';

const WarrantyExtensions = () => {
    const [registrations, setRegistrations] = useState<WarrantyRegistration[]>([]);
    const [selectedReg, setSelectedReg] = useState<WarrantyRegistration | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const token = localStorage.getItem('token');

    const fetchRegistrations = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/services/warranty-registrations?type=extension`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRegistrations(response.data);
        } catch (error) {
            console.error("Error fetching registrations:", error);
            toast({
                title: 'Error',
                description: 'No se pudieron cargar los registros.',
                status: 'error',
                duration: 3000,
            });
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, [token]);

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Está seguro de eliminar este registro?')) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/services/warranty-registrations/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast({ title: 'Registro eliminado', status: 'success' });
            fetchRegistrations();
        } catch (error) {
            toast({ title: 'Error al eliminar', status: 'error' });
        }
    };

    const handleView = (reg: WarrantyRegistration) => {
        setSelectedReg(reg);
        onOpen();
    };

    const exportColumns = [
        { header: 'ID', key: 'id' },
        { header: 'Fecha', key: 'created_at', formatter: (val: string) => new Date(val).toLocaleDateString() },
        { header: 'Nombre', key: 'name' },
        { header: 'Email', key: 'email' },
        { header: 'Modelo', key: 'stove_model' },
        { header: 'Serie', key: 'serial_number' },
        { header: 'Vendedor', key: 'vendor' },
    ];

    return (
        <Box>
            <Flex justify="space-between" align="center" mb={6}>
                <Heading>Extensiones de Garantía</Heading>
                <ExportButtons
                    data={registrations}
                    columns={exportColumns}
                    fileName="extensiones_garantia_sanjor"
                    title="Reporte de Extensiones de Garantía"
                />
            </Flex>
            <Box bg="white" shadow="sm" rounded="lg" overflow="hidden">
                <Table variant="simple">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th w="100px">Acciones</Th>
                            <Th>ID</Th>
                            <Th>Fecha</Th>
                            <Th>Nombre</Th>
                            <Th>Modelo</Th>
                            <Th>N° Serie</Th>
                            <Th>Vendedor</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {registrations.map((reg) => (
                            <Tr key={reg.id}>
                                <Td>
                                    <Flex>
                                        <IconButton
                                            aria-label="Ver detalles"
                                            icon={<FaEye />}
                                            size="sm"
                                            colorScheme="blue"
                                            variant="ghost"
                                            mr={2}
                                            onClick={() => handleView(reg)}
                                        />
                                        <IconButton
                                            aria-label="Eliminar"
                                            icon={<FaTrash />}
                                            size="sm"
                                            colorScheme="red"
                                            variant="ghost"
                                            onClick={() => handleDelete(reg.id)}
                                        />
                                    </Flex>
                                </Td>
                                <Td>{reg.id}</Td>
                                <Td>{new Date(reg.created_at).toLocaleDateString()}</Td>
                                <Td>{reg.name}</Td>
                                <Td>{reg.stove_model}</Td>
                                <Td>{reg.serial_number}</Td>
                                <Td>{reg.vendor}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detalle de Extensión #{selectedReg?.id}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {selectedReg && (
                            <VStack align="stretch" spacing={4}>
                                <Box>
                                    <Heading size="sm" mb={2}>Información Personal</Heading>
                                    <SimpleGrid columns={2} spacing={4}>
                                        <Box>
                                            <Text fontWeight="bold">Nombre Completo:</Text>
                                            <Text>{selectedReg.name} {selectedReg.last_name}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Empresa:</Text>
                                            <Text>{selectedReg.company || '-'}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Email:</Text>
                                            <Text>{selectedReg.email}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Teléfono:</Text>
                                            <Text>{selectedReg.phone}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Rubro / Sector:</Text>
                                            <Text>{selectedReg.rubro || '-'}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Área de Trabajo:</Text>
                                            <Text>{selectedReg.work_area || '-'}</Text>
                                        </Box>
                                    </SimpleGrid>
                                </Box>

                                <Box>
                                    <Heading size="sm" mb={2}>Ubicación</Heading>
                                    <SimpleGrid columns={2} spacing={4}>
                                        <Box>
                                            <Text fontWeight="bold">Ciudad:</Text>
                                            <Text>{selectedReg.city}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Provincia:</Text>
                                            <Text>{selectedReg.province || '-'}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">País:</Text>
                                            <Text>{selectedReg.country || '-'}</Text>
                                        </Box>
                                    </SimpleGrid>
                                </Box>

                                <Box>
                                    <Heading size="sm" mb={2}>Datos de la Estufa</Heading>
                                    <SimpleGrid columns={2} spacing={4}>
                                        <Box>
                                            <Text fontWeight="bold">Modelo:</Text>
                                            <Text>{selectedReg.stove_model}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">N° de Serie:</Text>
                                            <Text>{selectedReg.serial_number || '-'}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Fecha de Compra:</Text>
                                            <Text>{selectedReg.purchase_date || '-'}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Vendedor:</Text>
                                            <Text>{selectedReg.vendor || '-'}</Text>
                                        </Box>
                                    </SimpleGrid>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold" fontSize="sm" color="gray.500">Solicitado el: {new Date(selectedReg.created_at).toLocaleString()}</Text>
                                </Box>
                            </VStack>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default WarrantyExtensions;
