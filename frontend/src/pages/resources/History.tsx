import {
    Box,
    Container,
    Text,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react';
import CompanyTimeline from '../../components/features/CompanyTimeline';

export default function History() {
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
                            HISTORIA
                        </Text>
                    </Heading>
                    <Text fontSize={{ base: 'lg', md: 'xl' }} maxW={'3xl'} mx={'auto'} color={'brand.100'} fontWeight="normal">
                        Hechos en la Historia de VICKING
                    </Text>
                </Container>
            </Box>

            {/* TIMELINE SECTION */}
            <Box
                py={{ base: 0, md: 0 }}
                bg={bgWhite}
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
