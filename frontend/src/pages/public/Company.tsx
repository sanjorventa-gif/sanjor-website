
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Company() {
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
                        NUESTRA{' '}
                        <Text as={'span'} color={'white'}>
                            EMPRESA
                        </Text>
                    </Heading>
                    <Text fontSize={{ base: 'lg', md: 'xl' }} maxW={'3xl'} mx={'auto'} color={'brand.100'} fontWeight="normal">
                        Líderes en fabricación de equipos médicos de alta calidad.
                    </Text>
                </Container>
            </Box>

            {/* ACERCA DE SECTION */}
            <Box py={{ base: 16, md: 24 }} bg={bgWhite}>
                <Container maxW={'container.xl'}>
                    <Stack spacing={6}>
                        <Heading size="xl" color={'brand.700'}>Acerca de</Heading>
                        <Text fontSize={'lg'} color={'gray.600'} textAlign="justify">
                            Vicking es una empresa argentina que desarrolló equipos, accesorios para laboratorios, equipamientos médicos y hospitalarios de excelente calidad por más de 60 años.
                        </Text>
                        <Text fontSize={'lg'} color={'gray.600'} textAlign="justify">
                            Ampliamente reconocida por los baños termostáticos por su eficiencia y solidez en el trabajo diario en todo laboratorio.
                        </Text>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}

