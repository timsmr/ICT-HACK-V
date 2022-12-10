import React from "react";

export type TextareaProps = React.HTMLAttributes<HTMLTextAreaElement> & {
    textareaType?: 'text' | 'date' | 'password',
    textareaStyle?: '' | 'warning',
    textareaPlaceholder: string,
    textareaMaxLength?: number,
    value?: string,
};