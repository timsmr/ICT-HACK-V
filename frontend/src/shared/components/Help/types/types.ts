import React from "react";

export type HelpProps = React.HTMLAttributes<HTMLParagraphElement> & {
    message: string;
    linkMessage?: string;
    link?: string;
};