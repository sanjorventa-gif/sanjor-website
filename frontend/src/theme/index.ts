import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const colors = {
    brand: {
        50: '#ECECFA',
        100: '#C8C9E6',
        200: '#A4A6D2',
        300: '#7F83BF',
        400: '#5B60AB',
        500: '#3E4095', // Primary Brand Color
        600: '#2F3175',
        700: '#212254',
        800: '#121333',
        900: '#040412',
    },
    blue: {
        50: '#ECECFA',
        100: '#C8C9E6',
        200: '#A4A6D2',
        300: '#7F83BF',
        400: '#5B60AB',
        500: '#3E4095',
        600: '#2F3175',
        700: '#212254',
        800: '#121333',
        900: '#040412',
    },
    gray: {
        50: '#f7fafc',
        100: '#edf2f7',
        200: '#e2e8f0',
        300: '#cbd5e0',
        400: '#a0aec0',
        500: '#718096',
        600: '#4a5568',
        700: '#2d3748',
        800: '#1a202c',
        900: '#171923',
    },
};

const fonts = {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
};

const fontSizes = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.35rem', // Reduced from 1.5rem
    '3xl': '1.5rem',  // Reduced from 1.875rem
    '4xl': '1.75rem', // Reduced from 2.25rem
    '5xl': '2rem',    // Reduced from 3rem
    '6xl': '2.25rem', // Reduced from 3.75rem
    '7xl': '2.625rem',
    '8xl': '3rem',
    '9xl': '3.5rem', // Cap at 3.5rem (was 8rem)
};

const components = {
    Button: {
        baseStyle: {
            fontWeight: 'bold',
            borderRadius: 'md',
        },
        variants: {
            solid: (props: any) => ({
                bg: props.colorScheme === 'brand' ? 'brand.500' : undefined,
                color: 'white',
                _hover: {
                    bg: props.colorScheme === 'brand' ? 'brand.600' : undefined,
                },
            }),
        },
    },
    Container: {
        baseStyle: {
            maxW: 'container.xl',
            px: { base: 4, md: 8 },
        },
    },
};

const theme = extendTheme({ config, colors, fonts, fontSizes, components });

export default theme;
