import React from 'react';
import styles from './index.module.scss';
import cn from 'classnames';

import * as I from './types/types';

const Textarea = ({ textareaStyle = '', textareaPlaceholder, textareaMaxLength, value, onChange, className }: I.TextareaProps) => {
    const textareaStyles = cn(
        styles.textareaField,
        styles[`style_${textareaStyle}`],
        className
    )

    return (
        <>
            <textarea
                value={value}
                onChange={onChange}
                className={textareaStyles}
                placeholder={textareaPlaceholder}
                maxLength={textareaMaxLength}
            >
            </textarea>

        </>
    );
};

export default Textarea;