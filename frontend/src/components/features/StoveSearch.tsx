import { useState, useMemo } from 'react';
import {
    Box,
    Heading,
    Text,
    Stack,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    SimpleGrid,
    Alert,
    AlertIcon,
    HStack,
} from '@chakra-ui/react';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../ui/ProductCard';
import { FaThermometerHalf } from 'react-icons/fa';

export default function StoveSearch() {
    const { products } = useProducts();
    const [sliderValue, setSliderValue] = useState([30, 80]); // Default range

    // Categories considered "Stoves"
    const stoveCategories = ['cultivo', 'esterilizacion', 'secado'];

    // Advisor Logic (Text recommendations based on San Jor rules)
    const recommendations = useMemo(() => {
        const min = sliderValue[0];
        const max = sliderValue[1];
        const msgs: string[] = [];

        // Rules from original Advisor
        if (min <= 28) {
            msgs.push("Debe tener en cuenta que la Estufa no tiene sistema de enfriamiento, por lo tanto la temperatura ambiente debe ser al menos 5ºC inferior a la temperatura de programación.");
        }
        if (max > 200) {
            msgs.push("Supera el límite máximo del rango de fabricación de Estufas estándar, contáctenos para productos especiales.");
        }
        if (max > 80 && max <= 100) {
            msgs.push("La temperatura máxima está en un valor crítico para Cultivo. Podría necesitar una Estufa de Secado/Esterilización, aunque perdería precisión. Sugerimos Sistema BLAST.");
        }
        if (min < 65 && max > 100 && max <= 200) {
            msgs.push("Lo ideal es adquirir dos Estufas: una para Cultivo y otra para Secado. Una sola de Secado a bajas temperaturas pierde precisión.");
        }
        if (max > 70 && max <= 80) {
            msgs.push("La Estufa ideal es una de Cultivo con Sistema BLAST.");
        }
        if (max < 70) {
            msgs.push("La Estufa ideal es una de Cultivo (Macro/Micro o BLAST).");
        }
        if (min >= 65 && min <= 100) {
            msgs.push("Mínima crítica. Si necesita precisión, sugerimos Secado con Sistema BLAST.");
        }
        if (min > 100) {
            msgs.push("La Estufa ideal es una de Secado/Esterilización (Analógicas o Digitales).");
        }

        return msgs;
    }, [sliderValue]);

    // Product Filtering Logic
    const filteredProducts = useMemo(() => {
        const userMin = sliderValue[0];
        const userMax = sliderValue[1];

        return products.filter(product => {
            // 1. Must be a stove
            if (!stoveCategories.includes(product.category)) return false;

            // 2. Must support the temperature range
            // Product Min must be <= User Min (can go lower or equal)
            // Product Max must be >= User Max (can go higher or equal)
            if (!product.temperature) return false;

            const pMin = product.temperature.min;
            const pMax = product.temperature.max;

            // Strict coverage logic: The product must cover the ENTIRE requested range.
            return pMin <= userMin && pMax >= userMax;
        });
    }, [products, sliderValue]);

    return (
        <Box>
            <Box bg="white" p={6} rounded="lg" shadow="sm" mb={8} border="1px" borderColor="gray.200">
                <Heading size="md" mb={4}>Buscador y Asesor de Estufas</Heading>
                <Text mb={6} color="gray.600">
                    Seleccione el rango de temperatura mínima y máxima que necesita para su proceso.
                    El sistema le recomendará el tipo de equipo ideal y mostrará los modelos compatibles.
                </Text>

                <Box px={4} py={6}>
                    <Text mb={2} fontWeight="bold">Rango de Temperatura Requerido: {sliderValue[0]}°C - {sliderValue[1]}°C</Text>
                    <RangeSlider
                        // eslint-disable-next-line jsx-a11y/aria-proptypes
                        aria-label={['min', 'max']}
                        min={0}
                        max={275}
                        step={1}
                        defaultValue={[30, 80]}
                        onChange={(val) => setSliderValue(val)}
                        mb={4}
                    >
                        {/* Thermometer Gradient Track */}
                        <RangeSliderTrack h={4} borderRadius="full" bgGradient="linear(to-r, blue.400, green.400, yellow.400, orange.400, red.600)">
                            {/* Selected Range Highlight (Subtle overlay) */}
                            <RangeSliderFilledTrack bg="whiteAlpha.400" />
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0} boxSize={8} borderColor="white" shadow="md" bg="white">
                            <Box color="blue.500" as={FaThermometerHalf} />
                        </RangeSliderThumb>
                        <RangeSliderThumb index={1} boxSize={8} borderColor="white" shadow="md" bg="white">
                            <Box color="red.500" as={FaThermometerHalf} />
                        </RangeSliderThumb>
                    </RangeSlider>
                    <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.400">0°C</Text>
                        <Text fontSize="sm" color="gray.400">275°C</Text>
                    </HStack>
                </Box>

                {recommendations.length > 0 && (
                    <Stack spacing={3} mt={6} bg="blue.50" p={4} rounded="md">
                        <Text fontWeight="bold" color="blue.700">Nuestro Asesoramiento:</Text>
                        {recommendations.map((rec, i) => (
                            <Alert key={i} status="info" variant="subtle" bg="transparent" p={0}>
                                <AlertIcon color="blue.500" />
                                <Text fontSize="sm" color="blue.700">{rec}</Text>
                            </Alert>
                        ))}
                    </Stack>
                )}
            </Box>

            <Heading size="md" mb={6} color="brand.700">Productos Recomendados ({filteredProducts.length})</Heading>

            {filteredProducts.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                    {filteredProducts.map((product) => (
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
            ) : (
                <Text color="gray.500" textAlign="center" py={10}>
                    No encontramos estufas exactas que cubran todo el rango seleccionado ({sliderValue[0]}°C - {sliderValue[1]}°C).
                    <br />Intente ajustar los valores o contáctenos para un equipo a medida.
                </Text>
            )}
        </Box>
    );
}
