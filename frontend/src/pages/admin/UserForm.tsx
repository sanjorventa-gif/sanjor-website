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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, createUser, updateUser } from '../../api/users';

export default function UserForm() {
    const { id } = useParams();
    const isEditing = !!id;
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tempPassword, setTempPassword] = useState('');

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
            if (id) {
                const user = await getUser(Number(id));
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
            if (isEditing && id) {
                const { password, ...dataWithoutPassword } = formData;
                const updateData = password ? formData : dataWithoutPassword;
                await updateUser(Number(id), updateData);
                toast({
                    title: 'Usuario actualizado',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                await createUser(formData);
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

    const handleSavePassword = () => {
        setFormData({ ...formData, password: tempPassword });
        onClose();
        setTempPassword('');
        toast({
            title: 'Contraseña establecida',
            description: 'Se guardará cuando actualice el usuario.',
            status: 'info',
            duration: 2000,
            isClosable: true,
        });
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

                        <FormControl id="role">
                            <FormLabel>Rol</FormLabel>
                            <Select
                                value={formData.role || ''}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="">Pendiente (Sin Rol)</option>
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

                        {isEditing ? (
                            <FormControl>
                                <FormLabel>Contraseña</FormLabel>
                                <Button onClick={onOpen} size="sm" colorScheme="blue" variant="outline">
                                    Cambiar Contraseña
                                </Button>
                                {formData.password && (
                                    <Text fontSize="sm" color="green.500" mt={2}>
                                        Contraseña modificada (pendiente de guardar)
                                    </Text>
                                )}
                            </FormControl>
                        ) : (
                            <FormControl id="password" isRequired>
                                <FormLabel>Contraseña</FormLabel>
                                <Input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </FormControl>
                        )}

                        <Button
                            type="submit"
                            colorScheme="blue"
                            size="lg"
                            isLoading={isLoading}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </form>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cambiar Contraseña</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Nueva Contraseña</FormLabel>
                            <Input
                                type="password"
                                value={tempPassword}
                                onChange={(e) => setTempPassword(e.target.value)}
                                placeholder="Ingrese la nueva contraseña"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSavePassword}>
                            Establecer
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
}
