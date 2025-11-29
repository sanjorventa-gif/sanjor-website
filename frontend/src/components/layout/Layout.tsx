import { Box, Flex } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <Flex direction="column" minH="100vh">
            <Navbar />
            <Box flex="1">
                <Outlet />
            </Box>
            <Footer />
        </Flex>
    );
}
