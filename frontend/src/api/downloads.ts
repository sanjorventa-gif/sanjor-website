import api from './axios';

export interface Download {
    id: number;
    title: string;
    description?: string;
    file_url: string;
    category: string;
    language: string;
    allowed_roles: string[];
    created_at: string;
}

export interface DownloadCreate {
    title: string;
    description?: string;
    file_url: string;
    category: string;
    language: string;
    allowed_roles: string[];
}

export interface DownloadUpdate {
    title?: string;
    description?: string;
    file_url?: string;
    category?: string;
    language?: string;
    allowed_roles?: string[];
}

export const getDownloads = async (): Promise<Download[]> => {
    const response = await api.get('/downloads/');
    return response.data;
};

export const createDownload = async (data: DownloadCreate): Promise<Download> => {
    const response = await api.post('/downloads/', data);
    return response.data;
};

export const updateDownload = async (id: number, data: DownloadUpdate): Promise<Download> => {
    const response = await api.put(`/downloads/${id}`, data);
    return response.data;
};

export const deleteDownload = async (id: number): Promise<Download> => {
    const response = await api.delete(`/downloads/${id}`);
    return response.data;
};
