import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import * as I from './types/types'

export const Tag = ({ label, className }: I.TagProps) => {
    const tagStyles = cn(
        styles.tag,
        className
    );
    return (
        <span
            className={tagStyles}
            style={{
                backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, .5)`
            }}
        >
            {label}
        </span>
    )
}