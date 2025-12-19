import { Button, Box, Icon } from '@chakra-ui/react';
import { FaEnvelope } from 'react-icons/fa';
import { useUI } from '../../context/UIContext';

export default function FloatingWidget() {
    const { onOpenNewsletter } = useUI();

    return (
        <Box position="fixed" bottom="4" left="4" zIndex={1000}>
            <Button
                leftIcon={<Icon as={FaEnvelope} />}
                colorScheme="brand"
                size="lg"
                shadow="xl"
                onClick={onOpenNewsletter}
                _hover={{ transform: 'translateY(-2px)', shadow: '2xl' }}
                transition="all 0.2s"
                rounded="full"
                px={{ base: 0, md: 8 }}
                w={{ base: '50px', md: 'auto' }}
                h={{ base: '50px', md: '48px' }}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Box as="span" display={{ base: 'none', md: 'inline' }}>
                    Newsletter
                </Box>
            </Button>
        </Box>
    );
}
