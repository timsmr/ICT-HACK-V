import React, { useEffect } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react';

import LogIn from './components/LogIn'
import Register from './components/Register'
import styles from './index.module.scss'
import { Link, useParams } from 'react-router-dom'

import * as I from './types/types';
import { useStore } from '../../stores';
import Header from 'shared/components/Header';

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
        <>
            <Header />
            <div className={AuthStyles}>

                {
                    authType === 'login'
                        ? <LogIn />
                        : authType === 'register'
                        && <Register />
                }
            </div>
        </>
    )
});