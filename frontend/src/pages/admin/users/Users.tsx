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
import { getUsers, deleteUser, type User } from '../../../api/users';



import ExportButtons from '../../../components/common/ExportButtons';

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
            const data = await getUsers();
            setUsers(data);
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
            await deleteUser(id);
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

    const exportColumns = [
        { header: 'ID', key: 'id' },
        { header: 'Email', key: 'email' },
        { header: 'Rol', key: 'role' },
        { header: 'Estado', key: 'is_active', formatter: (val: boolean) => val ? 'Activo' : 'Inactivo' },
    ];

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
                <Flex gap={2}>
                    <ExportButtons
                        data={users}
                        columns={exportColumns}
                        fileName="usuarios_sanjor"
                        title="Reporte de Usuarios"
                    />
                    <Button
                        leftIcon={<AddIcon />}
                        colorScheme="blue"
                        onClick={() => navigate('/admin/users/new')}
                    >
                        Nuevo Usuario
                    </Button>
                </Flex>
            </Flex>

            <Box bg="white" shadow="sm" rounded="lg" overflow="hidden">
                <Table variant="simple">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th>Acciones</Th>
                            <Th>ID</Th>
                            <Th>Email</Th>
                            <Th>Rol</Th>
                            <Th>Estado</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.map((user) => (
                            <Tr key={user.id}>
                                <Td>
                                    <IconButton
                                        aria-label="Editar"
                                        icon={<EditIcon />}
                                        size="sm"
                                        mr={2}
                                        colorScheme="blue"
                                        variant="ghost"
                                        onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                                        isDisabled={user.is_superuser}
                                    />
                                    <IconButton
                                        aria-label="Eliminar"
                                        icon={<DeleteIcon />}
                                        size="sm"
                                        colorScheme="red"
                                        variant="ghost"
                                        onClick={() => handleDelete(user.id)}
                                        isDisabled={user.is_superuser}
                                    />
                                </Td>
                                <Td>{user.id}</Td>
                                <Td>{user.email}</Td>
                                <Td>
                                    <Badge colorScheme={user.role ? 'blue' : 'gray'}>
                                        {user.role || 'Pendiente'}
                                    </Badge>
                                </Td>
                                <Td>
                                    <Badge colorScheme={user.is_active ? 'green' : 'red'}>
                                        {user.is_active ? 'Activo' : 'Inactivo'}
                                    </Badge>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Container>
    );
}
