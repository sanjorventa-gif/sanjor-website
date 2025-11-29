import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../data/products';
import { getProducts, createProduct, deleteProduct, reorderProducts as reorderProductsApi, updateProduct as apiUpdateProduct } from '../api/products';
import { products as initialProducts } from '../data/products';

interface ProductContextType {
    products: Product[];
    addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
    removeProduct: (id: number | string) => Promise<void>;
    reorder: (products: Product[]) => Promise<void>;
    editProduct: (id: number | string, product: Partial<Product>) => Promise<void>;
    isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            // Fallback to local data if API fails (for demo purposes)
            console.log('Falling back to local data');
            setProducts(initialProducts);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (newProduct: Omit<Product, 'id'>) => {
        try {
            const createdProduct = await createProduct(newProduct);
            setProducts((prev) => [...prev, createdProduct]);
        } catch (error) {
            console.error('Failed to add product:', error);
            alert('Error al guardar en el servidor. Verifique que el backend esté corriendo.');
        }
    };

    const removeProduct = async (id: number | string) => {
        try {
            await deleteProduct(id);
            setProducts((prev) => prev.filter((p) => p.id != id));
        } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Error al eliminar del servidor.');
        }
    };

    const reorder = async (newOrder: Product[]) => {
        // Optimistic update: Update the 'order' property for each item to match its new index
        const updatedOrder = newOrder.map((p, index) => ({ ...p, order: index }));
        setProducts(updatedOrder);
        try {
            const orderData = newOrder.map((p, index) => ({ id: p.id, order: index }));
            await reorderProductsApi(orderData);
        } catch (error) {
            console.error('Failed to reorder products:', error);
            alert('Error al guardar el orden.');
            // Revert? For now, just alert.
        }
    };

    const editProduct = async (id: number | string, updatedData: Partial<Product>) => {
        try {
            const updatedProduct = await apiUpdateProduct(id, updatedData);
            setProducts((prev) => prev.map((p) => (p.id == id ? updatedProduct : p)));
        } catch (error) {
            console.error('Failed to update product:', error);
            alert('Error al actualizar el producto.');
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, removeProduct, reorder, editProduct, isLoading }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}
