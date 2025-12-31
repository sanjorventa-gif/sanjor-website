export const getImageUrl = (path: string | undefined): string => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Get API URL and strip /api/v1 to get root
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
    const backendUrl = apiUrl.replace('/api/v1', '');

    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    return `${backendUrl}${cleanPath}`;
};

// Reliable SVG Placeholder (Gray background, SanJor text)
export const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23EDF2F7'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23A0AEC0'%3ESAN JOR%3C/text%3E%3C/svg%3E";
