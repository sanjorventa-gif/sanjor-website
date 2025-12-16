import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Spinner, useToast } from '@chakra-ui/react';
import { getFormBySlug } from '../../api/forms';
import type { Form } from '../../api/forms';
import DynamicFormRenderer from '../../components/DynamicFormRenderer';

export default function DynamicFormPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [form, setForm] = useState<Form | null>(null);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const fetchForm = async () => {
            if (!slug) return;
            try {
                const data = await getFormBySlug(slug);
                setForm(data);
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'No se pudo cargar el formulario.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchForm();
    }, [slug, navigate, toast]);

    if (loading) {
        return (
            <Container centerContent py={20}>
                <Spinner size="xl" color="brand.500" />
            </Container>
        );
    }

    if (!form) {
        return null;
    }

    return (
        <Box py={10} minH="80vh">
            <Container maxW="container.md" bg="white" p={8} borderRadius="lg" boxShadow="lg">
                <DynamicFormRenderer form={form} />
            </Container>
        </Box>
    );
}
