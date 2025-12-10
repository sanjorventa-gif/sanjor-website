import axios from './axios';

export interface Newsletter {
    id: number;
    email: string;
    created_at: string;
}

export const subscribeNewsletter = async (email: string) => {
    const response = await axios.post<Newsletter>('/newsletter/', { email });
    return response.data;
};

export const getNewsletters = async () => {
    const response = await axios.get<Newsletter[]>('/newsletter/');
    return response.data;
};

export const deleteNewsletter = async (id: number) => {
    const response = await axios.delete<Newsletter>(`/newsletter/${id}`);
    return response.data;
};
