import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Stack,
    Icon,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaFilePdf, FaDownload } from 'react-icons/fa';

export default function Downloads() {
    const manuals = [
        { title: 'Manual de Usuario - Estufas de Cultivo', size: '2.5 MB' },
        { title: 'Manual de Usuario - Estufas de Esterilización', size: '2.8 MB' },
        { title: 'Manual Sistema BLAST', size: '3.1 MB' },
        { title: 'Guía de Instalación Rápida', size: '1.2 MB' },
    ];

    const catalogs = [
        { title: 'Catálogo General 2025', size: '5.4 MB' },
        { title: 'Ficha Técnica - Serie Cultivo', size: '1.5 MB' },
        { title: 'Ficha Técnica - Serie Esterilización', size: '1.5 MB' },
    ];

    return (
        <Box py={10}>
            <Container maxW={'container.xl'}>
                <Heading mb={6} color="brand.700">Descargas</Heading>
                <Text fontSize="lg" mb={10} color="gray.600">
                    Acceda a manuales, catálogos y documentación técnica de nuestros productos.
                </Text>

                <Stack spacing={12}>
                    <Section title="Manuales de Usuario" items={manuals} />
                    <Section title="Catálogos y Fichas Técnicas" items={catalogs} />
                </Stack>
            </Container>
        </Box>
    );
}

const Section = ({ title, items }: { title: string; items: { title: string; size: string }[] }) => {
    return (
        <Box>
            <Heading size="lg" mb={6} color="brand.600" borderBottom="2px solid" borderColor="brand.100" pb={2}>
                {title}
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {items.map((item, index) => (
                    <DownloadCard key={index} {...item} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

const DownloadCard = ({ title, size }: { title: string; size: string }) => {
    return (
        <Stack
            direction="row"
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            rounded="md"
            shadow="sm"
            border="1px solid"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align="center"
            justify="space-between"
            _hover={{ shadow: 'md', borderColor: 'brand.300' }}
            transition="all 0.2s"
        >
            <Stack direction="row" align="center" spacing={4}>
                <Icon as={FaFilePdf} color="red.500" w={6} h={6} />
                <Box>
                    <Text fontWeight="600">{title}</Text>
                    <Text fontSize="sm" color="gray.500">{size}</Text>
                </Box>
            </Stack>
            <Button leftIcon={<FaDownload />} size="sm" variant="ghost" colorScheme="brand">
                Descargar
            </Button>
        </Stack>
    );
};
