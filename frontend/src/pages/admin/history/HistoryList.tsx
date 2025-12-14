import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    IconButton,
    useToast,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
    Badge,
    Spinner,
    Center,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { getHistory, deleteHistory, type History } from '../../../api/history';

import ExportButtons from '../../../components/common/ExportButtons';

export default function HistoryList() {
    const [history, setHistory] = useState<History[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const data = await getHistory();
            setHistory(data);
        } catch (error) {
            toast({
                title: 'Error al cargar historia',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Está seguro de eliminar este evento?')) return;

        try {
            await deleteHistory(id);
            setHistory(history.filter((h) => h.id !== id));
            toast({
                title: 'Evento eliminado',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error al eliminar evento',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const exportColumns = [
        { header: 'Año', key: 'year' },
        { header: 'Título', key: 'title' },
        { header: 'Descripción', key: 'description' },
    ];

    if (isLoading) {
        return (
            <Center h="200px">
                <Spinner size="xl" />
            </Center>
        );
    }

    return (
        <Container maxW="container.xl" py={8}>
            <Flex justify="space-between" align="center" mb={8}>
                <Heading size="lg">Gestión de Historia</Heading>
                <Flex gap={2}>
                    <ExportButtons
                        data={history}
                        columns={exportColumns}
                        fileName="historia_sanjor"
                        title="Reporte de Historia"
                    />
                    <Button
                        leftIcon={<AddIcon />}
                        colorScheme="blue"
                        onClick={() => navigate('/admin/history/new')}
                    >
                        Nuevo Evento
                    </Button>
                </Flex>
            </Flex>

            <Box bg="white" shadow="sm" rounded="lg" overflow="hidden">
                <Table variant="simple">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th w="100px">Acciones</Th>
                            <Th>Año</Th>
                            <Th>Imagen</Th>
                            <Th>Título</Th>
                            <Th>Descripción</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {history.map((item) => (
                            <Tr key={item.id}>
                                <Td>
                                    <Flex>
                                        <IconButton
                                            aria-label="Editar"
                                            icon={<EditIcon />}
                                            size="sm"
                                            colorScheme="blue"
                                            variant="ghost"
                                            mr={2}
                                            onClick={() => navigate(`/admin/history/edit/${item.id}`)}
                                        />
                                        <IconButton
                                            aria-label="Eliminar"
                                            icon={<DeleteIcon />}
                                            size="sm"
                                            colorScheme="red"
                                            variant="ghost"
                                            onClick={() => handleDelete(item.id)}
                                        />
                                    </Flex>
                                </Td>
                                <Td>
                                    <Badge colorScheme="brand" fontSize="md">
                                        {item.year}
                                    </Badge>
                                </Td>
                                <Td>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        boxSize="50px"
                                        objectFit="cover"
                                        rounded="md"
                                        fallbackSrc="https://placehold.co/50"
                                    />
                                </Td>
                                <Td fontWeight="medium">{item.title}</Td>
                                <Td>
                                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
                                        {item.description}
                                    </Text>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Container>
    );
}
