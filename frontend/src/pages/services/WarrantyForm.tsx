
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
    Select,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface WarrantyFormData {
    name: string;
    last_name: string;
    company: string;
    email: string;
    city: string;
    province: string;
    country: string;
    // Removed phone and address as they are not in the form
    stove_model: string;
    serial_number: string;
    purchase_date: string;
    vendor: string;
    rubro: string;
    work_area: string;
    recaptcha_token?: string;
}

interface WarrantyFormProps {
    type?: 'standard' | 'extension';
}

import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const WarrantyForm = ({ type = 'standard' }: WarrantyFormProps) => {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<WarrantyFormData>();
    const toast = useToast();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || '',
                last_name: user.last_name || '',
                company: user.company || '',
                email: user.email || '',
                city: user.city || '',
                province: user.province || '',
                country: user.country || '',
                rubro: user.rubro || '',
                work_area: user.work_area || '',
            });
        }
    }, [user, reset]);

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
                            {type === 'extension' ? 'Extensión de Garantía' : 'Registro de Estufas'}
                        </Heading>
                        <Text color="gray.600">
                            {type === 'extension'
                                ? 'Complete el formulario para solicitar su extensión de garantía a 3 años.'
                                : 'Registre su equipo para activar la garantía de fábrica.'}
                        </Text>
                    </Box>

                    <Box as="form" onSubmit={handleSubmit(onSubmit)} bg="white" p={8} borderRadius="lg" shadow="md">
                        <VStack spacing={6} align="stretch">
                            <Box>
                                <Heading size="md" mb={4} color="gray.700" borderBottom="2px solid" borderColor="brand.500" pb={2} display="inline-block">
                                    Información personal
                                </Heading>
                            </Box>

                            <FormControl>
                                <FormLabel>Empresa / Institución</FormLabel>
                                <Input {...register('company')} />
                            </FormControl>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Nombre</FormLabel>
                                    <Input {...register('name', { required: true })} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Apellidos</FormLabel>
                                    <Input {...register('last_name', { required: true })} />
                                </FormControl>
                            </SimpleGrid>

                            <FormControl isRequired>
                                <FormLabel>E-mail</FormLabel>
                                <Input type="email" {...register('email', { required: true })} />
                            </FormControl>

                            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Ciudad</FormLabel>
                                    <Input {...register('city', { required: true })} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Provincia / Estado</FormLabel>
                                    <Input {...register('province', { required: true })} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>País</FormLabel>
                                    <Input {...register('country', { required: true })} />
                                </FormControl>
                            </SimpleGrid>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                <FormControl>
                                    <FormLabel>Rubro / Sector</FormLabel>
                                    <Select {...register('rubro')} placeholder="Seleccione...">
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
                                    <FormLabel>Área de Trabajo</FormLabel>
                                    <Select {...register('work_area')} placeholder="Seleccione...">
                                        <option value="Control de Calidad">Control de Calidad</option>
                                        <option value="Investigación y Desarrollo">Investigación y Desarrollo</option>
                                        <option value="Laboratorio Científico">Laboratorio Científico</option>
                                        <option value="Laboratorio Industrial">Laboratorio Industrial</option>
                                        <option value="Producción">Producción</option>
                                        <option value="Sala Estéril">Sala Estéril</option>
                                        <option value="Otro">Otro</option>
                                    </Select>
                                </FormControl>
                            </SimpleGrid>

                            <Text fontSize="sm" color="red.500" fontWeight="bold">Asegúrese que los datos estén correctos</Text>

                            <Box pt={4}>
                                <Heading size="md" mb={4} color="gray.700" borderBottom="2px solid" borderColor="brand.500" pb={2} display="inline-block">
                                    Datos de la Estufa
                                </Heading>

                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                    <FormControl isRequired>
                                        <FormLabel>Modelo</FormLabel>
                                        <Input {...register('stove_model', { required: true })} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>N° de Serie</FormLabel>
                                        <Input {...register('serial_number', { required: true })} />
                                    </FormControl>
                                </SimpleGrid>

                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
                                    <FormControl isRequired>
                                        <FormLabel>Fecha de Compra</FormLabel>
                                        <Input type="date" {...register('purchase_date', { required: true })} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Negocio Vendedor</FormLabel>
                                        <Input {...register('vendor', { required: true })} />
                                    </FormControl>
                                </SimpleGrid>
                            </Box>

                            <Button type="submit" colorScheme="brand" size="lg" width="full" isLoading={isSubmitting} mt={6}>
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
