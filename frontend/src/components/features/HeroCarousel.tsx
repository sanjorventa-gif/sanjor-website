import { useState, useEffect } from 'react';
import { Box, Text, Flex, Heading, Stack, Container, IconButton } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const AUTOPLAY_DELAY = 8000; // 8 seconds

const slides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        title: 'Excelencia en Equipamiento de Laboratorio',
        subtitle: 'Más de 50 años brindando precisión y calidad en cada equipo.',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1581093458891-9f30220728b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        title: 'Innovación y Tecnología',
        subtitle: 'Sistemas avanzados de control y diseño para resultados confiables.',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        title: 'Soluciones a Medida',
        subtitle: 'Desarrollamos equipos especiales adaptados a sus necesidades específicas.',
    },
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, AUTOPLAY_DELAY);
        return () => clearInterval(timer);
    }, [currentSlide]); // Reset timer on slide change manually if needed, but interval works fine if not reset. 
    // Actually, to sync with progress bar, we might want to rely on the key change of the progress bar.

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

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
