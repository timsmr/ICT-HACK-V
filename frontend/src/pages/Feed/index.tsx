import React from 'react'
import Button from 'shared/components/Button'
import Header from 'shared/components/Header'
import { Tag } from 'shared/components/Tag'
import { ToggleButton } from 'shared/components/ToggleButton'
import { Card } from './components/Card'

import styles from './index.module.scss'

import * as I from './types/types'

export const Feed = ({ }: I.FeedProps) => {

    const options = [
        { 'projects': 'Проекты' },
        { 'vacancy': 'Вакансии' },
        { 'internship': 'Стажировки' },
    ]

    return (
        <>
            <Header />

            <ToggleButton className={styles.toggleButton} options={options} />

            <Card
                className={styles.card}
                name='Супер крутая вакансия'
                description='Описание крутой вакансии и типа приколы всякие чем занимаемся бабки бабки бакалея фрукты овощи покупай ананасы недорого дешевле рынка... выпей соку порадуй свою женщину сладким писюнчиком'
                organizer='Организатор'
                salary='50 000 руб/мес'
                tags={['python', 'machine learning']}
            />

            <Card
                className={styles.card}
                name='Супер крутой проект'
                description='Описание крутой вакансии и типа приколы всякие чем занимаемся бабки бабки бакалея фрукты овощи покупай ананасы недорого дешевле рынка... выпей соку порадуй свою женщину сладким писюнчиком'
                organizer='Организатор'
                tags={['python', 'machine learning']}
            />

            <Card
                className={styles.card}
                name='Супер крутая вакансия'
                description='Описание крутой вакансии и типа приколы всякие чем занимаемся бабки бабки бакалея фрукты овощи покупай ананасы недорого дешевле рынка... выпей соку порадуй свою женщину сладким писюнчиком'
                organizer='Организатор'
                salary='50 000 руб/мес'
                tags={['python', 'machine learning']}
            />

        </>
    )
}