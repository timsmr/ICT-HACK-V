import React, { useEffect } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react';

import LogIn from './components/LogIn'
import Register from './components/Register'
import styles from './index.module.scss'
import { BackButton } from '../../shared/components/BackButton'
import { Link, useParams } from 'react-router-dom'

import * as I from './types/types';
import { useStore } from '../../stores';

export const Auth = observer(function Auth({ className }: I.AuthProps) {
    const AuthStyles = cn(
        styles.auth,
        className
    );

    const { authType } = useParams();
    const { authStore } = useStore();

    useEffect(() => {
        if (authType === 'login' || authType === 'register') {
            authStore.changePath(authType)
        }
    }, [authType]);

    return (
        <div className={AuthStyles}>
            <Link to='/' ><BackButton /></Link>
            {
                authType === 'login'
                    ? <LogIn />
                    : authType === 'register'
                    && <Register />
            }
        </div>
    )
});