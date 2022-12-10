import React, { useState } from 'react'
import "./index.modules.scss"

const Footer = () => {
    return(
        <div className="container">
            <div className="row">
                <div className="footer-item">
                    <p>Ломоносова, д. 9А, ауд. 2100<br/>
                        Санкт-Петербург, Россия,<br/>
                        197101 +7 (999) 237-52-09<br/>
                        itmodogitalplatform@gmail.ru</p>
                </div>
                <div className="footer-item">
                    <p>Цифровая Платформа<br/>
                        ИТМО x ПИШ2022</p>
                </div>
                <div className="footer-item">
                    <img src='/img/pngaaa.com-4886998.png'/>
                </div>
            </div>
        </div>
    )
}

export default Footer;