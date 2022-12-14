import React from "react";

export interface Option {
    [name: string]: string;
}

export type ToggleButtonProps = React.HTMLAttributes<HTMLSpanElement> & {
    toggleClick?: any;
    options: any[];
}