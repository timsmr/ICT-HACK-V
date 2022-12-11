import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import * as I from './types/types'

export const ToggleButton = ({ toggleClick, options, className }: I.ToggleButtonProps) => {
    const toggleButtonStyles = cn(
        styles.toggleButton,
        className
    );

    const [option, setOption] = React.useState(Object.keys(options[0])[0]);

    const onOptionClick = (event: any) => {
        setOption(event.target.id)
        toggleClick(event.target.id)
    }

    return (
        <div className={toggleButtonStyles}>

            {
                options.map((obj: any, i) => {

                    const index = Object.keys(obj)[0];

                    return <p
                        key={i}
                        onClick={onOptionClick}
                        id={index}
                        className={option === index ? styles.active : styles.notActive}
                        style={{
                            width: `${95 / options.length}%`
                        }}
                    >
                        {obj[index]}
                    </p>
                })
            }

        </div>
    )
}