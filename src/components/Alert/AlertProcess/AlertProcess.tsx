import React, { useState } from "react";
import { EAlertType } from "../EAlertType";
import { alertTypeToClassNameMap, renderDefaultIcon } from "../AlertTypeUtils";
import { CloseSrvxIcon16 } from "@sberbusiness/icons-next/CloseSrvxIcon16";
import { CaretdownSrvxIcon16 } from "@sberbusiness/icons-next/CaretdownSrvxIcon16";
import { ButtonIcon } from "../../Button/ButtonIcon";
import { AlertProcessSpoiler } from "./components/AlertProcessSpoiler";
import styles from "./styles/AlertProcess.module.less";
import clsx from "clsx";

/** Свойства компонента AlertProcess. */
export interface IAlertProcessProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Тип предупреждения. */
    type: EAlertType;
    /** Модификатор возможности закрытия предупреждения. */
    closable?: boolean;
    /** Контент спойлера. */
    expandableContent?: React.ReactNode;
    /** Флаг открытия или закрытия спойлера. */
    expandableContentOpen?: boolean;
    /** Функция обработки открытия или закрытия спойлера. */
    onExpandableContentOpen?: (expanded: boolean) => void;
    /** Функция обработки закрытия. */
    onClose?: () => void;
    /** Отображаемая иконка. */
    renderIcon?: React.ReactNode;
    /** Рендер-функция спойлера. */
    renderSpoiler?: () => React.ReactNode;
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
            expandableContentOpen = false,
            closable = false,
            onClose,
            onExpandableContentOpen,
            renderSpoiler,
            ...rest
        },
        ref,
    ) {
        const [closed, setClosed] = useState(false);

        if (closed) {
            return null;
        }

        const handleClose = () => {
            setClosed(true);
            onClose?.();
        };

        const handleExpand = () => {
            onExpandableContentOpen?.(!expandableContentOpen);
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
                    {children}

                    {renderSpoiler?.()}
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
                        <div className={clsx(styles.expandButton, { [styles.active]: expandableContentOpen })}>
                            <ButtonIcon onClick={handleExpand}>
                                <CaretdownSrvxIcon16 />
                            </ButtonIcon>
                        </div>
                    )}
                </div>
            </div>
        );
    }),
    {
        Spoiler: AlertProcessSpoiler,
    },
);

AlertProcess.displayName = "AlertProcess";
AlertProcess.Spoiler = AlertProcessSpoiler;
