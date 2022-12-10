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
        ValidateEmail(event.target.value) ? setLoginStyle('') : setLoginStyle('warning');
    }

    const onChangePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(event.target.value);
        setPasswordStyle('');
    }

    const ValidateEmail = (input: string) => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return input.match(validRegex) ? true : false;
    }

    const onSubmit = async () => {

        if (loginValue && passwordValue && ValidateEmail(loginValue)) {
            await axios.post("/student/sign_in", {
                "email": loginValue,
                "password": passwordValue
            })
                .then((res) => {
                    currentUser.setUserToken(res.data.token)
                    localStorage.setItem('userToken', res.data.token)
                })
                .catch((err) => {
                    console.log(err);
                });

            navigate('/feed');
        } else {
            !loginValue && setLoginStyle('warning');
            !passwordValue && setPasswordStyle('warning');
        }
    };

    return (
        <>
            {/* <h1>ВХод</h1> */}
            <InputField
                className='mb-15'
                inputPlaceholder='Email'
                value={loginValue}
                inputType={'email'}
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