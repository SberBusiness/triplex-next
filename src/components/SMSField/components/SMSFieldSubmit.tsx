import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import { EButtonIconShape } from "@sberbusiness/triplex-next/components/Button";
import { ButtonIcon } from "@sberbusiness/triplex-next/components/Button/ButtonIcon";
import { EFormFieldStatus } from "@sberbusiness/triplex-next/components/FormField";
import { SMSFieldContext } from "../SMSFieldContext";
import { SubmitIcon } from "./SubmitIcon";
import styles from "../styles/SMSField.module.less";

/** Свойства SMSField.Submit. */
export interface ISMSFieldSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/** Кнопка отправки кода. Недоступна при пустом коде или статусе DISABLED. Ref указывает на button. */
export const SMSFieldSubmit = React.forwardRef<HTMLButtonElement, ISMSFieldSubmitProps>(
    ({ className, disabled, onClick, ...restProps }, ref) => {
        const { code, onSubmitCode, setDisabledSubmit, size, sizeClassName, status } = useContext(SMSFieldContext);

        const hasCode = code !== "";
        const submitDisabled = status === EFormFieldStatus.DISABLED || disabled || !hasCode;
        const submitClassName = clsx(styles.btnSubmit, { [styles.active]: hasCode }, sizeClassName, className);

        useEffect(() => {
            setDisabledSubmit(submitDisabled);
        }, [submitDisabled, setDisabledSubmit]);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onSubmitCode(code);
            onClick?.(event);
        };

        return (
            <ButtonIcon
                active={hasCode}
                className={submitClassName}
                disabled={submitDisabled}
                onClick={handleClick}
                ref={ref}
                shape={EButtonIconShape.CIRCLE}
                {...restProps}
            >
                <SubmitIcon size={size} />
            </ButtonIcon>
        );
    },
);

SMSFieldSubmit.displayName = "SMSFieldSubmit";
