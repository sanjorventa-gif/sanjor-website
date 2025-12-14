
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    Text,
    useToast,
    SimpleGrid,
    useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface WarrantyFormData {
    name: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    stove_model: string;
    serial_number: string;
    purchase_date: string;
    vendor: string;
    recaptcha_token?: string;
}

interface WarrantyFormProps {
    type?: 'standard' | 'extension';
}

const WarrantyForm = ({ type = 'standard' }: WarrantyFormProps) => {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<WarrantyFormData>();
    const toast = useToast();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const onSubmit = async (data: WarrantyFormData) => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        try {
            const token = await executeRecaptcha('warranty_registration');
            const dataWithToken = { ...data, recaptcha_token: token, registration_type: type };
            await axios.post(`${import.meta.env.VITE_API_URL}/services/warranty-registrations`, dataWithToken);
            toast({
                title: type === 'extension' ? 'Extensión Solicitada.' : 'Garantía Registrada.',
                description: "Su solicitud se ha enviado correctamente.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            reset();
        } catch (error) {
            toast({
                title: 'Error.',
                description: "Hubo un problema al procesar la solicitud.",
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
                        <Heading as="h1" size="xl" mb={2}>
                            {type === 'extension' ? 'Extensión de Garantía Gratuita' : 'Registro de Estufas'}
                        </Heading>
                        <Text color="gray.600">
                            {type === 'extension'
                                ? 'Complete el formulario para solicitar su extensión de garantía.'
                                : 'Registre su equipo para activar la garantía de fábrica.'}
                        </Text>
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
                                    <FormLabel>Número de Serie</FormLabel>
                                    <Input {...register('serial_number', { required: true })} placeholder="Ver etiqueta posterior" />
                                </FormControl>
                            </SimpleGrid>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                                <FormControl isRequired>
                                    <FormLabel>Fecha de Compra</FormLabel>
                                    <Input type="date" {...register('purchase_date', { required: true })} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Vendedor / Distribuidor</FormLabel>
                                    <Input {...register('vendor', { required: true })} placeholder="Nombre del comercio" />
                                </FormControl>
                            </SimpleGrid>

                            <Button type="submit" colorScheme="green" size="lg" width="full" isLoading={isSubmitting}>
                                {type === 'extension' ? 'Solicitar Extensión' : 'Registrar Garantía'}
                            </Button>
                        </VStack>
                    </Box>

                </VStack>
            </Container >
        </Box >
    );
};

export default WarrantyForm;
