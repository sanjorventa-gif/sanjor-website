import axios from './axios';

export interface ServiceRequest {
    id: number;
    name: string;
    last_name?: string;
    company?: string;
    email: string;
    phone: string;
    city: string;
    province?: string;
    country?: string;
    address?: string;
    stove_model: string;
    serial_number: string;
    rubro?: string;
    work_area?: string;
    purchase_date: string;
    problem_description: string;
    status: string;
    created_at: string;
}

export interface ServiceRequestCreate {
    name: string;
    email: string;
    phone: string;
    city: string;
    address?: string;
    stove_model: string;
    serial_number: string;
    rubro?: string;
    work_area?: string;
    purchase_date?: string;
    problem_description: string;
    recaptcha_token?: string;
}

export const createServiceRequest = async (data: ServiceRequestCreate): Promise<ServiceRequest> => {
    const response = await axios.post('/services/service-requests', data);
    return response.data;
};

export const getServiceRequests = async (skip = 0, limit = 100): Promise<ServiceRequest[]> => {
    const response = await axios.get(`/services/service-requests?skip=${skip}&limit=${limit}`);
    return response.data;
};

export const getMyServiceRequests = async (skip = 0, limit = 100): Promise<ServiceRequest[]> => {
    const response = await axios.get(`/services/service-requests/me?skip=${skip}&limit=${limit}`);
    return response.data;
};

export const updateServiceRequestStatus = async (id: number, status: string): Promise<ServiceRequest> => {
    const response = await axios.put(`/services/service-requests/${id}/status`, { status });
    return response.data;
};

export const deleteServiceRequest = async (id: number): Promise<ServiceRequest> => {
    const response = await axios.delete(`/services/service-requests/${id}`);
    return response.data;
};
