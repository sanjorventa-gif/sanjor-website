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
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { getNews, type News as NewsType } from '../../api/news';
import { useAuth } from '../../context/AuthContext';

export default function News() {
    const [news, setNews] = useState<NewsType[]>([]);

    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNews();
                // Sort by date descending (newest first)
                const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setNews(sortedData);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        fetchNews();
    }, []);

    // Filter items based on user role
    const filteredNews = news.filter(item => {
        // If item has no specific roles or empty roles, it's public
        const isPublic = !item.allowed_roles || item.allowed_roles.length === 0;

        if (isPublic) return true;

        // If user is admin, they see everything
        if (isAuthenticated && user?.role === 'admin') return true;

        // If authenticated, check if user's role is in allowed_roles
        if (isAuthenticated && user && item.allowed_roles?.includes(user.role)) return true;

        return false;
        return false;
    });

    const navigate = useNavigate();

    const handleOpenNews = (item: NewsType) => {
        if (item.slug) {
            navigate(`/novedades/${item.slug}`);
        } else {
            console.error('News item missing slug:', item);
        }
    };

    return (
        <>
            {/* Header Section - White */}
            < Box bg={useColorModeValue('gray.50', 'gray.900')} py={10} >
                <Container maxW={'container.xl'}>
                    <Heading mb={6} color="brand.700">Noticias</Heading>
                    <Text fontSize="lg" color="gray.600">
                        Manténgase informado sobre nuestros últimos lanzamientos, eventos y noticias corporativas.
                    </Text>
                </Container>
            </Box >

            {/* Content Section - Gray with Pattern */}
            < Box bg={useColorModeValue('gray.50', 'gray.900')} py={10} position="relative" >
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
                />
                <Container maxW={'container.xl'} position="relative" zIndex={1}>

                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                        {filteredNews.map((item) => (
                            <NewsCard key={item.id} {...item} onReadMore={() => handleOpenNews(item)} />
                        ))}
                    </SimpleGrid>
                </Container>
            </Box >
        </>
    );
}

const NewsCard = ({ title, date, category, excerpt, image, onReadMore }: any) => {
    return (
        <Box
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'lg'}
            rounded={'md'}
            overflow={'hidden'}
            transition="transform 0.2s"
            _hover={{ transform: 'translateY(-5px)' }}
        >
            <Image src={image} alt={title} objectFit="contain" w="100%" maxH="400px" />
            <Box p={6}>
                <Stack direction="row" align="center" mb={2}>
                    <Tag size="sm" colorScheme="brand">{category}</Tag>
                    <Text fontSize="xs" color="gray.500">{date ? new Date(date).toLocaleDateString() : ''}</Text>
                </Stack>
                <Heading size="md" mb={2} lineHeight="tight">
                    {title}
                </Heading>
                <Text color="gray.600" fontSize="sm" mb={4} noOfLines={3}>
                    {excerpt}
                </Text>
                <Button variant="link" colorScheme="brand" size="sm" onClick={onReadMore}>
                    Leer más
                </Button>
            </Box>
        </Box>
    );
};
