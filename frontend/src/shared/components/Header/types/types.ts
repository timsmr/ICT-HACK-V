import React from "react";

export type HeaderProps = React.HTMLAttributes<HTMLHeadingElement> & {
    text: string;
    headerStyle?: 'normal' | 'bold' | 'code' | 'italic';
}