import { Box, Container, Heading, Text, Stack, Flex, Circle, useColorModeValue } from '@chakra-ui/react';

const timelineData = [
    {
        year: '2019',
        title: 'SAN JOR Internacional',
        description: 'SAN JOR participa en forma directa o indirecta en 7 ferias internacionales en 4 países, en todas ellas presentando el Sistema BLAST y las estufas EcoLogic.',
    },
    {
        year: '2018',
        title: '40 Aniversario SAN JOR',
        description: 'Es el 40 aniversario de SAN JOR de su planta exclusiva para la fabricación de estufas de esterilización y cultivo, que se celebra en el evento de mayor repercusión en el sector salud en Puerto Madero – Buenos Aires.',
    },
    {
        year: '2012',
        title: 'Sistema BLAST',
        description: 'El diseño del Sistema BLAST es reconocido y galardonado por su éxito e inserción en el mercado, en la premiación de JeFeba por la Provincia de Buenos Aires en Argentina.',
    },
    {
        year: '2010',
        title: 'EcoLogic Control Digital',
        description: 'En base al diseño de la tecnología “Sistema BLAST” se desarrolla el control digital automático para realizar los ciclos de esterilización de forma fácil para el operador, lanzando al mercado la línea EcoLogic.',
    },
    {
        year: '2009',
        title: 'Sistema BLAST',
        description: 'Diseño propio de la tecnología “Sistema BLAST” para la máxima precisión en el control de temperatura para las Estufas utilizadas en laboratorio.',
    },
    {
        year: '2004',
        title: 'Premios a la exportación Argentina',
        description: 'SAN JOR es ganador del Premio a la Exportación Argentina como fabricante de Equipos Médicos, Hospitalarios y de Laboratorio otorgado por FedEx.',
    },
    {
        year: '1994',
        title: 'Ampliación de la empresa',
        description: 'Aumenta la superficie de la planta de producción, oficinas y depósito en un 30%, mejorando la organización interna y los tiempos de producción.',
    },
    {
        year: '1993',
        title: 'Grupo COEX de exportación',
        description: 'SAN JOR es integrante y cofundador del Grupo COEX de Exportación, grupo de empresas fabricantes de equipos para medicina y bioquímica.',
    },
    {
        year: '1984',
        title: 'Ampliación de la planta',
        description: 'La ampliación de la planta de fabricación se triplica en superficie con respecto al año 1978, incorporando equipos de trabajo de alta tecnología.',
    },
    {
        year: '1978',
        title: 'Nueva Planta',
        description: 'La fabrica se muda a una nueva planta de fabricación con el nombre de “SAN JOR”, liderando el mercado en el rubro de fabricación de Estufas.',
    },
    {
        year: '1950',
        title: 'Inicio de actividades',
        description: 'Inicia la fabricación de Estufas, Cajas y tambores de acero inoxidable con el nombre de “Metalúrgica SAN JOR” para el área hospitalaria.',
    },
];

export default function CompanyTimeline() {
    const lineColor = useColorModeValue('brand.200', 'brand.700');

    return (
        <Box py={10}>
            <Container maxW={'container.md'}>
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
                        <TimelineItem key={index} item={item} index={index} />
                    ))}
                </Stack>
            </Container>
        </Box>
    );
}

const TimelineItem = ({ item, index }: { item: any; index: number }) => {
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
    );
};
