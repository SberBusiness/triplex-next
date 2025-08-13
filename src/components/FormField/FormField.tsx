import React, {useState} from 'react';
import {FormFieldContext} from './FormFieldContext';
import {TARGET_PADDING_X_DEFAULT} from './consts';
import clsx from 'clsx';
import styles from './styles/FormField.module.less';

export enum EFormFieldSize {
    LG = 'lg',
    // MD = 'md',
    // SM = 'sm',
}

/** Свойства компонента FormField. */
export interface IFormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    error?: boolean;
    disabled?: boolean;
}

/** Элемент, отображающий input/select/textarea + label. */
export const FormField: React.FC<IFormFieldProps> = ({children, className, disabled, error, onMouseEnter, onMouseLeave, style, ...htmlDivAttributes}) => {
    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [id, setId] = useState('');
    const [postfixWidth, setPostfixWidth] = useState(TARGET_PADDING_X_DEFAULT);
    const [prefixWidth, setPrefixWidth] = useState(TARGET_PADDING_X_DEFAULT);
    const [valueExist, setValueExist] = useState(false);

    const handleMouseEnter = (event: React.MouseEvent<HTMLInputElement>) => {
        setHovered(true);
        onMouseEnter?.(event);
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLInputElement>) => {
        setHovered(false);
        onMouseLeave?.(event);
    };

    return (
        <FormFieldContext.Provider
            value={{
                disabled: Boolean(disabled),
                focused,
                hovered,
                id,
                postfixWidth,
                prefixWidth,
                setFocused,
                setId,
                setPostfixWidth,
                setPrefixWidth,
                setValueExist,
                valueExist,
            }}
        >
            <div
                className={clsx(styles.formField, {
                    [styles.error]: Boolean(error),
                    [styles.disabled]: Boolean(disabled),
                    [styles.active]: focused,
                }, className)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                data-tx={process.env.npm_package_version}
                style={{paddingLeft: prefixWidth, paddingRight: postfixWidth, ...style}}
                {...htmlDivAttributes}
            >
                {children}
            </div>
        </FormFieldContext.Provider>
    );
};
