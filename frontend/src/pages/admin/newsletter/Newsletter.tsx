import { useRef, useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useToast,
    Text,
    Spinner,
    Center,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Flex,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { getNewsletters, deleteNewsletter } from '../../../api/newsletter';
import type { Newsletter } from '../../../api/newsletter';

import ExportButtons from '../../../components/common/ExportButtons';

export default function AdminNewsletter() {
    const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const toast = useToast();

    const fetchNewsletters = async () => {
        try {
            const data = await getNewsletters();
            setNewsletters(data);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'No se pudieron cargar los suscriptores.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNewsletters();
    }, []);

    const handleDelete = async () => {
        if (selectedId === null) return;
        try {
            await deleteNewsletter(selectedId);
            setNewsletters(newsletters.filter(n => n.id !== selectedId));
            toast({
                title: 'Eliminado',
                description: 'El suscriptor ha sido eliminado.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'No se pudo eliminar el suscriptor.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsOpen(false);
            setSelectedId(null);
        }
    };

    const confirmDelete = (id: number) => {
        setSelectedId(id);
        setIsOpen(true);
    };

    const exportColumns = [
        { header: 'ID', key: 'id' },
        { header: 'Email', key: 'email' },
        { header: 'Fecha Suscripción', key: 'created_at', formatter: (val: string) => new Date(val).toLocaleDateString() },
    ];

    if (isLoading) {
        return (
            <Center h="200px">
                <Spinner size="xl" />
            </Center>
        );
    }

    return (
        <Box>
            <Flex justify="space-between" align="center" mb={6}>
                <Heading>Suscripciones al Newsletter ({newsletters.length})</Heading>
                <ExportButtons
                    data={newsletters}
                    columns={exportColumns}
                    fileName="newsletter_sanjor"
                    title="Reporte de Newsletter"
                />
            </Flex>

            {newsletters.length === 0 ? (
                <Text color="gray.500">No hay suscriptores registrados.</Text>
            ) : (
                <Box overflowX="auto">
                    <Table variant="simple" bg="white" shadow="sm" rounded="lg">
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Email</Th>
                                <Th>Fecha de Suscripción</Th>
                                <Th>Acciones</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {newsletters.map((newsletter) => (
                                <Tr key={newsletter.id}>
                                    <Td>{newsletter.id}</Td>
                                    <Td fontWeight="medium">{newsletter.email}</Td>
                                    <Td>{new Date(newsletter.created_at).toLocaleDateString()}</Td>
                                    <Td>
                                        <IconButton
                                            aria-label="Eliminar"
                                            icon={<FaTrash />}
                                            colorScheme="red"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => confirmDelete(newsletter.id)}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            )}

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Eliminar Suscriptor
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            ¿Está seguro? Esta acción no se puede deshacer.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                                Cancelar
                            </Button>
                            <Button colorScheme="red" onClick={handleDelete} ml={3}>
                                Eliminar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
}
