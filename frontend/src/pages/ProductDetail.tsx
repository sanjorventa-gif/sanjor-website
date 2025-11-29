import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Image,
    SimpleGrid,
    Button,
    List,
    ListItem,
    ListIcon,
} from '@chakra-ui/react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { FaCheckCircle, FaFilePdf } from 'react-icons/fa';
import { products } from '../data/products';

export default function ProductDetail() {
    const { id } = useParams();
    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <Container maxW={'container.xl'} py={20} textAlign="center">
                <Heading>Producto no encontrado</Heading>
                <Button as={RouterLink} to="/productos" mt={6} colorScheme="brand">
                    Volver al catálogo
                </Button>
            </Container>
        );
    }

    return (
        <Box py={10}>
            <Container maxW={'container.xl'}>
                <Button
                    as={RouterLink}
                    to="/productos"
                    variant="ghost"
                    mb={8}
                    colorScheme="brand"
                >
                    &larr; Volver a Productos
                </Button>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <Box>
                        <Image
                            src={product.image}
                            alt={product.name}
                            rounded={'md'}
                            w={'100%'}
                            objectFit={'cover'}
                            fallbackSrc="https://via.placeholder.com/600x400?text=SAN+JOR"
                        />
                    </Box>

                    <Stack spacing={6}>
                        <Box>
                            <Text
                                color={'brand.500'}
                                textTransform={'uppercase'}
                                fontWeight={800}
                                fontSize={'sm'}
                                letterSpacing={1.1}
                                mb={2}
                            >
                                {product.category}
                            </Text>
                            <Heading as={'h1'} fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={700}>
                                {product.name}
                            </Heading>
                        </Box>

                        <Text color={'gray.600'} fontSize={'lg'}>
                            {product.description}
                        </Text>

                        <Box>
                            <Heading size="md" mb={4}>Características Principales</Heading>
                            <List spacing={3}>
                                {product.features.map((feature, index) => (
                                    <ListItem key={index} display="flex" alignItems="center">
                                        <ListIcon as={FaCheckCircle} color="brand.500" />
                                        {feature}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        {(product.dimensions || product.temperature) && (
                            <Box>
                                <Heading size="md" mb={4}>Especificaciones Técnicas</Heading>
                                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                                    {product.dimensions && (
                                        <Box p={4} bg="gray.50" rounded="md">
                                            <Text fontWeight="bold" mb={2}>Medidas</Text>
                                            <Text>Largo: {product.dimensions.length} {product.dimensions.unit}</Text>
                                            <Text>Ancho: {product.dimensions.width} {product.dimensions.unit}</Text>
                                            <Text>Alto: {product.dimensions.height} {product.dimensions.unit}</Text>
                                        </Box>
                                    )}
                                    {product.temperature && (
                                        <Box p={4} bg="gray.50" rounded="md">
                                            <Text fontWeight="bold" mb={2}>Temperatura</Text>
                                            <Text>Mínima: {product.temperature.min} {product.temperature.unit}</Text>
                                            <Text>Máxima: {product.temperature.max} {product.temperature.unit}</Text>
                                        </Box>
                                    )}
                                </SimpleGrid>
                            </Box>
                        )}

                        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} pt={4}>
                            <Button
                                as={RouterLink}
                                to="/contacto"
                                size="lg"
                                colorScheme="brand"
                                px={8}
                            >
                                Solicitar Cotización
                            </Button>
                            {product.technicalSheet && (
                                <Button
                                    as="a"
                                    href={product.technicalSheet}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    size="lg"
                                    variant="outline"
                                    leftIcon={<FaFilePdf />}
                                >
                                    Ficha Técnica
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    );
}
