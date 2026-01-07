import { useState, useEffect, useCallback } from 'react';
import { Box, Text, Flex, Heading, Stack, Container, IconButton, Skeleton, Button } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { getCarouselItems, type CarouselItem } from '../../api/carousel';

const AUTOPLAY_DELAY = 8000; // 8 seconds

const variants = {
    enter: (props: { direction: number; effect: string }) => {
        const { direction, effect } = props;
        if (effect === 'fade') return { opacity: 0 };
        if (effect === 'zoom') return { scale: 0.8, opacity: 0 };
        return { x: direction > 0 ? '100%' : '-100%', opacity: 0 };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (props: { direction: number; effect: string }) => {
        const { direction, effect } = props;
        if (effect === 'fade') return { opacity: 0 };
        if (effect === 'zoom') return { scale: 1.2, opacity: 0 };
        return { zIndex: 0, x: direction < 0 ? '100%' : '-100%', opacity: 0 };
    },
};

export default function HeroCarousel() {
    const [slides, setSlides] = useState<CarouselItem[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const data = await getCarouselItems();
                const sortedData = data.sort((a, b) => a.order - b.order);
                setSlides(sortedData);
            } catch (error) {
                console.error('Error fetching carousel items:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSlides();
    }, []);

    const paginate = useCallback((newDirection: number) => {
        if (slides.length === 0) return;
        setDirection(newDirection);
        setCurrentSlide((prev) => {
            let nextIndex = prev + newDirection;
            if (nextIndex < 0) nextIndex = slides.length - 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            return nextIndex;
        });
    }, [slides.length]);

    // Autoplay logic - resets when currentSlide changes (manual or auto)
    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            paginate(1);
        }, AUTOPLAY_DELAY);
        return () => clearInterval(timer);
    }, [currentSlide, slides.length, paginate]);

    if (isLoading) {
        return <Skeleton height="calc(100vh - 60px)" width="full" />;
    }

    if (slides.length === 0) {
        return null;
    }

    const currentItem = slides[currentSlide];
    const effect = currentItem.transition_effect || 'slide';
    const overlayEffect = currentItem.overlay_effect || 'grid';
    // Use the image directly. If missing, the Image component's fallback will handle it.
    const imgSrc = currentItem.image;

    const getOverlayStyle = (type: string) => {
        const commonProps = {
            position: "absolute" as const,
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: 2,
            opacity: 0.3,
            pointerEvents: "none" as const,
        };

        switch (type) {
            case 'dots':
                return {
                    ...commonProps,
                    opacity: 0.6,
                    backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                };
            case 'scanlines':
                return {
                    ...commonProps,
                    opacity: 0.5,
                    backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.5) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.1), rgba(0, 255, 0, 0.05), rgba(0, 0, 255, 0.1))",
                    backgroundSize: "100% 4px, 6px 100%",
                };
            case 'none':
                return { display: 'none' };
            case 'grid':
            default:
                return {
                    ...commonProps,
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                };
        }
    };

    return (
        <Box
            position="relative"
            height="calc(100vh - 60px)"
            width="full"
            overflow="hidden"
            bg="gray.900"
        >
            <AnimatePresence initial={false} custom={{ direction, effect }} mode="popLayout">
                <motion.div
                    key={currentSlide}
                    custom={{ direction, effect }}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.5 },
                        scale: { duration: 0.5 }
                    }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                    }}
                >
                    <Box height="100%" width="100%" position="relative">
                        {/* Image Component instead of Background Image */}
                        <Box
                            as={motion.img}
                            src={imgSrc}
                            alt={currentItem.title}
                            objectFit="cover"
                            width="100%"
                            height="100%"
                            position="absolute"
                            top={0}
                            left={0}
                            zIndex={0}
                            onError={(e: any) => {
                                console.error(`Error loading image for slide ${currentSlide}:`, imgSrc);
                                e.target.src = 'https://via.placeholder.com/1920x1080?text=SanJor+Image+Error';
                            }}
                        />

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

                        {/* Texture Overlay */}
                        <Box sx={getOverlayStyle(overlayEffect)} />

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
                                <Stack spacing={6} maxW="3xl" transform="translateY(-10vh)">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                    >
                                        <Heading
                                            fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
                                            fontWeight="bold"
                                            lineHeight="shorter"
                                            textShadow="2px 2px 4px rgba(0,0,0,0.4)"
                                        >
                                            {slides[currentSlide].title}
                                        </Heading>
                                    </motion.div>

                                    {slides[currentSlide].subtitle && (
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5, duration: 0.8 }}
                                        >
                                            <Text
                                                fontSize={{ base: 'xl', md: '2xl' }}
                                                fontWeight="medium"
                                                textShadow="1px 1px 2px rgba(0,0,0,0.4)"
                                            >
                                                {slides[currentSlide].subtitle}
                                            </Text>
                                        </motion.div>
                                    )}

                                    {slides[currentSlide].button_text && (
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.7, duration: 0.8 }}
                                        >
                                            <Button
                                                as="a"
                                                href={slides[currentSlide].button_link || '#'}
                                                size="lg"
                                                colorScheme="brand"
                                                mt={4}
                                                _hover={{
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: 'lg',
                                                }}
                                            >
                                                {slides[currentSlide].button_text}
                                            </Button>
                                        </motion.div>
                                    )}
                                </Stack>
                            </Flex>
                        </Container>
                    </Box>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <>
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
                        onClick={() => paginate(-1)}
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
                        onClick={() => paginate(1)}
                    />
                </>
            )}

            {/* Progress Bar (Global for auto-advancing visual) */}
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
                    key={currentSlide} // Reset on slide change
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
                    style={{
                        height: "100%",
                        backgroundColor: "white",
                    }}
                />
            </Box>

            {/* Indicators */}
            {slides.length > 1 && (
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
                            onClick={() => {
                                const newDirection = index > currentSlide ? 1 : -1;
                                setDirection(newDirection);
                                setCurrentSlide(index);
                            }}
                            transition="all 0.3s"
                            _hover={{ bg: 'white' }}
                        />
                    ))}
                </Flex>
            )}
        </Box>
    );
}
