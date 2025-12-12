import { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    useToast,
    Select,
    Checkbox,
    CheckboxGroup,
    SimpleGrid,
    Text,
    VStack,
    Icon,
    Flex,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDownloads, createDownload, updateDownload } from '../../../api/downloads';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '../../../api/upload';
import { FaCloudUploadAlt, FaFileAlt } from 'react-icons/fa';

const ROLES = [
    { value: 'admin', label: 'Admin' },
    { value: 'usuario_nacional', label: 'Usuario Nacional' },
    { value: 'usuario_internacional', label: 'Usuario Internacional' },
    { value: 'distribuidor_nacional', label: 'Distribuidor Nacional' },
    { value: 'distribuidor_internacional', label: 'Distribuidor Internacional' },
];

const CATEGORIES = ['Manual', 'Catálogo', 'Folleto', 'Técnico', 'Informativo'];
const LANGUAGES = ['ES', 'EN', 'PT'];

export default function DownloadForm() {
    const { id } = useParams();
    const isEditing = !!id;
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        file_url: '',
        category: 'Manual',
        language: 'ES',
        allowed_roles: [] as string[],
    });

    useEffect(() => {
        if (isEditing) {
            fetchEntry();
        }
    }, [id]);

    const fetchEntry = async () => {
        try {
            const list = await getDownloads();
            const entry = list.find((h) => h.id === Number(id));
            if (entry) {
                setFormData({
                    title: entry.title,
                    description: entry.description || '',
                    file_url: entry.file_url,
                    category: entry.category,
                    language: entry.language,
                    allowed_roles: entry.allowed_roles || [],
                });
            }
        } catch (error) {
            toast({
                title: 'Error al cargar datos',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const response = await uploadFile(file);
            setFormData((prev) => ({ ...prev, file_url: response.url }));
            toast({
                title: 'Archivo subido',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error al subir archivo',
                description: 'Intente nuevamente.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsUploading(false);
        }
    }, [toast]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isEditing && id) {
                await updateDownload(Number(id), formData);
                toast({
                    title: 'Archivo actualizado',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                await createDownload(formData);
                toast({
                    title: 'Archivo creado',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
            navigate('/admin/downloads');
        } catch (error) {
            toast({
                title: 'Error al guardar',
                description: 'Verifique los datos e intente nuevamente.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRoleChange = (values: string[]) => {
        setFormData({ ...formData, allowed_roles: values });
    };

    return (
        <Container maxW="container.md" py={8}>
            <Box bg="white" p={8} rounded="lg" shadow="sm">
                <Heading size="lg" mb={6}>
                    {isEditing ? 'Editar Descarga' : 'Nueva Descarga'}
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl id="title" isRequired>
                            <FormLabel>Título</FormLabel>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </FormControl>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl id="category">
                                <FormLabel>Categoría</FormLabel>
                                <Select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl id="language">
                                <FormLabel>Idioma</FormLabel>
                                <Select
                                    value={formData.language}
                                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                >
                                    {LANGUAGES.map((lang) => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </SimpleGrid>

                        <FormControl id="file" isRequired>
                            <FormLabel>Archivo</FormLabel>

                            <Box
                                {...getRootProps()}
                                border="2px dashed"
                                borderColor={isDragActive ? 'brand.500' : 'gray.300'}
                                rounded="md"
                                p={6}
                                cursor="pointer"
                                bg={isDragActive ? 'brand.50' : 'gray.50'}
                                transition="all 0.2s"
                                _hover={{ borderColor: 'brand.500', bg: 'brand.50' }}
                                textAlign="center"
                            >
                                <input {...getInputProps()} />
                                <VStack spacing={2}>
                                    <Icon as={FaCloudUploadAlt} w={10} h={10} color="gray.400" />
                                    <Text color="gray.600">
                                        {isDragActive
                                            ? 'Suelte el archivo aquí...'
                                            : 'Arrastre y suelte un archivo aquí, o haga clic para seleccionar'}
                                    </Text>
                                </VStack>
                            </Box>

                            {formData.file_url && (
                                <Box mt={3} p={3} bg="blue.50" rounded="md" border="1px solid" borderColor="blue.100">
                                    <Flex align="center">
                                        <Icon as={FaFileAlt} color="blue.500" mr={2} />
                                        <Text fontSize="sm" flex={1} noOfLines={1}>
                                            {formData.file_url.split('/').pop()}
                                        </Text>
                                        <Button
                                            size="xs"
                                            colorScheme="red"
                                            variant="ghost"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFormData({ ...formData, file_url: '' });
                                            }}
                                        >
                                            Eliminar
                                        </Button>
                                    </Flex>
                                </Box>
                            )}
                        </FormControl>

                        <FormControl id="roles">
                            <FormLabel>Roles Permitidos (Dejar vacío para público)</FormLabel>
                            <CheckboxGroup
                                colorScheme="brand"
                                value={formData.allowed_roles}
                                onChange={handleRoleChange}
                            >
                                <Stack spacing={2} direction="column">
                                    {ROLES.map((role) => (
                                        <Checkbox key={role.value} value={role.value}>
                                            {role.label}
                                        </Checkbox>
                                    ))}
                                </Stack>
                            </CheckboxGroup>
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="blue"
                            size="lg"
                            isLoading={isLoading || isUploading}
                            loadingText={isUploading ? "Subiendo..." : "Guardando..."}
                            mt={4}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Container>
    );
}
