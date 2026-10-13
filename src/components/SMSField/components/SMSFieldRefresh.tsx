import React, { forwardRef, useContext } from "react";
import clsx from "clsx";
import { EButtonIconShape } from "@sberbusiness/triplex-next/components/Button";
import { ButtonIcon } from "@sberbusiness/triplex-next/components/Button/ButtonIcon";
import { EFormFieldStatus } from "@sberbusiness/triplex-next/components/FormField";
import { SMSFieldContext } from "../SMSFieldContext";
import { RefreshIcon } from "./RefreshIcon";
import styles from "../styles/SMSField.module.less";

/** Свойства SMSField.Refresh. */
export interface ISMSFieldRefreshProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Число секунд обратного отсчета. */
    countdownTime: number;
    /** Число оставшихся секунд обратного отсчета. */
    countdownTimeLeft: number;
    /** Обработчик запроса кода. */
    onRefresh: () => void;
}

/** Кнопка повторного запроса кода с индикатором обратного отсчёта. Ref указывает на button. */
export const SMSFieldRefresh = forwardRef<HTMLButtonElement, ISMSFieldRefreshProps>(
    ({ className, countdownTime, countdownTimeLeft, disabled, onClick, onRefresh, ...restProps }, ref) => {
        const { size, sizeClassName, status, tooltipId } = useContext(SMSFieldContext);

        const iconDisabled = status === EFormFieldStatus.DISABLED || Boolean(disabled);
        const refreshDisabled = iconDisabled || countdownTimeLeft > 0;
        const refreshClassName = clsx(styles.btnRefresh, sizeClassName, className, {
            [styles.disabled]: refreshDisabled,
        });
        // Доля прошедшего времени обратного отсчёта, от 0 до 1.
        const percent =
            iconDisabled || countdownTimeLeft >= countdownTime
                ? 0
                : (countdownTime - countdownTimeLeft) / countdownTime;

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onRefresh();
            onClick?.(event);
        };

        return (
            <ButtonIcon
                aria-describedby={tooltipId}
                className={refreshClassName}
                disabled={refreshDisabled}
                onClick={handleClick}
                ref={ref}
                shape={EButtonIconShape.SQUIRCLE}
                {...restProps}
            >
                <RefreshIcon percent={percent} size={size} disabled={iconDisabled} />
            </ButtonIcon>
        );
    },
);

SMSFieldRefresh.displayName = "SMSFieldRefresh";
