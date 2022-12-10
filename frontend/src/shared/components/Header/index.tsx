import React, { useState } from 'react'
import "./index.modules.scss"

import Button from 'shared/components/Button';


const Header_ = () => {
    return(
            <header>
                <div className="header-left">
                        <div className="header-logo">
                            <a href ="/" className="header-logo-link"><img src='./img/itmo.png'/></a> 
                        </div>
                </div>
                    <nav>
                            <a href="/" className='menu-link'>Лента</a>
                            <a href="/" className='menu-link'>Компании</a>
                            <a href="/" className='menu-link'>Студенты</a>
                    </nav>

                         <Button
                            label='Создать проект'
                            buttonStyle='primary'
                         /> 


            </header>
        
    )
}

export default Header_;