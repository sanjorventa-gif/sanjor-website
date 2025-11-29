import { useState, useEffect } from 'react';
import { Box, Text, Flex, Heading, Stack, Container, IconButton, Skeleton } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { getCarouselItems, type CarouselItem } from '../../api/carousel';

const AUTOPLAY_DELAY = 8000; // 8 seconds

export default function HeroCarousel() {
    const [slides, setSlides] = useState<CarouselItem[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const data = await getCarouselItems();
                setSlides(data);
            } catch (error) {
                console.error('Error fetching carousel items:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSlides();
    }, []);

    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, AUTOPLAY_DELAY);
        return () => clearInterval(timer);
    }, [currentSlide, slides.length]);

    const prevSlide = () => {
        if (slides.length === 0) return;
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        if (slides.length === 0) return;
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    if (isLoading) {
        return <Skeleton height="calc(100vh - 60px)" width="full" />;
    }

    if (slides.length === 0) {
        return null; // Or a placeholder
    }

    return (
        <Box
            position="relative"
            height="calc(100vh - 60px)"
            width="full"
            overflow="hidden"
        >
            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Box
                        height="100%"
                        width="100%"
                        backgroundImage={`url(${slides[currentSlide].image})`}
                        backgroundPosition="center"
                        backgroundSize="cover"
                        position="relative"
                    >
                        {/* Dark Overlay */}
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            width="100%"
                            height="100%"
                            bg="blackAlpha.600"
                            zIndex={1}
                        />

                        {/* Grid Texture Overlay */}
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            width="100%"
                            height="100%"
                            zIndex={2}
                            opacity={0.3}
                            backgroundImage="linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)"
                            backgroundSize="20px 20px"
                        />

                        <Container height="100%" maxW="container.xl" position="relative" zIndex={3}>
                            <Flex
                                height="100%"
                                align="center"
                                justify="center"
                                direction="column"
                                textAlign="center"
                                color="white"
                                px={4}
                            >
                                <Stack spacing={6} maxW="3xl">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                    >
                                        <Heading
                                            fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
                                            fontWeight="bold"
                                            lineHeight="shorter"
                                            textShadow="2px 2px 4px rgba(0,0,0,0.4)"
                                        >
                                            {slides[currentSlide].title}
                                        </Heading>
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.8, duration: 0.8 }}
                                    >
                                        <Text
                                            fontSize={{ base: 'lg', md: 'xl' }}
                                            fontWeight="medium"
                                            textShadow="1px 1px 2px rgba(0,0,0,0.4)"
                                        >
                                            {slides[currentSlide].subtitle}
                                        </Text>
                                    </motion.div>
                                </Stack>
                            </Flex>
                        </Container>
                    </Box>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <IconButton
                aria-label="Previous Slide"
                icon={<ChevronLeftIcon w={8} h={8} />}
                position="absolute"
                left={{ base: 2, md: 8 }}
                top="50%"
                transform="translateY(-50%)"
                zIndex={10}
                variant="ghost"
                color="white"
                _hover={{ bg: 'whiteAlpha.300' }}
                onClick={prevSlide}
            />
            <IconButton
                aria-label="Next Slide"
                icon={<ChevronRightIcon w={8} h={8} />}
                position="absolute"
                right={{ base: 2, md: 8 }}
                top="50%"
                transform="translateY(-50%)"
                zIndex={10}
                variant="ghost"
                color="white"
                _hover={{ bg: 'whiteAlpha.300' }}
                onClick={nextSlide}
            />

            {/* Progress Bar */}
            <Box
                position="absolute"
                bottom={0}
                left={0}
                w="full"
                h="4px"
                bg="whiteAlpha.300"
                zIndex={10}
            >
                <motion.div
                    key={currentSlide}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
                    style={{
                        height: "100%",
                        backgroundColor: "white", // Or brand color
                    }}
                />
            </Box>

            {/* Indicators */}
            <Flex
                position="absolute"
                bottom={8}
                left="0"
                right="0"
                justify="center"
                zIndex={10}
                gap={3}
            >
                {slides.map((_, index) => (
                    <Box
                        key={index}
                        w={3}
                        h={3}
                        rounded="full"
                        bg={currentSlide === index ? 'white' : 'whiteAlpha.500'}
                        cursor="pointer"
                        onClick={() => setCurrentSlide(index)}
                        transition="all 0.3s"
                        _hover={{ bg: 'white' }}
                    />
                ))}
            </Flex>
        </Box>
    );
}
