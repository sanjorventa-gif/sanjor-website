import { useRef, useState } from 'react';
import {
    Box,
    Button,
    Text,
    Image,
    VStack,
    Icon,
    useToast,
    Spinner,
    HStack,
} from '@chakra-ui/react';
import { FaCloudUploadAlt, FaFilePdf, FaTrash } from 'react-icons/fa';

interface FileUploadProps {
    accept: string;
    label: string;
    onFileSelect: (base64: string) => void;
    previewUrl?: string;
    isPdf?: boolean;
}

export default function FileUpload({ accept, label, onFileSelect, previewUrl, isPdf = false }: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Check file size (limit to 2MB for local storage safety)
        if (file.size > 2 * 1024 * 1024) {
            toast({
                title: 'Archivo demasiado grande',
                description: 'Por favor seleccione un archivo menor a 2MB.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);

        const reader = new FileReader();
        reader.onloadend = () => {
            // Simulate network delay
            setTimeout(() => {
                const base64 = reader.result as string;
                onFileSelect(base64);
                setIsLoading(false);
                toast({
                    title: 'Archivo cargado',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            }, 1000);
        };
        reader.onerror = () => {
            setIsLoading(false);
            toast({
                title: 'Error al leer archivo',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        };
        reader.readAsDataURL(file);
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onFileSelect('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <Box
            border="2px dashed"
            borderColor="gray.300"
            rounded="md"
            p={4}
            textAlign="center"
            cursor="pointer"
            onClick={handleClick}
            _hover={{ borderColor: 'brand.500', bg: 'gray.50' }}
            transition="all 0.2s"
        >
            <input
                type="file"
                ref={inputRef}
                accept={accept}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            {isLoading ? (
                <VStack spacing={2}>
                    <Spinner color="brand.500" />
                    <Text fontSize="sm">Procesando archivo...</Text>
                </VStack>
            ) : previewUrl ? (
                <VStack spacing={3}>
                    {isPdf ? (
                        <HStack spacing={2} p={2} bg="red.50" rounded="md" color="red.600">
                            <Icon as={FaFilePdf} boxSize={6} />
                            <Text fontWeight="bold">Documento PDF Cargado</Text>
                        </HStack>
                    ) : (
                        <Image
                            src={previewUrl}
                            alt="Preview"
                            maxH="200px"
                            objectFit="contain"
                            rounded="md"
                        />
                    )}
                    <Button
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        leftIcon={<FaTrash />}
                        onClick={handleRemove}
                    >
                        Eliminar
                    </Button>
                </VStack>
            ) : (
                <VStack spacing={2} color="gray.500">
                    <Icon as={FaCloudUploadAlt} boxSize={8} />
                    <Text fontWeight="bold">{label}</Text>
                    <Text fontSize="xs">Click para seleccionar archivo (Max 2MB)</Text>
                </VStack>
            )}
        </Box>
    );
}
