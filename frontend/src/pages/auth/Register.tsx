import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
    Select,
    Alert,
    AlertIcon,
    Checkbox,
    SimpleGrid,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'usuario_nacional',
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
    const { register, isLoading } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    const handleSubmit = async () => {
        if (formData.password !== formData.confirmPassword) {
            toast({
                title: 'Error',
                description: 'Las contraseñas no coinciden.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Create the data object for API, excluding confirmPassword
        const { confirmPassword, ...registerData } = formData;

        const { success, error } = await register(registerData);
        if (success) {
            if (formData.role.startsWith('distribuidor')) {
                toast({
                    title: 'Registro Completado',
                    description: 'Su cuenta ha sido creada y está pendiente de aprobación por un administrador. Recibirá una notificación cuando sea activada.',
                    status: 'success',
                    duration: 8000,
                    isClosable: true,
                });
                navigate('/');
            } else {
                toast({
                    title: 'Registro Exitoso',
                    description: 'Bienvenido a SAN JOR. Ya puede iniciar sesión.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate('/registro-exitoso');
            }
        } else {
            toast({
                title: 'Error en el Registro',
                description: error || 'No se pudo crear la cuenta. Intente nuevamente.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
            py={12}
        >
            <Stack spacing={8} mx={'auto'} maxW={'4xl'} px={6} w="full">
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Crear Cuenta</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        complete sus datos para acceder a servicios exclusivos
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={6}>
                        {/* Account Type - Top Priority */}
                        <FormControl id="role" isRequired>
                            <FormLabel>Tipo de Cuenta</FormLabel>
                            <Select name="role" value={formData.role} onChange={handleChange}>
                                <option value="usuario_nacional">Usuario Nacional</option>
                                <option value="usuario_internacional">Usuario Internacional</option>
                                <option value="distribuidor_nacional">Distribuidor Nacional</option>
                                <option value="distribuidor_internacional">Distribuidor Internacional</option>
                            </Select>
                        </FormControl>

                        {formData.role.startsWith('distribuidor') && (
                            <Alert status="info" borderRadius="md" fontSize="sm">
                                <AlertIcon />
                                Las cuentas de distribuidor requieren verificación manual.
                            </Alert>
                        )}

                        <Heading size="md" color="gray.700" borderBottom="1px solid" borderColor="gray.200" pb={2} mt={2}>
                            Información Personal
                        </Heading>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                            <FormControl id="name" isRequired>
                                <FormLabel>Nombre</FormLabel>
                                <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                            </FormControl>
                            <FormControl id="last_name" isRequired>
                                <FormLabel>Apellidos</FormLabel>
                                <Input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                            </FormControl>
                        </SimpleGrid>

                        <FormControl id="company">
                            <FormLabel>Empresa / Institución</FormLabel>
                            <Input type="text" name="company" value={formData.company} onChange={handleChange} />
                        </FormControl>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                            </FormControl>
                            <FormControl id="phone" isRequired>
                                <FormLabel>Teléfono</FormLabel>
                                <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                            </FormControl>
                        </SimpleGrid>

                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                            <FormControl id="city" isRequired>
                                <FormLabel>Ciudad</FormLabel>
                                <Input type="text" name="city" value={formData.city} onChange={handleChange} />
                            </FormControl>
                            <FormControl id="province" isRequired>
                                <FormLabel>Provincia / Estado</FormLabel>
                                <Input type="text" name="province" value={formData.province} onChange={handleChange} />
                            </FormControl>
                            <FormControl id="country" isRequired>
                                <FormLabel>País</FormLabel>
                                <Input type="text" name="country" value={formData.country} onChange={handleChange} />
                            </FormControl>
                        </SimpleGrid>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                            <FormControl id="rubro">
                                <FormLabel>Rubro / Sector</FormLabel>
                                <Select name="rubro" placeholder="Seleccione..." value={formData.rubro} onChange={handleChange}>
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
                                <Select name="work_area" placeholder="Seleccione..." value={formData.work_area} onChange={handleChange}>
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

                        <Heading size="md" color="gray.700" borderBottom="1px solid" borderColor="gray.200" pb={2} mt={2}>
                            Seguridad
                        </Heading>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                            <FormControl id="password" isRequired>
                                <FormLabel>Contraseña</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="confirmPassword" isRequired>
                                <FormLabel>Confirmar Contraseña</FormLabel>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </SimpleGrid>

                        <FormControl id="newsletter">
                            <Checkbox
                                name="newsletter_subscribed"
                                isChecked={formData.newsletter_subscribed}
                                onChange={handleChange}
                                colorScheme="brand"
                            >
                                Quiero recibir novedades y promociones (Newsletter)
                            </Checkbox>
                        </FormControl>

                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Registrando"
                                size="lg"
                                bg={'brand.500'}
                                color={'white'}
                                _hover={{
                                    bg: 'brand.400',
                                }}
                                onClick={handleSubmit}
                                isLoading={isLoading}
                            >
                                Registrarse
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                ¿Ya tiene una cuenta? <Text as="span" color={'brand.500'} cursor="pointer" onClick={() => navigate('/login')}>Iniciar Sesión</Text>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
