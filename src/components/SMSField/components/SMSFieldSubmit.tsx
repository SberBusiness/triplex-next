import clsx from "clsx";
import React, { useEffect, useContext } from "react";
import { EButtonIconShape } from "@sberbusiness/triplex-next/components/Button";
import { ButtonIcon } from "@sberbusiness/triplex-next/components/Button/ButtonIcon";
import { EFormFieldStatus } from "@sberbusiness/triplex-next/components/FormField";
import { SMSFieldContext } from "@sberbusiness/triplex-next/components/SMSField/SMSFieldContext";
import { SubmitIcon } from "@sberbusiness/triplex-next/components/SMSField/components/SubmitIcon";
import styles from "@sberbusiness/triplex-next/components/SMSField/styles/SMSField.module.less";

/** Свойства SMSField.Submit. */
export interface ISMSFieldSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SMSFieldSubmit: React.FC<ISMSFieldSubmitProps> = ({ className, disabled, onClick, ...restProps }) => {
    const { code, onSubmitCode, setDisabledSubmit, size, sizeClassName, status } = useContext(SMSFieldContext);

    const fieldDisabled = status === EFormFieldStatus.DISABLED;
    const submitDisabled = fieldDisabled || disabled || code === "";
    const submitClassName = clsx(styles.btnSubmit, { [styles.active]: !!code }, sizeClassName, className);

    useEffect(() => {
        setDisabledSubmit(submitDisabled);
    }, [submitDisabled, setDisabledSubmit]);

    /** Обработчик отправки sms-кода. */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onSubmitCode(code);
        onClick?.(event);
    };

    return (
        <ButtonIcon
            active={!!code}
            className={submitClassName}
            disabled={submitDisabled}
            onClick={handleClick}
            shape={EButtonIconShape.CIRCLE}
            {...restProps}
        >
            <SubmitIcon size={size} />
        </ButtonIcon>
    );
};

SMSFieldSubmit.displayName = "SMSFieldSubmit";
