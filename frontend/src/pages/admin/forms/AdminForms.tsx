import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useToast,
    Flex,
    Badge,
    Spinner,
    Center,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaList } from 'react-icons/fa';
import { getPublicForms, deleteForm } from '../../../api/forms';
import type { Form } from '../../../api/forms';
import { useAuth } from '../../../context/AuthContext';

export default function AdminForms() {
    const [forms, setForms] = useState<Form[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth() as any; // Temporary fix for context type
    const toast = useToast();

    const fetchForms = async () => {
        try {
            // Ideally we should have an admin endpoint to get ALL forms (even inactive), but for now public is fine
            const data = await getPublicForms();
            setForms(data);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'No se pudieron cargar los formularios.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchForms();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Estás seguro de eliminar este formulario? Se borrarán todas sus respuestas.')) return;

        if (!token) return;

        try {
            await deleteForm(token, id);
            toast({
                title: 'Formulario eliminado',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            fetchForms();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'No se pudo eliminar el formulario.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return (
            <Center h="200px">
                <Spinner size="xl" />
            </Center>
        );
    }

    return (
        <Box p={4}>
            <Flex justify="space-between" align="center" mb={6}>
                <Heading size="lg">Gestión de Formularios</Heading>
                <Button
                    as={RouterLink}
                    to="/admin/forms/new"
                    leftIcon={<FaPlus />}
                    colorScheme="brand"
                >
                    Nuevo Formulario
                </Button>
            </Flex>

            <Box overflowX="auto" bg="white" shadow="sm" rounded="lg">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Título</Th>
                            <Th>Slug</Th>
                            <Th>Estado</Th>
                            <Th>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {forms.map((form) => (
                            <Tr key={form.id}>
                                <Td>{form.id}</Td>
                                <Td fontWeight="bold">{form.title}</Td>
                                <Td>{form.slug}</Td>
                                <Td>
                                    <Badge colorScheme={form.is_active ? 'green' : 'red'}>
                                        {form.is_active ? 'Activo' : 'Inactivo'}
                                    </Badge>
                                </Td>
                                <Td>
                                    <Flex gap={2}>
                                        <IconButton
                                            as={RouterLink}
                                            to={`/admin/forms/${form.id}/submissions`}
                                            aria-label="Ver respuestas"
                                            icon={<FaList />}
                                            size="sm"
                                            colorScheme="blue"
                                            title="Ver Respuestas"
                                        />
                                        <IconButton
                                            as={RouterLink}
                                            to={`/admin/forms/edit/${form.id}`}
                                            aria-label="Editar"
                                            icon={<FaEdit />}
                                            size="sm"
                                            colorScheme="yellow"
                                        />
                                        <IconButton
                                            aria-label="Eliminar"
                                            icon={<FaTrash />}
                                            size="sm"
                                            colorScheme="red"
                                            onClick={() => handleDelete(form.id)}
                                        />
                                    </Flex>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
}
