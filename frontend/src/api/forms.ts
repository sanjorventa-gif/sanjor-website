import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'textarea' | 'number' | 'date' | 'select';
    required: boolean;
    options?: string[];
}

export interface Form {
    id: number;
    title: string;
    slug: string;
    description: string;
    fields: FormField[];
    is_active: boolean;
    created_at: string;
    updated_at?: string;
}

export interface FormSubmission {
    id: number;
    form_id: number;
    data: Record<string, any>;
    created_at: string;
}

// Public
export const getPublicForms = async () => {
    const response = await axios.get<Form[]>(`${API_URL}/forms/`);
    return response.data;
};

export const getFormBySlug = async (slug: string) => {
    const response = await axios.get<Form>(`${API_URL}/forms/${slug}`);
    return response.data;
};

export const submitForm = async (slug: string, data: Record<string, any>) => {
    const response = await axios.post<FormSubmission>(`${API_URL}/forms/${slug}/submit`, { data });
    return response.data;
};

// Admin
export const createForm = async (token: string, form: Omit<Form, 'id' | 'created_at' | 'updated_at'>) => {
    const response = await axios.post<Form>(`${API_URL}/forms/`, form, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateForm = async (token: string, id: number, form: Partial<Form>) => {
    const response = await axios.put<Form>(`${API_URL}/forms/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteForm = async (token: string, id: number) => {
    const response = await axios.delete<Form>(`${API_URL}/forms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getFormSubmissions = async (token: string, id: number) => {
    const response = await axios.get<FormSubmission[]>(`${API_URL}/forms/${id}/submissions`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
