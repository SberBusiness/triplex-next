import clsx from "clsx";
import React, { forwardRef, useContext, useMemo } from "react";
import { EButtonIconShape } from "@sberbusiness/triplex-next/components/Button";
import { ButtonIcon } from "@sberbusiness/triplex-next/components/Button/ButtonIcon";
import { SMSFieldContext } from "@sberbusiness/triplex-next/components/SMSField/SMSFieldContext";
import { RefreshIcon } from "@sberbusiness/triplex-next/components/SMSField/components/RefreshIcon";
import styles from "@sberbusiness/triplex-next/components/SMSField/styles/SMSField.module.less";

/** Свойства SMSField.Refresh. */
export interface ISMSFieldRefreshProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Число секунд обратного отсчета. */
    countdownTime: number;
    /** Число оставшихся секунд обратного отсчета. */
    countdownTimeLeft: number;
    /** Обработчик запроса кода. */
    onRefresh: () => void;
}

export const SMSFieldRefresh = forwardRef<HTMLButtonElement, ISMSFieldRefreshProps>(
    ({ className, disabled, countdownTime, countdownTimeLeft, onClick, onRefresh, ...restProps }, ref) => {
        const { disabled: allDisabled, error, size, sizeClassName, tooltipId } = useContext(SMSFieldContext);

        const isSmsCountdownTicking = countdownTimeLeft > 0;
        const refreshDisabled = (allDisabled && !error) || disabled || isSmsCountdownTicking;
        const refreshClassName = clsx(styles.btnRefresh, sizeClassName, className, {
            [styles.disabled]: refreshDisabled,
        });

        // Проценты выражаются в долях единицы.
        const percent = useMemo(() => {
            if (countdownTimeLeft >= countdownTime || allDisabled || disabled) {
                return 0;
            } else {
                return (countdownTime - countdownTimeLeft) / countdownTime;
            }
        }, [countdownTime, countdownTimeLeft, allDisabled, disabled]);

        /** Обработчик запроса sms-кода. */
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
                <RefreshIcon percent={percent || 0} size={size} disabled={Boolean(allDisabled || disabled)} />
            </ButtonIcon>
        );
    },
);

SMSFieldRefresh.displayName = "SMSFieldRefresh";
