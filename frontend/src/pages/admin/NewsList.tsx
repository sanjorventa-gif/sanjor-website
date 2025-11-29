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
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { getNews, deleteNews, type News } from '../../api/news';

export default function NewsList() {
    const [news, setNews] = useState<News[]>([]);
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
                title: 'Error al cargar novedades',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Está seguro que desea eliminar esta novedad?')) {
            try {
                await deleteNews(id);
                setNews(news.filter((item) => item.id !== id));
                toast({
                    title: 'Novedad eliminada',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            } catch (error) {
                toast({
                    title: 'Error al eliminar novedad',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <Container maxW="container.xl" py={8}>
            <Flex justify="space-between" align="center" mb={8}>
                <Heading size="lg">Gestión de Novedades</Heading>
                <Button
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                    onClick={() => navigate('/admin/news/new')}
                >
                    Nueva Novedad
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
                                    <IconButton
                                        aria-label="Editar"
                                        icon={<EditIcon />}
                                        colorScheme="blue"
                                        variant="ghost"
                                        size="sm"
                                        mr={2}
                                        onClick={() => navigate(`/admin/news/edit/${item.id}`)}
                                    />
                                    <IconButton
                                        aria-label="Eliminar"
                                        icon={<DeleteIcon />}
                                        colorScheme="red"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(item.id)}
                                    />
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
                                <Td>{item.date}</Td>
                                <Td>
                                    <Badge colorScheme="brand">{item.category}</Badge>
                                </Td>
                            </Tr>
                        ))}
                        {news.length === 0 && (
                            <Tr>
                                <Td colSpan={5} textAlign="center" py={8}>
                                    <Text color="gray.500">No hay novedades registradas</Text>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </Box>
        </Container>
    );
}
