import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { login as apiLogin, getMe, register as apiRegister } from '../api/auth';
import { type User } from '../api/users';

export interface RegisterData {
    email: string;
    password: string;
    role: string;
    newsletter_subscribed?: boolean;
    name?: string;
    last_name?: string;
    company?: string;
    phone?: string;
    city?: string;
    province?: string;
    country?: string;
    rubro?: string;
    work_area?: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await getMe();
                    setUser(userData);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                    localStorage.removeItem('token');
                }
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const data = await apiLogin(email, password);
            localStorage.setItem('token', data.access_token);
            const userData = await getMe();
            setUser(userData);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error: any) {
            console.error('Login failed:', error);
            const errorMessage = error.response?.data?.detail || 'Error al iniciar sesión';
            return { success: false, error: errorMessage };
        }
    };

    const register = async (data: RegisterData) => {
        try {
            setIsLoading(true);
            await apiRegister(data);
            return { success: true };
            // Note: We don't auto-login here because user might be inactive (distributor)
        } catch (error: any) {
            console.error('Registration failed:', error);
            const errorMessage = error.response?.data?.detail || 'Error al registrarse';
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
