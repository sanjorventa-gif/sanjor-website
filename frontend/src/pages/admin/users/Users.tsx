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
    Text,
    Select,
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

    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

    const filteredUsers = users.filter((user) => {
        if (filterStatus === 'all') return true;
        if (filterStatus === 'active') return user.is_active;
        if (filterStatus === 'inactive') return !user.is_active;
        return true;
    });

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
        { header: 'Nombre', key: 'name' },
        { header: 'Apellido', key: 'last_name' },
        { header: 'Empresa', key: 'company' },
        { header: 'Teléfono', key: 'phone' },
        { header: 'Ciudad', key: 'city' },
        { header: 'Provincia', key: 'province' },
        { header: 'País', key: 'country' },
        { header: 'Rubro', key: 'rubro' },
        { header: 'Área de Trabajo', key: 'work_area' },
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
                    <Select
                        w="200px"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        bg="white"
                    >
                        <option value="all">Todos</option>
                        <option value="active">Activos</option>
                        <option value="inactive">Pendientes (Inactivos)</option>
                    </Select>
                    <ExportButtons
                        data={filteredUsers}
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
                            <Th w="100px">Acciones</Th>
                            <Th>ID</Th>
                            <Th>Usuario / Email</Th>
                            <Th>Empresa</Th>
                            <Th>Teléfono</Th>
                            <Th>Rol</Th>
                            <Th>Estado</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredUsers.map((user) => (
                            <Tr key={user.id} bg={!user.is_active ? 'red.50' : undefined}>
                                <Td>
                                    <Flex>
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
                                    </Flex>
                                </Td>
                                <Td>
                                    <Text fontWeight={!user.is_active ? 'bold' : 'normal'}>
                                        {user.id}
                                    </Text>
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">
                                            {user.name} {user.last_name}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">
                                            {user.email}
                                        </Text>
                                    </Box>
                                </Td>
                                <Td>
                                    <Text>{user.company || '-'}</Text>
                                </Td>
                                <Td>
                                    <Text>{user.phone || '-'}</Text>
                                </Td>
                                <Td>
                                    <Badge colorScheme={user.role ? 'blue' : 'gray'}>
                                        {user.role || 'Pendiente'}
                                    </Badge>
                                </Td>
                                <Td>
                                    <Badge colorScheme={user.is_active ? 'green' : 'red'}>
                                        {user.is_active ? 'Activo' : 'Pendiente'}
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
