import React from 'react'
import Button from 'shared/components/Button'
import Footer from 'shared/components/Footer'
import Header from 'shared/components/Header'
import InputField from 'shared/components/InputField'
import { Tag } from 'shared/components/Tag'
import Textarea from 'shared/components/Textarea'
import { ToggleButton } from 'shared/components/ToggleButton'
import { useStore } from 'stores'

import styles from './index.module.scss'

import * as I from './types/types'

export const Profile = ({ }: I.ProfileProps) => {

    const options = [
        { 'my_data': 'Личные данные' },
        { 'responses': 'Отклики' },
        { 'my_resumes': 'Мои резюме' },
        { 'my_projects': 'Мои проекты' },
    ]

    const { currentUser } = useStore()

    return (
        <>
            <Header />
            <ToggleButton className={styles.toggleButton} options={options} />

            {
                currentUser.userType === 'student'
                    ? <ul className={styles.my_data}>
                        <li className={styles.data_line}>
                            Имя <br /><br />
                            <InputField className={styles.inputField} inputPlaceholder='Имя' />
                        </li>
                        <li className={styles.data_line}>
                            Фамилия <br /><br />
                            <InputField className={styles.inputField} inputPlaceholder='Фамилия' />
                        </li>
                        <li className={styles.data_line}>
                            Специализация <br /><br />
                            <InputField className={styles.inputField} inputPlaceholder='Специализация' />
                        </li>
                        <li className={styles.data_line}>
                            Образование <br /><br />
                            <Textarea className={styles.inputField} textareaPlaceholder='Образование' />
                        </li>
                        <li className={styles.data_line}>
                            Hard & soft skills <br /><br />
                            <Textarea className={styles.inputField} textareaPlaceholder='Hard & soft skills' />
                        </li>
                        <li className={styles.data_line}>
                            Участие в проектах <br /><br />
                            <Textarea className={styles.inputField} textareaPlaceholder='Участие в проектах' />
                        </li>
                        <li className={styles.data_line}>
                            О себе <br /><br />
                            <Textarea className={styles.inputField} textareaPlaceholder='О себе' />
                        </li>
                        <Button className={styles.save_btn} label='Сохранить' buttonStyle='primary' />
                    </ul>
                    :
                    <ul className={styles.my_data}>
                        <li className={styles.data_line}>
                            Название <br /><br />
                            <InputField value={currentUser?.name ? currentUser.name : ''} className={styles.inputField} inputPlaceholder='Название' />
                        </li>
                        <li className={styles.data_line}>
                            Специализация <br /><br />
                            <InputField value={currentUser?.specialization ? currentUser.specialization : ''} className={styles.inputField} inputPlaceholder='Специализация' />
                        </li>
                        <li className={styles.data_line}>
                            Описание <br /><br />
                            <Textarea value={currentUser?.description ? currentUser.description : ''} className={styles.inputField} textareaPlaceholder='Описание' />
                        </li>
                        <Button className={styles.save_btn} label='Сохранить' buttonStyle='primary' />
                    </ul>
            }



            <Footer />
        </>
    )
}