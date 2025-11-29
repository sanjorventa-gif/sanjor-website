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
} from '@chakra-ui/react';
import { FaAward, FaHistory, FaIndustry } from 'react-icons/fa';
import CompanyTimeline from '../components/features/CompanyTimeline';

export default function Company() {
    return (
        <Box>
            {/* Hero Section */}
            <Box bg="brand.600" color="white" py={20}>
                <Container maxW={'container.xl'} textAlign="center">
                    <Heading as="h1" size="2xl" mb={4}>
                        Nuestra Empresa
                    </Heading>
                    <Text fontSize="xl" maxW="2xl" mx="auto">
                        Más de 50 años de trayectoria fabricando equipamiento de laboratorio con los más altos estándares de calidad.
                    </Text>
                </Container>
            </Box>

            {/* About Section */}
            <Box py={16}>
                <Container maxW={'container.xl'}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
                        <Stack spacing={6}>
                            <Heading color="brand.700">Calidad y Precisión</Heading>
                            <Text fontSize="lg" color="gray.600">
                                En SAN JOR, nos dedicamos al diseño y fabricación de estufas de cultivo, esterilización y secado. Nuestra misión es proveer a la comunidad científica e industrial de equipos confiables, duraderos y precisos.
                            </Text>
                            <Text fontSize="lg" color="gray.600">
                                Contamos con una planta industrial moderna y un equipo de profesionales altamente capacitados que trabajan día a día para innovar y mejorar nuestros productos.
                            </Text>
                        </Stack>
                        <Box rounded="xl" overflow="hidden" shadow="lg">
                            <Image
                                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="Fábrica SAN JOR"
                                w="100%"
                                h="400px"
                                objectFit="cover"
                            />
                        </Box>
                    </SimpleGrid>
                </Container>
            </Box>

            {/* Timeline Section */}
            <Box bg={useColorModeValue('gray.50', 'gray.900')}>
                <CompanyTimeline />
            </Box>

            {/* Values Section */}
            <Box py={16}>
                <Container maxW={'container.xl'}>
                    <Heading textAlign="center" mb={12} color="brand.700">Nuestros Pilares</Heading>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                        <ValueCard
                            icon={FaHistory}
                            title="Trayectoria"
                            text="Desde 1950 acompañando el crecimiento de la industria y la ciencia en Argentina y la región."
                        />
                        <ValueCard
                            icon={FaIndustry}
                            title="Industria Nacional"
                            text="Orgullosamente fabricado en Argentina, con soporte local y repuestos garantizados."
                        />
                        <ValueCard
                            icon={FaAward}
                            title="Calidad Certificada"
                            text="Compromiso con la excelencia en cada etapa del proceso productivo."
                        />
                    </SimpleGrid>
                </Container>
            </Box>
        </Box>
    );
}

const ValueCard = ({ title, text, icon }: { title: string; text: string; icon: any }) => {
    return (
        <Stack
            align={'center'}
            textAlign={'center'}
            p={8}
            bg={useColorModeValue('white', 'gray.800')}
            rounded={'xl'}
            shadow={'md'}
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
        >
            <Box p={4} bg="brand.100" rounded="full" color="brand.600" mb={4}>
                <Icon as={icon} w={8} h={8} />
            </Box>
            <Heading size="md" mb={2}>{title}</Heading>
            <Text color="gray.600">{text}</Text>
        </Stack>
    );
};
