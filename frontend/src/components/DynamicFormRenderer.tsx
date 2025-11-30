
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    VStack,
    useToast,
    FormErrorMessage,
    Heading,
    Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { submitForm } from '../api/forms';
import type { Form } from '../api/forms';

interface DynamicFormRendererProps {
    form: Form;
    onSuccess?: () => void;
}

export default function DynamicFormRenderer({ form, onSuccess }: DynamicFormRendererProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();
    const toast = useToast();

    const onSubmit = async (data: any) => {
        try {
            await submitForm(form.slug, data);
            toast({
                title: 'Formulario enviado',
                description: 'Hemos recibido tu solicitud correctamente.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            reset();
            if (onSuccess) onSuccess();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Hubo un problema al enviar el formulario.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)} w="full">
            <VStack spacing={4} align="stretch">
                <Heading size="lg">{form.title}</Heading>
                {form.description && <Text color="gray.600">{form.description}</Text>}

                {form.fields.map((field) => (
                    <FormControl key={field.name} isInvalid={!!errors[field.name]} isRequired={field.required}>
                        <FormLabel>{field.label}</FormLabel>

                        {field.type === 'textarea' ? (
                            <Textarea
                                {...register(field.name, { required: field.required })}
                                placeholder={field.label}
                            />
                        ) : field.type === 'select' ? (
                            <Select
                                {...register(field.name, { required: field.required })}
                                placeholder={`Seleccione ${field.label}`}
                            >
                                {field.options?.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Select>
                        ) : (
                            <Input
                                type={field.type}
                                {...register(field.name, { required: field.required })}
                                placeholder={field.label}
                            />
                        )}

                        <FormErrorMessage>
                            {errors[field.name] && 'Este campo es obligatorio'}
                        </FormErrorMessage>
                    </FormControl>
                ))}

                <Button
                    type="submit"
                    colorScheme="brand"
                    size="lg"
                    isLoading={isSubmitting}
                    mt={4}
                >
                    Enviar
                </Button>
            </VStack>
        </Box>
    );
}
