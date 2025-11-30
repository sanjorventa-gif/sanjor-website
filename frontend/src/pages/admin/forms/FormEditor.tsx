import { useEffect } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    Heading,
    useToast,
    Flex,
    Select,
    IconButton,
    Switch,
    Divider,
    Text,
    SimpleGrid,
} from '@chakra-ui/react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { createForm, updateForm, getPublicForms } from '../../../api/forms';
import type { FormField } from '../../../api/forms';
import { useAuth } from '../../../context/AuthContext';

interface FormFormData {
    title: string;
    slug: string;
    description: string;
    is_active: boolean;
    fields: FormField[];
}

export default function FormEditor() {
    const { id } = useParams();
    const isEditMode = !!id;
    const { token } = useAuth() as any;
    const navigate = useNavigate();
    const toast = useToast();

    const { register, control, handleSubmit, reset, setValue, watch, formState: { isSubmitting } } = useForm<FormFormData>({
        defaultValues: {
            title: '',
            slug: '',
            description: '',
            is_active: true,
            fields: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "fields"
    });

    // Watch title to auto-generate slug in create mode
    const title = watch('title');
    useEffect(() => {
        if (!isEditMode && title) {
            const slug = title.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setValue('slug', slug);
        }
    }, [title, isEditMode, setValue]);

    useEffect(() => {
        if (isEditMode) {
            loadForm();
        }
    }, [id]);

    const loadForm = async () => {
        try {
            // In a real app we would have getFormById, but we can filter from list for now or add endpoint
            // For simplicity, let's assume we fetch the list and find it, or use the public slug endpoint if we had the slug.
            // Better: Add getFormById to API. For now, I'll use getPublicForms and filter (not ideal but works for prototype)
            const forms = await getPublicForms();
            const form = forms.find(f => f.id === Number(id));
            if (form) {
                reset({
                    title: form.title,
                    slug: form.slug,
                    description: form.description,
                    is_active: form.is_active,
                    fields: form.fields
                });
            }
        } catch (error) {
            toast({ title: 'Error cargando formulario', status: 'error' });
        }
    };

    const onSubmit = async (data: FormFormData) => {
        if (!token) return;
        try {
            if (isEditMode) {
                await updateForm(token, Number(id), data);
                toast({ title: 'Formulario actualizado', status: 'success' });
            } else {
                await createForm(token, data);
                toast({ title: 'Formulario creado', status: 'success' });
            }
            navigate('/admin/forms');
        } catch (error) {
            toast({ title: 'Error al guardar', status: 'error' });
        }
    };

    return (
        <Box p={4} maxW="4xl" mx="auto">
            <Button leftIcon={<FaArrowLeft />} onClick={() => navigate('/admin/forms')} mb={6}>
                Volver
            </Button>

            <Heading mb={6}>{isEditMode ? 'Editar Formulario' : 'Nuevo Formulario'}</Heading>

            <Box as="form" onSubmit={handleSubmit(onSubmit)} bg="white" p={6} rounded="lg" shadow="sm">
                <VStack spacing={6} align="stretch">
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        <FormControl isRequired>
                            <FormLabel>Título</FormLabel>
                            <Input {...register('title', { required: true })} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Slug (URL)</FormLabel>
                            <Input {...register('slug', { required: true })} />
                        </FormControl>
                    </SimpleGrid>

                    <FormControl>
                        <FormLabel>Descripción</FormLabel>
                        <Textarea {...register('description')} />
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Activo</FormLabel>
                        <Switch {...register('is_active')} />
                    </FormControl>

                    <Divider />

                    <Flex justify="space-between" align="center">
                        <Heading size="md">Campos del Formulario</Heading>
                        <Button
                            leftIcon={<FaPlus />}
                            size="sm"
                            onClick={() => append({ name: '', label: '', type: 'text', required: false, options: [] })}
                        >
                            Agregar Campo
                        </Button>
                    </Flex>

                    {fields.map((field, index) => (
                        <Box key={field.id} p={4} borderWidth="1px" rounded="md" bg="gray.50">
                            <Flex justify="space-between" mb={4}>
                                <Text fontWeight="bold">Campo #{index + 1}</Text>
                                <IconButton
                                    aria-label="Eliminar campo"
                                    icon={<FaTrash />}
                                    size="sm"
                                    colorScheme="red"
                                    variant="ghost"
                                    onClick={() => remove(index)}
                                />
                            </Flex>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel fontSize="sm">Etiqueta (Label)</FormLabel>
                                    <Input {...register(`fields.${index}.label` as const, { required: true })} bg="white" />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel fontSize="sm">Nombre Interno (name)</FormLabel>
                                    <Input {...register(`fields.${index}.name` as const, { required: true })} bg="white" placeholder="ej: email" />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize="sm">Tipo</FormLabel>
                                    <Select {...register(`fields.${index}.type` as const)} bg="white">
                                        <option value="text">Texto Corto</option>
                                        <option value="textarea">Texto Largo</option>
                                        <option value="email">Email</option>
                                        <option value="number">Número</option>
                                        <option value="date">Fecha</option>
                                        <option value="select">Selección</option>
                                    </Select>
                                </FormControl>

                                <FormControl display="flex" alignItems="center" mt={8}>
                                    <FormLabel mb="0" fontSize="sm">Obligatorio</FormLabel>
                                    <Switch {...register(`fields.${index}.required` as const)} />
                                </FormControl>
                            </SimpleGrid>
                        </Box>
                    ))}

                    <Button
                        type="submit"
                        colorScheme="brand"
                        size="lg"
                        isLoading={isSubmitting}
                        mt={4}
                    >
                        Guardar Formulario
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}
