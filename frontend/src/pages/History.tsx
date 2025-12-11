import {
    Box,
    Container,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import CompanyTimeline from '../components/features/CompanyTimeline';

export default function History() {
    return (
        <Box>
            {/* Hero Section */}
            <Box bg="brand.600" color="white" py={20}>
                <Container maxW={'container.xl'} textAlign="center">
                    <Heading as="h1" size="2xl" mb={4}>
                        Nuestra Historia
                    </Heading>
                    <Text fontSize="xl" maxW="2xl" mx="auto">
                        Más de 70 años de innovación y compromiso con la industria y la ciencia.
                    </Text>
                </Container>
            </Box>

            {/* Timeline Section */}
            <Box bg={useColorModeValue('gray.50', 'gray.900')} py={16}>
                <CompanyTimeline />
            </Box>
        </Box>
    );
}
