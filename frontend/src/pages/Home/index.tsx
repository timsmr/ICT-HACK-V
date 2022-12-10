import React, { useEffect } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react';
import styles from './Home.module.scss'

import Footer from 'shared/components/Footer';
import Button from 'shared/components/Button';
import Header from 'shared/components/Header'
import { NavLink } from 'react-router-dom';

export function Home() {
    return (
        <>
            <Header />
        </>

    );


}