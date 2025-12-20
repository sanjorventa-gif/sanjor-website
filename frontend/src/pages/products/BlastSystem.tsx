import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    SimpleGrid,
    useColorModeValue,
    Divider,
    Icon,
    Flex,
    VStack,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import BlastStabilizationChart from '../../components/features/BlastStabilizationChart';
import { FaTemperatureHigh, FaCrosshairs, FaEquals, FaHandHolding, FaDonate } from 'react-icons/fa';
import ControlEvolutionCharts from '../../components/features/ControlEvolutionCharts';

export default function BlastSystem() {
    const bgGray = useColorModeValue('gray.50', 'gray.900');
    const bgWhite = useColorModeValue('white', 'gray.800');

    return (
        <Box>
            {/* HERRO SECTION */}
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
                        SISTEMA{' '}
                        <Text as={'span'} color={'white'}>
                            BLAST
                        </Text>
                    </Heading>
                    <Text fontSize={{ base: 'xl', md: '2xl' }} maxW={'3xl'} mx={'auto'} color={'brand.100'} fontWeight="normal">
                        La nueva respuesta en control de temperatura de estufas
                    </Text>
                </Container>
            </Box>

            {/* INTRO & CHART SECTION */}
            <Box py={{ base: 16, md: 24 }} bg={bgWhite}>
                <Container maxW={'container.xl'}>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
                        <Stack spacing={6}>
                            <Heading size="xl" color={'brand.700'}>Estabilidad y precisión redefinidas</Heading>
                            <Text fontSize={'lg'} color={'gray.600'} textAlign="justify">
                                La exactitud y uniformidad que actualmente se espera que una estufa de uso en laboratorio prometa,
                                replantearon una investigación más profunda acerca de cómo mejorar los aspectos de estabilidad
                                (o exactitud) y de uniformidad, así es como nace SISTEMA BLAST.
                            </Text>
                            <Text fontSize={'lg'} color={'gray.600'} textAlign="justify">
                                El <strong>control PID Sistema BLAST</strong> es un nuevo y exclusivo sistema de control de temperatura
                                que se fundamenta en un cálculo matemático individual para cada modelo de estufa, optimizando las variables
                                y evitando el recalculo permanente de las mismas.
                            </Text>
                        </Stack>
                        <Box>
                            <BlastStabilizationChart />
                        </Box>
                    </SimpleGrid>
                </Container>
            </Box>

            {/* FUNDAMENTOS & EVOLUTION SECTION */}
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
                        <Box textAlign="center">
                            <Heading size="xl" mb={4} color="brand.700">Evolución del Control</Heading>
                            <Text fontSize="lg" color="gray.600" maxW="3xl" mx="auto">
                                De los sistemas básicos al control inteligente adaptativo BLAST.
                            </Text>
                        </Box>

                        <Box py={8}>
                            <ControlEvolutionCharts />
                        </Box>

                        <Divider borderColor="gray.300" />

                        <Stack spacing={8}>
                            <Heading size="lg" color="brand.600">Fundamentos Técnicos</Heading>
                            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
                                <Stack spacing={4}>
                                    <Text textAlign={'justify'} color="gray.600">
                                        Si bien, en un porcentaje alto es posible lograr uniformidad con circulación forzada de triple cámara,
                                        esto implica un alto costo que puede triplicar el valor del equipo. En estufas de cultivo de baja temperatura,
                                        esta inversión muchas veces no justifica la ínfima mejora.
                                    </Text>
                                    <Text textAlign={'justify'} color="gray.600">
                                        Intentando volver a la cuestión del manejo térmico, se comenzó nuevamente a replantear el controlador de temperatura.
                                        Generalmente se busca en el mercado un control que pueda brindar las prestaciones necesarias de precisión acorde a la calidad de la estufa.
                                    </Text>
                                </Stack>
                                <Stack spacing={4}>
                                    <Text textAlign={'justify'} color="gray.600">
                                        Hasta la llegada de Sistema BLAST, para los fabricantes de Estufas elegir un control de calidad y precisión implicaba
                                        la implementación de controles de alto costo diseñados para "todo uso" (hornos, baños, heladeras),
                                        con funciones innecesarias para una estufa de laboratorio.
                                    </Text>
                                </Stack>
                            </SimpleGrid>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            {/* ADVANTAGES BANNER */}
            <Box bg={'brand.600'} py={16} color={'white'}>
                <Container maxW={'container.xl'}>
                    <Stack spacing={10}>
                        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10} pt={8}>
                            <VStack spacing={3}>
                                <Icon as={FaCrosshairs} w={8} h={8} color="brand.200" />
                                <Text fontSize="lg" fontWeight="bold">Máxima Precisión</Text>
                            </VStack>
                            <VStack spacing={3}>
                                <Icon as={FaEquals} w={8} h={8} color="brand.200" />
                                <Text fontSize="lg" fontWeight="bold">Buena Uniformidad</Text>
                            </VStack>
                            <VStack spacing={3}>
                                <Icon as={FaHandHolding} w={8} h={8} color="brand.200" />
                                <Text fontSize="lg" fontWeight="bold">Fácil Manejo</Text>
                            </VStack>
                            <VStack spacing={3}>
                                <Icon as={FaDonate} w={8} h={8} color="brand.200" />
                                <Text fontSize="lg" fontWeight="bold">Costo Moderado</Text>
                            </VStack>
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>

            {/* PERFORMANCE & VARIABLES SECTION */}
            <Box py={{ base: 16, md: 24 }} bg={bgWhite}>
                <Container maxW={'container.xl'}>
                    <Stack spacing={12}>
                        <Box>
                            <Heading size="xl" color={'brand.700'} mb={6}>Desempeño Real</Heading>
                            <Text fontSize={'lg'} color={'gray.600'} mb={8}>
                                El Sistema BLAST fue exclusivamente diseñado para Estufas, teniendo en cuenta variables críticas
                                relativas a la estructura física y térmica del equipo para conformar su compleja fórmula matemática.
                            </Text>
                        </Box>

                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                            <VariableCard text="Peso y volumen de la carga" />
                            <VariableCard text="Tamaño de la cámara útil" />
                            <VariableCard text="Ubicación de resistencias" />
                            <VariableCard text="Potencia e inercia térmica" />
                            <VariableCard text="Posición del sensor (PT100)" />
                            <VariableCard text="Material de la cámara" />
                            <VariableCard text="Temperatura de trabajo" />
                            <VariableCard text="Disipación del aireador" />
                            <VariableCard text="Sellado de puertas" />
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>

            {/* SENSOR TECH SECTION */}
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
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} alignItems="center">
                        <Stack spacing={6}>
                            <Heading size="lg" color={'brand.600'}>Sensor PT100 de 3 Hilos</Heading>
                            <Text textAlign={'justify'} color="gray.600">
                                En cuanto al control propiamente dicho lógicamente viene ligado de una toma de temperatura que debe ser sumamente precisa.
                                El sensor utilizado debe ser un <strong>PT100</strong> que tiene un alambre de platino que aumenta la resistencia eléctrica
                                con la temperatura.
                            </Text>
                            <Box borderLeft="4px" borderColor="brand.500" pl={4} bg={useColorModeValue('white', 'gray.700')} p={4} rounded="r-md" shadow="sm">
                                <Text fontStyle="italic" color="gray.500">
                                    “Se deben utilizar sensores de 3 hilos para evitar el error que se produce con el largo del cable desde el control hasta la vaina.”
                                </Text>
                            </Box>
                            <Text textAlign={'justify'} color="gray.600">
                                La opción del PT100 de 3 hilos es ideal en la práctica, siendo de Clase A para la mejor precisión.
                                Además, el control corrige el <strong>efecto Joule (P=I*I*R)</strong> logrando la menor excitación eléctrica posible.
                            </Text>
                        </Stack>
                        <Flex justify="center" align="center" direction="column" bg="white" p={8} rounded="xl" shadow="xl">
                            <Icon as={FaTemperatureHigh} w={20} h={20} color="brand.500" mb={6} />
                            <Heading size="md" mb={2}>Clase A</Heading>
                            <Text color="gray.500" textAlign="center">Máxima precisión en medición</Text>
                            <Divider my={4} w="50%" />
                            <Heading size="md" mb={2}>3 Hilos</Heading>
                            <Text color="gray.500" textAlign="center">Compensación de resistencia del cable</Text>
                        </Flex>
                    </SimpleGrid>
                </Container>
            </Box>
        </Box>
    );
}



const VariableCard = ({ text }: { text: string }) => {
    return (
        <Flex align="center" bg="gray.50" p={4} rounded="lg" border="1px" borderColor="gray.100">
            <Icon as={CheckCircleIcon} color="brand.500" mr={4} w={5} h={5} />
            <Text fontWeight="medium" color="gray.700">{text}</Text>
        </Flex>
    )
}
