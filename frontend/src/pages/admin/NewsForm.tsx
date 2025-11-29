import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    useToast,
    Textarea,
    Image,
    SimpleGrid,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNewsItem, createNews, updateNews } from '../../api/news';

export default function NewsForm() {
    const { id } = useParams();
    const isEditing = !!id;
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        excerpt: '',
        image: '',
        content: '',
    });

    useEffect(() => {
        if (isEditing) {
            fetchNewsItem();
        }
    }, [id]);

    const fetchNewsItem = async () => {
        try {
            if (id) {
                const item = await getNewsItem(Number(id));
                setFormData({
                    title: item.title,
                    date: item.date,
                    category: item.category,
                    excerpt: item.excerpt,
                    image: item.image,
                    content: item.content || '',
                });
            }
        } catch (error) {
            toast({
                title: 'Error al cargar novedad',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isEditing && id) {
                await updateNews(Number(id), formData);
                toast({
                    title: 'Novedad actualizada',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                await createNews(formData);
                toast({
                    title: 'Novedad creada',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
            navigate('/admin/news');
        } catch (error) {
            toast({
                title: 'Error al guardar novedad',
                description: 'Verifique los datos e intente nuevamente.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW="container.md" py={8}>
            <Box bg="white" p={8} rounded="lg" shadow="sm">
                <Heading size="lg" mb={6}>
                    {isEditing ? 'Editar Novedad' : 'Nueva Novedad'}
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl id="title" isRequired>
                            <FormLabel>Título</FormLabel>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </FormControl>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl id="date" isRequired>
                                <FormLabel>Fecha</FormLabel>
                                <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="category" isRequired>
                                <FormLabel>Categoría</FormLabel>
                                <Input
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="Ej: Lanzamiento, Eventos"
                                />
                            </FormControl>
                        </SimpleGrid>

                        <FormControl id="image" isRequired>
                            <FormLabel>URL de Imagen</FormLabel>
                            <Input
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://..."
                            />
                            {formData.image && (
                                <Box mt={2}>
                                    <Image
                                        src={formData.image}
                                        alt="Preview"
                                        maxH="200px"
                                        objectFit="cover"
                                        rounded="md"
                                        fallbackSrc="https://placehold.co/400x200?text=Error+URL"
                                    />
                                </Box>
                            )}
                        </FormControl>

                        <FormControl id="excerpt" isRequired>
                            <FormLabel>Resumen (Excerpt)</FormLabel>
                            <Textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                rows={3}
                            />
                        </FormControl>

                        <FormControl id="content">
                            <FormLabel>Contenido Completo (Opcional)</FormLabel>
                            <Textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                rows={6}
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="blue"
                            size="lg"
                            isLoading={isLoading}
                            mt={4}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Container>
    );
}
