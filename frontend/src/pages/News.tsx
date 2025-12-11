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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { getNews, type News as NewsType } from '../api/news';
import { useAuth } from '../context/AuthContext';

export default function News() {
    const [news, setNews] = useState<NewsType[]>([]);

    const { user, isAuthenticated } = useAuth();

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

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedNews, setSelectedNews] = useState<NewsType | null>(null);

    const handleOpenNews = (item: NewsType) => {
        setSelectedNews(item);
        onOpen();
    };

    return (
        <Box py={10}>
            <Container maxW={'container.xl'}>
                <Heading mb={6} color="brand.700">Noticias</Heading>
                <Text fontSize="lg" mb={10} color="gray.600">
                    Manténgase informado sobre nuestros últimos lanzamientos, eventos y noticias corporativas.
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                    {filteredNews.map((item) => (
                        <NewsCard key={item.id} {...item} onReadMore={() => handleOpenNews(item)} />
                    ))}
                </SimpleGrid>

                <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{selectedNews?.title}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            {selectedNews?.image && (
                                <Image
                                    src={selectedNews.image}
                                    alt={selectedNews.title}
                                    w="100%"
                                    h="300px"
                                    objectFit="cover"
                                    rounded="md"
                                    mb={6}
                                />
                            )}
                            <Box mb={4}>
                                <Tag colorScheme="brand" mr={2}>{selectedNews?.category}</Tag>
                                <Text as="span" fontSize="sm" color="gray.500">
                                    {selectedNews?.date && new Date(selectedNews.date).toLocaleDateString()}
                                </Text>
                            </Box>

                            <Box
                                className="news-content"
                                dangerouslySetInnerHTML={{ __html: selectedNews?.content || selectedNews?.excerpt || '' }}
                                sx={{
                                    'img': { maxWidth: '100%', height: 'auto', margin: '20px 0' },
                                    'p': { marginBottom: '1rem' },
                                    'ul, ol': { marginLeft: '20px', marginBottom: '1rem' }
                                }}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" onClick={onClose}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Container>
        </Box>
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
                <Button variant="link" colorScheme="brand" size="sm" onClick={onReadMore}>
                    Leer más
                </Button>
            </Box>
        </Box>
    );
};
