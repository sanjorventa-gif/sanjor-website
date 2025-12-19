import api from './axios';

export interface User {
    id: number;
    email: string;
    role: string;
    is_active: boolean;
    is_superuser: boolean;
    newsletter_subscribed: boolean;
    name?: string;
    last_name?: string;
    company?: string;
    phone?: string;
    city?: string;
    province?: string;
    country?: string;
    rubro?: string;
    work_area?: string;
}

export interface UserCreate {
    email: string;
    password: string;
    role: string;
    is_active: boolean;
    is_superuser: boolean;
    newsletter_subscribed?: boolean;
    name?: string;
    last_name?: string;
    company?: string;
    phone?: string;
    city?: string;
    province?: string;
    country?: string;
    rubro?: string;
    work_area?: string;
}

export interface UserUpdate {
    password?: string;
    role?: string;
    is_active?: boolean;
    is_superuser?: boolean;
    newsletter_subscribed?: boolean;
    name?: string;
    last_name?: string;
    company?: string;
    phone?: string;
    city?: string;
    province?: string;
    country?: string;
    rubro?: string;
    work_area?: string;
}

export const getUsers = async () => {
    const response = await api.get<User[]>('/users/');
    return response.data;
};

export const getUser = async (id: number) => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
};

export const createUser = async (user: UserCreate) => {
    const response = await api.post<User>('/users/', user);
    return response.data;
};

export const updateUser = async (id: number, user: UserUpdate) => {
    const response = await api.put<User>(`/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id: number) => {
    await api.delete(`/users/${id}`);
};
