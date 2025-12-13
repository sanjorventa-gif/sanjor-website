
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const SvgPath = motion.path;
const SvgLine = motion.line;
const SvgCircle = motion.circle;

export default function BlastStabilizationChart() {
    // Colors
    const lineColor = useColorModeValue('#0056e0', '#4d94ff'); // Brand blue
    const targetColor = useColorModeValue('#e53e3e', '#fc8181'); // Red for limit/target
    const gridColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)');


    // Animation Variants
    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 2
            } as any // Cast to any to avoid strict typing issues with Easing strings
        }
    };

    // The data points for the "stabilization" curve
    // It starts with large oscillations and dampens to a flat line
    // SVG ViewBox: 0 0 400 200. Center Y is 100.
    // M 0 100 
    // Q 25 20, 50 100 (Overshoot up)
    // Q 75 180, 100 100 (Overshoot down)
    // Q 125 60, 150 100 (Smaller up)
    // Q 175 130, 200 100 (Smaller down)
    // Q 225 90, 250 100 (Tiny up)
    // Q 275 105, 300 100 (Tiny down)
    // L 400 100 (Flat)

    // Smooth Bezier path approximation (manually crafted for visual effect)
    const curvePath = "M 0 100 C 40 0, 60 200, 100 100 C 130 50, 150 140, 180 100 C 200 85, 220 115, 240 100 C 260 95, 280 105, 300 100 L 400 100";

    return (
        <Box
            p={6}
            bg={useColorModeValue('white', 'gray.800')}
            rounded="xl"
            boxShadow="lg"
            border="1px"
            borderColor={useColorModeValue('gray.100', 'gray.700')}
            textAlign="center"
        >
            <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.500">
                Visualización de Estabilización (Sistema BLAST)
            </Text>
            <Box position="relative" h="200px" w="100%" maxW="600px" mx="auto">
                <svg viewBox="0 0 400 200" width="100%" height="100%" style={{ overflow: 'visible' }}>

                    {/* Grid Lines (Horizontal) */}
                    <line x1="0" y1="50" x2="400" y2="50" stroke={gridColor} strokeDasharray="4 4" />
                    <line x1="0" y1="150" x2="400" y2="150" stroke={gridColor} strokeDasharray="4 4" />

                    <line x1="0" y1="100" x2="400" y2="100" stroke={gridColor} strokeWidth="2" />

                    {/* Target Line (Red - Stabilization Zone) */}
                    <SvgLine
                        x1="0" y1="100" x2="400" y2="100"
                        stroke={targetColor}
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* The Oscillating Curve */}
                    <SvgPath
                        d={curvePath}
                        fill="none"
                        stroke={lineColor}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={pathVariants}
                        initial="hidden"
                        animate="visible"
                    />

                    {/* Moving Dot at the tip */}
                    <SvgCircle
                        r="4"
                        fill={targetColor}
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{
                            duration: 4,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 2
                        }}
                        style={{
                            offsetPath: `path('${curvePath}')`,
                        }}
                    />

                </svg>
            </Box>
            <Text fontSize="sm" color="gray.400" mt={2}>
                * Simulación gráfica del comportamiento de amortiguación PID
            </Text>
        </Box>
    );
}
