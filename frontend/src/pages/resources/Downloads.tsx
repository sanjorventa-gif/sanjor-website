import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Stack,
    Icon,
    useColorModeValue,
    Link,
    Badge,
    Spinner,
    Center,
    IconButton,
} from '@chakra-ui/react';
import { FaFilePdf, FaDownload } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { getDownloads, type Download } from '../../api/downloads';

export default function Downloads() {
    const { user, isAuthenticated } = useAuth();
    const [downloads, setDownloads] = useState<Download[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const bgGray = useColorModeValue('gray.50', 'gray.900');

    useEffect(() => {
        fetchDownloads();
    }, []);

    const fetchDownloads = async () => {
        try {
            const data = await getDownloads();
            setDownloads(data);
        } catch (error) {
            console.error("Error fetching downloads", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter items based on user role
    const filteredDownloads = downloads.filter(item => {
        // If item has no specific roles or empty roles, it's public
        const isPublic = !item.allowed_roles || item.allowed_roles.length === 0;

        if (isPublic) return true;

        // If user is admin, they see everything
        if (isAuthenticated && user?.role === 'admin') return true;

        // If authenticated, check if user's role is in allowed_roles
        if (isAuthenticated && user && item.allowed_roles.includes(user.role)) return true;

        return false;
    });

    // Group by category
    const groupedDownloads = filteredDownloads.reduce((acc, item) => {
        const category = item.category || 'Otros';
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {} as Record<string, Download[]>);

    const getRoleName = (role: string) => {
        const roles: { [key: string]: string } = {
            'admin': 'Administrador',
            'usuario_nacional': 'Usuario Nacional',
            'usuario_internacional': 'Usuario Internacional',
            'distribuidor_nacional': 'Distribuidor Nacional',
            'distribuidor_internacional': 'Distribuidor Internacional'
        };
        return roles[role] || role;
    };

    if (isLoading) {
        return (
            <Center h="50vh">
                <Spinner size="xl" color="brand.500" />
            </Center>
        );
    }

    return (

        <Box>
            {/* Header Section - White */}
            <Box bg={bgGray} py={10}>
                <Container maxW={'container.xl'}>
                    <Heading mb={4} color="brand.700">Descargas</Heading>
                    <Text fontSize="lg" color="gray.600" mb={4}>
                        Acceda a manuales, catálogos y documentación técnica de nuestros productos.
                    </Text>
                    {isAuthenticated && user && (
                        <Text fontSize="md" color="brand.600" fontWeight="bold">
                            Bienvenido, {getRoleName(user.role)}
                        </Text>
                    )}
                </Container>
            </Box>

            {/* Content Section - Gray with Pattern */}
            <Box bg={bgGray} py={10} position="relative">
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    opacity={0.2}
                    backgroundImage="radial-gradient(#4299E1 1px, transparent 1px)"
                    backgroundSize="20px 20px"
                    zIndex={0}
                />
                <Container maxW={'container.xl'} position="relative" zIndex={1}>

                    <Stack spacing={12}>
                        {Object.entries(groupedDownloads).length > 0 ? (
                            Object.entries(groupedDownloads).map(([category, items]) => (
                                <Section key={category} title={category} items={items} />
                            ))
                        ) : (
                            <Text color="gray.500" fontSize="lg">No hay descargas disponibles para su perfil.</Text>
                        )}
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}

const Section = ({ title, items }: { title: string; items: Download[] }) => {
    return (
        <Box>
            <Heading size="lg" mb={6} color="brand.600" borderBottom="2px solid" borderColor="brand.100" pb={2}>
                {title}
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {items.map((item) => (
                    <DownloadCard key={item.id} item={item} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

const DownloadCard = ({ item }: { item: Download }) => {
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <Stack
            direction="row"
            bg={cardBg}
            p={4}
            rounded="md"
            shadow="sm"
            border="1px solid"
            borderColor={borderColor}
            align="center"
            justify="space-between"
            _hover={{ shadow: 'md', borderColor: 'brand.300' }}
            transition="all 0.2s"
        >
            <Stack direction="row" align="center" spacing={4}>
                <Icon as={FaFilePdf} color="red.500" w={6} h={6} flexShrink={0} />
                <Box>
                    <Text fontWeight="600" title={item.title}>{item.title}</Text>
                    <Stack direction="row" align="center" spacing={2}>
                        <Badge fontSize="xs" variant="outline" colorScheme="blue">{item.language}</Badge>
                        {item.description && (
                            <Text fontSize="sm" color="gray.500" noOfLines={1}>{item.description}</Text>
                        )}
                    </Stack>
                </Box>
            </Stack>
            <Link href={item.file_url} isExternal style={{ textDecoration: 'none' }}>
                <IconButton
                    icon={<FaDownload />}
                    aria-label="Descargar"
                    size="sm"
                    variant="ghost"
                    colorScheme="brand"
                />
            </Link>
        </Stack>
    );
};
