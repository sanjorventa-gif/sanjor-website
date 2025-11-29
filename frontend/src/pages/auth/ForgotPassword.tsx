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
import { useState } from 'react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleSubmit = async () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: 'Solicitud enviada',
                description: 'Si el email existe, recibirá instrucciones para restablecer su contraseña.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setEmail('');
        }, 1500);
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
                    <Heading fontSize={'4xl'}>Recuperar Contraseña</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Ingrese su email para recibir instrucciones
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
                                placeholder="su@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                bg={'brand.500'}
                                color={'white'}
                                _hover={{
                                    bg: 'brand.400',
                                }}
                                onClick={handleSubmit}
                                isLoading={isLoading}
                            >
                                Enviar Solicitud
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
