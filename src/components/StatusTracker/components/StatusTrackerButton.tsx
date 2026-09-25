import React from "react";
import clsx from "clsx";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";
import { Button, IButtonLinkProps, TButtonProps } from "@sberbusiness/triplex-next/components/Button";

/** Свойства компонента StatusTrackerButton. Тема LINK недоступна: кнопки футера всегда блочные. */
export type IStatusTrackerButtonProps = Exclude<TButtonProps, IButtonLinkProps>;

/** Компонент кнопки для футера статус-трекера. Всегда рендерится в блочном режиме. */
export const StatusTrackerButton = React.forwardRef<HTMLButtonElement, IStatusTrackerButtonProps>(
    function StatusTrackerButton({ children, className, ...rest }, ref) {
        return (
            <Button className={clsx(styles.statusTrackerButton, className)} block {...rest} ref={ref}>
                {children}
            </Button>
        );
    },
);

StatusTrackerButton.displayName = "StatusTrackerButton";
