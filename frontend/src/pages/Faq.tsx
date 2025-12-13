
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
} from '@chakra-ui/react';

export default function Faq() {
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

            <Container maxW={'container.lg'} py={16}>
                <Accordion allowMultiple>
                    <AccordionItem border="none" mb={4} bg={useColorModeValue('gray.50', 'gray.900')} rounded="lg">
                        <h2>
                            <AccordionButton _expanded={{ bg: 'brand.500', color: 'white' }} rounded="lg" p={4}>
                                <Box flex="1" textAlign="left" fontWeight="bold">
                                    ¿Cómo registro mi garantía?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Para registrar su garantía, ingrese a la sección "Servicios" y seleccione "Registro de Estufas". Complete el formulario con los datos de su equipo y factura de compra.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem border="none" mb={4} bg={useColorModeValue('gray.50', 'gray.900')} rounded="lg">
                        <h2>
                            <AccordionButton _expanded={{ bg: 'brand.500', color: 'white' }} rounded="lg" p={4}>
                                <Box flex="1" textAlign="left" fontWeight="bold">
                                    ¿Cómo solicito servicio técnico?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Puede solicitar asistencia técnica ingresando a "Servicios" y seleccionando "Soporte Técnico". Allí podrá detallar el inconveniente y nuestro equipo se pondrá en contacto a la brevedad.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem border="none" mb={4} bg={useColorModeValue('gray.50', 'gray.900')} rounded="lg">
                        <h2>
                            <AccordionButton _expanded={{ bg: 'brand.500', color: 'white' }} rounded="lg" p={4}>
                                <Box flex="1" textAlign="left" fontWeight="bold">
                                    ¿Cuál es el período de garantía?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Nuestras estufas cuentan con una garantía estándar de 12 meses. Puede extender este plazo mediante nuestro programa de "Extensión de Garantía".
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Container>
        </Box>
    );
}
