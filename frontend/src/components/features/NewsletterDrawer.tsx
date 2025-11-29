import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    Stack,
    FormControl,
    FormLabel,
    Checkbox,
    useToast,
    Text,
    Heading,
    Box,
    VStack,
    Divider,
    useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { register, login } from '../../api/auth';

interface NewsletterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewsletterDrawer({ isOpen, onClose }: NewsletterDrawerProps) {
    // Registration State
    const [regData, setRegData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        newsletter: true,
    });
    const [isRegLoading, setIsRegLoading] = useState(false);

    // Newsletter State
    const [newsEmail, setNewsEmail] = useState('');
    const [isNewsLoading, setIsNewsLoading] = useState(false);

    const toast = useToast();
    const bgColor = useColorModeValue('gray.50', 'gray.900');

    const handleRegister = async () => {
        if (regData.password !== regData.confirmPassword) {
            toast({
                title: 'Error',
                description: 'Las contraseñas no coinciden',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsRegLoading(true);
        try {
            await register({
                email: regData.email,
                password: regData.password,
            });

            // Auto-login after successful registration
            await login(regData.email, regData.password);

            toast({
                title: 'Cuenta creada',
                description: 'Bienvenido a la comunidad SAN JOR.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            onClose();
            setRegData({ email: '', password: '', confirmPassword: '', newsletter: true });
            // Reload to update auth state (simple way) or use AuthContext
            window.location.reload();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'No se pudo crear la cuenta. Verifique si el email ya está registrado.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsRegLoading(false);
        }
    };

    const handleNewsletterSubscribe = async () => {
        if (!newsEmail) return;
        setIsNewsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsNewsLoading(false);
            toast({
                title: 'Suscripción exitosa',
                description: 'Gracias por suscribirse a nuestro newsletter.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setNewsEmail('');
            onClose();
        }, 1000);
    };

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                    <Heading size="md">Comunidad SAN JOR</Heading>
                </DrawerHeader>

                <DrawerBody p={0} display="flex" flexDirection="column" height="100%">
                    {/* Top Section: Registration */}
                    <Box
                        flex={{ base: 'auto', md: '65' }}
                        p={6}
                        overflowY="auto"
                        borderBottomWidth={{ base: 1, md: 0 }}
                    >
                        <Stack spacing={6}>
                            <Box>
                                <Heading size="sm" mb={2}>Crear Cuenta</Heading>
                                <Text fontSize="sm" color="gray.500">
                                    Acceda a descargas exclusivas y gestione sus consultas.
                                </Text>
                            </Box>

                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="su@email.com"
                                    value={regData.email}
                                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Contraseña</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="********"
                                    value={regData.password}
                                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Confirmar Contraseña</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="********"
                                    value={regData.confirmPassword}
                                    onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                                />
                            </FormControl>

                            <Checkbox
                                isChecked={regData.newsletter}
                                onChange={(e) => setRegData({ ...regData, newsletter: e.target.checked })}
                                colorScheme="brand"
                            >
                                También quiero recibir novedades.
                            </Checkbox>

                            <Button colorScheme="brand" onClick={handleRegister} isLoading={isRegLoading} w="full">
                                Crear Cuenta
                            </Button>
                        </Stack>
                    </Box>

                    <Divider display={{ base: 'none', md: 'block' }} />

                    {/* Bottom Section: Newsletter */}
                    <Box
                        flex={{ base: '0 0 auto', md: '35' }}
                        bg={bgColor}
                        p={6}
                    >
                        <Stack spacing={4} justify="center" h="full">
                            <VStack spacing={2} align="start">
                                <Heading size="sm">Suscripción al Newsletter</Heading>
                                <Text fontSize="sm" color="gray.600">
                                    Reciba las últimas novedades sin crear una cuenta.
                                </Text>
                            </VStack>

                            <Stack spacing={4}>
                                <FormControl isRequired>
                                    <Input
                                        bg="white"
                                        type="email"
                                        placeholder="su@email.com"
                                        value={newsEmail}
                                        onChange={(e) => setNewsEmail(e.target.value)}
                                    />
                                </FormControl>
                                <Button variant="outline" colorScheme="brand" onClick={handleNewsletterSubscribe} isLoading={isNewsLoading} w="full">
                                    Suscribirse
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}
