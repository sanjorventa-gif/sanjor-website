import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Image,
    SimpleGrid,
    Button,
    Spinner,
    Center,
} from '@chakra-ui/react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { FaFilePdf } from 'react-icons/fa';
import { useProducts } from '../../context/ProductContext';

export default function ProductDetail() {
    const { id } = useParams();
    const { products, isLoading } = useProducts();
    const product = products.find((p) => p.id == id);

    if (isLoading) {
        return (
            <Center h="50vh">
                <Spinner size="xl" color="brand.500" />
            </Center>
        );
    }

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

                        <Box
                            className="rich-text-content"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                            sx={{
                                '& h1, & h2, & h3': { marginTop: '10px', marginBottom: '10px', fontWeight: 'bold' },
                                '& p': { marginBottom: '10px' },

                                // Target BOTH ul and ol to capture all list types used by Quill/User
                                '& ul, & ol': {
                                    listStyleType: 'none !important',
                                    paddingLeft: '0 !important',
                                    marginLeft: '0 !important',
                                    marginTop: '0.5rem',
                                    marginBottom: '0.5rem',
                                },

                                // Target list items
                                '& ul li, & ol li': {
                                    position: 'relative',
                                    paddingLeft: '1.5rem',
                                    marginBottom: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'start',
                                    lineHeight: '1.5',
                                },

                                // Custom Arrow Bullet
                                '& ul li::before, & ol li::before': {
                                    content: '"›"',
                                    color: 'brand.500',
                                    fontWeight: '900',
                                    fontSize: '1.5rem',
                                    lineHeight: '1rem',
                                    position: 'absolute',
                                    left: 0,
                                    top: '0.1rem',
                                    fontFamily: 'sans-serif',
                                },

                                // Hide Quill's default bullet/number span to avoid double markers
                                '& .ql-ui': {
                                    display: 'none !important',
                                },

                                // Support for indented paragraphs (if strictly used instead of lists)
                                '& .ql-indent-1': {
                                    paddingLeft: '1.5rem',
                                    position: 'relative',
                                    marginBottom: '0.5rem',
                                },
                                '& .ql-indent-1::before': {
                                    content: '"›"',
                                    color: 'brand.500',
                                    fontWeight: '900',
                                    fontSize: '1.5rem',
                                    lineHeight: '1rem',
                                    position: 'absolute',
                                    left: 0,
                                    top: '0.1rem',
                                    fontFamily: 'sans-serif',
                                }
                            }}
                        />

                        {(product.dimensions || product.temperature) && (
                            <Box>
                                <Heading size="md" mb={4}>Especificaciones Técnicas</Heading>
                                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                                    {product.dimensions && (
                                        <Box p={4} bg="brand.50" rounded="md" border="1px" borderColor="brand.200">
                                            <Text fontWeight="extrabold" fontSize="lg" color="brand.700" mb={2}>Medidas Internas</Text>
                                            <Text fontSize="md" fontWeight="bold">Largo: {product.dimensions.length} {product.dimensions.unit}</Text>
                                            <Text fontSize="md" fontWeight="bold">Ancho: {product.dimensions.width} {product.dimensions.unit}</Text>
                                            <Text fontSize="md" fontWeight="bold">Alto: {product.dimensions.height} {product.dimensions.unit}</Text>
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
                                to={`/contacto?message=${encodeURIComponent(`Hola, quisiera más información sobre el producto ${product.name}`)}`}
                                size="lg"
                                colorScheme="brand"
                                px={8}
                            >
                                Obtener más información
                            </Button>
                            {product.technicalSheet && (
                                <Button
                                    as="a"
                                    href={product.technicalSheet}
                                    download={product.technicalSheet.startsWith('data:') ? `${product.id}-ficha.pdf` : undefined}
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
