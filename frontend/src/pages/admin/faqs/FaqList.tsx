import { useState, useEffect } from 'react';
import {
    Box,
    Button,
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
    Spinner,
    Flex,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { getFaqs, deleteFaq, type Faq } from '../../../api/faqs';

export default function FaqList() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    const fetchFaqs = async () => {
        try {
            const data = await getFaqs(true);
            setFaqs(data);
        } catch (error) {
            toast({
                title: 'Error al cargar FAQs',
                status: 'error',
                duration: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Está seguro de eliminar esta pregunta frecuente?')) return;

        try {
            await deleteFaq(id);
            toast({
                title: 'FAQ eliminada',
                status: 'success',
                duration: 3000,
            });
            fetchFaqs();
        } catch (error) {
            toast({
                title: 'Error al eliminar',
                status: 'error',
                duration: 3000,
            });
        }
    };

    if (isLoading) {
        return (
            <Flex justify="center" align="center" h="200px">
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <Box>
            <Flex justify="space-between" align="center" mb={6}>
                <Heading size="lg">Preguntas Frecuentes</Heading>
                <Button
                    as={RouterLink}
                    to="/admin/faqs/new"
                    colorScheme="brand"
                    leftIcon={<AddIcon />}
                >
                    Nueva Pregunta
                </Button>
            </Flex>

            <Box bg="white" rounded="lg" shadow="sm" overflow="hidden">
                <Table variant="simple">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th w="100px">Acciones</Th>
                            <Th>Orden</Th>
                            <Th>Pregunta</Th>
                            <Th>Respuesta</Th>
                            <Th>Estado</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {faqs.map((faq) => (
                            <Tr key={faq.id}>
                                <Td>
                                    <Flex>
                                        <IconButton
                                            aria-label="Editar"
                                            icon={<EditIcon />}
                                            size="sm"
                                            mr={2}
                                            colorScheme="blue"
                                            variant="ghost"
                                            as={RouterLink}
                                            to={`/admin/faqs/edit/${faq.id}`}
                                        />
                                        <IconButton
                                            aria-label="Eliminar"
                                            icon={<DeleteIcon />}
                                            size="sm"
                                            colorScheme="red"
                                            variant="ghost"
                                            onClick={() => handleDelete(faq.id)}
                                        />
                                    </Flex>
                                </Td>
                                <Td>{faq.order}</Td>
                                <Td fontWeight="bold">{faq.question}</Td>
                                <Td maxW="400px" isTruncated>{faq.answer}</Td>
                                <Td>
                                    <Badge colorScheme={faq.is_active ? 'green' : 'red'}>
                                        {faq.is_active ? 'Activa' : 'Inactiva'}
                                    </Badge>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                {faqs.length === 0 && (
                    <Box p={8} textAlign="center" color="gray.500">
                        No hay preguntas frecuentes registradas.
                    </Box>
                )}
            </Box>
        </Box>
    );
}
