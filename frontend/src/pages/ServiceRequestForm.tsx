
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    Heading,
    Text,
    useToast,
    SimpleGrid,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface ServiceRequestFormData {
    name: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    stove_model: string;
    purchase_date: string;
    problem_description: string;
    recaptcha_token?: string;
}

const ServiceRequestForm = () => {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<ServiceRequestFormData>();
    const toast = useToast();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const onSubmit = async (data: ServiceRequestFormData) => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        try {
            const token = await executeRecaptcha('service_request');
            const dataWithToken = { ...data, recaptcha_token: token };
            await axios.post(`${import.meta.env.VITE_API_URL}/services/service-requests`, dataWithToken);
            toast({
                title: 'Solicitud enviada.',
                description: "Nos pondremos en contacto a la brevedad.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            reset();
        } catch (error) {
            toast({
                title: 'Error.',
                description: "Hubo un problema al enviar la solicitud.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW="container.md" py={10}>
            <VStack spacing={8} align="stretch">
                <Box textAlign="center">
                    <Heading as="h1" size="xl" mb={2}>Solicitud de Service</Heading>
                    <Text color="gray.600">Complete el formulario para solicitar servicio técnico oficial.</Text>
                </Box>

                <Box as="form" onSubmit={handleSubmit(onSubmit)} bg="white" p={8} borderRadius="lg" shadow="md">
                    <VStack spacing={4}>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                            <FormControl isRequired>
                                <FormLabel>Nombre</FormLabel>
                                <Input {...register('name', { required: true })} placeholder="Su nombre" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" {...register('email', { required: true })} placeholder="correo@ejemplo.com" />
                            </FormControl>
                        </SimpleGrid>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                            <FormControl isRequired>
                                <FormLabel>Teléfono</FormLabel>
                                <Input {...register('phone', { required: true })} placeholder="Cod. Area + Número" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Ciudad</FormLabel>
                                <Input {...register('city', { required: true })} />
                            </FormControl>
                        </SimpleGrid>

                        <FormControl isRequired>
                            <FormLabel>Dirección</FormLabel>
                            <Input {...register('address', { required: true })} placeholder="Calle, Número, Piso, Depto" />
                        </FormControl>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                            <FormControl isRequired>
                                <FormLabel>Modelo de Estufa</FormLabel>
                                <Input {...register('stove_model', { required: true })} placeholder="Ej: SL30CDB" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Fecha de Compra (Aprox)</FormLabel>
                                <Input type="text" {...register('purchase_date', { required: true })} placeholder="dd/mm/aaaa" />
                            </FormControl>
                        </SimpleGrid>

                        <FormControl isRequired>
                            <FormLabel>Descripción del Problema</FormLabel>
                            <Textarea {...register('problem_description', { required: true })} placeholder="Describa el inconveniente..." rows={5} />
                        </FormControl>

                        <Button type="submit" colorScheme="blue" size="lg" width="full" isLoading={isSubmitting}>
                            Enviar Solicitud
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default ServiceRequestForm;
