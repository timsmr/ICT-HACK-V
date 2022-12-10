import React from "react";

export type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
    label: string;
}