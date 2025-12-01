import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    Link,
    VisuallyHidden,
    chakra,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const SocialButton = ({
    children,
    label,
    href,
}: {
    children: React.ReactNode;
    label: string;
    href: string;
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            mt="auto"
        >
            <Container as={Stack} maxW={'container.xl'} py={10}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
                    <Stack align={'flex-start'}>
                        <Text fontWeight={'bold'} fontSize={'lg'} mb={2}>
                            SAN JOR
                        </Text>
                        <Text fontSize={'sm'}>
                            Fabricante de estufas para laboratorio, cultivo y esterilización.
                            Calidad y precisión desde hace más de 50 años.
                        </Text>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
                            Empresa
                        </Text>
                        <Link as={RouterLink} to={'/empresa'}>Acerca de nosotros</Link>
                        <Link as={RouterLink} to={'/novedades'}>Noticias</Link>
                        <Link as={RouterLink} to={'/contacto'}>Contacto</Link>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
                            Soporte
                        </Text>
                        <Link as={RouterLink} to={'/servicios'}>Servicio Técnico</Link>
                        <Link as={RouterLink} to={'/descargas'}>Manuales y Catálogos</Link>
                        <Link as={RouterLink} to={'/servicios'}>Garantía</Link>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
                            Contacto
                        </Text>
                        <Text fontSize={'sm'}>Buenos Aires, Argentina</Text>
                        <Text fontSize={'sm'}>info@sanjor.com.ar</Text>
                        <Text fontSize={'sm'}>+54 11 1234-5678</Text>
                    </Stack>
                </SimpleGrid>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
                <Container
                    as={Stack}
                    maxW={'container.xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ md: 'space-between' }}
                    align={{ md: 'center' }}
                >
                    <Text>© {new Date().getFullYear()} SAN JOR. Todos los derechos reservados.</Text>
                    <Stack direction={'row'} spacing={6}>
                        <SocialButton label={'LinkedIn'} href={'#'}>
                            <FaLinkedin />
                        </SocialButton>
                        <SocialButton label={'Instagram'} href={'#'}>
                            <FaInstagram />
                        </SocialButton>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}
