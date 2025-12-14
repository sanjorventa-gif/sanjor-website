import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useToast,
    Flex,
    Text,
    Image,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { getCarouselItems, deleteCarouselItem, type CarouselItem } from '../../../api/carousel';

import ExportButtons from '../../../components/common/ExportButtons';

export default function CarouselList() {
    const [items, setItems] = useState<CarouselItem[]>([]);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const data = await getCarouselItems();
            setItems(data);
        } catch (error) {
            toast({
                title: 'Error al cargar carrousel',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Está seguro que desea eliminar este slide?')) {
            try {
                await deleteCarouselItem(id);
                setItems(items.filter((item) => item.id !== id));
                toast({
                    title: 'Slide eliminado',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            } catch (error) {
                toast({
                    title: 'Error al eliminar slide',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    const exportColumns = [
        { header: 'Orden', key: 'order' },
        { header: 'Título', key: 'title' },
        { header: 'Subtítulo', key: 'subtitle' },
        { header: 'Link', key: 'link' },
    ];

    return (
        <Container maxW="container.xl" py={8}>
            <Flex justify="space-between" align="center" mb={8}>
                <Heading size="lg">Gestión de Carrousel</Heading>
                <Flex gap={2}>
                    <ExportButtons
                        data={items}
                        columns={exportColumns}
                        fileName="carrusel_sanjor"
                        title="Reporte de Carrousel"
                    />
                    <Button
                        leftIcon={<AddIcon />}
                        colorScheme="blue"
                        onClick={() => navigate('/admin/carousel/new')}
                    >
                        Nuevo Slide
                    </Button>
                </Flex>
            </Flex>

            <Box bg="white" rounded="lg" shadow="sm" overflowX="auto">
                <Table variant="simple">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th w="100px">Acciones</Th>
                            <Th>Orden</Th>
                            <Th>Imagen</Th>
                            <Th>Título</Th>
                            <Th>Subtítulo</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {items.map((item) => (
                            <Tr key={item.id}>
                                <Td>
                                    <Flex>
                                        <IconButton
                                            aria-label="Editar"
                                            icon={<EditIcon />}
                                            colorScheme="blue"
                                            variant="ghost"
                                            size="sm"
                                            mr={2}
                                            onClick={() => navigate(`/admin/carousel/edit/${item.id}`)}
                                        />
                                        <IconButton
                                            aria-label="Eliminar"
                                            icon={<DeleteIcon />}
                                            colorScheme="red"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(item.id)}
                                        />
                                    </Flex>
                                </Td>
                                <Td>{item.order}</Td>
                                <Td>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        boxSize="50px"
                                        objectFit="cover"
                                        rounded="md"
                                    />
                                </Td>
                                <Td fontWeight="medium">{item.title}</Td>
                                <Td>{item.subtitle}</Td>
                            </Tr>
                        ))}
                        {items.length === 0 && (
                            <Tr>
                                <Td colSpan={5} textAlign="center" py={8}>
                                    <Text color="gray.500">No hay slides registrados</Text>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </Box>
        </Container>
    );
}
