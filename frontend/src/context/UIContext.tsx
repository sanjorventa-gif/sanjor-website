import { createContext, useContext, useState, type ReactNode } from 'react';

interface UIContextType {
    isNewsletterOpen: boolean;
    onOpenNewsletter: () => void;
    onCloseNewsletter: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
    const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

    const onOpenNewsletter = () => setIsNewsletterOpen(true);
    const onCloseNewsletter = () => setIsNewsletterOpen(false);

    return (
        <UIContext.Provider value={{ isNewsletterOpen, onOpenNewsletter, onCloseNewsletter }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
