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

    const [nameValue, setNameValue] = useState('');
    const [preferencesValue, setPreferencesValue] = useState('');
    const [nameStyle, setNameStyle] = useState<InputStyle>('');

    const [isValidated, setIsValidated] = useState(false);

    const { currentUser } = useStore();
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

    const onChangeNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value);
        setNameStyle('');
    }

    const onChangePreferencesInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPreferencesValue(event.target.value);
    }

    const onNextClick = () => {
        if (passwordValue === secondPasswordValue && loginValue && passwordValue && firstNameValue && lastNameValue && phoneValue) {
            setIsValidated(true)
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
    }

    const onSubmit = async () => {

        if (nameValue) {
            await axios.post('/auth/create_user', {
                "name": nameValue,
                "email": loginValue,
                "preferences": preferencesValue,
                "password": passwordValue
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios.post("/auth/login", {
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
            setNameStyle('warning');
        }


    };

    return (
        <>
            {
                isValidated
                    ? <>
                        <InputField
                            className={styles.inputRegisterDetail}
                            inputPlaceholder='Имя'
                            inputStyle={firstNameStyle}
                            value={firstNameValue}
                            onChange={onChangeNameInput}
                        />
                        <Textarea
                            className={styles.textareaRegisterDetail}
                            textareaPlaceholder='Подсказка для подарка...'
                            value={preferencesValue}
                            onChange={onChangePreferencesInput}
                        />
                        <Button
                            className={styles.buttonRegisterDetail}
                            label='Готово'
                            buttonStyle='primary'
                            onClick={onSubmit}
                        />
                    </>
                    : <>
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
                        <Button label='Далее' buttonStyle='primary' onClick={onNextClick} />
                        <Help className={styles.loginLink} message='Есть аккаунт?' linkMessage='Тыкни на меня!' link='/auth/login' />
                        <p className='auth__help'>
                            <a className='auth__help__link'></a>
                        </p>
                    </>
            }
        </>
    )
}

export default Register;


