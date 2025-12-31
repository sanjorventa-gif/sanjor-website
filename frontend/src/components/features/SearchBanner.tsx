import { Box, Button, Container, Flex, Heading, Text, Icon } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';

interface SearchBannerProps {
    onSearchClick: () => void;
}

export default function SearchBanner({ onSearchClick }: SearchBannerProps) {
    return (
        <Box
            bgGradient="linear(to-r, gray.100, gray.200, gray.300)"
            py={5}
            px={5}
            rounded="xl"
            shadow="md"
            border="1px"
            borderColor="whiteAlpha.400"
            position="relative"
            overflow="hidden"
            mb={6}
        >
            {/* abstract visual element */}
            <Box position="absolute" top="-50%" left="20%" w="200px" h="200px" bg="whiteAlpha.400" rounded="full" filter="blur(40px)" />

            <Container maxW="container.xl" position="relative" zIndex={1}>
                <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" gap={4}>
                    <Box flex="1">
                        <Heading size="md" mb={1} color="gray.800" textTransform="uppercase" letterSpacing="tight">
                            Buscador de Estufas SAN JOR
                        </Heading>
                        <Text fontSize="md" color="gray.600" fontWeight="medium">
                            Encuentre el equipo ideal para sus requisitos de temperatura y proceso.
                        </Text>
                    </Box>
                    <Box>
                        <Button
                            rightIcon={<Icon as={FaArrowRight} />}
                            colorScheme="brand"
                            size="md"
                            fontWeight="bold"
                            px={6}
                            onClick={onSearchClick}
                            boxShadow="md"
                        >
                            Buscar producto
                        </Button>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}
