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

interface ProductCardProps {
    title: string;
    image: string;
    description: string;
    href: string;
    dimensions?: { length: number; width: number; height: number; unit: string };
    temperature?: { min: number; max: number; unit: string };
    temperatureLabel?: string;
}

export default function ProductCard({ title, image, href, dimensions, temperature, temperatureLabel }: ProductCardProps) {
    return (
        <Center py={6}>
            <Box
                maxW={'445px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.02)' }}
                display="flex"
                flexDirection="column"
                height="100%"
            >
                <Box
                    bg={'gray.100'}
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
                        fallbackSrc="https://via.placeholder.com/400x300?text=SAN+JOR"
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


                    {dimensions && (
                        <Stack direction="row" align="center">
                            <Badge colorScheme="purple" textTransform="none">Medidas internas</Badge>
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
                        as={RouterLink}
                        to={href}
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        bg={'brand.500'}
                        color={'white'}
                        _hover={{
                            bg: 'brand.400',
                        }}
                    >
                        Ver Detalles
                    </Button>
                </Stack>
            </Box>
        </Center>
    );
}
