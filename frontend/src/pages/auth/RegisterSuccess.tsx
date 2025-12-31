import {
    Box,
    Heading,
    Text,
    Button,
    Container,
    SimpleGrid,
    Icon,
    Stack,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { FaCheckCircle, FaFileDownload, FaHeadset, FaShieldAlt } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

const Feature = ({ title, text, icon }: { title: string; text: string; icon: any }) => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'lg'}
            rounded={'xl'}
            p={6}
            align={'center'}
            textAlign={'center'}
            transition="all 0.3s ease"
            _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
        >
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'brand.500'}
                mb={4}
            >
                <Icon as={icon} w={8} h={8} />
            </Flex>
            <Text fontWeight={600} fontSize={'lg'}>{title}</Text>
            <Text color={'gray.600'}>{text}</Text>
        </Stack>
    );
};
import { Flex } from '@chakra-ui/react';

export default function RegisterSuccess() {
    return (
        <Box
            minH="calc(100vh - 60px)"
            bg={useColorModeValue('gray.50', 'gray.900')}
            position="relative"
            overflow="hidden"
            display="flex"
            alignItems="center"
        >
            {/* Background Pattern */}
            <Box
                position="absolute"
                top="0"
                left="0"
                w="full"
                h="full"
                opacity={0.05}
                backgroundImage="radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)"
                backgroundSize="40px 40px"
                color="brand.500"
                zIndex={0}
            />

            <Container maxW={'container.xl'} position="relative" zIndex={1} py={10}>
                <VStack spacing={8} textAlign="center" mb={12}>
                    <MotionBox
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Icon as={FaCheckCircle} w={24} h={24} color={'green.400'} />
                    </MotionBox>
                    <Heading as="h1" size="2xl" bgGradient="linear(to-r, brand.400, brand.600)" bgClip="text">
                        ¡Bienvenido a la Familia SAN JOR!
                    </Heading>
                    <Text fontSize={'xl'} color={'gray.500'} maxW="2xl">
                        Su cuenta ha sido creada exitosamente. Ahora tiene acceso completo a todos nuestros servicios digitales pensados para maximizar su experiencia.
                    </Text>
                </VStack>

                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={12}>
                    <Feature
                        icon={FaFileDownload}
                        title={'Descargas Exclusivas'}
                        text={'Acceda a manuales de usuario, catálogos técnicos y software actualizado para sus equipos.'}
                    />
                    <Feature
                        icon={FaShieldAlt}
                        title={'Gestión de Garantías'}
                        text={'Registre sus nuevos equipos y administre extensiones de garantía de forma sencilla y rápida.'}
                    />
                    <Feature
                        icon={FaHeadset}
                        title={'Soporte Prioritario'}
                        text={'Genere tickets de servicio técnico y realice un seguimiento en tiempo real de sus solicitudes.'}
                    />
                </SimpleGrid>

                <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justify={'center'}>
                    <Button
                        as={RouterLink}
                        to="/login"
                        size="lg"
                        rounded={'full'}
                        bg={'brand.500'}
                        color={'white'}
                        px={10}
                        _hover={{
                            bg: 'brand.400',
                            transform: 'scale(1.05)',
                        }}
                        boxShadow={'lg'}
                    >
                        Iniciar Sesión
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/"
                        size="lg"
                        rounded={'full'}
                        variant={'outline'}
                        colorScheme="brand"
                        px={10}
                    >
                        Volver al Inicio
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}
