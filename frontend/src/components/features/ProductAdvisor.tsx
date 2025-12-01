import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
    Alert,
    AlertIcon,
    Icon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaCalculator } from 'react-icons/fa';

export default function ProductAdvisor() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [minTemp, setMinTemp] = useState<string>('');
    const [maxTemp, setMaxTemp] = useState<string>('');
    const [recommendations, setRecommendations] = useState<string[]>([]);

    const calculateRecommendations = () => {
        const min = parseFloat(minTemp);
        const max = parseFloat(maxTemp);
        const msgs: string[] = [];

        if (isNaN(min) || isNaN(max)) {
            setRecommendations(['Por favor ingrese valores numéricos válidos.']);
            return;
        }

        // Rule 1: MINIMA <= 28
        if (min <= 28) {
            msgs.push("Debe tener en cuenta que la Estufa no tiene sistema de enfriamiento, por lo tanto la temperatura ambiente debe ser al menos 5ºC inferior a la temperatura de programación.");
        }

        // Rule 2: MAXIMA > 200
        if (max > 200) {
            msgs.push("Supera el límite máximo del rango de fabricación de Estufas, aún así póngase en contacto con nosotros para plantearnos su necesidad.");
        }

        // Rule 3: MAXIMA > 80 AND MAXIMA <= 100
        if (max > 80 && max <= 100) {
            msgs.push("La temperatura máxima está en un valor crítico y ya no puede ser una Estufa de Cultivo, usted debe optar por una Estufa de Secado/Esterilización, teniendo en cuenta que a mayor rango de temperatura va a tener menor uniformidad en la Estufa, le sugiero especialmente las de Sistema BLAST.");
        }

        // Rule 4: MINIMA < 65 AND MAXIMA > 100 AND MAXIMA <= 200
        if (min < 65 && max > 100 && max <= 200) {
            msgs.push("Lo ideal en este caso es adquirir dos Estufas, una para Cultivo y otra para Secado. Pues si fuese una sola de Secado, a bajas temperaturas pierde mucha precisión.");
        }

        // Rule 5: MAXIMA > 70 AND MAXIMA <= 80
        if (max > 70 && max <= 80) {
            msgs.push("La Estufa ideal para usted es una de Cultivo con Sistema BLAST.");
        }

        // Rule 6: MAXIMA < 70
        if (max < 70) {
            msgs.push("La Estufa ideal para usted es una de Cultivo y puede optar por las que tienen control electrónico con Macro y Micro o las de Cultivo con Sistema BLAST.");
        }

        // Rule 7: MINIMA >= 65 AND MINIMA <= 100
        if (min >= 65 && min <= 100) {
            msgs.push("La temperatura mínima está en un valor crítico y si necesita cierta precisión la Estufa ideal para usted es una de Secado con Sistema BLAST.");
        }

        // Rule 8: MINIMA > 100
        if (min > 100) {
            msgs.push("La Estufa ideal para usted es una de Secado/Esterilización y puede optar por las analógicas o Digitales.");
        }

        if (msgs.length === 0) {
            msgs.push("No hay recomendaciones específicas para este rango. Por favor contáctenos para asesoramiento personalizado.");
        }

        setRecommendations(msgs);
    };

    return (
        <>
            <Box position="fixed" bottom="4" left="4" zIndex={1000}>
                <Button
                    leftIcon={<Icon as={FaCalculator} />}
                    colorScheme="brand"
                    onClick={onOpen}
                    size="lg"
                    rounded="full"
                    shadow="xl"
                    _hover={{ transform: 'scale(1.05)' }}
                    transition="all 0.2s"
                >
                    Asesor de Estufas
                </Button>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Asesor de Selección de Estufas</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={6}>
                            <Text color="gray.600">
                                Ingrese el rango de temperatura de trabajo (Mínima y Máxima) para recibir una recomendación sobre el equipo ideal.
                            </Text>

                            <Stack direction="row" spacing={4}>
                                <FormControl>
                                    <FormLabel>Temp. Mínima (°C)</FormLabel>
                                    <Input
                                        type="number"
                                        value={minTemp}
                                        onChange={(e) => setMinTemp(e.target.value)}
                                        placeholder="Ej: 30"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Temp. Máxima (°C)</FormLabel>
                                    <Input
                                        type="number"
                                        value={maxTemp}
                                        onChange={(e) => setMaxTemp(e.target.value)}
                                        placeholder="Ej: 150"
                                    />
                                </FormControl>
                            </Stack>

                            <Button colorScheme="brand" onClick={calculateRecommendations}>
                                Obtener Recomendación
                            </Button>

                            {recommendations.length > 0 && (
                                <Stack spacing={3} mt={4}>
                                    <Text fontWeight="bold">Resultados:</Text>
                                    {recommendations.map((msg, idx) => (
                                        <Alert key={idx} status="info" borderRadius="md">
                                            <AlertIcon />
                                            {msg}
                                        </Alert>
                                    ))}
                                </Stack>
                            )}
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
