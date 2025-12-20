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
import { getFaqs, type Faq as FaqType } from '../../api/faqs';

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
            <Box
                bg={'brand.600'}
                color={'white'}
                py={{ base: 20, md: 32 }}
                position="relative"
                overflow="hidden"
                backgroundImage="linear-gradient(135deg, var(--chakra-colors-brand-800) 0%, var(--chakra-colors-brand-600) 100%)"
            >
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    opacity={0.2}
                    backgroundImage="linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)"
                    backgroundSize="40px 40px"
                />
                <Container maxW={'container.xl'} textAlign="center" position="relative" zIndex={1}>
                    <Heading
                        as="h1"
                        fontWeight={800}
                        fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
                        lineHeight={'110%'}
                        mb={6}
                        letterSpacing="tight"
                        textShadow="0px 2px 4px rgba(0,0,0,0.3)"
                    >
                        Preguntas Frecuentes
                    </Heading>
                    <Text fontSize={{ base: 'xl', md: '2xl' }} maxW="2xl" mx="auto" color="brand.100">
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
                    opacity={0.2}
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
