import {
    Box,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    SimpleGrid,
    useColorModeValue,
    // Icon,
    // Flex,
    // Center,
} from '@chakra-ui/react';
// import { FaTemperatureHigh, FaWind, FaCheckCircle } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
// import ProductCard from '../../components/ui/ProductCard';
import HeroCarousel from '../../components/features/HeroCarousel';
import FloatingWidget from '../../components/features/FloatingWidget';

export default function Home() {
    return (
        <Box>
            <HeroCarousel />
            <FloatingWidget />

            {/* Features Section - Hidden for Vicking */}
            {/* <Box p={4} py={16} bg="white"> ... </Box> */}

            {/* Featured Products Section - Hidden for Vicking */}
            {/* <Box p={4} py={16} ... </Box> */}

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
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                        <ServiceHighlight
                            title="Soporte Técnico Especializado"
                            text="Sanjor se hace cargo del soporte técnico, brindando soluciones rápidas y repuestos originales para sus equipos Vicking."
                            action="SOLICITAR SOPORTE"
                            href="/servicios/tecnico"
                        />
                        <ServiceHighlight
                            title="Preguntas Frecuentes"
                            text="Encuentre respuestas rápidas a las dudas más comunes sobre el funcionamiento y mantenimiento de su equipo."
                            action="VER PREGUNTAS FRECUENTES"
                            href="/preguntas-frecuentes"
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
