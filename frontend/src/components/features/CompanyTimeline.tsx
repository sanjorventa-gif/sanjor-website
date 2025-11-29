import { Box, Container, Heading, Text, Stack, Flex, Circle, useColorModeValue, Image, Spinner, Center } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getHistory, type History } from '../../api/history';

export default function CompanyTimeline() {
    const lineColor = useColorModeValue('brand.200', 'brand.700');
    const [timelineData, setTimelineData] = useState<History[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHistory();
                setTimelineData(data);
            } catch (error) {
                console.error('Error fetching history:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <Center py={20}>
                <Spinner size="xl" color="brand.500" />
            </Center>
        );
    }

    return (
        <Box py={10}>
            <Container maxW={'container.xl'}>
                <Heading textAlign={'center'} mb={16} color="brand.700">Nuestra Historia</Heading>

                <Stack spacing={0} position="relative">
                    {/* Vertical Line */}
                    <Box
                        position="absolute"
                        left={{ base: '20px', md: '50%' }}
                        top={0}
                        bottom={0}
                        w="2px"
                        bg={lineColor}
                        transform={{ base: 'none', md: 'translateX(-50%)' }}
                        zIndex={0}
                    />

                    {timelineData.map((item, index) => (
                        <TimelineItem key={item.id} item={item} index={index} />
                    ))}
                </Stack>
            </Container>
        </Box>
    );
}

const TimelineItem = ({ item, index }: { item: History; index: number }) => {
    const isEven = index % 2 === 0;
    const bg = useColorModeValue('white', 'gray.800');
    const color = useColorModeValue('gray.600', 'gray.300');

    return (
        <Flex
            mb={10}
            justifyContent={{ base: 'flex-start', md: 'flex-end' }}
            position="relative"
            alignItems="center"
            flexDirection={{ base: 'row', md: isEven ? 'row-reverse' : 'row' }}
        >
            {/* Dot */}
            <Circle
                size="40px"
                bg="brand.500"
                color="white"
                fontWeight="bold"
                fontSize="sm"
                position="absolute"
                left={{ base: '0', md: '50%' }}
                transform={{ base: 'none', md: 'translateX(-50%)' }}
                zIndex={1}
                border="4px solid"
                borderColor={useColorModeValue('white', 'gray.900')}
            >
                <Box w="10px" h="10px" bg="white" rounded="full" />
            </Circle>

            {/* Content */}
            <Box
                w={{ base: 'calc(100% - 60px)', md: '45%' }}
                ml={{ base: '60px', md: 0 }}
                mr={{ base: 0, md: 0 }}
                bg={bg}
                p={6}
                rounded="xl"
                shadow="md"
                position="relative"
                textAlign={{ base: 'left', md: isEven ? 'right' : 'left' }}
                _before={{
                    content: '""',
                    position: 'absolute',
                    top: '20px',
                    left: { base: '-10px', md: isEven ? 'auto' : '-10px' },
                    right: { base: 'auto', md: isEven ? '-10px' : 'auto' },
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    borderLeft: { base: 'none', md: isEven ? `10px solid ${bg}` : 'none' },
                    borderRight: { base: `10px solid ${bg}`, md: isEven ? 'none' : `10px solid ${bg}` },
                }}
            >
                <Flex direction={{ base: 'column', md: isEven ? 'row' : 'row-reverse' }} align="center" gap={4}>
                    {item.image && (
                        <Box
                            flexShrink={0}
                            w={{ base: '100%', md: '200px' }}
                            h={{ base: 'auto', md: '200px' }}
                            rounded="md"
                            overflow="hidden"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                w="100%"
                                h="100%"
                                objectFit="cover"
                            />
                        </Box>
                    )}
                    <Box flex={1} minW={0}>
                        <Text
                            fontWeight="bold"
                            fontSize="2xl"
                            color="brand.500"
                            mb={1}
                        >
                            {item.year}
                        </Text>
                        <Heading fontSize="xl" mb={2}>{item.title}</Heading>
                        <Text color={color}>{item.description}</Text>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    );
};
