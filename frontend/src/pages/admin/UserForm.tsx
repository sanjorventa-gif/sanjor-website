import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    useToast,
    Select,
    Switch,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';

export default function UserForm() {
    const { id } = useParams();
    const isEditing = !!id;
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'usuario_nacional',
        is_active: true,
        is_superuser: false,
    });

    useEffect(() => {
        if (isEditing) {
            fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await api.get(`/users/`);
            // Simple find since we don't have get-by-id endpoint exposed yet or we can use the list
            // Actually I added get-by-id in backend, let's use it if I did.
            // Checking backend code... yes I added router.put("/{user_id}") but not get("/{user_id}") specifically?
            // Wait, I added get_multi and update/delete/create. I missed get_by_id in the router!
            // I will use the list and find for now, or add the endpoint.
            // Let's check the backend code I wrote.
            // I wrote: read_users (list), create_user, update_user, delete_user.
            // Missing get_user_by_id.
            // I'll just filter from the list for now to save a round trip of editing backend again.
            const user = response.data.find((u: any) => u.id === Number(id));
            if (user) {
                setFormData({
                    email: user.email,
                    password: '', // Don't show password
                    role: user.role,
                    is_active: user.is_active,
                    is_superuser: user.is_superuser,
                });
            }
        } catch (error) {
            toast({
                title: 'Error al cargar usuario',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isEditing) {
                const { password, ...dataWithoutPassword } = formData;
                const updateData = password ? formData : dataWithoutPassword;
                await api.put(`/users/${id}`, updateData);
                toast({
                    title: 'Usuario actualizado',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                await api.post('/users/', formData);
                toast({
                    title: 'Usuario creado',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
            navigate('/admin/users');
        } catch (error) {
            toast({
                title: 'Error al guardar usuario',
                description: 'Verifique los datos e intente nuevamente.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW="container.md" py={8}>
            <Box bg="white" p={8} rounded="lg" shadow="sm">
                <Heading size="lg" mb={6}>
                    {isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </FormControl>

                        <FormControl id="password" isRequired={!isEditing}>
                            <FormLabel>Contraseña {isEditing && '(Dejar en blanco para mantener)'}</FormLabel>
                            <Input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </FormControl>

                        <FormControl id="role">
                            <FormLabel>Rol</FormLabel>
                            <Select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="admin">Admin</option>
                                <option value="usuario_nacional">Usuario Nacional</option>
                                <option value="usuario_internacional">Usuario Internacional</option>
                                <option value="distribuidor_nacional">Distribuidor Nacional</option>
                                <option value="distribuidor_internacional">Distribuidor Internacional</option>
                            </Select>
                        </FormControl>

                        <FormControl display="flex" alignItems="center">
                            <FormLabel htmlFor="is_active" mb="0">
                                Activo
                            </FormLabel>
                            <Switch
                                id="is_active"
                                isChecked={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="brand"
                            size="lg"
                            isLoading={isLoading}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Container>
    );
}
