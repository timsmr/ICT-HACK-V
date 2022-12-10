import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import * as I from './types/types';

export const BackButton = ({ className }: I.BackButtonProps) => {
    const backButtonStyles = cn(
        styles.backButton,
        className
    );

    return (
        <span className={backButtonStyles}></span>
    );
};