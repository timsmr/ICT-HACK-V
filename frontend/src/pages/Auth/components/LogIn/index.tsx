import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStore } from 'stores';

import Button from '../../../../shared/components/Button'
// import Header from '../../../../shared/components/Header';
import Help from '../../../../shared/components/Help';
import InputField from '../../../../shared/components/InputField'
import { InputStyle } from 'shared/components/InputField/types/types';
import styles from "./index.module.scss"

import * as I from '../types/types';
import { stepLabelClasses } from '@mui/material';

const LogIn = ({ }: I.LogInProps) => {

    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [loginStyle, setLoginStyle] = useState<InputStyle>('');
    const [passwordStyle, setPasswordStyle] = useState<InputStyle>('');
    const { currentUser } = useStore();
    const navigate = useNavigate();

    const onChangeLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginValue(event.target.value);
        setLoginStyle('');
    }

    const onChangePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(event.target.value);
        setPasswordStyle('');
    }

    const onSubmit = async () => {

        if (loginValue && passwordValue) {
            await axios.post("/auth/login", {
                "grant_type": "password",
                "username": loginValue,
                "password": passwordValue
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    currentUser.setUserToken(res.data.access_token)
                    localStorage.setItem('userToken', res.data.access_token)
                })
                .catch((err) => {
                    console.log(err);
                });

            navigate('/');
        } else {
            !loginValue && setLoginStyle('warning');
            !passwordStyle && setPasswordStyle('warning');
        }
    };

    return (
        <>
            {/* <Header className='mb-23' text='Вход' /> */}
            <InputField
                className='mb-15'
                inputPlaceholder='Логин'
                value={loginValue}
                inputStyle={loginStyle}
                onChange={onChangeLoginInput}
            />

            <InputField
                className='mb-15'
                inputPlaceholder='Пароль'
                inputType={'password'}
                value={passwordValue}
                inputStyle={passwordStyle}
                onChange={onChangePasswordInput}
            />
            <Button label='Войти' buttonStyle='primary' onClick={onSubmit} />
            <Help className={styles.moveLink} message='Нет аккаунта?' linkMessage='Тыкни на меня!' link='/auth/register' />
        </>
    );
}

export default LogIn;