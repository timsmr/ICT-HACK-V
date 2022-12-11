import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStore } from 'stores';

import Button from '../../../../shared/components/Button'

import Help from '../../../../shared/components/Help';
import Textarea from 'shared/components/Textarea'
import InputField from '../../../../shared/components/InputField'
import { InputStyle } from 'shared/components/InputField/types/types';
import styles from './index.module.scss';

import * as I from '../types/types';
import axios from 'axios';
import { observer } from 'mobx-react';

const Register = ({ }: I.RegisterProps) => {


    const [firstNameValue, setFirstNameValue] = useState('');
    const [lastNameValue, setLastNameValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [firstNameStyle, setFirstNameStyle] = useState<InputStyle>('');
    const [lastNameStyle, setLastNameStyle] = useState<InputStyle>('');
    const [phoneStyle, setPhoneStyle] = useState<InputStyle>('');
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [secondPasswordValue, setSecondPasswordValue] = useState('');
    const [loginStyle, setLoginStyle] = useState<InputStyle>('');
    const [passwordStyle, setPasswordStyle] = useState<InputStyle>('');
    const [secondPasswordStyle, setSecondPasswordStyle] = useState<InputStyle>('');

    const [companyNameValue, setCompanyNameValue] = useState('');
    const [companyNameStyle, setCompanyNameStyle] = useState<InputStyle>('');

    const { currentUser, authStore } = useStore();
    const navigate = useNavigate();

    const onChangeFirstNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstNameValue(event.target.value);
        setFirstNameStyle('');
    }

    const onChangeLastNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastNameValue(event.target.value);
        setLastNameStyle('');
    }

    const onChangePhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneValue(event.target.value);
        setPhoneStyle('');
    }

    const onChangeLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginValue(event.target.value);
        setLoginStyle('');
    }

    const onChangePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(event.target.value);
        setPasswordStyle('');
    }

    const onChangeSecondPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSecondPasswordValue(event.target.value);
        setSecondPasswordStyle('');
    }

    const onChangeCompanyNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyNameValue(event.target.value);
        setCompanyNameStyle('');
    }

    const onNextClick = async () => {
        if (authStore.type === 'student') {
            if (passwordValue === secondPasswordValue && loginValue && passwordValue && firstNameValue && lastNameValue && phoneValue) {
                await axios.post('/student/create_user', {
                    "first_name": firstNameValue,
                    "last_name": lastNameValue,
                    "bio": "",
                    "education": "",
                    "hard_soft_skills": "",
                    "projects": "",
                    "telegram": "",
                    "email": loginValue,
                    "phone_number": phoneValue,
                    "linkedin": "",
                    "site": "",
                    "password": passwordValue
                })
                    .then((res) => {
                        console.log(res)
                        currentUser.setUserToken(res.data.token)
                        localStorage.setItem('userToken', res.data.token)
                        navigate('/feed')
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                !loginValue && setLoginStyle('warning');
                !firstNameValue && setFirstNameStyle('warning')
                !lastNameValue && setLastNameStyle('warning')
                !phoneValue && setPhoneStyle('warning')
                if (passwordValue !== secondPasswordValue || !passwordValue) {
                    setPasswordStyle('warning');
                    setSecondPasswordStyle('warning');
                }
            }
        } else {
            if (passwordValue === secondPasswordValue && loginValue && passwordValue && companyNameValue) {
                await axios.post('/organization/create_organization', {
                    "name": companyNameValue,
                    "description": "",
                    "email": loginValue,
                    "contacts": "",
                    "specialization": "",
                    "password": passwordValue
                })
                    .then((res) => {
                        console.log(res)
                        currentUser.setUserToken(res.data.token)
                        localStorage.setItem('userToken', res.data.token)
                        navigate('/feed')
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                !loginValue && setLoginStyle('warning');
                !companyNameValue && setCompanyNameStyle('warning');
                if (passwordValue !== secondPasswordValue || !passwordValue) {
                    setPasswordStyle('warning');
                    setSecondPasswordStyle('warning');
                }
            }
        }
    }

    return (
        <>
            {
                authStore.type === 'student'
                    ? <>
                        <InputField
                            className='mb-15'
                            inputPlaceholder='Фамилия'
                            value={lastNameValue}
                            inputStyle={lastNameStyle}
                            onChange={onChangeLastNameInput}
                        />
                        <InputField
                            className='mb-15'
                            inputPlaceholder='Имя'
                            value={firstNameValue}
                            inputStyle={firstNameStyle}
                            onChange={onChangeFirstNameInput}
                        />
                        <InputField
                            className='mb-15'
                            inputPlaceholder='Номер телефона'
                            value={phoneValue}
                            inputStyle={phoneStyle}
                            onChange={onChangePhoneInput}
                        />
                    </>
                    : <>
                        <InputField
                            className='mb-15'
                            inputPlaceholder='Название'
                            value={companyNameValue}
                            inputStyle={companyNameStyle}
                            onChange={onChangeCompanyNameInput}
                        />
                    </>
            }
            <InputField
                className='mb-15'
                inputPlaceholder='Email'
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
            <InputField
                className='mb-15'
                inputPlaceholder='Повторите пароль'
                inputType={'password'}
                value={secondPasswordValue}
                inputStyle={secondPasswordStyle}
                onChange={onChangeSecondPasswordInput}
            />
            <Button label='Зарегистрироваться' buttonStyle='primary' onClick={onNextClick} />
            <Help className={styles.loginLink} message='Есть аккаунт?' linkMessage='Тыкни на меня!' link='/auth/login' />
            <p className='auth__help'>
                <a className='auth__help__link'></a>
            </p>
        </>
    )
}

export default observer(Register);


