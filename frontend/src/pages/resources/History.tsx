import {
    Box,
    Container,
    Text,
    Stack,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react';
import CompanyTimeline from '../../components/features/CompanyTimeline';

export default function History() {
    const bgGray = useColorModeValue('gray.50', 'gray.900');
    const bgWhite = useColorModeValue('white', 'gray.800');

    return (
        <Box>
            {/* HERO SECTION */}
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
                <Container maxW={'container.xl'} position="relative" zIndex={1} textAlign={'center'}>
                    <Heading
                        fontWeight={800}
                        fontSize={{ base: '4xl', sm: '5xl', md: '7xl' }}
                        lineHeight={'110%'}
                        mb={6}
                        letterSpacing="tight"
                        textShadow="0px 2px 4px rgba(0,0,0,0.3)"
                    >
                        NUESTRA{' '}
                        <Text as={'span'} color={'white'}>
                            HISTORIA
                        </Text>
                    </Heading>
                    <Text fontSize={{ base: 'xl', md: '2xl' }} maxW={'3xl'} mx={'auto'} color={'brand.100'} fontWeight="normal">
                        Más de 70 años de innovación y compromiso con la industria y la ciencia.
                    </Text>
                </Container>
            </Box>

            {/* INTRO SECTION */}
            <Box py={{ base: 12, md: 16 }} bg={bgWhite}>
                <Container maxW={'container.xl'} textAlign="center">
                    <Stack spacing={4} maxW="4xl" mx="auto">
                        <Heading size="xl" color={'brand.700'}>Un Legado de Calidad</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            Desde nuestros inicios en 1950, SAN JOR ha mantenido una trayectoria ininterrumpida de crecimiento y perfeccionamiento.
                            Cada década ha marcado un hito en nuestra evolución, adaptándonos a las nuevas tecnologías y necesidades del mercado,
                            pero manteniendo siempre nuestro compromiso inquebrantable con la calidad y el servicio.
                        </Text>
                    </Stack>
                </Container>
            </Box>

            {/* TIMELINE SECTION */}
            <Box
                py={{ base: 0, md: 0 }}
                bg={bgGray}
                position="relative"
            >
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
                />
                <Box position="relative" zIndex={1}>
                    <CompanyTimeline hideTitle={true} />
                </Box>
            </Box>
        </Box>
    );
}
