import React, { useState } from 'react'
import styles from "./index.module.scss"

import Button from 'shared/components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderProps } from './types/types';
import { useStore } from 'stores';
import { observer } from 'mobx-react-lite';


const Header = ({ }: HeaderProps) => {

    const navigate = useNavigate();

    const { currentUser } = useStore()

    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>



                <div className={styles.headerLeft}>
                    <Link to="/" className="header-logo-link">
                        <img className={styles.headerLogo} src='./img/itmo.png' />
                    </Link>
                </div>

                {
                    currentUser.userToken
                        ? <>
                            <nav className={styles.nav}>
                                <Link to="/feed" className={styles.menuLink}>Лента</Link>
                                <Link to="/feed" className={styles.menuLink}>Компании</Link>
                                <Link to="/feed" className={styles.menuLink}>Студенты</Link>
                            </nav>

                            <Button
                                className={styles.headerBtn}
                                label='Создать проект'
                                buttonStyle='primary'
                            />

                            <span onClick={() => navigate('/profile')} className={styles.avatar}></span>
                        </>
                        : <Button
                            onClick={() => navigate('/auth/login')}
                            className={styles.headerBtn}
                            label='Войти/Зарегистрироваться'
                            buttonStyle='primary'
                        />
                }

            </div>
        </header>

    )
}

export default observer(Header);