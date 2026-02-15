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
    Select,
} from '@chakra-ui/react';
import { FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import api from '../../api/axios';


import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

export default function Contact() {
    const toast = useToast();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { user } = useAuth();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const prefilledMessage = searchParams.get('message') || '';

    const handleSubmit = async (e: React.FormEvent) => {
        // ... (existing submit logic)
        e.preventDefault();

        // Get form data
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        try {
            const token = await executeRecaptcha('contact_form');

            // Construct payload matching ContactCreate schema
            const payload = {
                name: data.name as string,
                lastname: data.lastname as string,
                company: data.company as string,
                email: data.email as string,
                phone: data.phone as string,
                rubro: data.rubro as string,
                cargo: data.cargo as string,
                message: data.message as string,
                recaptcha_token: token
            };

            await api.post('/contact/', payload);

            toast({
                title: 'Mensaje enviado.',
                description: "Nos pondremos en contacto con usted a la brevedad.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            // Reset form
            (e.target as HTMLFormElement).reset();

        } catch (error) {
            console.error(error);
            // Check if it's an axios error to show better message?
            // For now generic error is fine as per UI.
            toast({
                title: 'Error.',
                description: "Hubo un problema al enviar el mensaje.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box py={10} position="relative" bg={useColorModeValue('gray.50', 'gray.900')}>
            {/* Background Pattern */}
            <Box
                position="absolute"
                top="0"
                left="0"
                w="full"
                h="full"
                opacity={0.1}
                backgroundImage="radial-gradient(#4299E1 1px, transparent 1px)"
                backgroundSize="20px 20px"
                zIndex={0}
                pointerEvents="none"
            />
            <Container maxW={'container.xl'} position="relative" zIndex={1}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16}>
                    {/* Contact Form */}
                    <Box
                        bg={useColorModeValue('white', 'gray.800')}
                        p={8}
                        rounded={'xl'}
                        boxShadow={'lg'}
                    >
                        <Heading size="md" mb={6}>Envianos un mensaje</Heading>
                        <form onSubmit={handleSubmit} key={user?.id || 'guest'}>
                            <Stack spacing={4}>
                                <SimpleGrid columns={2} spacing={4}>
                                    <FormControl id="name" isRequired>
                                        <FormLabel>Nombre</FormLabel>
                                        <Input name="name" type="text" placeholder="Su nombre" defaultValue={user?.name || ''} />
                                    </FormControl>
                                    <FormControl id="lastname">
                                        <FormLabel>Apellido</FormLabel>
                                        <Input name="lastname" type="text" placeholder="Su apellido" defaultValue={user?.last_name || ''} />
                                    </FormControl>
                                </SimpleGrid>

                                <FormControl id="company">
                                    <FormLabel>Empresa / Institución</FormLabel>
                                    <Input name="company" type="text" placeholder="Nombre de su empresa" defaultValue={user?.company || ''} />
                                </FormControl>

                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                    <FormControl>
                                        <FormLabel>Rubro / Sector</FormLabel>
                                        <Select name="rubro" placeholder="Seleccione..." defaultValue={user?.rubro || ''}>
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
                                    <FormControl>
                                        <FormLabel>Cargo / Área</FormLabel>
                                        <Select name="cargo" placeholder="Seleccione..." defaultValue={user?.work_area || ''}>
                                            <option value="Dirección">Dirección</option>
                                            <option value="Compras">Compras</option>
                                            <option value="Calidad">Calidad</option>
                                            <option value="Producción">Producción</option>
                                            <option value="Mantenimiento">Mantenimiento</option>
                                            <option value="Laboratorio">Laboratorio</option>
                                            <option value="Ventas">Ventas</option>
                                            <option value="Otro">Otro</option>
                                        </Select>
                                    </FormControl>
                                </SimpleGrid>

                                <SimpleGrid columns={2} spacing={4}>
                                    <FormControl id="email" isRequired>
                                        <FormLabel>Email</FormLabel>
                                        <Input name="email" type="email" placeholder="email@ejemplo.com" defaultValue={user?.email || ''} readOnly={!!user?.email} />
                                    </FormControl>
                                    <FormControl id="phone">
                                        <FormLabel>Teléfono</FormLabel>
                                        <Input name="phone" type="tel" placeholder="Cod. Área + Número" defaultValue={user?.phone || ''} />
                                    </FormControl>
                                </SimpleGrid>

                                <FormControl id="message" isRequired>
                                    <FormLabel>Consulta / Mensaje</FormLabel>
                                    <Textarea name="message" placeholder="Escriba su consulta aquí..." rows={6} defaultValue={prefilledMessage} />
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

                    {/* Contact Info */}
                    <Stack spacing={8}>
                        <Box>
                            <Heading mb={4} color="brand.700">SAN JOR</Heading>
                            <Text fontSize="lg" color="gray.600">
                                Estamos a su disposición para responder consultas técnicas, comerciales o de servicio.
                            </Text>
                        </Box>

                        <Stack spacing={6}>
                            <ContactItem
                                icon={FaMapMarkerAlt}
                                title="Dirección"
                                text="Joaquín V. González 1115, San Martín, Bs. As."
                            />
                            <ContactItem
                                icon={FaEnvelope}
                                title="Email"
                                text="info@sanjor.com.ar"
                            />
                            <ContactItem
                                icon={FaClock}
                                title="Horario de Atención"
                                text="Lunes a Viernes de 8:00 a 17:00 hs"
                            />
                        </Stack>

                        {/* Google Map Embed */}
                        <Box
                            bg="gray.200"
                            h="300px"
                            rounded="xl"
                            overflow="hidden"
                            boxShadow="md"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.068474246852!2d-58.5348889!3d-34.5518056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb74a3414b8b5%3A0x918969614c739c19!2sJoaqu%C3%ADn%20V.%20Gonz%C3%A1lez%201115%2C%20B1651DJO%20San%20Mart%C3%ADn%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </Box>
                    </Stack>
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
