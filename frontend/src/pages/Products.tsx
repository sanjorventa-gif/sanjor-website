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
} from '@chakra-ui/react';
import ProductCard from '../components/ui/ProductCard';
import ProductAdvisor from '../components/features/ProductAdvisor';
import { useProducts } from '../context/ProductContext';

export default function Products() {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();
    const { products } = useProducts();

    const categories = [
        { id: 'all', label: 'Todos' },
        { id: 'cultivo', label: 'Cultivo' },
        { id: 'esterilizacion', label: 'Esterilización' },
        { id: 'secado', label: 'Secado' },
        { id: 'cajas', label: 'Cajas de Acero' },
    ];

    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (category) {
            const index = categories.findIndex(c => c.id === category);
            if (index !== -1) {
                setTabIndex(index);
            }
        } else {
            setTabIndex(0);
        }
    }, [category]);

    const handleTabChange = (index: number) => {
        setTabIndex(index);
        const catId = categories[index].id;
        if (catId === 'all') {
            navigate('/productos');
        } else {
            navigate(`/productos/${catId}`);
        }
    };

    return (
        <Box py={10}>
            <ProductAdvisor />
            <Container maxW={'container.xl'}>
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
                        <TabPanel>
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                                {products
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
                        </TabPanel>
                        {categories.slice(1).map((cat) => (
                            <TabPanel key={cat.id}>
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
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Container>
        </Box>
    );
}
