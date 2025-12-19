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
    useToast,
    Text,
    HStack,
    Heading,
    Box,
    Icon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { subscribeNewsletter } from '../../api/newsletter';
import { FaEnvelope } from 'react-icons/fa';

interface NewsletterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewsletterDrawer({ isOpen, onClose }: NewsletterDrawerProps) {
    // Newsletter State
    const [newsEmail, setNewsEmail] = useState('');
    const [isNewsLoading, setIsNewsLoading] = useState(false);

    const toast = useToast();


    const handleNewsletterSubscribe = async () => {
        if (!newsEmail) return;
        setIsNewsLoading(true);
        try {
            await subscribeNewsletter(newsEmail);
            toast({
                title: 'Suscripción exitosa',
                description: 'Gracias por su interés en SAN JOR.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setNewsEmail('');
            onClose();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'No se pudo completar la suscripción.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsNewsLoading(false);
        }
    };

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                    <HStack>
                        <Icon as={FaEnvelope} color="brand.500" />
                        <Heading size="md">Newsletter</Heading>
                    </HStack>
                </DrawerHeader>

                <DrawerBody p={6} display="flex" flexDirection="column" justifyContent="center">
                    <Stack spacing={6}>
                        <Box textAlign="center">
                            <Text fontSize="md" color="gray.600" mb={4}>
                                Suscríbase a nuestro newsletter para recibir las últimas novedades, actualizaciones de productos y promociones exclusivas.
                            </Text>
                        </Box>

                        <Stack spacing={4}>
                            <Input
                                size="lg"
                                type="email"
                                placeholder="su@email.com"
                                value={newsEmail}
                                onChange={(e) => setNewsEmail(e.target.value)}
                            />
                            <Button
                                size="lg"
                                colorScheme="brand"
                                onClick={handleNewsletterSubscribe}
                                isLoading={isNewsLoading}
                                w="full"
                            >
                                Suscribirme
                            </Button>
                        </Stack>
                    </Stack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}
