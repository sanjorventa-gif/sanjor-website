import { Box, Container, Heading, Text, Stack, Flex, Circle, useColorModeValue, Image, Spinner, Center, Icon } from '@chakra-ui/react';
import { FaFlag } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getHistory, type History } from '../../api/history';

export default function CompanyTimeline({ hideTitle = false }: { hideTitle?: boolean }) {
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
                {!hideTitle && <Heading textAlign={'center'} mb={16} color="brand.700">Nuestra Historia</Heading>}

                <Stack spacing={0} position="relative">
                    {/* Vertical Line */}
                    <Box
                        position="absolute"
                        left={{ base: '20px', md: '50%' }}
                        top={0}
                        bottom="20px" // Extend deeper into the marker
                        w="2px"
                        bg={lineColor}
                        transform={{ base: 'none', md: 'translateX(-50%)' }}
                        zIndex={0}
                    />

                    {timelineData.map((item, index) => (
                        <TimelineItem key={item.id} item={item} index={index} />
                    ))}

                    {/* Start Marker */}
                    <Box position="relative" h="60px" mt={8} zIndex={1}>
                        <Circle
                            size="60px"
                            bg="brand.600"
                            color="white"
                            shadow="lg"
                            border="4px solid white"
                            position="absolute"
                            left={{ base: '20px', md: '50%' }}
                            transform="translateX(-50%)"
                        >
                            <Icon as={FaFlag} w={6} h={6} />
                        </Circle>
                    </Box>
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
            role="group"
        >
            {/* Pulsing Dot */}
            <Box
                position="absolute"
                left={{ base: '0', md: '50%' }}
                transform={{ base: 'none', md: 'translateX(-50%)' }}
                zIndex={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="40px"
                height="40px"
            >
                {/* Pulse Effect Ring */}
                <Box
                    as={motion.div}
                    position="absolute"
                    width="100%"
                    height="100%"
                    rounded="full"
                    bg="brand.400"
                    opacity={0.3}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2 // Stagger pulsing
                    } as any}
                />

                {/* Core Dot */}
                <Circle
                    size="40px"
                    bg="brand.500"
                    color="white"
                    fontWeight="bold"
                    fontSize="sm"
                    position="relative"
                    border="4px solid"
                    borderColor={useColorModeValue('white', 'gray.900')}
                    boxShadow="md"
                >
                    <Box w="10px" h="10px" bg="white" rounded="full" />
                </Circle>
            </Box>

            {/* Content Card with Hover Effect */}
            <Box
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 } as any}
                w={{ base: 'calc(100% - 60px)', md: '45%' }}
                ml={{ base: '60px', md: 0 }}
                mr={{ base: 0, md: 0 }}
                bg={bg}
                p={6}
                rounded="xl"
                shadow="md"
                position="relative"
                textAlign={{ base: 'left', md: isEven ? 'right' : 'left' }}
                border="1px solid"
                borderColor="transparent"
                _hover={{
                    shadow: 'xl',
                    transform: 'translateY(-2px)',
                    borderColor: 'brand.200',
                    transition: 'all 0.3s ease'
                }}
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
                            w={{ base: '100%', md: '250px' }}
                            maxH={{ base: '400px', md: '300px' }}
                            rounded="md"
                            overflow="hidden"
                            boxShadow="sm"
                            alignSelf={{ base: 'center', md: 'flex-start' }}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                w="100%"
                                h="auto"
                                objectFit="contain"
                                transition="transform 0.3s ease"
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
