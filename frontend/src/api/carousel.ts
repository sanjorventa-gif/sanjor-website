import api from './axios';

export interface CarouselItem {
    id: number;
    title: string;
    subtitle?: string;
    image: string;
    order: number;
    button_text?: string;
    button_link?: string;
    transition_effect?: string;
    overlay_effect?: string;
}

export interface CarouselItemCreate {
    title: string;
    subtitle?: string;
    image: string;
    order?: number;
    button_text?: string;
    button_link?: string;
    transition_effect?: string;
    overlay_effect?: string;
}

export interface CarouselItemUpdate {
    title?: string;
    subtitle?: string;
    image?: string;
    order?: number;
    button_text?: string;
    button_link?: string;
    transition_effect?: string;
    overlay_effect?: string;
}

export const getCarouselItems = async (): Promise<CarouselItem[]> => {
    const response = await api.get('/carousel/');
    return response.data;
};

export const getCarouselItem = async (id: number): Promise<CarouselItem> => {
    const response = await api.get(`/carousel/${id}`);
    return response.data;
};

export const createCarouselItem = async (data: CarouselItemCreate): Promise<CarouselItem> => {
    const response = await api.post('/carousel/', data);
    return response.data;
};

export const updateCarouselItem = async (id: number, data: CarouselItemUpdate): Promise<CarouselItem> => {
    const response = await api.put(`/carousel/${id}`, data);
    return response.data;
};

export const deleteCarouselItem = async (id: number): Promise<CarouselItem> => {
    const response = await api.delete(`/carousel/${id}`);
    return response.data;
};
