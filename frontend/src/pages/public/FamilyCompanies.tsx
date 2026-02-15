
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    SimpleGrid,
    useColorModeValue,
} from '@chakra-ui/react';

export default function FamilyCompanies() {
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
                        FAMILIAS Y EMPRESAS
                    </Heading>
                    <Text fontSize={{ base: 'lg', md: 'xl' }} maxW={'3xl'} mx={'auto'} color={'brand.100'} fontWeight="normal">
                        Familias paralelas y empresas paralelas
                    </Text>
                </Container>
            </Box>

            {/* CONTENT SECTION */}
            <Box py={{ base: 16, md: 24 }} bg={bgWhite}>
                <Container maxW={'container.lg'}>
                    <Box overflowX="auto">
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} border="1px solid" borderColor="gray.200" rounded="xl" overflow="hidden">

                            {/* VICKING COLUMN */}
                            <Box bg="gray.50" p={8} borderRight={{ md: "1px solid" }} borderColor={{ md: "gray.200" }} borderBottom={{ base: "1px solid", md: "none" }}>
                                <Heading size="lg" textAlign="center" mb={6} color="brand.700">Vicking</Heading>
                                <Stack spacing={8}>
                                    <Box textAlign="center">
                                        <Text fontWeight="bold" color="gray.500" textTransform="uppercase" fontSize="sm" mb={2}>Fundación</Text>
                                        <Text fontSize="lg" fontWeight="medium">Fundada en la década del 60</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Text fontWeight="bold" color="gray.500" textTransform="uppercase" fontSize="sm" mb={2}>Fundador</Text>
                                        <Heading size="md" mb={2}>Carlos Recchia</Heading>
                                        <Text color="gray.600">Investigador nato de ingenio inigualable diseño de Shaker Pro, construcción de telecopio</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Text fontWeight="bold" color="gray.500" textTransform="uppercase" fontSize="sm" mb={2}>Legado</Text>
                                        <Text fontSize="lg">sus hijos Cristina y Norberto</Text>
                                    </Box>
                                </Stack>
                            </Box>

                            {/* SAN JOR COLUMN */}
                            <Box bg="white" p={8}>
                                <Heading size="lg" textAlign="center" mb={6} color="brand.600">SAN JOR</Heading>
                                <Stack spacing={8}>
                                    <Box textAlign="center">
                                        <Text fontWeight="bold" color="gray.500" textTransform="uppercase" fontSize="sm" mb={2}>Fundación</Text>
                                        <Text fontSize="lg" fontWeight="medium">Fundada en la década del 60</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Text fontWeight="bold" color="gray.500" textTransform="uppercase" fontSize="sm" mb={2}>Fundador</Text>
                                        <Heading size="md" mb={2}>Jorge Guerrero</Heading>
                                        <Text color="gray.600">Campeón argentino en grandes aparatos (gimnasia artística)</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Text fontWeight="bold" color="gray.500" textTransform="uppercase" fontSize="sm" mb={2}>Legado</Text>
                                        <Text fontSize="lg">sus hijos Jorgelina y Eduardo</Text>
                                    </Box>
                                </Stack>
                            </Box>
                        </SimpleGrid>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

