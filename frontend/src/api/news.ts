import api from './axios';

export interface News {
    id: number;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    image: string;
    slug?: string;
    content?: string;
    allowed_roles?: string[];
}

export interface NewsCreate {
    title: string;
    date: string;
    category: string;
    excerpt: string;
    image: string;
    content?: string;
    allowed_roles?: string[];
}

export interface NewsUpdate {
    title?: string;
    date?: string;
    category?: string;
    excerpt?: string;
    image?: string;
    content?: string;
    allowed_roles?: string[];
}

export const getNews = async () => {
    const response = await api.get<News[]>('/news/');
    return response.data;
};

export const getNewsItem = async (id: number) => {
    const response = await api.get<News>(`/news/${id}`);
    return response.data;
};

export const getNewsBySlug = async (slug: string) => {
    const response = await api.get<News>(`/news/slug/${slug}`);
    return response.data;
};

export const createNews = async (news: NewsCreate) => {
    const response = await api.post<News>('/news/', news);
    return response.data;
};

export const updateNews = async (id: number, news: NewsUpdate) => {
    const response = await api.put<News>(`/news/${id}`, news);
    return response.data;
};

export const deleteNews = async (id: number) => {
    await api.delete(`/news/${id}`);
};
