import React, { useState } from 'react'
import styles from "./index.module.scss"

const Footer = () => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.row}>
                <div className={styles.footerItem}>
                    Ломоносова, д. 9А, ауд. 2100<br />
                    Санкт-Петербург, Россия,<br />
                    197101 +7 (999) 237-52-09<br />
                    itmodogitalplatform@gmail.ru
                </div>
                <div className={styles.footerItem}>
                    Цифровая Платформа<br />
                    ИТМО x ПИШ2022
                </div>
                <div className={styles.footerItem}>
                    <img className={styles.telegramLogo} src='/img/pngaaa.com-4886998.png' />
                </div>
            </div>
        </div>
    )
}

export default Footer;