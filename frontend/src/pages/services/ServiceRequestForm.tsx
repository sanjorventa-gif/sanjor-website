
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
    Select, // Added Select
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { createServiceRequest } from '../../api/services';

interface ServiceRequestFormData {
    name: string;
    last_name: string;
    company: string;
    email: string;
    phone: string;
    city: string;
    province: string;
    country: string;
    rubro?: string;
    work_area?: string;
    address?: string;
    // Wait, the user list for Service (https://sanjor.com.ar/service.php) DOES NOT have Address/Calle. It has City, Prov, Country.
    // I will keep it in interface but not in form if user didn't ask? 
    // User request list: "Empresa... Mensaje... Modelo... N Serie". NO Address.
    // Removing address from form display (done above).
    stove_model: string;
    serial_number: string;
    problem_description: string;
    recaptcha_token?: string;
    purchase_date?: string;
}

import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ServiceRequestForm = () => {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<ServiceRequestFormData>();
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
                phone: user.phone || '',
                city: user.city || '',
                province: user.province || '',
                country: user.country || '',
                rubro: user.rubro || '',
                work_area: user.work_area || '',
            });
        }
    }, [user, reset]);

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
                        <VStack spacing={6} align="stretch">
                            <Box>
                                <Heading size="md" mb={4} color="gray.700" borderBottom="2px solid" borderColor="brand.500" pb={2} display="inline-block">
                                    Información personal
                                </Heading>
                                <Text fontSize="sm" color="gray.600" mb={4}>
                                    Brindaremos, inclusive si nos contacta vía mail, el diagnóstico preciso de su Estufa. Para ello necesitamos la mayor información posible sobre el desperfecto del equipo.
                                </Text>
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

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Teléfono</FormLabel>
                                    <Input {...register('phone', { required: true })} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>E-mail</FormLabel>
                                    <Input type="email" {...register('email', { required: true })} />
                                </FormControl>
                            </SimpleGrid>

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

                            <FormControl isRequired>
                                <FormLabel>Mensaje</FormLabel>
                                <Textarea {...register('problem_description', { required: true })} rows={5} />
                            </FormControl>

                            <Text fontSize="sm" color="red.500" fontWeight="bold">Asegúrese que los datos estén correctos</Text>

                            <Box pt={4}>
                                <Heading size="md" mb={4} color="gray.700" borderBottom="2px solid" borderColor="brand.500" pb={2} display="inline-block">
                                    Datos de la Estufa
                                </Heading>
                                <Text fontSize="sm" color="gray.500" mb={4}>(Están en la parte posterior de la Estufa)</Text>

                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                    <FormControl isRequired>
                                        <FormLabel>Modelo</FormLabel>
                                        <Input {...register('stove_model', { required: true })} placeholder="Ej: SL30CDB" />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>N° de Serie</FormLabel>
                                        <Input {...register('serial_number')} />
                                        <Text fontSize="xs" color="gray.500" mt={1}>Si no están estos 2 datos puede que la Estufa tenga más de 35 años.</Text>
                                    </FormControl>
                                </SimpleGrid>
                            </Box>

                            <Button type="submit" colorScheme="blue" size="lg" width="full" isLoading={isSubmitting} mt={4}>
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
