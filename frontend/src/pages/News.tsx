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

import { useEffect, useState } from 'react';
import { getNews, type News as NewsType } from '../api/news';

export default function News() {
    const [news, setNews] = useState<NewsType[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNews();
                setNews(data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        fetchNews();
    }, []);

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
