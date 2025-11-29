import { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Button,
    Image,
    useToast,
    Container,
    Badge,
    Flex,
    IconButton,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { Reorder } from 'framer-motion';

export default function Dashboard() {
    const { products, removeProduct, reorder } = useProducts();
    const [localProducts, setLocalProducts] = useState(products);
    const toast = useToast();
    const navigate = useNavigate();

    // Sync local state with global products on load or update
    useEffect(() => {
        setLocalProducts([...products].sort((a, b) => (a.order || 0) - (b.order || 0)));
    }, [products]);

    const handleReorder = (newOrder: any[]) => {
        setLocalProducts(newOrder);
    };

    const handleDragEnd = () => {
        // Only trigger API call when drag ends
        reorder(localProducts);
    };

    return (
        <Container maxW="container.xl" py={8}>
            <Flex justify="space-between" align="center" mb={6}>
                <Heading size="lg">Panel de Administración</Heading>
                <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={() => navigate('/admin/new')}>
                    Nuevo Producto
                </Button>
            </Flex>

            <Box overflowX="auto" bg="white" shadow="md" rounded="lg">
                <Table variant="simple">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th>Orden</Th>
                            <Th>Acciones</Th>
                            <Th>Nombre</Th>
                            <Th>Imagen</Th>
                            <Th>Categoría</Th>
                            <Th>Dimensiones</Th>
                            <Th>Temperatura</Th>
                        </Tr>
                    </Thead>
                    <Reorder.Group as="tbody" axis="y" values={localProducts} onReorder={handleReorder}>
                        {localProducts.map((product) => (
                            <Reorder.Item
                                as="tr"
                                key={product.id}
                                value={product}
                                style={{ cursor: 'grab', position: 'relative' }}
                                onDragEnd={handleDragEnd}
                                whileDrag={{
                                    scale: 1.02,
                                    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                                    backgroundColor: "#f7fafc",
                                    display: "table-row",
                                }}
                            >
                                <Td>
                                    <DragHandleIcon color="gray.400" />
                                </Td>
                                <Td>
                                    <IconButton
                                        aria-label="Editar"
                                        icon={<EditIcon />}
                                        colorScheme="blue"
                                        variant="ghost"
                                        size="sm"
                                        mr={2}
                                        onClick={() => navigate(`/admin/edit/${product.id}`)}
                                    />
                                    <IconButton
                                        aria-label="Eliminar"
                                        icon={<DeleteIcon />}
                                        colorScheme="red"
                                        variant="ghost"
                                        size="sm"
                                        onClick={async () => {
                                            if (window.confirm('¿Está seguro que desea eliminar este producto?')) {
                                                await removeProduct(Number(product.id));
                                                toast({
                                                    title: 'Producto eliminado',
                                                    status: 'success',
                                                    duration: 2000,
                                                    isClosable: true,
                                                });
                                            }
                                        }}
                                    />
                                </Td>
                                <Td fontWeight="medium">{product.name}</Td>
                                <Td>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        boxSize="50px"
                                        objectFit="cover"
                                        rounded="md"
                                        fallbackSrc="https://placehold.co/50"
                                    />
                                </Td>
                                <Td>
                                    <Badge
                                        colorScheme={
                                            product.category === 'cultivo'
                                                ? 'green'
                                                : product.category === 'esterilizacion'
                                                    ? 'blue'
                                                    : product.category === 'secado'
                                                        ? 'orange'
                                                        : 'purple'
                                        }
                                    >
                                        {product.category.toUpperCase()}
                                    </Badge>
                                </Td>
                                <Td fontSize="sm" color="gray.600">
                                    {product.dimensions ? (
                                        `${product.dimensions.length}x${product.dimensions.width}x${product.dimensions.height} ${product.dimensions.unit}`
                                    ) : '-'}
                                </Td>
                                <Td fontSize="sm" color="gray.600">
                                    {product.temperature ? (
                                        `${product.temperature.min} - ${product.temperature.max} ${product.temperature.unit}`
                                    ) : '-'}
                                </Td>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </Table>
            </Box>
        </Container>
    );
}
