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
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { getNews, deleteNews, type News } from '../../../api/news';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

import ExportButtons from '../../../components/common/ExportButtons';

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
            // Sort by date descending (newest first)
            const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setNews(sortedData);
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

    const exportColumns = [
        { header: 'ID', key: 'id' },
        { header: 'Título', key: 'title' },
        { header: 'Fecha', key: 'date', formatter: (val: string) => new Date(val).toLocaleDateString() },
        { header: 'Categoría', key: 'category' },
        { header: 'Roles', key: 'allowed_roles', formatter: (val: string[]) => val && val.length ? val.join(', ') : 'Todos' },
    ];

    if (isLoading) return <Spinner />;

    return (
        <Container maxW="container.xl" py={8}>
            <Flex justify="space-between" align="center" mb={8}>
                <Heading size="lg">Gestión de Noticias</Heading>
                <Flex gap={2}>
                    <ExportButtons
                        data={news}
                        columns={exportColumns}
                        fileName="noticias_sanjor"
                        title="Reporte de Noticias"
                    />
                    <Button
                        leftIcon={<AddIcon />}
                        colorScheme="blue"
                        onClick={() => navigate('/admin/news/new')}
                    >
                        Nueva Noticia
                    </Button>
                </Flex>
            </Flex>

            <Box bg="white" rounded="lg" shadow="sm" overflowX="auto">
                <Table variant="simple">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th w="100px">Acciones</Th>
                            <Th>Imagen</Th>
                            <Th>Título</Th>
                            <Th>Fecha</Th>
                            <Th>Categoría</Th>
                            <Th>Roles Permitidos</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {news.map((item) => (
                            <Tr key={item.id}>
                                <Td>
                                    <Flex>
                                        <IconButton
                                            aria-label="Editar"
                                            icon={<EditIcon />}
                                            size="sm"
                                            colorScheme="blue"
                                            variant="ghost"
                                            mr={2}
                                            onClick={() => navigate(`/admin/news/edit/${item.id}`)}
                                        />
                                        <IconButton
                                            aria-label="Eliminar"
                                            icon={<DeleteIcon />}
                                            size="sm"
                                            colorScheme="red"
                                            variant="ghost"
                                            onClick={() => handleDelete(item.id)}
                                        />
                                    </Flex>
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
                                <Td>
                                    {item.allowed_roles && item.allowed_roles.length > 0 ? (
                                        item.allowed_roles.map((role) => (
                                            <Badge key={role} mr={1} fontSize="xs" colorScheme="gray">
                                                {role.replace('_', ' ')}
                                            </Badge>
                                        ))
                                    ) : (
                                        <Badge colorScheme="green">Todos (Público)</Badge>
                                    )}
                                </Td>
                            </Tr>
                        ))}
                        {news.length === 0 && (
                            <Tr>
                                <Td colSpan={6} textAlign="center" py={8}>
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
