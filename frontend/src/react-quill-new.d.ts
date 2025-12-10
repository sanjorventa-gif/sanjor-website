declare module 'react-quill-new' {
    import React from 'react';
    export interface ReactQuillProps {
        value?: string;
        defaultValue?: string;
        onChange?: (content: string, delta: any, source: string, editor: any) => void;
        themes?: string;
        modules?: any;
        formats?: string[];
        bounds?: string | HTMLElement;
        placeholder?: string;
        readOnly?: boolean;
        theme?: string;
        id?: string;
        className?: string;
        style?: React.CSSProperties;
        children?: React.ReactNode;
        ref?: any;
    }
    export default class ReactQuill extends React.Component<ReactQuillProps> { }
}
