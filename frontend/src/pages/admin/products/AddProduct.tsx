import { useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Heading,
    useToast,
    FormHelperText,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../../context/ProductContext';
import type { Product } from '../../../data/products';
import FileUpload from '../../../components/ui/FileUpload';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { PLACEHOLDER_IMAGE } from '../../../utils/images';

export default function AddProduct() {
    const { addProduct } = useProducts();
    const navigate = useNavigate();
    const toast = useToast();

    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        category: 'cultivo',
        description: '',
        image: '',
        features: [],
        dimensions: { length: 0, width: 0, height: 0, unit: 'cm' },
        temperature: { min: 0, max: 0, unit: '°C' },
        technicalSheet: '',
    });




    // Dimensions state
    const [dimLength, setDimLength] = useState('');
    const [dimWidth, setDimWidth] = useState('');
    const [dimHeight, setDimHeight] = useState('');

    // Temp state
    const [tempMin, setTempMin] = useState('');
    const [tempMax, setTempMax] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Generate a simple ID based on name
        const id = formData.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || Date.now().toString();

        const newProduct: Product = {
            id,
            name: formData.name || 'Nuevo Producto',
            category: formData.category as any,
            description: formData.description || '',
            image: formData.image || PLACEHOLDER_IMAGE,
            features: [],
            dimensions: (dimLength || dimWidth || dimHeight) ? {
                length: Number(dimLength),
                width: Number(dimWidth),
                height: Number(dimHeight),
                unit: 'cm'
            } : undefined,
            temperature: (tempMin || tempMax) ? {
                min: Number(tempMin),
                max: Number(tempMax),
                unit: '°C'
            } : undefined,
            technicalSheet: formData.technicalSheet,
        };

        try {
            await addProduct(newProduct);

            toast({
                title: 'Producto agregado',
                description: 'El producto se ha guardado correctamente.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate('/admin');
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'No se pudo guardar el producto.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW="container.md" py={8}>
            <Heading mb={8}>Agregar Nuevo Producto</Heading>
            <Box as="form" onSubmit={handleSubmit} bg="white" p={8} rounded="lg" shadow="md">
                <Stack spacing={6}>
                    <FormControl isRequired>
                        <FormLabel>Nombre del Producto</FormLabel>
                        <Input name="name" value={formData.name} onChange={handleChange} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Categoría</FormLabel>
                        <Select name="category" value={formData.category} onChange={handleChange}>
                            <option value="cultivo">Cultivo</option>
                            <option value="esterilizacion">Esterilización</option>
                            <option value="secado">Secado</option>
                            <option value="acero">Acero</option>
                            <option value="otro">Otro</option>
                        </Select>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Descripción</FormLabel>
                        <Box bg="white" color="black">
                            <ReactQuill
                                theme="snow"
                                value={formData.description}
                                onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
                            />
                        </Box>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Imagen del Producto</FormLabel>
                        <FileUpload
                            accept="image/*"
                            label="Subir Imagen"
                            onFileSelect={(base64) => setFormData((prev) => ({ ...prev, image: base64 }))}
                            previewUrl={formData.image}
                        />
                        <FormHelperText>Se recomienda una imagen de 400x300px</FormHelperText>
                    </FormControl>




                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                        <FormControl>
                            <FormLabel>Largo (cm)</FormLabel>
                            <Input type="number" value={dimLength} onChange={(e) => setDimLength(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Ancho (cm)</FormLabel>
                            <Input type="number" value={dimWidth} onChange={(e) => setDimWidth(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Alto (cm)</FormLabel>
                            <Input type="number" value={dimHeight} onChange={(e) => setDimHeight(e.target.value)} />
                        </FormControl>
                    </Stack>

                    {(formData.category !== 'acero' && formData.category !== 'otro') && (
                        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                            <FormControl>
                                <FormLabel>Temp. Mínima (°C)</FormLabel>
                                <Input type="number" value={tempMin} onChange={(e) => setTempMin(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Temp. Máxima (°C)</FormLabel>
                                <Input type="number" value={tempMax} onChange={(e) => setTempMax(e.target.value)} />
                            </FormControl>
                        </Stack>
                    )}

                    <FormControl>
                        <FormLabel>Ficha Técnica (PDF)</FormLabel>
                        <FileUpload
                            accept=".pdf"
                            label="Subir Ficha Técnica"
                            onFileSelect={(base64) => setFormData((prev) => ({ ...prev, technicalSheet: base64 }))}
                            previewUrl={formData.technicalSheet}
                            isPdf={true}
                        />
                    </FormControl>

                    <Button type="submit" colorScheme="brand" size="lg" mt={4}>
                        Guardar Producto
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
