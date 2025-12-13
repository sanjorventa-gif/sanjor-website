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
} from '@chakra-ui/react';
import { FaTools, FaShieldAlt, FaQuestionCircle } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

export default function Services() {
    return (
        <Box py={10}>
            <Container maxW={'container.xl'}>
                <Text fontSize="lg" mb={10} color="gray.600">
                    Brindamos soporte integral para asegurar el máximo rendimiento de sus equipos SAN JOR.
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} mb={16}>
                    <ServiceCard
                        icon={FaTools}
                        title="Soporte Técnico"
                        text="Mantenimiento preventivo y correctivo realizado por especialistas."
                        action="Solicitar Soporte"
                        link="/servicios/tecnico"
                    />
                    <ServiceCard
                        icon={FaShieldAlt}
                        title="Registro de Estufas"
                        text="Registre su nuevo equipo para validar la garantía original."
                        action="Registrar Equipo"
                        link="/servicios/registro"
                    />
                    <ServiceCard
                        icon={FaShieldAlt}
                        title="Extensión de Garantía"
                        text="Amplíe la protección de su inversión con nuestros planes de garantía."
                        action="Extender Garantía"
                        link="/servicios/garantia"
                    />
                    <ServiceCard
                        icon={FaQuestionCircle}
                        title="Soporte Online"
                        text="Resuelva dudas frecuentes y acceda a documentación técnica."
                        action="Ver FAQ"
                        link="/descargas"
                    />
                </SimpleGrid>

                <Box mb={16}>
                    <Heading size="lg" mb={6} color="brand.600">Preguntas Frecuentes</Heading>
                    <Accordion allowToggle>
                        <FAQItem
                            question="¿Cómo registro mi producto para la garantía?"
                            answer="Puede registrar su producto completando el formulario de registro en esta misma sección o enviándonos un correo con el número de serie y factura de compra."
                        />
                        <FAQItem
                            question="¿Cuál es la frecuencia recomendada para el mantenimiento?"
                            answer="Recomendamos realizar un mantenimiento preventivo y calibración cada 12 meses para asegurar la precisión de la temperatura."
                        />
                        <FAQItem
                            question="¿Realizan envíos al interior del país?"
                            answer="Sí, realizamos envíos a todo el país a través de transportes de confianza. El embalaje está diseñado para proteger el equipo durante el traslado."
                        />
                        <FAQItem
                            question="¿Dónde puedo descargar el manual de usuario?"
                            answer="Los manuales de usuario están disponibles en la sección de Descargas de este sitio web."
                        />
                    </Accordion>
                </Box>

                <Box bg="brand.50" p={8} rounded="xl" textAlign="center">
                    <Heading size="md" mb={4}>¿No encontró lo que buscaba?</Heading>
                    <Button as={RouterLink} to="/contacto" colorScheme="brand">
                        Contáctenos directamente
                    </Button>
                </Box>
            </Container>
        </Box >
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
        <AccordionItem>
            <h2>
                <AccordionButton>
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
