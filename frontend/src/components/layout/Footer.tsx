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
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
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
            bg={useColorModeValue('white', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            mt="auto"
        >
            <Container as={Stack} maxW={'container.xl'} py={10}>
                {/* Desktop View */}
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8} display={{ base: 'none', md: 'grid' }}>
                    <Stack align={'flex-start'}>
                        <Text fontWeight={'bold'} fontSize={'lg'} mb={2}>
                            VICKING
                        </Text>
                        <Text fontSize={'sm'}>
                            Equipos médicos de alta calidad.
                            Soporte técnico oficial garantizado.
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
                        <Link as={RouterLink} to={'/servicios/tecnico'}>Servicio Técnico</Link>
                        {/* <Link as={RouterLink} to={'/descargas'}>Manuales y Catálogos</Link> */}
                        {/* <Link as={RouterLink} to={'/servicios'}>Garantía</Link> */}
                    </Stack>

                    <Stack align={'flex-start'}>
                        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
                            Contacto
                        </Text>
                        <Text fontSize={'sm'}>Buenos Aires, Argentina</Text>
                        <Text fontSize={'sm'}>info@vicking.com.ar</Text>
                    </Stack>
                </SimpleGrid>

                {/* Mobile View */}
                <Box display={{ base: 'block', md: 'none' }}>
                    <Stack align="center" textAlign="center" mb={6}>
                        <Text fontWeight={'bold'} fontSize={'lg'} mb={2}>
                            VICKING
                        </Text>
                        <Text fontSize={'sm'}>
                            Equipos médicos de alta calidad. Soporte técnico oficial.
                        </Text>
                    </Stack>

                    <Accordion allowToggle>
                        <AccordionItem border="none">
                            <h2>
                                <AccordionButton py={4}>
                                    <Box flex="1" textAlign="left" fontWeight="500">
                                        Empresa
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Stack align="center">
                                    <Link as={RouterLink} to={'/empresa'}>Acerca de nosotros</Link>
                                    <Link as={RouterLink} to={'/novedades'}>Noticias</Link>
                                    <Link as={RouterLink} to={'/contacto'}>Contacto</Link>
                                </Stack>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem border="none">
                            <h2>
                                <AccordionButton py={4}>
                                    <Box flex="1" textAlign="left" fontWeight="500">
                                        Soporte
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Stack align="center">
                                    <Link as={RouterLink} to={'/servicios/tecnico'}>Servicio Técnico</Link>
                                    {/* <Link as={RouterLink} to={'/descargas'}>Manuales y Catálogos</Link> */}
                                    {/* <Link as={RouterLink} to={'/servicios'}>Garantía</Link> */}
                                </Stack>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem border="none">
                            <h2>
                                <AccordionButton py={4}>
                                    <Box flex="1" textAlign="left" fontWeight="500">
                                        Contacto
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Stack align="center">
                                    <Text fontSize={'sm'}>Buenos Aires, Argentina</Text>
                                    <Text fontSize={'sm'}>info@vicking.com.ar</Text>
                                </Stack>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
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
                    direction={{ base: 'column-reverse', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'space-between' }}
                    align={'center'}
                >
                    <Text textAlign={{ base: 'center', md: 'left' }}>© {new Date().getFullYear()} VICKING (Soporte por Sanjor). Todos los derechos reservados.</Text>
                    <Stack direction={'row'} spacing={6}>
                        <SocialButton label={'Facebook'} href={'https://www.facebook.com/sanjorenlared'}>
                            <FaFacebook />
                        </SocialButton>
                        <SocialButton label={'Instagram'} href={'https://www.instagram.com/sanjorenlared/'}>
                            <FaInstagram />
                        </SocialButton>
                        <SocialButton label={'YouTube'} href={'https://www.youtube.com/@sanjorenlared'}>
                            <FaYoutube />
                        </SocialButton>
                        <SocialButton label={'X'} href={'https://x.com/sanjorenlared'}>
                            <FaXTwitter />
                        </SocialButton>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}
