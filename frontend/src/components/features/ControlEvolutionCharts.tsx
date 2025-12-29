
import { Flex, Text, VStack, Image, Box } from '@chakra-ui/react';

export default function ControlEvolutionCharts() {
    return (
        <Flex direction={{ base: 'column', lg: 'row' }} justify="center" align="center" gap={8} w="full">
            <ControlChart
                title="PID"
                subtitle="Oscilación continua"
                imageSrc="/images/blast-system/chart-pid.png"
            />
            <ControlChart
                title="PID Fuzzy Logic"
                subtitle="Oscilación amortiguada"
                imageSrc="/images/blast-system/chart-fuzzy.png"
            />
            <ControlChart
                title="PID Sistema Blast"
                subtitle="Estabilidad absoluta"
                imageSrc="/images/blast-system/chart-blast.png"
            />
        </Flex>
    );
}

const ControlChart = ({ title, subtitle, imageSrc }: { title: string, subtitle: string, imageSrc: string }) => {
    return (
        <VStack spacing={4} align="center" flex={1} w="full" maxW="220px" role="group">
            {/* Title */}
            <Text
                fontWeight="bold"
                fontSize="xl"
                color="gray.800"
                _groupHover={{ color: 'brand.600' }}
                transition="color 0.2s"
            >
                {title}
            </Text>

            {/* Image Container */}
            <Box
                w="full"
                bg="white"
                rounded="xl"
                overflow="hidden"
                transition="all 0.3s"
                _groupHover={{ boxShadow: "xl" }}
            >
                <Image
                    src={imageSrc}
                    alt={title}
                    w="full"
                    h="auto"
                    fallbackSrc="https://via.placeholder.com/300x500?text=Chart+Image" // Placeholder until user adds images
                    objectFit="contain"
                />
            </Box>

            {/* Subtitle */}
            <Text fontSize="md" color="gray.500">{subtitle}</Text>
        </VStack>
    );
};
