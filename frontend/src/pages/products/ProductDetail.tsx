import { useRef } from 'react';
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
    IconButton,
} from '@chakra-ui/react';
import { keyframes as emotionKeyframes } from '@emotion/react'; // Fix alias if needed or just use emotion
import { useParams, Link as RouterLink } from 'react-router-dom';
import { FaFilePdf } from 'react-icons/fa';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../../components/ui/ProductCard';

const pulse = emotionKeyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 var(--chakra-colors-brand-200); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(0, 0, 0, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
`;

export default function ProductDetail() {
    const { id } = useParams();
    const { products, isLoading } = useProducts();
    const product = products.find((p) => p.id == id);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Filter related products
    const relatedProducts = products.filter(
        (p) => p.category === product?.category && p.id != id
    );

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 300;

            if (direction === 'left') {
                if (current.scrollLeft <= 5) { // Threshold for start
                    current.scrollTo({ left: current.scrollWidth, behavior: 'smooth' });
                } else {
                    current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            } else {
                // Check if we are at the end (with small tolerance)
                if (current.scrollLeft + current.clientWidth >= current.scrollWidth - 5) {
                    current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        }
    };

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

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={20}>
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
                        {/* 1. Título */}
                        <Heading as={'h1'} fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={700}>
                            {product.name}
                        </Heading>

                        {/* 2. Especificaciones Técnicas */}
                        <Heading as={'h2'} fontSize={{ base: 'xl', sm: '2xl' }} fontWeight={600} color="gray.700">
                            Especificaciones Técnicas
                        </Heading>

                        {/* 3. Descripción (Bullets) */}
                        <Box
                            className="rich-text-content"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                            sx={{
                                '& h1, & h2, & h3': { marginTop: '10px', marginBottom: '10px', fontWeight: 'bold' },
                                '& p': { marginBottom: '10px' },

                                // Reset list styles
                                '& ul, & ol': {
                                    paddingLeft: '0 !important',
                                    marginLeft: '0 !important',
                                    marginTop: '0.5rem',
                                    marginBottom: '0.5rem',
                                },

                                // List Items
                                '& ul li, & ol li': {
                                    marginBottom: '0.5rem',
                                    paddingLeft: '1.5rem',
                                    position: 'relative',
                                    lineHeight: '1.5',
                                    listStyleType: 'none',
                                    color: 'gray.600',
                                    display: 'flex',
                                    alignItems: 'center',
                                },
                                // Custom animated bullet
                                '& ul li::before, & ol li::before': {
                                    content: '""',
                                    position: 'absolute',
                                    left: '0.2rem',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: 'brand.500',
                                    animation: `${pulse} 2s infinite`,
                                },

                                // Hide Quill's default bullet/number span
                                '& .ql-ui': {
                                    display: 'none !important',
                                },

                                // Indent support
                                '& .ql-indent-1': {
                                    paddingLeft: '1.5rem',
                                    position: 'relative',
                                    marginBottom: '0.5rem',
                                },
                            }}
                        />

                        {/* 4. Medidas Internas (Cuadro coloreado al final) */}
                        {product.dimensions && (
                            <Box
                                bg="blue.50"
                                border="2px solid"
                                borderColor="blue.200"
                                borderRadius="md"
                                p={4}
                                mt={4}
                            >
                                <Text fontWeight="bold" fontSize="lg" color="gray.800" mb={1}>
                                    Medidas Internas
                                </Text>
                                <Text fontSize="lg" fontWeight="medium" color="gray.700">
                                    {product.dimensions.length} x {product.dimensions.width} x {product.dimensions.height} {product.dimensions.unit}
                                    <Text as="span" fontSize="md" color="gray.500" fontWeight="normal" ml={2}>
                                        (Frente x Alto x Fondo en cm)
                                    </Text>
                                </Text>
                            </Box>
                        )}

                        {/* Botones de acción */}
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

                {/* Related Products Carousel */}
                {relatedProducts.length > 0 && (
                    <Box mt={16} position="relative">
                        <Heading as="h3" size="lg" mb={8} borderBottom="2px solid" borderColor="brand.500" pb={2} display="inline-block">
                            Productos Relacionados
                        </Heading>

                        <IconButton
                            aria-label="Scroll Left"
                            icon={<ChevronLeftIcon w={6} h={6} />}
                            position="absolute"
                            left={{ base: -2, md: -8 }}
                            top="55%" // Adjust vertically
                            transform="translateY(-50%)"
                            zIndex={2}
                            onClick={() => scroll('left')}
                            colorScheme="brand"
                            variant="ghost"
                            rounded="full"
                            bg="whiteAlpha.800"
                            shadow="md"
                            _hover={{ bg: 'brand.50' }}
                        />

                        <Box
                            ref={scrollRef}
                            overflowX="auto"
                            pb={8}
                            css={{
                                '&::-webkit-scrollbar': {
                                    height: '0px', // Hide scrollbar for cleaner look with arrows
                                },
                                scrollBehavior: 'smooth',
                            }}
                        >
                            <Stack direction="row" spacing={6}>
                                {relatedProducts.map((related) => (
                                    <Box key={related.id} minW={{ base: '220px', md: '250px' }} w={{ base: '220px', md: '250px' }}>
                                        <Box transform="scale(0.95)" transformOrigin="top left">
                                            <ProductCard
                                                title={related.name}
                                                image={related.image}
                                                description={related.description}
                                                href={`/productos/${related.id}`}
                                                dimensions={related.dimensions}
                                                temperature={related.temperature}
                                                temperatureLabel="Temp"
                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>

                        <IconButton
                            aria-label="Scroll Right"
                            icon={<ChevronRightIcon w={6} h={6} />}
                            position="absolute"
                            right={{ base: -2, md: -8 }}
                            top="55%"
                            transform="translateY(-50%)"
                            zIndex={2}
                            onClick={() => scroll('right')}
                            colorScheme="brand"
                            variant="ghost"
                            rounded="full"
                            bg="whiteAlpha.800"
                            shadow="md"
                            _hover={{ bg: 'brand.50' }}
                        />
                    </Box>
                )}
            </Container>
        </Box>
    );
}