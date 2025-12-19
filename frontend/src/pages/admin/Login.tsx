import { useState } from 'react';
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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async () => {
        const { success, error } = await login(email, password);
        if (success) {
            navigate('/admin');
        } else {
            toast({
                title: 'Error de autenticación',
                description: error || 'La contraseña es incorrecta.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box minH="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Flex
                flex="1"
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Acceso Administrativo</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            Ingrese sus credenciales para continuar
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Contraseña</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    bg={'brand.500'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'brand.600',
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Ingresar
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>

                    <Button
                        variant="link"
                        color="brand.500"
                        onClick={() => navigate('/')}
                    >
                        Volver al Inicio
                    </Button>
                </Stack>
            </Flex>
            <Footer />
        </Box>
    );
}
