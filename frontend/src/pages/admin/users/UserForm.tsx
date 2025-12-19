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
    SimpleGrid,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, createUser, updateUser } from '../../../api/users';

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
        newsletter_subscribed: false,
        name: '',
        last_name: '',
        company: '',
        phone: '',
        city: '',
        province: '',
        country: '',
        rubro: '',
        work_area: '',
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
                    newsletter_subscribed: user.newsletter_subscribed || false,
                    name: user.name || '',
                    last_name: user.last_name || '',
                    company: user.company || '',
                    phone: user.phone || '',
                    city: user.city || '',
                    province: user.province || '',
                    country: user.country || '',
                    rubro: user.rubro || '',
                    work_area: user.work_area || '',
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

                        <Heading size="md" pt={4} pb={2}>Información Personal</Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl id="name">
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </FormControl>
                            <FormControl id="last_name">
                                <FormLabel>Apellido</FormLabel>
                                <Input
                                    value={formData.last_name || ''}
                                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                />
                            </FormControl>
                            <FormControl id="phone">
                                <FormLabel>Teléfono</FormLabel>
                                <Input
                                    value={formData.phone || ''}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </FormControl>
                            <FormControl id="company">
                                <FormLabel>Empresa</FormLabel>
                                <Input
                                    value={formData.company || ''}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </FormControl>
                        </SimpleGrid>

                        <Heading size="md" pt={4} pb={2}>Ubicación</Heading>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                            <FormControl id="city">
                                <FormLabel>Ciudad</FormLabel>
                                <Input
                                    value={formData.city || ''}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
                            </FormControl>
                            <FormControl id="province">
                                <FormLabel>Provincia</FormLabel>
                                <Input
                                    value={formData.province || ''}
                                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                />
                            </FormControl>
                            <FormControl id="country">
                                <FormLabel>País</FormLabel>
                                <Input
                                    value={formData.country || ''}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                />
                            </FormControl>
                        </SimpleGrid>

                        <Heading size="md" pt={4} pb={2}>Perfil Profesional</Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl id="rubro">
                                <FormLabel>Rubro</FormLabel>
                                <Select
                                    placeholder="Seleccione..."
                                    value={formData.rubro || ''}
                                    onChange={(e) => setFormData({ ...formData, rubro: e.target.value })}
                                >
                                    <option value="Alimenticia">Alimenticia</option>
                                    <option value="Agropecuaria">Agropecuaria</option>
                                    <option value="Avícola">Avícola</option>
                                    <option value="Clínica">Clínica</option>
                                    <option value="Cosmética">Cosmética</option>
                                    <option value="Esterilización">Esterilización</option>
                                    <option value="Farmacéutica">Farmacéutica</option>
                                    <option value="Higiene">Higiene</option>
                                    <option value="Hospital">Hospital</option>
                                    <option value="Industria">Industria</option>
                                    <option value="Investigación">Investigación</option>
                                    <option value="Laboratorio">Laboratorio</option>
                                    <option value="Odontología">Odontología</option>
                                    <option value="Petroquímica">Petroquímica</option>
                                    <option value="Sanatorio">Sanatorio</option>
                                    <option value="Veterinaria">Veterinaria</option>
                                    <option value="Otros">Otros</option>
                                </Select>
                            </FormControl>
                            <FormControl id="work_area">
                                <FormLabel>Área de Trabajo</FormLabel>
                                <Select
                                    placeholder="Seleccione..."
                                    value={formData.work_area || ''}
                                    onChange={(e) => setFormData({ ...formData, work_area: e.target.value })}
                                >
                                    <option value="Control de Calidad">Control de Calidad</option>
                                    <option value="Investigación y Desarrollo">Investigación y Desarrollo</option>
                                    <option value="Laboratorio Científico">Laboratorio Científico</option>
                                    <option value="Laboratorio Industrial">Laboratorio Industrial</option>
                                    <option value="Producción">Producción</option>
                                    <option value="Sala Estéril">Sala Estéril</option>
                                    <option value="Otro">Otro</option>
                                </Select>
                            </FormControl>
                        </SimpleGrid>

                        <Heading size="md" pt={4} pb={2}>Configuración de Cuenta</Heading>

                        <FormControl id="role">
                            <FormLabel>Rol</FormLabel>
                            <Select
                                value={formData.role || ''}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="usuario_nacional">Pendiente (Usuario Nacional)</option>
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

                        <FormControl display="flex" alignItems="center">
                            <FormLabel htmlFor="newsletter_subscribed" mb="0">
                                Suscrito al Newsletter
                            </FormLabel>
                            <Switch
                                id="newsletter_subscribed"
                                isChecked={formData.newsletter_subscribed}
                                onChange={(e) => setFormData({ ...formData, newsletter_subscribed: e.target.checked })}
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
