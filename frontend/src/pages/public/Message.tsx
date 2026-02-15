
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Message() {
    const bgWhite = useColorModeValue('white', 'gray.800');

    return (
        <Box>
            {/* HERO SECTION */}
            <Box
                bg={'brand.600'}
                color={'white'}
                py={{ base: 10, md: 16 }} // Reduced padding
                position="relative"
                overflow="hidden"
                backgroundImage="linear-gradient(135deg, var(--chakra-colors-brand-800) 0%, var(--chakra-colors-brand-600) 100%)"
            >
                <Container maxW={'container.xl'} position="relative" zIndex={1} textAlign={'center'}>
                    <Heading
                        fontWeight={800}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }} // Reduced font size
                        lineHeight={'110%'}
                        mb={4}
                        letterSpacing="tight"
                        textShadow="0px 2px 4px rgba(0,0,0,0.3)"
                    >
                        MENSAJE
                    </Heading>
                    <Text fontSize={{ base: 'lg', md: 'xl' }} maxW={'3xl'} mx={'auto'} color={'brand.100'} fontWeight="normal">
                        Mensaje a quienes nos acompañaron durante estos 60 años.
                    </Text>
                </Container>
            </Box>

            {/* CONTENT SECTION */}
            <Box py={{ base: 16, md: 24 }} bg={bgWhite}>
                <Container maxW={'container.lg'}>
                    <Stack spacing={8}>
                        <Box>
                            <Heading size="lg" color={'brand.700'} mb={4}>Estimados clientes:</Heading>
                            <Stack spacing={4}>
                                <Text fontSize={'md'} color={'gray.600'} textAlign="justify">
                                    Nos dirigimos a ustedes con una mezcla de emoción y gratitud para comunicarles que, luego de 60 años de trayectoria, nuestra empresa ha tomado la decisión de cerrar definitivamente sus puertas.
                                </Text>
                                <Text fontSize={'md'} color={'gray.600'} textAlign="justify">
                                    No es solo el final de una actividad comercial, sino el cierre de una historia construida día a día junto a ustedes. Durante seis décadas fabricamos agitadores y baños termostáticos que acompañaron investigaciones, análisis, aprendizajes y descubrimientos. Saber que nuestros equipos formaron parte del trabajo cotidiano de tantos laboratorios es, sin dudas, nuestro mayor orgullo.
                                </Text>
                                <Text fontSize={'md'} color={'gray.600'} textAlign="justify">
                                    Esta empresa nació como un proyecto compartido entre mi padre y sus socios fundadores. Con el paso del tiempo, mi padre asumió plenamente su conducción y la desarrolló con dedicación, compromiso y respeto por el trabajo bien hecho. Más adelante, sus hijos tuvimos el honor de sumarnos, continuando esa misma forma de trabajar, con los mismos valores y el mismo cuidado por cada equipo y cada cliente.
                                </Text>
                            </Stack>
                        </Box>

                        <Stack spacing={4}>
                            <Text fontSize={'md'} color={'gray.600'} textAlign="justify">
                                Queremos agradecer profundamente la confianza, el respeto y la cercanía que nos brindaron a lo largo de todos estos años. Muchos de ustedes no fueron solo clientes, sino compañeros de camino.
                            </Text>
                            <Text fontSize={'md'} color={'gray.600'} textAlign="justify">
                                Sabemos que esta noticia puede generar preocupación, especialmente en relación con el servicio técnico de los equipos que continúan en uso. Por eso queremos llevarles tranquilidad y designar a la empresa SAN JOR para la realización del service y soporte técnico.
                            </Text>
                            <Text fontSize={'md'} color={'gray.600'} textAlign="justify">
                                Nuestro deseo es acompañarlos responsablemente en esta etapa de transición, orientándolos y brindando toda la información que esté a nuestro alcance.
                            </Text>
                            <Text fontSize={'md'} color={'gray.600'} textAlign="justify">
                                Gracias por habernos permitido ser parte de su trabajo y de su historia. Nos despedimos con sincero reconocimiento y respeto.
                            </Text>

                            <Box mt={8} borderTop="1px solid" borderColor="gray.200" pt={8}>
                                <Text fontWeight="bold" color={'brand.700'}>Con afecto,</Text>
                                <Text fontWeight="bold" color={'brand.700'}>Vicking SRL</Text>
                                <Text mt={2} color={'gray.700'}>Cristina Recchia – Socio Gerente</Text>
                                <Text color={'gray.700'}>Norberto Recchia – Socio Gerente</Text>
                            </Box>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}
