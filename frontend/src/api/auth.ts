import api from './axios';

export const login = async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const response = await api.post('/login/access-token', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getMe = async () => {
    const response = await api.post('/test-token');
    return response.data;
};

export const register = async (data: any) => {
    const response = await api.post('/register', data);
    return response.data;
};
