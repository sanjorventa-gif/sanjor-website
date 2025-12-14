import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import ProductCard from '../components/ui/ProductCard';
// import ProductAdvisor from '../components/features/ProductAdvisor';
import StoveSearch from '../components/features/StoveSearch';
import { useProducts } from '../context/ProductContext';

export default function Products() {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();
    const { products } = useProducts();

    const categories = [
        { id: 'cultivo', label: 'Cultivo' },
        { id: 'esterilizacion', label: 'Esterilización' },
        { id: 'secado', label: 'Secado' },
        { id: 'cajas', label: 'Acero Inoxidable' },
        { id: 'asesor', label: 'Buscador' },
    ];

    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (category) {
            const index = categories.findIndex(c => c.id === category);
            if (index !== -1) {
                setTabIndex(index);
            }
        } else {
            // Default to first category if no param
            setTabIndex(0);
        }
    }, [category]);

    const handleTabChange = (index: number) => {
        setTabIndex(index);
        const catId = categories[index].id;
        navigate(`/productos/${catId}`);
    };

    return (
        <Box py={10} position="relative" bg={useColorModeValue('gray.50', 'gray.900')}>
            {/* Background Pattern */}
            <Box
                position="absolute"
                top="0"
                left="0"
                w="full"
                h="full"
                opacity={0.1}
                backgroundImage="radial-gradient(#4299E1 1px, transparent 1px)"
                backgroundSize="20px 20px"
                zIndex={0}
                pointerEvents="none"
            />
            {/* <ProductAdvisor /> */}
            <Container maxW={'container.xl'} position="relative" zIndex={1}>
                <Heading mb={6} color="brand.700">Catálogo de Productos</Heading>
                <Text fontSize="lg" mb={10} color="gray.600">
                    Explore nuestra gama completa de estufas y equipos para laboratorio.
                    Utilice nuestro <b>Asesor de Estufas</b> para encontrar el equipo ideal según su rango de temperatura.
                </Text>

                <Tabs variant="soft-rounded" colorScheme="brand" index={tabIndex} onChange={handleTabChange}>
                    <TabList mb={8} flexWrap="wrap">
                        {categories.map((cat) => (
                            <Tab key={cat.id} _selected={{ color: 'white', bg: 'brand.500' }}>
                                {cat.label}
                            </Tab>
                        ))}
                    </TabList>

                    <TabPanels>
                        {categories.map((cat) => (
                            <TabPanel key={cat.id}>
                                {cat.id === 'asesor' ? (
                                    <StoveSearch />
                                ) : (
                                    <>
                                        {cat.id === 'cultivo' && (
                                            <CategoryGuide
                                                title="Estufas de Cultivo"
                                                purpose="Diseñadas para el crecimiento de cultivos bacteriológicos, microbiología y análisis de alimentos."
                                                usage="Mantienen una temperatura constante y precisa (generalmente entre 20°C y 80°C) por periodos prolongados para favorecer el desarrollo de microorganismos."
                                            />
                                        )}
                                        {cat.id === 'esterilizacion' && (
                                            <CategoryGuide
                                                title="Estufas de Esterilización"
                                                purpose="Utilizadas para la eliminación de microorganismos por calor seco en instrumental quirúrgico, vidrio y materiales termoestables."
                                                usage="Operan a altas temperaturas (160°C - 180°C) durante un tiempo determinado para asegurar la esterilidad completa."
                                            />
                                        )}
                                        {cat.id === 'secado' && (
                                            <CategoryGuide
                                                title="Estufas de Secado"
                                                purpose="Ideales para la eliminación de humedad, secado de material de laboratorio y ensayos de sólidos."
                                                usage="Permiten la evaporación eficiente mediante ventilación (convección natural o forzada) para la salida de vapores."
                                            />
                                        )}
                                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                                            {products
                                                .filter((p) => p.category === cat.id)
                                                .sort((a, b) => (a.order || 0) - (b.order || 0))
                                                .map((product) => (
                                                    <ProductCard
                                                        key={product.id}
                                                        title={product.name}
                                                        description={product.description}
                                                        image={product.image}
                                                        href={`/productos/detalle/${product.id}`}
                                                        dimensions={product.dimensions}
                                                        temperature={product.temperature}
                                                    />
                                                ))}
                                        </SimpleGrid>
                                    </>
                                )}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Container>
        </Box>
    );
}

const CategoryGuide = ({ title, purpose, usage }: { title: string; purpose: string; usage: string }) => (
    <Box mb={8} p={6} bg="blue.50" rounded="lg" borderLeft="4px" borderColor="blue.500">
        <Heading size="md" mb={4} color="blue.700">{title}</Heading>
        <Stack spacing={3}>
            <Box>
                <Text fontWeight="bold" color="blue.800" mb={1}>¿Para qué sirve?</Text>
                <Text color="blue.700">{purpose}</Text>
            </Box>
            <Box>
                <Text fontWeight="bold" color="blue.800" mb={1}>¿Cómo se usa?</Text>
                <Text color="blue.700">{usage}</Text>
            </Box>
        </Stack>
    </Box>
);
