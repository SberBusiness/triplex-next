import clsx from "clsx";
import React, { useEffect, useContext } from "react";
import { EButtonIconShape } from "@sberbusiness/triplex-next/components/Button";
import { ButtonIcon } from "@sberbusiness/triplex-next/components/Button/ButtonIcon";
import { SMSInputContext } from "@sberbusiness/triplex-next/components/SMSInput/SMSInputContext";
import { SubmitIcon } from "@sberbusiness/triplex-next/components/SMSInput/components/SubmitIcon";
import styles from "@sberbusiness/triplex-next/components/SMSInput/styles/SMSInput.module.less";

/** Свойства SMSInput.Submit. */
export interface ISMSInputSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SMSInputSubmit: React.FC<ISMSInputSubmitProps> = ({ className, disabled, onClick, ...restProps }) => {
    const {
        code,
        disabled: allDisabled,
        onSubmitCode,
        setDisabledSubmit,
        size,
        sizeClassName,
    } = useContext(SMSInputContext);

    const submitDisabled = allDisabled || disabled || code === "";
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

SMSInputSubmit.displayName = "SMSInputSubmit";
