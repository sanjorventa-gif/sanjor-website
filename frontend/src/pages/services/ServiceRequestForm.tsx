
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
    useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { createServiceRequest } from '../../api/services';

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
            const dataWithToken = { ...data, recaptcha_token: token }; // Ensure token is passed
            await createServiceRequest(dataWithToken);
            toast({
                title: 'Solicitud enviada.',
                description: "Nos pondremos en contacto a la brevedad.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            reset();
        } catch (error) {
            console.error(error);
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
            <Container maxW="container.md" position="relative" zIndex={1}>
                <VStack spacing={8} align="stretch">
                    <Box textAlign="center">
                        <Heading as="h1" size="xl" mb={2}>Solicitud de Soporte Técnico</Heading>
                        <Text color="gray.600">Complete el formulario para solicitar soporte técnico oficial.</Text>
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
        </Box>
    );
};

export default ServiceRequestForm;
