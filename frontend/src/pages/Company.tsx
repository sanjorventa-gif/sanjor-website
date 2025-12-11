
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    SimpleGrid,
    Icon,
    useColorModeValue,
    Image,
    Button,
    List,
    ListItem,
    ListIcon,
    VStack,
    Divider,
} from '@chakra-ui/react';
import { FaAward, FaGlobeAmericas, FaLeaf, FaHandsHelping, FaCheckCircle, FaIndustry } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

export default function Company() {
    const bgGray = useColorModeValue('gray.50', 'gray.900');
    const bgWhite = useColorModeValue('white', 'gray.800');

    return (
        <Box>
            {/* Hero Section */}
            <Box bg="brand.600" color="white" py={20}>
                <Container maxW={'container.xl'} textAlign="center">
                    <Heading as="h1" size="2xl" mb={4}>
                        Nuestra Empresa
                    </Heading>
                    <Text fontSize="xl" maxW="2xl" mx="auto">
                        Líderes en fabricación de estufas de esterilización y cultivo con más de 70 años de trayectoria.
                    </Text>
                </Container>
            </Box>

            <VStack spacing={0} w="full">
                {/* Acerca de */}
                <Box py={20} w="full">
                    <Container maxW={'container.xl'}>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
                            <Stack spacing={6}>
                                <Heading size="xl" color="brand.700">Trayectoria y Liderazgo</Heading>
                                <Text fontSize="lg" color="gray.600">
                                    Desde 1950 "SAN JOR" fabrica en Buenos Aires - Argentina Estufas de esterilización y cultivo con la más alta calidad. Esta experiencia avala nuestros conocimientos y posibilita la realización de productos acordes a las necesidades del mercado.
                                </Text>
                                <Text fontSize="lg" color="gray.600">
                                    Hoy en día "SAN JOR" es la marca líder de fabricación de estufas en la Argentina y sigue desarrollando toda su capacidad y creatividad, habiendo logrado un prestigio en base a su calidad, eficiencia y seriedad.
                                </Text>
                                <Button as={RouterLink} to="/historia" colorScheme="brand" size="lg" rightIcon={<Icon as={FaIndustry} />}>
                                    Ver Nuestra Historia
                                </Button>
                            </Stack>
                            <Box rounded="xl" overflow="hidden" shadow="xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                    alt="Fábrica SAN JOR"
                                    objectFit="cover"
                                />
                            </Box>
                        </SimpleGrid>
                    </Container>
                </Box>

                <Divider />

                {/* Ventas y Presencia */}
                <Box py={20} bg={bgGray} w="full">
                    <Container maxW={'container.xl'}>
                        <Stack spacing={12}>
                            <Box textAlign="center" maxW="3xl" mx="auto">
                                <Heading size="xl" mb={4} color="brand.700">Alcance Global</Heading>
                                <Text fontSize="lg" color="gray.600">
                                    Nuestra red de distribución abarca más de 800 puntos en Argentina y 140 en todo el mundo, garantizando la disponibilidad y soporte de nuestros equipos.
                                </Text>
                            </Box>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                                <Box p={8} bg={bgWhite} rounded="xl" shadow="lg">
                                    <Heading size="md" mb={4} display="flex" alignItems="center">
                                        <Icon as={FaGlobeAmericas} mr={3} color="brand.500" /> Presencia Internacional
                                    </Heading>
                                    <Text color="gray.600" mb={4}>
                                        Participamos regularmente en las exposiciones más importantes del sector:
                                    </Text>
                                    <List spacing={2}>
                                        <ListItem><ListIcon as={FaCheckCircle} color="brand.500" />"Fime" (Miami, USA)</ListItem>
                                        <ListItem><ListIcon as={FaCheckCircle} color="brand.500" />"Medica" (Duesseldorf, Alemania)</ListItem>
                                        <ListItem><ListIcon as={FaCheckCircle} color="brand.500" />"ArabHealth" y "MedLab" (Dubai, UAE)</ListItem>
                                        <ListItem><ListIcon as={FaCheckCircle} color="brand.500" />"Expomedical" (Buenos Aires, Argentina)</ListItem>
                                    </List>
                                </Box>

                                <Stack spacing={6}>
                                    <Box p={6} bg={bgWhite} rounded="xl" shadow="md">
                                        <Heading size="sm" mb={2}>Distribuidores</Heading>
                                        <Text fontSize="sm" mb={4}>Si usted es distribuidor y desea realizar alguna consulta comercial.</Text>
                                        <Button as={RouterLink} to="/contacto" colorScheme="blue" variant="outline" w="full">Contactar Ventas</Button>
                                    </Box>
                                    <Box p={6} bg={bgWhite} rounded="xl" shadow="md">
                                        <Heading size="sm" mb={2}>Usuarios</Heading>
                                        <Text fontSize="sm" mb={4}>Si usted desea adquirir nuestros equipos o necesita asesoramiento.</Text>
                                        <Button as={RouterLink} to="/contacto" colorScheme="green" variant="outline" w="full">Consultar Equipo</Button>
                                    </Box>
                                </Stack>
                            </SimpleGrid>
                        </Stack>
                    </Container>
                </Box>

                <Divider />

                {/* Calidad y Medio Ambiente */}
                <Box py={20} w="full">
                    <Container maxW={'container.xl'}>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16}>
                            <Stack spacing={6}>
                                <Heading size="xl" color="brand.700" display="flex" alignItems="center">
                                    <Icon as={FaAward} mr={3} /> Calidad Certificada
                                </Heading>
                                <Text fontSize="lg" color="gray.600">
                                    Mantenemos controles de calidad estrictos con rastreabilidad total desde 1989. Nuestros procesos cumplen con normas ISO 9001, ISO 13485, Buenas Prácticas de Fabricación (BPF) y regulaciones ANMAT.
                                </Text>
                                <List spacing={3}>
                                    <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="green.500" boxSize={5} /> Innovación constante (Control PID Sistema BLAST)</ListItem>
                                    <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="green.500" boxSize={5} /> Garantía extendida y servicio técnico de por vida</ListItem>
                                </List>
                            </Stack>
                            <Stack spacing={6}>
                                <Heading size="xl" color="brand.700" display="flex" alignItems="center">
                                    <Icon as={FaLeaf} mr={3} /> Compromiso Ambiental
                                </Heading>
                                <Text fontSize="lg" color="gray.600">
                                    Implementamos políticas activas para la protección del medio ambiente, desde el uso de energías renovables hasta la gestión eficiente de recursos.
                                </Text>
                                <List spacing={3}>
                                    <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="green.500" boxSize={5} /> Energía eólica para climatización de planta</ListItem>
                                    <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="green.500" boxSize={5} /> Iluminación LED y reducción de papel</ListItem>
                                    <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="green.500" boxSize={5} /> Gestión responsable de residuos</ListItem>
                                </List>
                            </Stack>
                        </SimpleGrid>
                    </Container>
                </Box>

                {/* Ayuda a la Sociedad */}
                <Box py={20} bg="brand.900" color="white" w="full">
                    <Container maxW={'container.xl'}>
                        <Stack spacing={8} textAlign="center" alignItems="center">
                            <Icon as={FaHandsHelping} w={16} h={16} color="brand.200" />
                            <Heading size="xl">Fundación José Luís Guiglioni</Heading>
                            <Text fontSize="xl" maxW="3xl" opacity={0.9}>
                                En SAN JOR creemos en devolver a la comunidad. Colaboramos activamente con la Fundación José Luís Guiglioni en Sáenz Peña, brindando asistencia alimentaria, ropa y apoyo logístico a niños de escasos recursos.
                            </Text>
                            <Text fontSize="lg" maxW="2xl" opacity={0.8} fontStyle="italic">
                                "Es importante hacer expresiva nuestra vocación de ayudar... hacernos un tiempo para dedicar a la solidaridad para con nuestros semejantes."
                            </Text>
                        </Stack>
                    </Container>
                </Box>
            </VStack>
        </Box>
    );
}
