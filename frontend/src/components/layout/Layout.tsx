import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <Box minH="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box flex="1">
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
}
