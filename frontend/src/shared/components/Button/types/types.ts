import React from "react";

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    label: string;
    buttonStyle?: '' | 'primary' | 'info' | 'danger' | 'shuffle';
    fsz?: number;
    onClick?: () => void;
};