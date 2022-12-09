import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import * as I from './types/types';

const Header = ({ text, headerStyle = 'normal', className, }: I.HeaderProps) => {
    const headerStyles = cn(
        styles.header,
        styles[`style_${headerStyle}`],
        className
    );

    return (
        <h1 className={headerStyles}>{text}</h1>
    );
}

export default Header;