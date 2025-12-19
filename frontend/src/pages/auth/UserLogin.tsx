import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async () => {
        const { success, error } = await login(email, password);
        if (success) {
            navigate('/mi-cuenta');
        } else {
            toast({
                title: 'Error de inicio de sesión',
                description: error || 'Email o contraseña incorrectos.',
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
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Iniciar Sesión</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        para acceder a su cuenta de SAN JOR
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
                            <FormLabel>Dirección de Email</FormLabel>
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
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}
                            >
                                <Checkbox>Recordarme</Checkbox>
                                <Link as={RouterLink} to="/forgot-password" color={'brand.500'}>
                                    ¿Olvidó su contraseña?
                                </Link>
                            </Stack>
                            <Button
                                bg={'brand.500'}
                                color={'white'}
                                _hover={{
                                    bg: 'brand.400',
                                }}
                                onClick={handleSubmit}
                                isLoading={isLoading}
                            >
                                Ingresar
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                ¿No tiene usuario? <Link as={RouterLink} to="/register" color={'brand.500'}>Regístrese</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
