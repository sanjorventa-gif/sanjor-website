
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
                <svg viewBox="0 0 400 200" width="100%" height="100%" style={{ overflow: 'hidden' }}>

                    {/* Static Background Elements (Viewport Reference) */}
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

                    {/* SCROLLING GROUP: Contains everything that moves "left" (Time passing) */}
                    <motion.g
                        animate={{ x: [0, 0, -600] }}
                        transition={{
                            duration: 8,
                            times: [0, 0.5, 1], // 0-50% (4s): Static. 50-100% (4s): Move Left.
                            ease: "linear",
                            repeat: Infinity,
                            repeatDelay: 1
                        }}
                    >
                        {/* 1. Vertical Grid Lines (Moving with the data) */}
                        {/* We generate lines far to the right so they appear as we scroll */}
                        {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000].map((x) => (
                            <line
                                key={x}
                                x1={x} y1="0"
                                x2={x} y2="200"
                                stroke={gridColor}
                                strokeDasharray="4 4"
                            />
                        ))}

                        {/* 2. Stabilization Marker (Red Line at x=300 where curve becomes flat) */}
                        <line
                            x1="300" y1="0"
                            x2="300" y2="200"
                            stroke={targetColor}
                            strokeDasharray="4 4"
                            strokeWidth="2"
                            opacity="0.8"
                        />
                        <Text as="text" x="305" y="20" fontSize="xs" fill={targetColor} style={{ fontSize: '10px' }}>Estabilización</Text>

                        {/* 3. The Oscillating Curve (Extended Tail) */}
                        <SvgPath
                            d="M 0 100 C 40 0, 60 200, 100 100 C 130 50, 150 140, 180 100 C 200 85, 220 115, 240 100 C 260 95, 280 105, 300 100 L 1000 100"
                            fill="none"
                            stroke={lineColor}
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                                duration: 8, // Draw continuously. 
                                // Note: We draw for 8s. The first 4s fill the screen. 
                                // The next 4s we are moving left, so we keep drawing the "new" tail.
                                // This creates a perfect seamless "chart recorder" effect.
                                ease: "linear",
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        />

                        {/* 4. Moving Dot at the tip */}
                        <SvgCircle
                            r="6"
                            fill={targetColor}
                            animate={{ offsetDistance: "100%" }}
                            transition={{
                                duration: 8,
                                ease: "linear",
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                            style={{
                                offsetPath: `path('M 0 100 C 40 0, 60 200, 100 100 C 130 50, 150 140, 180 100 C 200 85, 220 115, 240 100 C 260 95, 280 105, 300 100 L 1000 100')`,
                                offsetDistance: "0%",
                            }}
                        />
                    </motion.g>

                </svg>
            </Box>
            <Text fontSize="sm" color="gray.400" mt={2}>
                * Simulación gráfica del comportamiento de amortiguación PID
            </Text>
        </Box>
    );
}