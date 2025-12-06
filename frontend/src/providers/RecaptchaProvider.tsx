import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface RecaptchaProviderProps {
    children: React.ReactNode;
}

export const RecaptchaProvider: React.FC<RecaptchaProviderProps> = ({ children }) => {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            scriptProps={{
                async: false,
                defer: false,
                appendTo: 'head',
                nonce: undefined,
            }}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
};
