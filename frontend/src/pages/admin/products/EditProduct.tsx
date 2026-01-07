import { useState, useEffect } from 'react';
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
    Spinner,
    Center,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../../../context/ProductContext';
import type { Product } from '../../../data/products';
import FileUpload from '../../../components/ui/FileUpload';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function EditProduct() {
    const { products, editProduct } = useProducts();
    const navigate = useNavigate();
    const { id } = useParams();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        if (id && products.length > 0) {
            const product = products.find((p) => p.id == id);
            if (product) {
                setFormData(product);
                if (product.dimensions) {
                    setDimLength(product.dimensions.length.toString());
                    setDimWidth(product.dimensions.width.toString());
                    setDimHeight(product.dimensions.height.toString());
                }
                if (product.temperature) {
                    setTempMin(product.temperature.min.toString());
                    setTempMax(product.temperature.max.toString());
                }
            } else {
                toast({
                    title: 'Error',
                    description: 'Producto no encontrado',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                navigate('/admin');
            }
            setIsLoading(false);
        } else if (products.length === 0) {
            // Wait for products to load
        }
    }, [id, products, navigate, toast]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedProduct: Partial<Product> = {
            name: formData.name,
            category: formData.category,
            description: formData.description,
            image: formData.image,
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

        await editProduct(id!, updatedProduct);

        toast({
            title: 'Producto actualizado',
            description: 'Los cambios se han guardado correctamente.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });

        navigate('/admin');
    };

    if (isLoading) {
        return (
            <Center h="50vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    return (
        <Container maxW="container.md" py={8}>
            <Heading mb={8}>Editar Producto</Heading>
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
                        </Select>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Descripción</FormLabel>
                        <Box bg="white" color="black">
                            <ReactQuill
                                theme="snow"
                                value={formData.description || ''}
                                onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
                            />
                        </Box>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Imagen del Producto</FormLabel>
                        <FileUpload
                            accept="image/*"
                            label="Cambiar Imagen"
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

                    <FormControl>
                        <FormLabel>Ficha Técnica (PDF)</FormLabel>
                        <FileUpload
                            accept=".pdf"
                            label="Cambiar Ficha Técnica"
                            onFileSelect={(base64) => setFormData((prev) => ({ ...prev, technicalSheet: base64 }))}
                            previewUrl={formData.technicalSheet}
                            isPdf={true}
                        />
                    </FormControl>

                    <Button type="submit" colorScheme="brand" size="lg" mt={4}>
                        Guardar Cambios
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
