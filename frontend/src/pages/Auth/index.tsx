import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react';

import LogIn from './components/LogIn'
import Register from './components/Register'
import styles from './index.module.scss'
import { Link, useParams } from 'react-router-dom'

import * as I from './types/types';
import { useStore } from '../../stores';
import Header from 'shared/components/Header';
import { ToggleButton } from 'shared/components/ToggleButton';

export const Auth = observer(function Auth({ className }: I.AuthProps) {
    const AuthStyles = cn(
        styles.auth,
        className
    );

    const { authType } = useParams();
    const { authStore } = useStore();
    const [toggleType, setToggleType] = useState<'student' | 'company'>('student');

    useEffect(() => {
        if (authType === 'login' || authType === 'register') {
            authStore.changePath(authType)
        }

        authStore.changeType(toggleType);

    }, [authType, toggleType]);

    const options = [
        { 'student': 'Я студент' },
        { 'company': 'Я компания' }
    ]

    return (
        <>
            <Header />
            <ToggleButton className={styles.toggleButton} toggleClick={setToggleType} options={options} />
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