import React from 'react';
import styles from './index.module.scss';
import cn from 'classnames';

import * as I from './types/types';

const InputField = ({ inputType = 'text', inputStyle = '', inputPlaceholder, inputMaxLength, value, onChange, className }: I.InputFieldProps) => {
    const inputStyles = cn(
        styles.inputField,
        styles[`style_${inputStyle}`],
        className
    )

    return (
        <>
            <input
                value={value}
                onChange={onChange}
                className={inputStyles}
                type={inputType}
                placeholder={inputPlaceholder}
                maxLength={inputMaxLength}
            />

        </>
    );
};

export default InputField;