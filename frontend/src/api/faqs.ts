import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface Faq {
    id: number;
    question: string;
    answer: string;
    order: number;
    is_active: boolean;
}

export interface FaqFormData {
    question: string;
    answer: string;
    order: number;
    is_active: boolean;
}

export const getFaqs = async (isAdmin: boolean = false): Promise<Faq[]> => {
    const endpoint = isAdmin ? '/faqs/admin' : '/faqs';
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(`${API_URL}${endpoint}`, { headers });
    return response.data;
};

export const createFaq = async (data: FaqFormData): Promise<Faq> => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/faqs`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateFaq = async (id: number, data: FaqFormData): Promise<Faq> => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/faqs/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteFaq = async (id: number): Promise<Faq> => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/faqs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getFaqById = async (id: number): Promise<Faq> => {
    // Since we don't have a specific endpoint for single FAQ public/admin, 
    // we can reuse the admin list and filter, or add a specific endpoint. 
    // For now, let's fetch all admin and find.
    const faqs = await getFaqs(true);
    const faq = faqs.find(f => f.id === id);
    if (!faq) throw new Error('FAQ not found');
    return faq;
};
