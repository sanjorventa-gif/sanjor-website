import { useState, useEffect } from 'react';
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
    Select,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCarouselItem, getCarouselItem, updateCarouselItem } from '../../../api/carousel';
import FileUpload from '../../../components/ui/FileUpload';

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
        button_text: '',
        button_link: '',
        transition_effect: 'slide',
        overlay_effect: 'grid',
    });

    useEffect(() => {
        if (isEditing) {
            fetchItem();
        }
    }, [id]);

    const fetchItem = async () => {
        try {
            const data = await getCarouselItem(Number(id));
            setFormData({
                title: data.title,
                subtitle: data.subtitle || '',
                image: data.image,
                order: data.order,
                button_text: data.button_text || '',
                button_link: data.button_link || '',
                transition_effect: data.transition_effect || 'slide',
                overlay_effect: data.overlay_effect || 'grid',
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
                            <FileUpload
                                accept="image/*"
                                label="Subir Imagen de Portada"
                                onFileSelect={(base64) => setFormData((prev) => ({ ...prev, image: base64 }))}
                                previewUrl={formData.image}
                            />
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

                        <FormControl>
                            <FormLabel>Efecto de Transición</FormLabel>
                            <Select
                                value={formData.transition_effect}
                                onChange={(e) => setFormData({ ...formData, transition_effect: e.target.value })}
                            >
                                <option value="slide">Deslizar (Slide)</option>
                                <option value="fade">Desvanecer (Fade)</option>
                                <option value="zoom">Zoom</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Efecto de Superposición (Trama)</FormLabel>
                            <Select
                                value={formData.overlay_effect}
                                onChange={(e) => setFormData({ ...formData, overlay_effect: e.target.value })}
                            >
                                <option value="grid">Cuadriculado (Grid)</option>
                                <option value="dots">Puntos (Dots)</option>
                                <option value="scanlines">Líneas de Escaneo</option>
                                <option value="none">Ninguno</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Texto del Botón (Opcional)</FormLabel>
                            <Input
                                value={formData.button_text}
                                onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                                placeholder="Ej: Ver Más"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Enlace del Botón (Opcional)</FormLabel>
                            <Input
                                value={formData.button_link}
                                onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                                placeholder="Ej: /productos/cultivo"
                            />
                        </FormControl>

                        <Button type="submit" colorScheme="blue" width="full" mt={4}>
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
