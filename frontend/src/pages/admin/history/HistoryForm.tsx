import { useState, useEffect, useCallback } from 'react';
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
    Text,
    VStack,
    Icon,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHistory, createHistory, updateHistory } from '../../../api/history';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '../../../api/upload';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function HistoryForm() {
    const { id } = useParams();
    const isEditing = !!id;
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

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

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const response = await uploadFile(file);
            setFormData((prev) => ({ ...prev, image: response.url }));
            toast({
                title: 'Imagen subida',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error al subir imagen',
                description: 'Intente nuevamente.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsUploading(false);
        }
    }, [toast]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg', '.webp'],
        },
        multiple: false,
    });

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

                            {/* Drag and Drop Area */}
                            <Box
                                {...getRootProps()}
                                border="2px dashed"
                                borderColor={isDragActive ? 'brand.500' : 'gray.300'}
                                rounded="md"
                                p={6}
                                cursor="pointer"
                                bg={isDragActive ? 'brand.50' : 'gray.50'}
                                transition="all 0.2s"
                                _hover={{ borderColor: 'brand.500', bg: 'brand.50' }}
                                textAlign="center"
                            >
                                <input {...getInputProps()} />
                                <VStack spacing={2}>
                                    <Icon as={FaCloudUploadAlt} w={10} h={10} color="gray.400" />
                                    <Text color="gray.600">
                                        {isDragActive
                                            ? 'Suelte la imagen aquí...'
                                            : 'Arrastre y suelte una imagen aquí, o haga clic para seleccionar'}
                                    </Text>
                                    <Text fontSize="xs" color="gray.400">
                                        (JPG, PNG, WEBP)
                                    </Text>
                                </VStack>
                            </Box>

                            {/* Image Preview */}
                            {formData.image && (
                                <Box mt={4} position="relative">
                                    <Text fontSize="sm" fontWeight="medium" mb={2}>Vista Previa:</Text>
                                    <Image
                                        src={formData.image}
                                        alt="Preview"
                                        maxH="200px"
                                        objectFit="contain"
                                        rounded="md"
                                        border="1px solid"
                                        borderColor="gray.200"
                                    />
                                    <Button
                                        size="xs"
                                        colorScheme="red"
                                        variant="outline"
                                        mt={2}
                                        onClick={() => setFormData({ ...formData, image: '' })}
                                    >
                                        Eliminar Imagen
                                    </Button>
                                </Box>
                            )}

                            {/* Fallback URL Input */}
                            <Text fontSize="xs" color="gray.500" mt={2} mb={1}>O ingrese URL manualmente:</Text>
                            <Input
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://..."
                                size="sm"
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="blue"
                            size="lg"
                            isLoading={isLoading || isUploading}
                            loadingText={isUploading ? "Subiendo imagen..." : "Guardando..."}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Container>
    );
}
