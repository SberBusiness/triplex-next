import React, { useState } from "react";
import { EAlertType } from "../EAlertType";
import { alertTypeToClassNameMap, renderDefaultIcon } from "../AlertTypeUtils";
import { CloseSrvxIcon16 } from "@sberbusiness/icons-next/CloseSrvxIcon16";
import { CaretupSrvxIcon16 } from "@sberbusiness/icons-next/CaretupSrvxIcon16";
import { CaretdownSrvxIcon16 } from "@sberbusiness/icons-next/CaretdownSrvxIcon16";
import { ButtonIcon } from "../../Button/ButtonIcon";
import styles from "./styles/AlertProcess.module.less";
import clsx from "clsx";

/** Свойства компонента AlertProcess. */
export interface IAlertProcessProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Тип предупреждения. */
    type: EAlertType;
    /** Модификатор возможности закрытия предупреждения. */
    closable?: boolean;
    /** Модификатор возможности скрытия контента. */
    expandableContent?: React.ReactNode;
    /** Начальное состояние развернутого контента. */
    initialExpanded?: boolean;
    /** Функция обработки закрытия. */
    onClose?: () => void;
    /** Отображаемая иконка. */
    renderIcon?: React.ReactNode;
}

/** Компонент процессного предупреждения. */
export const AlertProcess = Object.assign(
    React.forwardRef<HTMLDivElement, IAlertProcessProps>(function AlertProcess(
        {
            children,
            className,
            type,
            renderIcon,
            expandableContent,
            initialExpanded = false,
            closable = false,
            onClose,
            ...rest
        },
        ref,
    ) {
        const [closed, setClosed] = useState(false);
        const [expanded, setExpanded] = useState(initialExpanded);

        if (closed) {
            return null;
        }

        const handleClose = () => {
            setClosed(true);
            onClose?.();
        };

        const handleExpand = () => {
            setExpanded(!expanded);
        };

        return (
            <div
                className={clsx(styles.alertProcess, alertTypeToClassNameMap[type](styles), className)}
                {...rest}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                <div className={styles.themeIcon}>{renderIcon ? renderIcon : renderDefaultIcon(type)}</div>

                <div className={styles.alertProcessContentBlock}>
                    <div className={styles.alertProcessContent}>
                        {children}
                        {expandableContent && (
                            <div className={clsx(styles.expandableContent, { [styles.expanded]: expanded })}>
                                {expandableContent}
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.alertControls}>
                    {closable && (
                        <div className={styles.closeButton}>
                            <ButtonIcon onClick={handleClose}>
                                <CloseSrvxIcon16 />
                            </ButtonIcon>
                        </div>
                    )}

                    {expandableContent && (
                        <div className={styles.expandButton}>
                            <ButtonIcon onClick={handleExpand}>
                                {expanded ? <CaretupSrvxIcon16 /> : <CaretdownSrvxIcon16 />}
                            </ButtonIcon>
                        </div>
                    )}
                </div>
            </div>
        );
    }),
);

AlertProcess.displayName = "AlertProcess";
