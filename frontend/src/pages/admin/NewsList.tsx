import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useToast,
    Image,
    Badge,
    Flex,
    Text,
    Spinner,
    HStack,
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { getNews, deleteNews, type News } from '../../api/news';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function NewsList() {
    const [news, setNews] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const data = await getNews();
            setNews(data);
        } catch (error) {
            toast({
                title: 'Error al cargar noticias',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Está seguro de eliminar esta noticia?')) return;
        try {
            await deleteNews(id);
            setNews(news.filter((item) => item.id !== id));
            toast({
                title: 'Noticia eliminada',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error al eliminar noticia',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <Container maxW="container.xl" py={8}>
            <Flex justify="space-between" align="center" mb={8}>
                <Heading size="lg">Gestión de Noticias</Heading>
                <Button
                    leftIcon={<FaPlus />}
                    colorScheme="brand"
                    onClick={() => navigate('/admin/news/new')}
                >
                    Nueva Noticia
                </Button>
            </Flex>

            <Box bg="white" rounded="lg" shadow="sm" overflowX="auto">
                <Table variant="simple">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th>Acciones</Th>
                            <Th>Imagen</Th>
                            <Th>Título</Th>
                            <Th>Fecha</Th>
                            <Th>Categoría</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {news.map((item) => (
                            <Tr key={item.id}>
                                <Td>
                                    <HStack spacing={2}>
                                        <IconButton
                                            aria-label="Editar"
                                            icon={<FaEdit />}
                                            size="sm"
                                            onClick={() => navigate(`/admin/news/edit/${item.id}`)}
                                        />
                                        <IconButton
                                            aria-label="Eliminar"
                                            icon={<FaTrash />}
                                            size="sm"
                                            colorScheme="red"
                                            onClick={() => handleDelete(item.id)}
                                        />
                                    </HStack>
                                </Td>
                                <Td>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        boxSize="50px"
                                        objectFit="cover"
                                        rounded="md"
                                        fallbackSrc="https://placehold.co/50"
                                    />
                                </Td>
                                <Td fontWeight="medium">{item.title}</Td>
                                <Td>{new Date(item.date).toLocaleDateString()}</Td>
                                <Td>
                                    <Badge colorScheme="brand">{item.category}</Badge>
                                </Td>
                            </Tr>
                        ))}
                        {news.length === 0 && (
                            <Tr>
                                <Td colSpan={5} textAlign="center" py={8}>
                                    <Text color="gray.500">No hay noticias registradas</Text>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </Box>
        </Container>
    );
}
