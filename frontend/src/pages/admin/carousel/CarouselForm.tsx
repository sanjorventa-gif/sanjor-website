import { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    useToast,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Icon,
    Flex,
    Text,
    Image,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCarouselItem, getCarouselItem, updateCarouselItem } from '../../../api/carousel';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '../../../api/upload';
import { FaCloudUploadAlt, FaFileImage } from 'react-icons/fa';

export default function CarouselForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        image: '',
        order: 0,
    });

    useEffect(() => {
        if (isEditing) {
            fetchItem();
        }
    }, [id]);

    const [isUploading, setIsUploading] = useState(false);

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
        multiple: false,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
        }
    });

    const fetchItem = async () => {
        try {
            const data = await getCarouselItem(Number(id));
            setFormData({
                title: data.title,
                subtitle: data.subtitle || '',
                image: data.image,
                order: data.order,
            });
        } catch (error) {
            toast({
                title: 'Error al cargar datos',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            navigate('/admin/carousel');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateCarouselItem(Number(id), formData);
                toast({
                    title: 'Slide actualizado',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            } else {
                await createCarouselItem(formData);
                toast({
                    title: 'Slide creado',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            }
            navigate('/admin/carousel');
        } catch (error) {
            toast({
                title: 'Error al guardar',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW="container.md" py={8}>
            <Box bg="white" p={8} rounded="lg" shadow="sm">
                <Heading size="lg" mb={6}>
                    {isEditing ? 'Editar Slide' : 'Nuevo Slide'}
                </Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Título</FormLabel>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Subtítulo</FormLabel>
                            <Input
                                value={formData.subtitle}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Imagen</FormLabel>
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
                                </VStack>
                            </Box>

                            {formData.image && (
                                <Box mt={3} p={3} bg="gray.50" rounded="md" border="1px solid" borderColor="gray.200">
                                    <Flex align="center" direction="column">
                                        <Image
                                            src={formData.image}
                                            alt="Preview"
                                            maxH="200px"
                                            objectFit="contain"
                                            mb={2}
                                            rounded="md"
                                        />
                                        <Flex width="100%" justify="space-between" align="center">
                                            <Flex align="center">
                                                <Icon as={FaFileImage} color="blue.500" mr={2} />
                                                <Text fontSize="sm" noOfLines={1} maxW="200px">
                                                    {formData.image.split('/').pop()}
                                                </Text>
                                            </Flex>
                                            <Button
                                                size="xs"
                                                colorScheme="red"
                                                variant="ghost"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setFormData({ ...formData, image: '' });
                                                }}
                                            >
                                                Eliminar
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Box>
                            )}
                        </FormControl>

                        <FormControl>
                            <FormLabel>Orden</FormLabel>
                            <NumberInput
                                value={formData.order}
                                onChange={(_, val) => setFormData({ ...formData, order: val })}
                                min={0}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <Button type="submit" colorScheme="blue" width="full" mt={4} isLoading={isUploading}>
                            Guardar
                        </Button>
                        <Button variant="ghost" width="full" onClick={() => navigate('/admin/carousel')}>
                            Cancelar
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Container>
    );
}
