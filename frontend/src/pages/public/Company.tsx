
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
    Flex,
} from '@chakra-ui/react';
import { FaCheckCircle, FaGlobeAmericas, FaLeaf, FaHandsHelping, FaAward, FaQuestionCircle, FaIndustry, FaHandshake } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

export default function Company() {
    const bgGray = useColorModeValue('gray.50', 'gray.900');
    const bgWhite = useColorModeValue('white', 'gray.800');

    return (
        <Box>
            {/* HERO SECTION - Matching BlastSystem Style */}
            <Box
                bg={'brand.600'}
                color={'white'}
                py={{ base: 20, md: 32 }}
                position="relative"
                overflow="hidden"
                backgroundImage="linear-gradient(135deg, var(--chakra-colors-brand-800) 0%, var(--chakra-colors-brand-600) 100%)"
            >
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    opacity={0.2}
                    backgroundImage="linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)"
                    backgroundSize="40px 40px"
                />
                <Container maxW={'container.xl'} position="relative" zIndex={1} textAlign={'center'}>
                    <Heading
                        fontWeight={800}
                        fontSize={{ base: '4xl', sm: '5xl', md: '7xl' }}
                        lineHeight={'110%'}
                        mb={6}
                        letterSpacing="tight"
                        textShadow="0px 2px 4px rgba(0,0,0,0.3)"
                    >
                        NUESTRA{' '}
                        <Text as={'span'} color={'white'}>
                            EMPRESA
                        </Text>
                    </Heading>
                    <Text fontSize={{ base: 'xl', md: '2xl' }} maxW={'3xl'} mx={'auto'} color={'brand.100'} fontWeight="normal">
                        Líderes en fabricación de estufas de esterilización y cultivo desde 1950.
                    </Text>
                </Container>
            </Box>

            {/* ACERCA DE SECTION */}
            <Box py={{ base: 16, md: 24 }} bg={bgWhite}>
                <Container maxW={'container.xl'}>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
                        <Stack spacing={6}>
                            <Heading size="xl" color={'brand.700'}>Acerca de</Heading>
                            <Text fontSize={'lg'} color={'gray.600'} textAlign="justify">
                                Desde 1950 "SAN JOR" fabrica en Buenos Aires - Argentina Estufas de esterilización y cultivo con la más alta calidad.
                            </Text>
                            <Text fontSize={'lg'} color={'gray.600'} textAlign="justify">
                                Esta experiencia avala nuestros conocimientos y posibilita la realización de productos acordes a las necesidades del mercado.
                            </Text>
                            <Text fontSize={'lg'} color={'gray.600'} textAlign="justify">
                                Hoy en día "SAN JOR" es la marca líder de fabricación de estufas en la Argentina y sigue desarrollando toda su capacidad y creatividad, habiendo logrado un prestigio en base a su calidad, eficiencia y seriedad que la sitúan como una de las firmas con más aptitud y solidez. La incorporación de nuevos equipos desarrollados en la investigación y el departamento de estudios de mercado han permitido la presentación de nuestros productos en todo el mundo.
                            </Text>
                        </Stack>
                        <Box rounded={'xl'} overflow={'hidden'} boxShadow={'xl'}>
                            <Image
                                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="Fábrica SAN JOR"
                                objectFit="cover"
                                w="full"
                                h="full"
                            />
                        </Box>
                    </SimpleGrid>
                </Container>
            </Box>

            {/* VENTAS SECTION */}
            <Box py={{ base: 16, md: 24 }} bg={bgGray} position="relative">
                {/* Background Pattern */}
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    opacity={0.2}
                    backgroundImage="radial-gradient(#4299E1 1px, transparent 1px)"
                    backgroundSize="20px 20px"
                    pointerEvents="none"
                />
                <Container maxW={'container.xl'} position="relative" zIndex={1}>
                    <Stack spacing={12}>
                        <Box textAlign="center" maxW="4xl" mx="auto">
                            <Heading size="xl" mb={4} color="brand.700">Ventas</Heading>
                            <Text fontSize="lg" color="gray.600">
                                Las ventas se realizan por intermedio de distribuidores especializados. Hay más de 800 en Argentina y alrededor de 140 en el resto del mundo que poseen material de referencia (folletos, catálogos y precios) al momento del contacto. Con entrega rápida de todos los productos estándar.
                            </Text>
                        </Box>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                            <VStack
                                bg={'white'}
                                p={8}
                                rounded={'xl'}
                                boxShadow={'xl'}
                                textAlign={'center'}
                                spacing={6}
                                borderTop="4px solid"
                                borderColor="brand.500"
                            >
                                <Icon as={FaHandshake} w={12} h={12} color="brand.500" />
                                <Heading size="md">Información a distribuidores</Heading>
                                <Text color="gray.600">
                                    Si usted es distribuidor y desea realizar alguna consulta, déjenos su mensaje en el Formulario Distribuidores.
                                </Text>
                                <Button as={RouterLink} to="/contacto" colorScheme="brand" size="lg" w="full">
                                    IR A FORMULARIO
                                </Button>
                            </VStack>

                            <VStack
                                bg={'white'}
                                p={8}
                                rounded={'xl'}
                                boxShadow={'xl'}
                                textAlign={'center'}
                                spacing={6}
                                borderTop="4px solid"
                                borderColor="green.500"
                            >
                                <Icon as={FaIndustry} w={12} h={12} color="green.500" />
                                <Heading size="md">Información a Usuarios</Heading>
                                <Text color="gray.600">
                                    Si usted desea adquirir las Estufas de nuestra fabricación o desea realizar alguna consulta, déjenos su mensaje en el Formulario Usuarios.
                                </Text>
                                <Button as={RouterLink} to="/contacto" colorScheme="brand" size="lg" w="full">
                                    IR A FORMULARIO
                                </Button>
                            </VStack>
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>

            {/* PRESENCIA MUNDIAL */}
            <Box py={{ base: 16, md: 24 }} bg={bgWhite}>
                <Container maxW={'container.xl'}>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
                        <Box>
                            <Heading size="xl" mb={6} color="brand.700" display="flex" alignItems="center">
                                <Icon as={FaGlobeAmericas} mr={3} /> Presencia Mundial
                            </Heading>
                            <Stack spacing={6}>
                                <Text fontSize="lg" color="gray.600" textAlign="justify">
                                    "SAN JOR" participa regularmente en forma directa o indirecta con la presencia de los equipos en las Exposiciones de "Fime" en Miami – Estados Unidos, "Medica" en Duesseldorf - Alemania, “Expomedical” en Buenos Aires – Argentina, "ArabHealth" en Dubai - Emiratos Arabes y "MedLab" en Dubai - Emiratos Arabes. Logrando un acercamiento de la gerencia de la empresa con los distribuidores y tratando las inquietudes de los usuarios.
                                </Text>
                                <Text fontSize="lg" color="gray.600" textAlign="justify">
                                    Tiene una red mundial de distribuidores en constante aumento a los cuales se los forma técnicamente para mejorar el resultado de las ventas y adquirir el producto que el usuario necesita. Estas selectas empresas brindan el mismo servicio post-venta de atención al usuario que en Argentina. Fabricando los equipos según los requerimientos eléctricos y normativos del país al que se envía. Con los manuales de instrucciones y asesoramiento técnico en el idioma correspondiente.
                                </Text>
                            </Stack>
                        </Box>
                        <Stack spacing={4} bg="gray.50" p={8} rounded="xl" shadow="lg" border="1px solid" borderColor="gray.100">
                            <Heading size="md" mb={4} color="brand.600">Exposiciones Internacionales</Heading>
                            <List spacing={4}>
                                <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="brand.500" />"Fime" (Miami, USA)</ListItem>
                                <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="brand.500" />"Medica" (Duesseldorf, Alemania)</ListItem>
                                <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="brand.500" />"Expomedical" (Buenos Aires, Argentina)</ListItem>
                                <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="brand.500" />"ArabHealth" (Dubai, UAE)</ListItem>
                                <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="brand.500" />"MedLab" (Dubai, UAE)</ListItem>
                            </List>
                        </Stack>
                    </SimpleGrid>
                </Container>
            </Box>

            {/* WHY SAN JOR & QULAITY - Using Feature Cards Style */}
            <Box py={{ base: 16, md: 24 }} bg={bgGray} position="relative">
                {/* Background Pattern */}
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    opacity={0.2}
                    backgroundImage="radial-gradient(#4299E1 1px, transparent 1px)"
                    backgroundSize="20px 20px"
                    pointerEvents="none"
                />
                <Container maxW={'container.xl'} position="relative" zIndex={1}>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16}>
                        <Stack spacing={8}>
                            <Box>
                                <Heading size="xl" mb={6} color="brand.700" display="flex" alignItems="center">
                                    <Icon as={FaQuestionCircle} mr={3} /> ¿Por qué SAN JOR?
                                </Heading>
                                <Text fontSize="lg" color="gray.600" mb={6}>
                                    “SAN JOR” tiene la premisa de fabricar estufas para un uso continuo y duradero.
                                </Text>
                            </Box>
                            <SimpleGrid columns={1} spacing={4}>
                                <FeatureCard icon={FaCheckCircle} title="Innovación" description="Innovación en su forma de controlar la temperatura." />
                                <FeatureCard icon={FaCheckCircle} title="Garantía" description="Garantía anual y garantía extendida gratuita." />
                                <FeatureCard icon={FaCheckCircle} title="Service" description="Service gratuito de por vida." />
                                <FeatureCard icon={FaCheckCircle} title="Costo" description="Costo moderado o acorde a las prestaciones." />
                            </SimpleGrid>
                        </Stack>

                        <Stack spacing={8}>
                            <Box>
                                <Heading size="xl" mb={6} color="brand.700" display="flex" alignItems="center">
                                    <Icon as={FaAward} mr={3} /> Calidad
                                </Heading>
                                <Text fontSize="lg" color="gray.600" textAlign="justify">
                                    “SAN JOR” tiene controles de calidad muy estrictos, con rastreos y registros históricos integrales de productos fabricados desde 1989. Siendo uno de los primeros en el sector en la Argentina en tener controles de calidad con trazabilidad. A su vez estamos en la investigación y desarrollo del estándar de calidad. Con procedimientos de Calidad Según Normas ISO 9001, ISO 13485, cumplimiento de normas BPF e Inscripción Anmat.
                                </Text>
                            </Box>
                            <Box bg="white" p={6} rounded="xl" shadow="md" borderLeft="4px" borderColor="brand.500">
                                <Text fontStyle="italic" color="gray.600">
                                    "Comprometidos con la excelencia y la mejora continua en todos nuestros procesos productivos."
                                </Text>
                            </Box>
                        </Stack>
                    </SimpleGrid>
                </Container>
            </Box>


            {/* COMPROMISO AMBIENTAL */}
            <Box py={{ base: 16, md: 24 }} bg={bgWhite}>
                <Container maxW={'container.xl'}>
                    <Stack spacing={12}>
                        <Heading size="xl" color="brand.700" display="flex" alignItems="center" justifyContent="center">
                            <Icon as={FaLeaf} mr={3} color="green.500" /> Compromiso Ambiental
                        </Heading>

                        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
                            <Stack spacing={6}>
                                <Text fontSize="lg" color="gray.600" textAlign="justify">
                                    “SAN JOR” viene desarrollando lo que en un principio era como campaña y ahora lo es como política, un paulatino cambio hacia una concientización por una prevención y protección del medio ambiente, con un exhaustivo control de todas las tareas, evaluarlas y dar pequeños cambios que ayuden a utilizar energías renovables e ir eliminando o disminuyendo las no renovables. Haciendo partícipes a todos los empleados y también en forma externa a los proveedores e informando a los clientes y usuarios.
                                </Text>
                                <Text fontSize="lg" color="gray.600" textAlign="justify">
                                    Fijando objetivos a corto y largo plazo factibles de hacerlos realidad y luego revisar el cumplimiento de los mismos. Teniendo muy en cuenta ya en el desarrollo de los nuevos proyectos como se dió desde el inicio con el Control PID Sistema BLAST.
                                </Text>
                                <Text fontSize="lg" color="gray.600" textAlign="justify">
                                    Se implementó un sistema de gestión ambiental concreto y eficiente. Optimizando el uso y aprovechamiento del agua, se ha desarrollado el aprovechamiento de residuos, que anteriormente no estaban tenidos en cuenta, fomentando el ahorro de la energía y de la utilización de la misma en forma eficiente.
                                </Text>
                            </Stack>

                            <Box bg="green.50" p={8} rounded="xl" border="1px" borderColor="green.100">
                                <Heading size="md" mb={6} color="green.700">Iniciativas Concretas</Heading>
                                <List spacing={3} color="gray.700">
                                    <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="green.500" />Instalación de extractores eólicos.</ListItem>
                                    <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="green.500" />Reducción del 23% en consumo de papel.</ListItem>
                                    <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="green.500" />Eliminación de impresión web innecesaria.</ListItem>
                                    <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="green.500" />Tecnología LED en todas las estufas.</ListItem>
                                    <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="green.500" />Fabricación de productos ecológicos.</ListItem>
                                    <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="green.500" />Proveedores con política ambiental.</ListItem>
                                </List>
                                <Text mt={8} fontWeight="bold" fontStyle="italic" textAlign="center" color="green.700" fontSize="lg">
                                    “Obrando en función de la naturaleza con la protección del Medio Ambiente”
                                </Text>
                            </Box>
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>

            {/* AYUDA A LA SOCIEDAD - Banner Style */}
            <Box bg={'brand.700'} py={16} color={'white'}>
                <Container maxW={'container.xl'}>
                    <Stack spacing={10}>
                        <Heading size="xl" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                            <Icon as={FaHandsHelping} mr={3} color="brand.200" /> Ayuda a la Sociedad
                        </Heading>
                        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
                            <Stack spacing={6}>
                                <Heading size="lg" color="brand.100">Fundación José Luís Guiglioni</Heading>
                                <Text fontSize="lg" opacity={0.9} textAlign="justify">
                                    La Fundación José Luís Guiglioni asiste a niños de escasos recursos de Sáenz Peña, la Fundación lleva el nombre del Dr José Luís Guiglioni, un profesional de la medicina local con trayectoria en la custodia de la salud de la población en general. A este respecto José Guiglioni, hijo del reconocido médico sáenzpeñense y referente de la fundación, es el titular de la fundación que es sin fines de lucro y tiene como fin colaborar con personas de escasos recursos que residen en Sáenz Peña.
                                </Text>
                                <Text fontSize="lg" opacity={0.9} textAlign="justify">
                                    Guiglioni destaca que es importante para los integrantes de dicha fundación el de poder hacer expresiva su vocación de ayudar, "sobre todo valorable porque cada uno de nosotros a la vez tenemos nuestras propias actividades durante todo el día, además de atender a nuestras respectivas familias, y sin embargo en respuesta a la vocación que sentimos nos hacemos un tiempo para dedicar a la solidaridad para con nuestro semejantes".
                                </Text>
                            </Stack>
                            <Box bg="whiteAlpha.100" p={8} rounded="xl" backdropFilter="blur(10px)">
                                <Heading size="lg" mb={6} color="brand.100">Acciones de la fundación</Heading>
                                <Stack spacing={4}>
                                    <Text opacity={0.9} textAlign="justify">
                                        En estos momentos, la ayuda y contención de José Guigliani más que nada está destinada a los niños de escasos recursos, estando en la actualidad conteniendo a alrededor de 45 niños a quienes les brinda una ración alimentaria diaria en el barrio Sáenz Peña.
                                    </Text>
                                    <Text opacity={0.9} textAlign="justify">
                                        La fundación también implementa el sistema de mecenazgo para obtener productos alimenticios mediante convenios con firmas y empresarios. Es aquí donde SAN JOR brinda colaboración, ya sea con el envío de ropa para los más necesitados o con el aporte logístico. También alentamos a que otras empresas del sector puedan hacer un pequeño pero gran aporte pues se puede hacer mucho con muy poco.
                                    </Text>
                                </Stack>
                            </Box>
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: any }) => {
    return (
        <Flex align="center" bg="white" p={4} rounded="lg" shadow="sm">
            <Icon as={icon} w={6} h={6} color="green.500" mr={4} />
            <Box>
                <Text fontWeight="bold" color="gray.800">{title}</Text>
                <Text fontSize="sm" color="gray.600">{description}</Text>
            </Box>
        </Flex>
    )
}
