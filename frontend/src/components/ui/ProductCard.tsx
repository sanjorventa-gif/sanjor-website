import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Button,
    Badge,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { PLACEHOLDER_IMAGE } from '../../utils/images';

interface ProductCardProps {
    title: string;
    image: string;
    description: string;
    href: string;
    dimensions?: { length: number; width: number; height: number; unit: string };
    temperature?: { min: number; max: number; unit: string };
    temperatureLabel?: string;
    actionLabel?: string;
}

const stripHtml = (html: string) => {
    if (!html) return '';
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

export default function ProductCard({ title, image, description, href, dimensions, temperature, temperatureLabel, actionLabel = 'Ver Detalles' }: ProductCardProps) {
    // Get first part before newline or <br>
    const firstPart = description.split(/(\r\n|\n|\r|<br\s*\/?>)/)[0];
    const cleanDescription = stripHtml(firstPart);

    return (
        <Center py={6} h="full">
            <Box
                as={RouterLink}
                to={href}

                maxW={'445px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.02)', textDecoration: 'none' }}
                display="flex"
                flexDirection="column"
                height="100%"
            >
                <Box
                    bg={'white'}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={'relative'}
                    overflow="hidden"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Image
                        src={image}
                        alt={title}
                        objectFit="contain"
                        w="100%"
                        maxH="400px"
                        fallbackSrc={PLACEHOLDER_IMAGE}
                    />
                </Box>
                <Stack flex="1" spacing={3}>

                    <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'xl'}
                        fontFamily={'body'}
                        lineHeight="shorter"
                    >
                        {title}
                    </Heading>

                    {cleanDescription && (
                        <Text color="gray.500" fontSize="sm" noOfLines={3}>
                            {cleanDescription}
                        </Text>
                    )}

                    {dimensions && (
                        <Stack direction="row" align="center">
                            <Badge colorScheme="purple" textTransform="none">Medidas int.</Badge>
                            <Text fontSize="xs" fontWeight="bold">
                                {dimensions.length} x {dimensions.width} x {dimensions.height} {dimensions.unit}
                            </Text>
                        </Stack>
                    )}

                    {temperature && (
                        <Stack direction="row" align="center">
                            <Badge colorScheme="red" textTransform="none">{temperatureLabel || "Rango de temperatura"}</Badge>
                            <Text fontSize="xs" fontWeight="bold">
                                {temperature.min} - {temperature.max} {temperature.unit}
                            </Text>
                        </Stack>
                    )}
                </Stack>
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                    <Button
                        as="div"
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        bg={'brand.500'}
                        color={'white'}
                        _hover={{
                            bg: 'brand.400',
                        }}
                    >
                        {actionLabel}
                    </Button>
                </Stack>
            </Box>
        </Center>
    );
}
