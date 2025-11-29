import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useToast,
    Badge,
    Spinner,
    Center,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

interface User {
    id: number;
    email: string;
    role: string;
    is_active: boolean;
    is_superuser: boolean;
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users/');
            setUsers(response.data);
        } catch (error) {
            toast({
                title: 'Error al cargar usuarios',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Está seguro de eliminar este usuario?')) return;

        try {
            await api.delete(`/users/${id}`);
            setUsers(users.filter((u) => u.id !== id));
            toast({
                title: 'Usuario eliminado',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error al eliminar usuario',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (isLoading) {
        return (
            <Center h="200px">
                <Spinner size="xl" />
            </Center>
        );
    }

    return (
        <Container maxW="container.xl" py={8}>
            <Flex justify="space-between" align="center" mb={8}>
                <Heading size="lg">Gestión de Usuarios</Heading>
                <Button
                    leftIcon={<AddIcon />}
                    colorScheme="brand"
                    onClick={() => navigate('/admin/users/new')}
                >
                    Nuevo Usuario
                </Button>
            </Flex>

            <Box bg="white" shadow="sm" rounded="lg" overflow="hidden">
                <Table variant="simple">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th>ID</Th>
                            <Th>Email</Th>
                            <Th>Rol</Th>
                            <Th>Estado</Th>
                            <Th>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.map((user) => (
                            <Tr key={user.id}>
                                <Td>{user.id}</Td>
                                <Td>{user.email}</Td>
                                <Td>
                                    <Badge colorScheme="blue">{user.role}</Badge>
                                </Td>
                                <Td>
                                    <Badge colorScheme={user.is_active ? 'green' : 'red'}>
                                        {user.is_active ? 'Activo' : 'Inactivo'}
                                    </Badge>
                                </Td>
                                <Td>
                                    <IconButton
                                        aria-label="Editar"
                                        icon={<EditIcon />}
                                        size="sm"
                                        mr={2}
                                        onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                                    />
                                    <IconButton
                                        aria-label="Eliminar"
                                        icon={<DeleteIcon />}
                                        size="sm"
                                        colorScheme="red"
                                        onClick={() => handleDelete(user.id)}
                                        isDisabled={user.is_superuser} // Prevent deleting superusers easily
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Container>
    );
}
