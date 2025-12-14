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
    Badge,
    Flex,
    Text,
    Link,
    Icon,
    Select,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { getDownloads, deleteDownload, type Download } from '../../../api/downloads';

import ExportButtons from '../../../components/common/ExportButtons';

export default function DownloadsList() {
    const [downloads, setDownloads] = useState<Download[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        fetchDownloads();
    }, []);

    const fetchDownloads = async () => {
        try {
            const data = await getDownloads();
            setDownloads(data);
        } catch (error) {
            toast({
                title: 'Error al cargar descargas',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Está seguro que desea eliminar este archivo?')) {
            try {
                await deleteDownload(id);
                setDownloads(downloads.filter((item) => item.id !== id));
                toast({
                    title: 'Archivo eliminado',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            } catch (error) {
                toast({
                    title: 'Error al eliminar archivo',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    const categories = Array.from(new Set(downloads.map((d) => d.category))).sort();

    const filteredDownloads = selectedCategory
        ? downloads.filter((d) => d.category === selectedCategory)
        : downloads;

    const exportColumns = [
        { header: 'Título', key: 'title' },
        { header: 'Categoría', key: 'category' },
        { header: 'Idioma', key: 'language' },
        { header: 'Roles', key: 'allowed_roles', formatter: (val: string[]) => val && val.length ? val.join(', ') : 'Todos' },
        { header: 'URL', key: 'file_url' },
    ];

    return (
        <Container maxW="container.xl" py={8}>
            <Flex justify="space-between" align="center" mb={8}>
                <Heading size="lg">Gestión de Descargas</Heading>
                <Flex gap={2}>
                    <ExportButtons
                        data={filteredDownloads}
                        columns={exportColumns}
                        fileName="descargas_sanjor"
                        title="Reporte de Descargas"
                    />
                    <Button
                        leftIcon={<AddIcon />}
                        colorScheme="blue"
                        onClick={() => navigate('/admin/downloads/new')}
                    >
                        Nuevo Archivo
                    </Button>
                </Flex>
            </Flex>

            <Box mb={6} maxW="300px">
                <Select
                    placeholder="Todas las categorías"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    bg="white"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </Select>
            </Box>

            <Box bg="white" rounded="lg" shadow="sm" overflowX="auto">
                <Table variant="simple">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th w="100px">Acciones</Th>
                            <Th>Título</Th>
                            <Th>Categoría</Th>
                            <Th>Idioma</Th>
                            <Th>Roles Permitidos</Th>
                            <Th>Archivo</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredDownloads.map((item) => (
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
                                            onClick={() => navigate(`/admin/downloads/edit/${item.id}`)}
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
                                <Td fontWeight="medium">{item.title}</Td>
                                <Td>
                                    <Badge colorScheme="purple">{item.category}</Badge>
                                </Td>
                                <Td>
                                    <Badge variant="outline">{item.language}</Badge>
                                </Td>
                                <Td>
                                    {item.allowed_roles && item.allowed_roles.length > 0 ? (
                                        item.allowed_roles.map((role) => (
                                            <Badge key={role} mr={1} fontSize="xs" colorScheme="gray">
                                                {role.replace('_', ' ')}
                                            </Badge>
                                        ))
                                    ) : (
                                        <Badge colorScheme="green">Todos (Público)</Badge>
                                    )}
                                </Td>
                                <Td>
                                    <Link href={item.file_url} isExternal color="blue.500">
                                        <Icon as={DownloadIcon} mr={1} />
                                        Ver
                                    </Link>
                                </Td>
                            </Tr>
                        ))}
                        {filteredDownloads.length === 0 && (
                            <Tr>
                                <Td colSpan={6} textAlign="center" py={8}>
                                    <Text color="gray.500">No hay descargas registradas</Text>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </Box>
        </Container>
    );
}
