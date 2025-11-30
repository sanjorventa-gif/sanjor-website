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

interface WarrantyRegistration {
    id: number;
    company: string;
    first_name: string;
    last_name: string;
    email: string;
    stove_model: string;
    serial_number: string;
    purchase_date: string;
    vendor: string;
    created_at: string;
}

export default function WarrantyRegistrations() {
    const [registrations, setRegistrations] = useState<WarrantyRegistration[]>([]);
    const [selectedReg, setSelectedReg] = useState<WarrantyRegistration | null>(null);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const response = await api.get<WarrantyRegistration[]>('/services/warranties');
            setRegistrations(response.data);
        } catch (error) {
            console.error('Error fetching warranties:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Está seguro de eliminar este registro?')) return;
        try {
            await api.delete(`/services/warranties/${id}`);
            setRegistrations(registrations.filter((r) => r.id !== id));
            toast({
                title: 'Registro eliminado',
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

    const handleView = (reg: WarrantyRegistration) => {
        setSelectedReg(reg);
        onOpen();
    };

    return (
        <Box>
            <Heading mb={6}>Registros de Garantía</Heading>
            <Box overflowX="auto">
                <Table variant="simple" bg="white" shadow="sm" rounded="lg">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th>Acciones</Th>
                            <Th>Fecha Registro</Th>
                            <Th>Cliente</Th>
                            <Th>Modelo</Th>
                            <Th>N° Serie</Th>
                            <Th>Vendedor</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {registrations.map((reg) => (
                            <Tr key={reg.id}>
                                <Td>
                                    <Stack direction="row" spacing={2}>
                                        <IconButton
                                            aria-label="Ver detalle"
                                            icon={<FaEye />}
                                            size="sm"
                                            colorScheme="blue"
                                            onClick={() => handleView(reg)}
                                        />
                                        <IconButton
                                            aria-label="Eliminar"
                                            icon={<FaTrash />}
                                            size="sm"
                                            colorScheme="red"
                                            onClick={() => handleDelete(reg.id)}
                                        />
                                    </Stack>
                                </Td>
                                <Td>{new Date(reg.created_at).toLocaleDateString()}</Td>
                                <Td>{reg.first_name} {reg.last_name}</Td>
                                <Td>{reg.stove_model || '-'}</Td>
                                <Td>{reg.serial_number || '-'}</Td>
                                <Td>{reg.vendor || '-'}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detalle de Garantía</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedReg && (
                            <Stack spacing={4}>
                                <Box>
                                    <Text fontWeight="bold">Fecha Registro:</Text>
                                    <Text>{new Date(selectedReg.created_at).toLocaleString()}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Cliente:</Text>
                                    <Text>{selectedReg.first_name} {selectedReg.last_name}</Text>
                                    <Text>{selectedReg.email}</Text>
                                    <Text>{selectedReg.company}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Equipo:</Text>
                                    <Text>Modelo: {selectedReg.stove_model}</Text>
                                    <Text>Serie: {selectedReg.serial_number}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Compra:</Text>
                                    <Text>Fecha: {selectedReg.purchase_date}</Text>
                                    <Text>Vendedor: {selectedReg.vendor}</Text>
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
