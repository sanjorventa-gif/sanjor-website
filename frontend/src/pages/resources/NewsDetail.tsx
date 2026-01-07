import {
    Box,
    Container,
    Heading,
    Text,
    Image,
    Tag,
    VStack,
    HStack,
    Button,
    Spinner,
    Center,
    useToast,
    Icon,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewsBySlug, type News } from '../../api/news';
import { ArrowBackIcon, CalendarIcon } from '@chakra-ui/icons';

export default function NewsDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [news, setNews] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const fetchNews = async () => {
            if (!slug) return;
            try {
                const data = await getNewsBySlug(slug);
                setNews(data);
            } catch (error) {
                console.error('Error fetching news:', error);
                toast({
                    title: 'Error',
                    description: 'No se pudo cargar la noticia o no existe.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                navigate('/novedades');
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [slug, navigate, toast]);

    if (loading) {
        return (
            <Center h="50vh">
                <Spinner size="xl" color="brand.500" />
            </Center>
        );
    }

    if (!news) return null;

    return (
        <Container maxW="container.lg" py={12}>
            <Button
                leftIcon={<ArrowBackIcon />}
                variant="ghost"
                mb={6}
                onClick={() => navigate('/novedades')}
            >
                Volver a Noticias
            </Button>

            <VStack align="start" spacing={6}>
                <Heading as="h1" size="2xl" color="brand.700">
                    {news.title}
                </Heading>

                <HStack spacing={4}>
                    <Tag size="lg" colorScheme="brand" borderRadius="full">
                        {news.category}
                    </Tag>
                    <HStack color="gray.500">
                        <Icon as={CalendarIcon} />
                        <Text>{new Date(news.date).toLocaleDateString()}</Text>
                    </HStack>
                </HStack>

                {news.image && (
                    <Image
                        src={news.image}
                        alt={news.title}
                        w="100%"
                        h="auto"
                        borderRadius="xl"
                        shadow="lg"
                    />
                )}

                <Box
                    className="news-content"
                    w="full"
                    fontSize="lg"
                    lineHeight="tall"
                    dangerouslySetInnerHTML={{ __html: news.content || news.excerpt }}
                    sx={{
                        'p': { marginBottom: '1.5rem', color: 'gray.700' },
                        'h2': { fontSize: 'xl', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem', color: 'brand.600' },
                        'h3': { fontSize: 'lg', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' },
                        'ul, ol': { marginLeft: '2rem', marginBottom: '1.5rem' },
                        'li': { marginBottom: '0.5rem' },
                        'a': { color: 'brand.500', textDecoration: 'underline' },
                        'img': { maxWidth: '100%', height: 'auto', borderRadius: 'md', margin: '2rem auto', display: 'block' },
                        'blockquote': { borderLeft: '4px solid', borderColor: 'brand.500', paddingLeft: '1rem', fontStyle: 'italic', color: 'gray.600' }
                    }}
                />
            </VStack>
        </Container>
    );
}
