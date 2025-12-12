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
    });
    const { register, isLoading } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
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

        const success = await register(formData.email, formData.password, formData.role);
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
                navigate('/login');
            }
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Crear Cuenta</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        para acceder a servicios exclusivos
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    minW={{ base: 'full', md: '400px' }}
                >
                    <Stack spacing={4}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Dirección de Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </FormControl>

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
                                Las cuentas de distribuidor requieren verificación manual y aprobación antes de poder acceder.
                            </Alert>
                        )}

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
