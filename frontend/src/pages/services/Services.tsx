import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Button,
    SimpleGrid,
    Icon,
    useColorModeValue,
    Spinner,
    Flex,
} from '@chakra-ui/react';
import { FaTools, FaShieldAlt, FaQuestionCircle } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { getFaqs, type Faq } from '../../api/faqs';

export default function Services() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
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
            {/* Header Section - White */}
            <Box bg={useColorModeValue('gray.50', 'gray.900')} py={10}>
                <Container maxW={'container.xl'}>
                    <Heading mb={6} color="brand.700">Servicios y Soporte</Heading>
                    <Text fontSize="lg" color="gray.600">
                        Brindamos soporte integral para asegurar el máximo rendimiento de sus equipos VICKING, con el respaldo técnico oficial de Sanjor.
                    </Text>
                </Container>
            </Box>

            {/* Content Section - Gray with Pattern */}
            <Box bg={useColorModeValue('gray.50', 'gray.900')} py={10} position="relative">
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
                />
                <Container maxW={'container.xl'} position="relative" zIndex={1}>


                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={16}>
                        <ServiceCard
                            icon={FaTools}
                            title="Soporte Técnico"
                            text="Mantenimiento preventivo, correctivo y repuestos originales."
                            action="Solicitar Soporte"
                            link="/servicios/tecnico"
                        />
                        <ServiceCard
                            icon={FaQuestionCircle}
                            title="Preguntas Frecuentes"
                            text="Resuelva dudas frecuentes sobre funcionamiento y mantenimiento."
                            action="Ver FAQs"
                            link="/preguntas-frecuentes"
                        />
                    </SimpleGrid>

                    <Box mb={16}>
                        <Heading size="lg" mb={6} color="brand.600">Preguntas Frecuentes</Heading>
                        {isLoading ? (
                            <Flex justify="center" py={10}>
                                <Spinner size="lg" color="brand.500" />
                            </Flex>
                        ) : (
                            <Accordion allowToggle>
                                {faqs.length > 0 ? (
                                    faqs.map((faq) => (
                                        <FAQItem
                                            key={faq.id}
                                            question={faq.question}
                                            answer={faq.answer}
                                        />
                                    ))
                                ) : (
                                    <Text color="gray.500">No hay preguntas frecuentes disponibles.</Text>
                                )}
                            </Accordion>
                        )}
                    </Box>

                    <Box bg="white" p={8} rounded="xl" textAlign="center" shadow="md">
                        <Heading size="md" mb={4}>¿No encontró lo que buscaba?</Heading>
                        <Button as={RouterLink} to="/contacto" colorScheme="brand">
                            Contáctenos directamente
                        </Button>
                    </Box>
                </Container>
            </Box >
        </Box>
    );
}

const ServiceCard = ({ icon, title, text, action, link }: { icon: any; title: string; text: string; action: string; link: string }) => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'md'}
            p={6}
            rounded={'xl'}
            align={'center'}
            textAlign={'center'}
            spacing={4}
            h="100%"
        >
            <Icon as={icon} w={10} h={10} color="brand.500" />
            <Heading size="md">{title}</Heading>
            <Text color={'gray.600'}>{text}</Text>
            <Button as={RouterLink} to={link} variant="outline" colorScheme="brand" size="sm" mt="auto">
                {action}
            </Button>
        </Stack>
    );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    return (
        <AccordionItem
            bg={useColorModeValue('white', 'gray.800')}
            mb={4}
            rounded="lg"
            shadow="sm"
            border="1px solid"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
            <h2>
                <AccordionButton _expanded={{ bg: 'brand.50', color: 'brand.600' }} roundedTop="lg">
                    <Box flex="1" textAlign="left" fontWeight="600">
                        {question}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4} color="gray.600">
                {answer}
            </AccordionPanel>
        </AccordionItem>
    );
};
