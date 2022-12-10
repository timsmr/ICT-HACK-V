import React from "react"

export type FeedProps = {}

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    name: string;
    description: string;
    organizer: string;
    salary?: string;
    tags: string[];
}

export type FilterForm = React.HTMLAttributes<HTMLFormElement> & {

}