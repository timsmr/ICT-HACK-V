import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';
import { BackButton } from '../../shared/components/BackButton';
import Header from '../../shared/components/Header';

import * as I from './types/types';

export const NotFound = ({ className, }: I.NotFoundProps) => {
    const NotFoundStyles = cn(
        styles.auth,
        className
    );

    return (
        <div className={NotFoundStyles}>
            <Link to='/' ><BackButton /></Link>
            <Header text='404 Страница не найдена' />
        </div>
    );
};