import api from './axios';

export interface History {
    id: number;
    year: number;
    title: string;
    description: string;
    image?: string;
    order: number;
}

export const getHistory = async () => {
    const response = await api.get<History[]>('/history/');
    return response.data;
};

export const createHistory = async (data: Omit<History, 'id' | 'order'>) => {
    const response = await api.post<History>('/history/', data);
    return response.data;
};

export const updateHistory = async (id: number, data: Partial<History>) => {
    const response = await api.put<History>(`/history/${id}`, data);
    return response.data;
};

export const deleteHistory = async (id: number) => {
    const response = await api.delete<History>(`/history/${id}`);
    return response.data;
};

export const reorderHistory = async (orderedHistory: { id: number; order: number }[]) => {
    const response = await api.put<History[]>('/history/reorder', orderedHistory);
    return response.data;
};
