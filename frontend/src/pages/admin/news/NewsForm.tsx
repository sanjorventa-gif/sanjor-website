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
    SimpleGrid,
    Checkbox,
    CheckboxGroup,
    Spinner,
} from '@chakra-ui/react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getNewsItem, createNews, updateNews } from '../../../api/news';
import FileUpload from '../../../components/ui/FileUpload';

export default function NewsForm() {
    const { id } = useParams();
    const isEditing = !!id;
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(isEditing);

    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        excerpt: '',
        image: '',
        content: '',
        allowed_roles: [] as string[],
    });

    useEffect(() => {
        if (isEditing) {
            fetchNewsItem();
        }
    }, [id]);

    const fetchNewsItem = async () => {
        setIsFetching(true);
        try {
            if (id) {
                const item = await getNewsItem(Number(id));
                console.log('Fetched Item:', item); // Debug
                setFormData({
                    title: item.title || '',
                    date: item.date ? new Date(item.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                    category: item.category || '',
                    excerpt: item.excerpt || '',
                    image: item.image || '',
                    content: item.content || '',
                    allowed_roles: item.allowed_roles || [],
                });
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            toast({
                title: 'Error al cargar novedad',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsFetching(false);
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
            {isFetching ? (
                <Box textAlign="center" py={10}>
                    <Spinner size="xl" />
                </Box>
            ) : (
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
                                <FormLabel>Imagen Principal</FormLabel>
                                <FileUpload
                                    accept="image/*"
                                    label="Subir Imagen"
                                    onFileSelect={(base64) => setFormData((prev) => ({ ...prev, image: base64 }))}
                                    previewUrl={formData.image}
                                />
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
                                <FormLabel>Contenido Completo</FormLabel>
                                <Box bg="white" color="black">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.content}
                                        onChange={(content) => setFormData({ ...formData, content })}
                                        style={{ height: '300px', marginBottom: '50px' }}
                                        modules={{
                                            toolbar: [
                                                [{ 'header': [1, 2, false] }],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                                ['link', 'image'],
                                                ['clean']
                                            ],
                                        }}
                                    />
                                </Box>
                            </FormControl>

                            <FormControl id="roles">
                                <FormLabel>Roles Permitidos (Dejar vacío para público)</FormLabel>
                                <CheckboxGroup
                                    colorScheme="brand"
                                    value={formData.allowed_roles}
                                    onChange={(values) => setFormData({ ...formData, allowed_roles: values as string[] })}
                                >
                                    <Stack spacing={2} direction="column">
                                        <Checkbox value="admin">Admin</Checkbox>
                                        <Checkbox value="usuario_nacional">Usuario Nacional</Checkbox>
                                        <Checkbox value="usuario_internacional">Usuario Internacional</Checkbox>
                                        <Checkbox value="distribuidor_nacional">Distribuidor Nacional</Checkbox>
                                        <Checkbox value="distribuidor_internacional">Distribuidor Internacional</Checkbox>
                                    </Stack>
                                </CheckboxGroup>
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
            )}
        </Container>
    );
}
