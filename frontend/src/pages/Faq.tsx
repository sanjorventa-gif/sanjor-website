import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    useColorModeValue,
    Spinner,
    Flex,
} from '@chakra-ui/react';
import { getFaqs, type Faq as FaqType } from '../api/faqs';

export default function Faq() {
    const [faqs, setFaqs] = useState<FaqType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const data = await getFaqs();
                setFaqs(data);
            } catch (error) {
                console.error("Error loading FAQs:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFaqs();
    }, []);

    return (
        <Box>
            {/* Hero Section */}
            <Box bg="brand.600" color="white" py={20}>
                <Container maxW={'container.xl'} textAlign="center">
                    <Heading as="h1" size="2xl" mb={4}>
                        Preguntas Frecuentes
                    </Heading>
                    <Text fontSize="xl" maxW="2xl" mx="auto">
                        Respuestas a las consultas más habituales sobre nuestros productos y servicios.
                    </Text>
                </Container>
            </Box>

            <Box py={16} bg={useColorModeValue('gray.50', 'gray.900')} position="relative">
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
                <Container maxW={'container.lg'} position="relative" zIndex={1}>
                    {isLoading ? (
                        <Flex justify="center" py={10}>
                            <Spinner size="xl" />
                        </Flex>
                    ) : (
                        <Accordion allowMultiple>
                            {faqs.map((faq) => (
                                <AccordionItem key={faq.id} border="none" mb={4} bg={useColorModeValue('white', 'gray.800')} rounded="lg" shadow="sm">
                                    <h2>
                                        <AccordionButton _expanded={{ bg: 'brand.500', color: 'white' }} rounded="lg" p={4}>
                                            <Box flex="1" textAlign="left" fontWeight="bold">
                                                {faq.question}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        {faq.answer}
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                    {!isLoading && faqs.length === 0 && (
                        <Box textAlign="center" py={10} color="gray.500">
                            No hay preguntas frecuentes disponibles en este momento.
                        </Box>
                    )}
                </Container>
            </Box>
        </Box>
    );
}
