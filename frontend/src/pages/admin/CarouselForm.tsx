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
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCarouselItem, getCarouselItem, updateCarouselItem } from '../../api/carousel';

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
                            <FormLabel>URL de Imagen</FormLabel>
                            <Input
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://..."
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
