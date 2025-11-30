import { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
    Center,
    Button,
    useToast,
    Text,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getFormSubmissions, getPublicForms } from '../../../api/forms';
import type { Form, FormSubmission } from '../../../api/forms';
import { useAuth } from '../../../context/AuthContext';

export default function FormSubmissions() {
    const { id } = useParams();
    const { token } = useAuth() as any;
    const navigate = useNavigate();
    const toast = useToast();

    const [form, setForm] = useState<Form | null>(null);
    const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!token || !id) return;
            try {
                // Fetch form details to get fields (for table headers)
                const forms = await getPublicForms();
                const currentForm = forms.find(f => f.id === Number(id));
                setForm(currentForm || null);

                // Fetch submissions
                const subs = await getFormSubmissions(token, Number(id));
                setSubmissions(subs);
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'No se pudieron cargar las respuestas.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, token]);

    if (loading) {
        return (
            <Center h="200px">
                <Spinner size="xl" />
            </Center>
        );
    }

    if (!form) {
        return <Box p={4}>Formulario no encontrado</Box>;
    }

    return (
        <Box p={4}>
            <Button leftIcon={<FaArrowLeft />} onClick={() => navigate('/admin/forms')} mb={6}>
                Volver a Formularios
            </Button>

            <Heading mb={2}>Respuestas: {form.title}</Heading>
            <Text color="gray.600" mb={6}>{submissions.length} respuestas encontradas</Text>

            <Box overflowX="auto" bg="white" shadow="sm" rounded="lg">
                <Table variant="simple" size="sm">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Fecha</Th>
                            {form.fields.map(field => (
                                <Th key={field.name}>{field.label}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {submissions.map((sub) => (
                            <Tr key={sub.id}>
                                <Td>{sub.id}</Td>
                                <Td>{new Date(sub.created_at).toLocaleDateString()}</Td>
                                {form.fields.map(field => (
                                    <Td key={field.name}>
                                        {typeof sub.data[field.name] === 'object'
                                            ? JSON.stringify(sub.data[field.name])
                                            : sub.data[field.name]}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
}
