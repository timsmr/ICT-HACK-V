import React from 'react'
import cn from 'classnames'

import * as I from '../../types/types'
import styles from './index.module.scss'
import { Tag } from 'shared/components/Tag'
import Button from 'shared/components/Button'

export const Card = ({
    name,
    description,
    organizer,
    salary,
    tags,
    className
}: I.CardProps) => {
    const cardStyles = cn(
        styles.card,
        className
    );
    return (
        <div className={cardStyles}>
            <div className={styles.header_organizer}>
                <h2 className={styles.header}>{name.length > 50 ? name.slice(0, 47) + '...' : name}</h2>
                <h2 className={styles.organizer}>{organizer}</h2>
            </div>

            <div className={styles.description_salary}>
                <p className={styles.description}>{(description.length > 100) ? description.slice(0, 97) + '...' : description}</p>
                <p className={styles.salary}>{salary}</p>
            </div>
            <div className={styles.tags_signup}>
                <ul className={styles.tags}>
                    {
                        tags.map((tag: string, i) =>
                            <li key={i} className={styles.tag}><Tag label={tag} /></li>
                        )
                    }
                </ul>
                <Button className={styles.btn_signup} label='Откликнуться' buttonStyle='primary' />
            </div>
        </div>
    )
}