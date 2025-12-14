import { useEffect } from 'react';
import {
    Box,
    Button,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Switch,
    VStack,
    HStack,
    SimpleGrid,
    useToast,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { createFaq, updateFaq, getFaqById, type FaqFormData } from '../../../api/faqs';

export default function FaqForm() {
    const { id } = useParams<{ id: string }>();
    const isEditing = !!id;
    const navigate = useNavigate();
    const toast = useToast();
    const { register, handleSubmit, control, reset, formState: { isSubmitting } } = useForm<FaqFormData>({
        defaultValues: {
            is_active: true,
            order: 0,
        }
    });

    useEffect(() => {
        if (isEditing) {
            const loadFaq = async () => {
                try {
                    const data = await getFaqById(Number(id));
                    reset({
                        question: data.question,
                        answer: data.answer,
                        order: data.order,
                        is_active: data.is_active,
                    });
                } catch (error) {
                    toast({
                        title: 'Error al cargar FAQ',
                        status: 'error',
                        duration: 3000,
                    });
                    navigate('/admin/faqs');
                }
            };
            loadFaq();
        }
    }, [id, isEditing, reset, navigate, toast]);

    const onSubmit = async (data: FaqFormData) => {
        try {
            if (isEditing) {
                await updateFaq(Number(id), data);
                toast({
                    title: 'FAQ actualizada',
                    status: 'success',
                    duration: 3000,
                });
            } else {
                await createFaq(data);
                toast({
                    title: 'FAQ creada',
                    status: 'success',
                    duration: 3000,
                });
            }
            navigate('/admin/faqs');
        } catch (error) {
            toast({
                title: 'Error al guardar',
                description: 'Verifique los datos e intente nuevamente.',
                status: 'error',
                duration: 3000,
            });
        }
    };

    return (
        <Box maxW="container.md" mx="auto">
            <Heading size="lg" mb={6}>
                {isEditing ? 'Editar Pregunta Frecuente' : 'Nueva Pregunta Frecuente'}
            </Heading>

            <Box bg="white" p={8} rounded="lg" shadow="sm" as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={6} align="stretch">
                    <FormControl isRequired>
                        <FormLabel>Pregunta</FormLabel>
                        <Input {...register('question', { required: true })} placeholder="Ingrese la pregunta" />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Respuesta</FormLabel>
                        <Textarea
                            {...register('answer', { required: true })}
                            placeholder="Ingrese la respuesta"
                            rows={5}
                        />
                    </FormControl>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        <FormControl>
                            <FormLabel>Orden (Prioridad)</FormLabel>
                            <Controller
                                name="order"
                                control={control}
                                render={({ field }) => (
                                    <NumberInput {...field} min={0}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                )}
                            />
                        </FormControl>

                        <FormControl display="flex" alignItems="center">
                            <FormLabel htmlFor="is-active" mb="0">
                                ¿Activa?
                            </FormLabel>
                            <Controller
                                name="is_active"
                                control={control}
                                render={({ field: { onChange, value, ref } }) => (
                                    <Switch
                                        id="is-active"
                                        isChecked={value}
                                        onChange={onChange}
                                        ref={ref}
                                        colorScheme="brand"
                                    />
                                )}
                            />
                        </FormControl>
                    </SimpleGrid>

                    <HStack spacing={4} justify="flex-end" pt={4}>
                        <Button as={RouterLink} to="/admin/faqs" variant="ghost">
                            Cancelar
                        </Button>
                        <Button type="submit" colorScheme="brand" isLoading={isSubmitting}>
                            Guardar
                        </Button>
                    </HStack>
                </VStack>
            </Box>
        </Box>
    );
}
