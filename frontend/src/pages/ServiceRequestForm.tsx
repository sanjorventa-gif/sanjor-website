import { useState } from 'react';
import {
    Box,
    Container,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Stack,
    SimpleGrid,
    useToast,
    Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function ServiceRequestForm() {
    const toast = useToast();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        company: '',
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        city: '',
        province: '',
        country: '',
        message: '',
        stove_model: '',
        serial_number: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await api.post('/services/request', formData);
            toast({
                title: 'Solicitud enviada',
                description: 'Nos pondremos en contacto con usted a la brevedad.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/servicios');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Hubo un problema al enviar la solicitud. Por favor intente nuevamente.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box py={10}>
            <Container maxW={'container.md'}>
                <Heading mb={2} color="brand.700">Solicitud de Servicio Técnico</Heading>
                <Text mb={8} color="gray.600">
                    “SAN JOR” capacita a su red de distribuidores y a técnicos contratados a fin de brindar una rápida solución al momento del service.
                </Text>

                <Box as="form" onSubmit={handleSubmit} bg="white" p={8} rounded="lg" shadow="md">
                    <Stack spacing={6}>
                        <Heading size="md" color="brand.600">Información Personal</Heading>

                        <FormControl>
                            <FormLabel>Empresa / Institución</FormLabel>
                            <Input name="company" value={formData.company} onChange={handleChange} />
                        </FormControl>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Nombre</FormLabel>
                                <Input name="first_name" value={formData.first_name} onChange={handleChange} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Apellidos</FormLabel>
                                <Input name="last_name" value={formData.last_name} onChange={handleChange} />
                            </FormControl>
                        </SimpleGrid>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl>
                                <FormLabel>Teléfono</FormLabel>
                                <Input name="phone" value={formData.phone} onChange={handleChange} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>E-mail</FormLabel>
                                <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                            </FormControl>
                        </SimpleGrid>

                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                            <FormControl>
                                <FormLabel>Ciudad</FormLabel>
                                <Input name="city" value={formData.city} onChange={handleChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Provincia / Estado</FormLabel>
                                <Input name="province" value={formData.province} onChange={handleChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>País</FormLabel>
                                <Input name="country" value={formData.country} onChange={handleChange} />
                            </FormControl>
                        </SimpleGrid>

                        <FormControl>
                            <FormLabel>Mensaje / Descripción del desperfecto</FormLabel>
                            <Textarea name="message" value={formData.message} onChange={handleChange} rows={4} />
                        </FormControl>

                        <Heading size="md" color="brand.600" pt={4}>Datos de la Estufa</Heading>
                        <Text fontSize="sm" color="gray.500">El N° de serie y modelo lo encontrará en la parte posterior del equipo.</Text>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl>
                                <FormLabel>Modelo</FormLabel>
                                <Input name="stove_model" value={formData.stove_model} onChange={handleChange} placeholder="Ej: SL30CDB" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>N° de Serie</FormLabel>
                                <Input name="serial_number" value={formData.serial_number} onChange={handleChange} />
                            </FormControl>
                        </SimpleGrid>

                        <Button
                            type="submit"
                            colorScheme="brand"
                            size="lg"
                            mt={4}
                            isLoading={isSubmitting}
                        >
                            Enviar Solicitud
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}
