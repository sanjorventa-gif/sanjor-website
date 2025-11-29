import api from './axios';
import type { Product } from '../data/products';

const mapToFrontend = (data: any): Product => ({
    ...data,
    technicalSheet: data.technical_sheet,
});

const mapToBackend = (data: Partial<Product>): any => {
    const { technicalSheet, ...rest } = data;
    return {
        ...rest,
        technical_sheet: technicalSheet,
    };
};

export const getProducts = async () => {
    const response = await api.get<any[]>('/products/');
    return response.data.map(mapToFrontend);
};

export const createProduct = async (product: Omit<Product, 'id'>) => {
    const response = await api.post<any>('/products/', mapToBackend(product));
    return mapToFrontend(response.data);
};

export const updateProduct = async (id: string | number, product: Partial<Product>) => {
    const response = await api.put<any>(`/products/${id}`, mapToBackend(product));
    return mapToFrontend(response.data);
};

export const deleteProduct = async (id: string | number): Promise<void> => {
    await api.delete(`/products/${id}`);
};

export const reorderProducts = async (orderedProducts: { id: number | string; order: number }[]): Promise<void> => {
    await api.put('/products/reorder', orderedProducts);
};
