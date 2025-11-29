import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Image,
    SimpleGrid,
    Tag,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';

export default function News() {
    const news = [
        {
            id: 1,
            title: 'Nueva línea de estufas con conectividad IoT',
            date: '15 Nov 2025',
            category: 'Lanzamiento',
            excerpt: 'Presentamos nuestra nueva serie de equipos inteligentes que permiten el monitoreo remoto de temperatura y alertas en tiempo real.',
            image: 'https://via.placeholder.com/400x250?text=IoT+Launch',
        },
        {
            id: 2,
            title: 'Participación en Expo Laboratorio 2025',
            date: '20 Oct 2025',
            category: 'Eventos',
            excerpt: 'SAN JOR estará presente en el evento más importante del sector. Visítenos en el stand 405 para conocer nuestras novedades.',
            image: 'https://via.placeholder.com/400x250?text=Expo+2025',
        },
        {
            id: 3,
            title: 'Certificación ISO 9001:2015 Renovada',
            date: '05 Sep 2025',
            category: 'Calidad',
            excerpt: 'Confirmamos nuestro compromiso con la calidad renovando nuestra certificación internacional por tres años más.',
            image: 'https://via.placeholder.com/400x250?text=ISO+9001',
        },
    ];

    return (
        <Box py={10}>
            <Container maxW={'container.xl'}>
                <Heading mb={6} color="brand.700">Novedades</Heading>
                <Text fontSize="lg" mb={10} color="gray.600">
                    Manténgase informado sobre nuestros últimos lanzamientos, eventos y noticias corporativas.
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                    {news.map((item) => (
                        <NewsCard key={item.id} {...item} />
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}

const NewsCard = ({ title, date, category, excerpt, image }: any) => {
    return (
        <Box
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'lg'}
            rounded={'md'}
            overflow={'hidden'}
            transition="transform 0.2s"
            _hover={{ transform: 'translateY(-5px)' }}
        >
            <Image src={image} alt={title} objectFit="cover" w="100%" h="200px" />
            <Box p={6}>
                <Stack direction="row" align="center" mb={2}>
                    <Tag size="sm" colorScheme="brand">{category}</Tag>
                    <Text fontSize="xs" color="gray.500">{date}</Text>
                </Stack>
                <Heading size="md" mb={2} lineHeight="tight">
                    {title}
                </Heading>
                <Text color="gray.600" fontSize="sm" mb={4} noOfLines={3}>
                    {excerpt}
                </Text>
                <Button variant="link" colorScheme="brand" size="sm">
                    Leer más
                </Button>
            </Box>
        </Box>
    );
};
