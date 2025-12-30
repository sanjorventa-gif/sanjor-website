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
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Flex,
    IconButton,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { Reorder } from 'framer-motion';

import ExportButtons from '../../components/common/ExportButtons';
import type { Product } from '../../data/products';

const CATEGORIES: { key: string; label: string }[] = [
    { key: 'cultivo', label: 'Cultivo' },
    { key: 'esterilizacion', label: 'Esterilización' },
    { key: 'secado', label: 'Secado' },
    { key: 'cajas', label: 'Cajas' },
    { key: 'otro', label: 'Otros' },
];

export default function Dashboard() {
    const { products, removeProduct, reorder } = useProducts();
    const [localProducts, setLocalProducts] = useState(products);
    const [tabIndex, setTabIndex] = useState(() => {
        const saved = localStorage.getItem('admin_tab_index');
        return saved ? parseInt(saved, 10) : 0;
    });
    const toast = useToast();
    const navigate = useNavigate();

    const handleTabChange = (index: number) => {
        setTabIndex(index);
        localStorage.setItem('admin_tab_index', index.toString());
    };

    // Sync local state with global products on load or update
    useEffect(() => {
        setLocalProducts([...products].sort((a, b) => (a.order || 0) - (b.order || 0)));
    }, [products]);

    // Group products for rendering (derived state)
    const getProductsByCategory = (category: string) => {
        return localProducts.filter((p) => {
            if (category === 'otro') {
                return !['cultivo', 'esterilizacion', 'secado', 'cajas'].includes(p.category);
            }
            return p.category === category;
        });
    };

    const handleGroupReorder = (category: string, newGroupOrder: Product[]) => {
        // When one group changes, we must reconstruct the full list to maintain the "Global Order strategy"
        // Strategy: The global order is determined by the fixed category order + the internal category order.

        // Special handling for 'otro' since it might not match a key exactly if we had dynamic cats, but here it's fixed.

        let newFullList: Product[] = [];

        // We iterate through our defined Category Order to rebuild the list
        CATEGORIES.forEach(cat => {
            if (cat.key === category) {
                newFullList = [...newFullList, ...newGroupOrder];
            } else {
                newFullList = [...newFullList, ...getProductsByCategory(cat.key)];
            }
        });

        setLocalProducts(newFullList);
    };

    const handleDragEnd = () => {
        // Only trigger API call when drag ends
        reorder(localProducts);
    };

    const exportColumns = [
        { header: 'ID', key: 'id' },
        { header: 'Nombre', key: 'name' },
        { header: 'Categoría', key: 'category' },
        { header: 'Dimensiones', key: 'dimensions', formatter: (val: any) => val ? `${val.length}x${val.width}x${val.height} ${val.unit}` : '-' },
        { header: 'Temperatura', key: 'temperature', formatter: (val: any) => val ? `${val.min} - ${val.max} ${val.unit}` : '-' },
    ];

    const ProductTable = ({ items, categoryKey }: { items: Product[], categoryKey: string }) => (
        <Box overflowX="auto" bg="white" shadow="md" rounded="lg">
            <Table variant="simple">
                <Thead bg="gray.50">
                    <Tr>
                        <Th w="50px">Orden</Th>
                        <Th w="100px">Acciones</Th>
                        <Th>Nombre</Th>
                        <Th>Imagen</Th>
                        <Th>Dimensiones</Th>
                        <Th>Temperatura</Th>
                    </Tr>
                </Thead>
                <Reorder.Group
                    as="tbody"
                    axis="y"
                    values={items}
                    onReorder={(newOrder) => handleGroupReorder(categoryKey, newOrder)}
                >
                    {items.map((product) => (
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
                                <Flex>
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
                                                await removeProduct(product.id);
                                                toast({
                                                    title: 'Producto eliminado',
                                                    status: 'success',
                                                    duration: 2000,
                                                    isClosable: true,
                                                });
                                            }
                                        }}
                                    />
                                </Flex>
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
            {items.length === 0 && (
                <Box p={4} textAlign="center" color="gray.500">
                    No hay productos en esta categoría.
                </Box>
            )}
        </Box>
    );

    return (
        <Container maxW="container.xl" py={8}>
            <Flex justify="space-between" align="center" mb={6}>
                <Heading size="lg">Panel de Administración</Heading>
                <Flex gap={2}>
                    <ExportButtons
                        data={localProducts}
                        columns={exportColumns}
                        fileName="productos_sanjor"
                        title="Reporte de Productos"
                    />
                    <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={() => navigate('/admin/new')}>
                        Nuevo Producto
                    </Button>
                </Flex>
            </Flex>

            <Tabs variant="enclosed" colorScheme="brand" isLazy index={tabIndex} onChange={handleTabChange}>
                <TabList mb={4}>
                    {CATEGORIES.map((cat) => (
                        <Tab key={cat.key} fontWeight="bold">
                            {cat.label} ({getProductsByCategory(cat.key).length})
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {CATEGORIES.map((cat) => (
                        <TabPanel key={cat.key} p={0}>
                            <ProductTable items={getProductsByCategory(cat.key)} categoryKey={cat.key} />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Container>
    );
}
