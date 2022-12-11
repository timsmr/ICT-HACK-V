import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss"

import Button from 'shared/components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderProps } from './types/types';
import { useStore } from 'stores';
import { observer } from 'mobx-react-lite';


const Header = ({ }: HeaderProps) => {

    const navigate = useNavigate();

    const { currentUser } = useStore()

    const [menuTransform, setMenuTransform] = useState(0)

    const onExitClick = () => {
        localStorage.clear()
        currentUser.clear()
        navigate('/')
    }

    useEffect(() => {
        if (menuTransform === 100 && window.innerWidth <= 1055) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'scroll'
        }

    }, [menuTransform])


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
                                {/* <Link to="/feed" className={styles.menuLink}>Компании</Link>
                                <Link to="/feed" className={styles.menuLink}>Студенты</Link> */}
                            </nav>

                            <Button
                                className={styles.headerBtn}
                                label='Создать проект'
                                buttonStyle='primary'
                            />
                        </>
                        : <Button
                            onClick={() => navigate('/auth/login')}
                            className={styles.headerBtn}
                            label='Войти/Зарегистрироваться'
                            buttonStyle='primary'
                        />
                }
                <span onClick={() => menuTransform === 0 ? setMenuTransform(100) : setMenuTransform(0)} className={styles.avatar}></span>
                <div style={{
                    transform: `scaleY(${menuTransform}%)`
                }} className={styles.menu}>
                    <span onClick={() => menuTransform === 0 ? setMenuTransform(100) : setMenuTransform(0)} className={styles.backBtn}></span>
                    {currentUser.userToken
                        ? <>

                            <nav className={styles.menuNav}>
                                <Link onClick={() => setMenuTransform(0)} to="/feed" className={styles.menuLink}>Лента</Link>
                                {/* <Link to="/feed" className={styles.menuLink}>Компании</Link>
                                <Link to="/feed" className={styles.menuLink}>Студенты</Link> */}
                            </nav>
                            <Link onClick={() => setMenuTransform(0)} className={styles.profileLink} to='/profile'>Личный кабинет</Link>
                            <Button onClick={onExitClick} className={styles.exitBtn} label='Выйти' buttonStyle='danger' />
                        </>
                        : <Button
                            onClick={() => {
                                setMenuTransform(0)
                                navigate('/auth/login')
                            }}
                            className={styles.headerBtnMenu}
                            label='Войти/Зарегистрироваться'
                            buttonStyle='primary'
                        />
                    }

                </div>

            </div>
        </header>

    )
}

export default observer(Header);