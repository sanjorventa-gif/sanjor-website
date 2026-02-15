import {
    Box,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    SimpleGrid,
    Icon,
    Flex,
    useColorModeValue,
    Center,
} from '@chakra-ui/react';
import { FaTemperatureHigh, FaWind, FaCheckCircle } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import ProductCard from '../../components/ui/ProductCard';
import HeroCarousel from '../../components/features/HeroCarousel';
import FloatingWidget from '../../components/features/FloatingWidget';

export default function Home() {
    return (
        <Box>
            <HeroCarousel />
            <FloatingWidget />

            {/* Features Section */}
            <Box p={4} py={16} bg="white">
                <Container maxW={'container.xl'}>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                        <Feature
                            icon={<Icon as={FaCheckCircle} w={10} h={10} color="brand.500" />}
                            title={'Calidad Certificada'}
                            text={
                                'Equipos fabricados bajo estrictas normas de calidad para asegurar resultados precisos y reproducibles.'
                            }
                        />
                        <Feature
                            icon={<Icon as={FaTemperatureHigh} w={10} h={10} color="brand.500" />}
                            title={'Control de Temperatura'}
                            text={
                                'Sistemas avanzados de control PID para una estabilidad térmica superior en todos nuestros equipos.'
                            }
                        />
                        <Feature
                            icon={<Icon as={FaWind} w={10} h={10} color="brand.500" />}
                            title={'Sistema BLAST'}
                            text={
                                'Tecnología de aire forzado de alta performance para procesos que requieren homogeneidad perfecta.'
                            }
                        />
                    </SimpleGrid>
                </Container>
            </Box>

            {/* Featured Products Section */}
            <Box p={4} py={16} bg={useColorModeValue('gray.50', 'gray.800')} position="relative">
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    opacity={0.2}
                    backgroundImage="radial-gradient(#4299E1 1px, transparent 1px)"
                    backgroundSize="20px 20px"
                    zIndex={0}
                    pointerEvents="none"
                />
                <Container maxW={'container.xl'} position="relative" zIndex={1}>
                    <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={10}>
                        <Heading fontSize={'3xl'}>Nuestras Líneas de Productos</Heading>
                        <Text color={'gray.600'} fontSize={'xl'}>
                            Soluciones integrales para cada necesidad de laboratorio
                        </Text>
                    </Stack>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                        <ProductCard
                            title="Estufas de Cultivo"
                            description="Estufas de cultivo para bacteriología y microbiología, diseñadas para un crecimiento preciso."
                            image="/img/home_products/cultivo.jpg"
                            href="/productos/cultivo"
                            actionLabel="Ver productos"
                        />
                        <ProductCard
                            title="Estufas de Secado"
                            description="Estufas de secado y esterilización por calor seco, ideales para laboratorios e industria."
                            image="/img/home_products/secado.jpg"
                            href="/productos/secado"
                            actionLabel="Ver productos"
                        />
                        <ProductCard
                            title="Estufas de Esterilización"
                            description="Equipos de alta temperatura para esterilización de material quirúrgico y de laboratorio."
                            image="/img/home_products/esterilizacion.jpg"
                            href="/productos/esterilizacion"
                            actionLabel="Ver productos"
                        />
                    </SimpleGrid>
                    <Center mt={10}>
                        <Button
                            as={RouterLink}
                            to="/productos"
                            variant="outline"
                            colorScheme="brand"
                            size="lg"
                        >
                            Ver Catálogo Completo
                        </Button>
                    </Center>
                </Container>
            </Box>

            {/* Services Highlights Section */}
            <Box py={16} bg="gray.50" position="relative">
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    opacity={0.2}
                    backgroundImage="radial-gradient(#4299E1 1px, transparent 1px)"
                    backgroundSize="20px 20px"
                    zIndex={0}
                    pointerEvents="none"
                />
                <Container maxW={'container.xl'} position="relative" zIndex={1}>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                        <ServiceHighlight
                            title="Registro de Estufas"
                            text="Registrando la estufa ya obtiene 6 meses adicionales a la garantía normal, en caso de ser las estufas con sistema BLAST la extensión es por un año adicional."
                            action="IR A FORMULARIO"
                            href="/servicios/registro"
                        />
                        <ServiceHighlight
                            title="Service"
                            text="“SAN JOR” capacita a la red de distribuidores y a los técnicos contratados para brindar una rápida solución al momento del service."
                            action="IR A FORMULARIO"
                            href="/servicios/tecnico"
                        />
                        <ServiceHighlight
                            title="Extensión de Garantía"
                            text="Registrando su equipo obtiene una extensión de garantía total de 3 años, asegurando el máximo rendimiento y respaldo de fábrica."
                            action="IR A FORMULARIO"
                            href="/servicios/garantia"
                        />
                        <ServiceHighlight
                            title="Preguntas Frecuentes"
                            text="Podés entrar a las siguientes preguntas frecuentes, donde encontrarás información sobre las cuestiones más consultadas"
                            action="VER MÁS"
                            href="/servicios"
                        />
                    </SimpleGrid>
                </Container>
            </Box>

            {/* Call to Action */}
            <Box py={16} bg="brand.600">
                <Container maxW={'container.xl'}>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        spacing={10}
                        align={'center'}
                        justify={'space-between'}
                    >
                        <Stack spacing={4} color="white">
                            <Heading size="lg">¿Necesita asesoramiento técnico?</Heading>
                            <Text fontSize="lg">
                                Nuestro equipo de expertos está listo para ayudarlo a elegir el equipo ideal.
                            </Text>
                        </Stack>
                        <Button
                            as={RouterLink}
                            to="/contacto"
                            size="lg"
                            bg="white"
                            color="brand.600"
                            _hover={{ bg: 'gray.100' }}
                        >
                            Contactar Ahora
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}

const Feature = ({ title, text, icon }: { title: string; text: string; icon: React.ReactElement }) => {
    return (
        <Stack align={'center'} textAlign={'center'}>
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={useColorModeValue('gray.100', 'gray.700')}
                mb={1}
            >
                {icon}
            </Flex>
            <Text fontWeight={600} fontSize={'xl'}>{title}</Text>
            <Text color={'gray.600'}>{text}</Text>
        </Stack>
    );
};

const ServiceHighlight = ({ title, text, action, href }: { title: string; text: string; action: string; href: string }) => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={6}
            rounded={'xl'}
            boxShadow={'md'}
            align={'center'}
            textAlign={'center'}
            justify="space-between"
            height="100%"
            spacing={4}
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
        >
            <Stack spacing={3}>
                <Heading size="md" color="brand.600">{title}</Heading>
                <Text fontSize="sm" color="gray.600">{text}</Text>
            </Stack>
            <Button
                as={RouterLink}
                to={href}
                variant="link"
                color="brand.500"
                fontWeight="bold"
                fontSize="sm"
                _hover={{ textDecoration: 'none', color: 'brand.600' }}
            >
                {action}
            </Button>
        </Stack>
    );
};
