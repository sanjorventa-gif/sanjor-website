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
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHistory, createHistory, updateHistory } from '../../../api/history';
import FileUpload from '../../../components/ui/FileUpload';

export default function HistoryForm() {
    const { id } = useParams();
    const isEditing = !!id;
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        year: new Date().getFullYear(),
        title: '',
        description: '',
        image: '',
    });

    useEffect(() => {
        if (isEditing) {
            fetchEntry();
        }
    }, [id]);

    const fetchEntry = async () => {
        try {
            const historyList = await getHistory();
            const entry = historyList.find((h) => h.id === Number(id));
            if (entry) {
                setFormData({
                    year: entry.year,
                    title: entry.title,
                    description: entry.description,
                    image: entry.image || '',
                });
            }
        } catch (error) {
            toast({
                title: 'Error al cargar evento',
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
                await updateHistory(Number(id), formData);
                toast({
                    title: 'Evento actualizado',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                await createHistory(formData);
                toast({
                    title: 'Evento creado',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
            navigate('/admin/history');
        } catch (error) {
            toast({
                title: 'Error al guardar evento',
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
                    {isEditing ? 'Editar Evento' : 'Nuevo Evento'}
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl id="year" isRequired>
                            <FormLabel>Año</FormLabel>
                            <Input
                                type="number"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                            />
                        </FormControl>

                        <FormControl id="title" isRequired>
                            <FormLabel>Título</FormLabel>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </FormControl>

                        <FormControl id="description" isRequired>
                            <FormLabel>Descripción</FormLabel>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                            />
                        </FormControl>

                        <FormControl id="image">
                            <FormLabel>Imagen</FormLabel>
                            <FileUpload
                                accept="image/*"
                                label="Subir Imagen"
                                onFileSelect={(base64) => setFormData((prev) => ({ ...prev, image: base64 }))}
                                previewUrl={formData.image}
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
