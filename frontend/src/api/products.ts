import api from './axios';
import type { Product } from '../data/products';

export const getProducts = async () => {
    const response = await api.get<Product[]>('/products/');
    return response.data;
};

export const createProduct = async (product: Omit<Product, 'id'>) => {
    const response = await api.post<Product>('/products/', product);
    return response.data;
};

export const updateProduct = async (id: number, product: Partial<Product>) => {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
};

export const reorderProducts = async (orderedProducts: { id: number; order: number }[]): Promise<void> => {
    await api.put('/products/reorder', orderedProducts);
};
