import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    SimpleGrid,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Icon,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
    const toast = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: 'Mensaje enviado.',
            description: "Nos pondremos en contacto con usted a la brevedad.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <Box py={10}>
            <Container maxW={'container.xl'}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16}>
                    {/* Contact Info */}
                    <Stack spacing={8}>
                        <Box>
                            <Heading mb={4} color="brand.700">Contáctenos</Heading>
                            <Text fontSize="lg" color="gray.600">
                                Estamos a su disposición para responder consultas técnicas, comerciales o de servicio.
                            </Text>
                        </Box>

                        <Stack spacing={6}>
                            <ContactItem
                                icon={FaMapMarkerAlt}
                                title="Dirección"
                                text="Av. Siempreviva 1234, CABA, Argentina"
                            />
                            <ContactItem
                                icon={FaPhone}
                                title="Teléfono"
                                text="+54 11 1234-5678"
                            />
                            <ContactItem
                                icon={FaEnvelope}
                                title="Email"
                                text="info@sanjor.com.ar"
                            />
                        </Stack>

                        {/* Map Placeholder */}
                        <Box
                            bg="gray.200"
                            h="300px"
                            rounded="md"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text color="gray.500">Mapa de Google Maps</Text>
                        </Box>
                    </Stack>

                    {/* Contact Form */}
                    <Box
                        bg={useColorModeValue('white', 'gray.800')}
                        p={8}
                        rounded={'xl'}
                        boxShadow={'lg'}
                    >
                        <Heading size="md" mb={6}>Envíenos un mensaje</Heading>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={4}>
                                <FormControl id="name" isRequired>
                                    <FormLabel>Nombre Completo</FormLabel>
                                    <Input type="text" placeholder="Juan Pérez" />
                                </FormControl>
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" placeholder="juan@empresa.com" />
                                </FormControl>
                                <FormControl id="phone">
                                    <FormLabel>Teléfono</FormLabel>
                                    <Input type="tel" placeholder="+54 11 ..." />
                                </FormControl>
                                <FormControl id="subject">
                                    <FormLabel>Asunto</FormLabel>
                                    <Input type="text" placeholder="Consulta sobre..." />
                                </FormControl>
                                <FormControl id="message" isRequired>
                                    <FormLabel>Mensaje</FormLabel>
                                    <Textarea placeholder="Escriba su consulta aquí..." rows={6} />
                                </FormControl>
                                <Button
                                    type="submit"
                                    colorScheme="brand"
                                    size="lg"
                                    w="full"
                                    mt={4}
                                >
                                    Enviar Mensaje
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </SimpleGrid>
            </Container>
        </Box>
    );
}

const ContactItem = ({ icon, title, text }: { icon: any; title: string; text: string }) => {
    return (
        <Stack direction="row" align="center" spacing={4}>
            <Box
                bg="brand.100"
                p={3}
                rounded="full"
                color="brand.600"
            >
                <Icon as={icon} w={5} h={5} />
            </Box>
            <Box>
                <Text fontWeight="bold" fontSize="sm">{title}</Text>
                <Text color="gray.600">{text}</Text>
            </Box>
        </Stack>
    );
};
