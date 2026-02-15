
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Stack,
    Box,
    useDisclosure,
    Heading,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function WelcomeModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [hasSeenMessage, setHasSeenMessage] = useState(false);

    useEffect(() => {
        const seen = localStorage.getItem('vicking_welcome_seen_v1');
        if (!seen) {
            // Slight delay to ensure it doesn't pop up immediately on load if that feels jarring, 
            // but standard is usually immediate or after small delay.
            const timer = setTimeout(() => {
                onOpen();
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setHasSeenMessage(true);
        }
    }, [onOpen]);

    const handleClose = () => {
        localStorage.setItem('vicking_welcome_seen_v1', 'true');
        setHasSeenMessage(true);
        onClose();
    };

    if (hasSeenMessage) return null;

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="xl" scrollBehavior="inside">
            <ModalOverlay backdropFilter="blur(5px)" />
            <ModalContent>
                <ModalHeader>
                    Mensaje a quienes nos acompañaron durante estos 60 años
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <Heading size="md" color={'brand.700'}>Estimados clientes:</Heading>
                        <Text fontSize={'md'} color={'gray.600'} textAlign="justify">
                            Nos dirigimos a ustedes con una mezcla de emoción y gratitud para comunicarles que, luego de 60 años de trayectoria, nuestra empresa ha tomado la decisión de cerrar definitivamente sus puertas.
                        </Text>
                        <Text fontSize={'md'} color={'gray.600'} textAlign="justify">
                            No es solo el final de una actividad comercial, sino el cierre de una historia construida día a día junto a ustedes. Durante seis décadas fabricamos agitadores y baños termostáticos que acompañaron investigaciones, análisis, aprendizajes y descubrimientos. Saber que nuestros equipos formaron parte del trabajo cotidiano de tantos laboratorios es, sin dudas, nuestro mayor orgullo.
                        </Text>
                        <Text fontSize={'md'} color={'gray.600'} textAlign="justify">
                            Esta empresa nació como un proyecto compartido entre mi padre y sus socios fundadores. Con el paso del tiempo, mi padre asumió plenamente su conducción y la desarrolló con dedicación, compromiso y respeto por el trabajo bien hecho. Más adelante, sus hijos tuvimos el honor de sumarnos, continuando esa misma forma de trabajar, con los mismos valores y el mismo cuidado por cada equipo y cada cliente.
                        </Text>
                        <Text fontSize={'md'} color={'gray.600'} textAlign="justify">
                            Queremos agradecer profundamente la confianza, el respeto y la cercanía que nos brindaron a lo largo de todos estos años. Muchos de ustedes no fueron solo clientes, sino compañeros de camino.
                        </Text>
                        <Text fontSize={'md'} color={'gray.600'} textAlign="justify">
                            Sabemos que esta noticia puede generar preocupación, especialmente en relación con el servicio técnico de los equipos que continúan en uso. Por eso queremos llevarles tranquilidad y designar a la empresa SAN JOR para la realización del service y soporte técnico.
                        </Text>
                        <Text fontSize={'md'} color={'gray.600'} textAlign="justify">
                            Nuestro deseo es acompañarlos responsablemente en esta etapa de transición, orientándolos y brindando toda la información que esté a nuestro alcance.
                        </Text>
                        <Text fontSize={'md'} color={'gray.600'} textAlign="justify">
                            Gracias por habernos permitido ser parte de su trabajo y de su historia. Nos despedimos con sincero reconocimiento y respeto.
                        </Text>

                        <Box mt={4} borderTop="1px solid" borderColor="gray.200" pt={4}>
                            <Text fontWeight="bold" color={'brand.700'}>Con afecto,</Text>
                            <Text fontWeight="bold" color={'brand.700'}>Vicking SRL</Text>
                            <Text mt={2} color={'gray.700'}>Cristina Recchia – Socio Gerente</Text>
                            <Text color={'gray.700'}>Norberto Recchia – Socio Gerente</Text>
                        </Box>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="brand" mr={3} onClick={handleClose}>
                        Entendido
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
