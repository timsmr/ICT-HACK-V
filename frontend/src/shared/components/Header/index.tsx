import React, { useState } from 'react'
import styles from "./index.module.scss"

import Button from 'shared/components/Button';
import { Link } from 'react-router-dom';
import { HeaderProps } from './types/types';


const Header = ({ }: HeaderProps) => {

    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.headerLeft}>
                    <Link to="/" className="header-logo-link">
                        <img className={styles.headerLogo} src='./img/itmo.png' />
                    </Link>
                </div>
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

                <span className={styles.avatar}></span>
            </div>
        </header>

    )
}

export default Header;