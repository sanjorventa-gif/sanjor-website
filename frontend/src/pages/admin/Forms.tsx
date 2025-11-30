import {
    Box,
    Heading,
    SimpleGrid,
    Text,
    useColorModeValue,
    Icon,
    Flex,
    LinkBox,
    LinkOverlay,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaTools, FaFileContract } from 'react-icons/fa';

interface FormCardProps {
    title: string;
    description: string;
    icon: any;
    to: string;
}

const FormCard = ({ title, description, icon, to }: FormCardProps) => {
    const bg = useColorModeValue('white', 'gray.800');
    const hoverBg = useColorModeValue('gray.50', 'gray.700');

    return (
        <LinkBox
            as="article"
            p="5"
            borderWidth="1px"
            rounded="md"
            bg={bg}
            _hover={{ bg: hoverBg, transform: 'translateY(-2px)', shadow: 'md' }}
            transition="all 0.2s"
            cursor="pointer"
        >
            <Flex align="center" mb="2">
                <Icon as={icon} w={6} h={6} color="brand.500" mr="3" />
                <Heading size="md" my="2">
                    <LinkOverlay as={RouterLink} to={to}>
                        {title}
                    </LinkOverlay>
                </Heading>
            </Flex>
            <Text color="gray.500">
                {description}
            </Text>
        </LinkBox>
    );
};

export default function Forms() {
    return (
        <Box p={4}>
            <Heading mb={6}>Gestión de Formularios</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                <FormCard
                    title="Solicitudes de Service"
                    description="Ver y administrar las solicitudes de servicio técnico enviadas por los clientes."
                    icon={FaTools}
                    to="/admin/service-requests"
                />
                <FormCard
                    title="Registros de Garantía"
                    description="Ver y administrar los registros de garantía extendida de productos."
                    icon={FaFileContract}
                    to="/admin/warranty-registrations"
                />
            </SimpleGrid>
        </Box>
    );
}
