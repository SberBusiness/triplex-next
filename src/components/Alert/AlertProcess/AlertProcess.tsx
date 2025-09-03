import React, { useState } from "react";
import { EAlertType } from "../EAlertType";
import { alertTypeToClassNameMap, renderDefaultIcon } from "../AlertTypeUtils";
import CloseSrvxIcon16 from "@sberbusiness/icons-next/CloseSrvxIcon16";
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
    /** Функция обработки закрытия. */
    onClose?: () => void;
    /** Отображаемая иконка. */
    renderIcon?: React.ReactNode;
}

/** Компонент процессного предупреждения. */
export const AlertProcess = Object.assign(
    React.forwardRef<HTMLDivElement, IAlertProcessProps>(function AlertProcess(
        { children, className, type, renderIcon, closable = false, onClose, ...rest },
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

        return (
            <div
                className={clsx(styles.alertProcess, alertTypeToClassNameMap[type](styles), className)}
                {...rest}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                <div className={styles.themeIcon}>{renderIcon ? renderIcon : renderDefaultIcon(type)}</div>

                <div className={styles.alertProcessContentBlock}>{children}</div>

                {closable && (
                    <div className={styles.closeButton}>
                        <ButtonIcon onClick={handleClose}>
                            <CloseSrvxIcon16 />
                        </ButtonIcon>
                    </div>
                )}
            </div>
        );
    }),
    {
        Spoiler: AlertProcessSpoiler,
    },
);

AlertProcess.displayName = "AlertProcess";
AlertProcess.Spoiler = AlertProcessSpoiler;
