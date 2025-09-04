import React, { useState } from "react";
import { EAlertType } from "../EAlertType";
import { alertTypeToClassNameMap } from "../AlertTypeUtils";
import CloseSrvxIcon16 from "@sberbusiness/icons-next/CloseSrvxIcon16";
import { ButtonIcon } from "../../Button/ButtonIcon";
import { AlertProcessSpoiler } from "./components/AlertProcessSpoiler";
import { AlertProcessContext } from "./AlertProcessContext";
import styles from "./styles/AlertProcess.module.less";
import {
    InfoStsIcon20,
    WarningStsIcon20,
    ErrorStsIcon20,
    SystemStsIcon20,
    DefaulticonPrdIcon20,
} from "@sberbusiness/icons-next";
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

const renderDefaultIcon = (type: EAlertType): JSX.Element => {
    switch (type) {
        case EAlertType.INFO:
            return <InfoStsIcon20 />;
        case EAlertType.WARNING:
            return <WarningStsIcon20 />;
        case EAlertType.ERROR:
            return <ErrorStsIcon20 />;
        case EAlertType.SYSTEM:
            return <SystemStsIcon20 />;
        case EAlertType.FEATURE:
            return <DefaulticonPrdIcon20 />;
    }
};

/** Компонент процессного предупреждения. */
export const AlertProcess = Object.assign(
    React.forwardRef<HTMLDivElement, IAlertProcessProps>(function AlertProcess(
        { children, className, type, renderIcon, closable = false, onClose, ...rest },
        ref,
    ) {
        const [closed, setClosed] = useState(false);
        const [hasSpoiler, setHasSpoiler] = useState(false);

        if (closed) {
            return null;
        }

        const handleClose = () => {
            setClosed(true);
            onClose?.();
        };

        return (
            <AlertProcessContext.Provider value={{ hasSpoiler, setHasSpoiler }}>
                <div
                    className={clsx(
                        styles.alertProcess,
                        alertTypeToClassNameMap[type](styles),
                        { [styles.withSpoiler]: hasSpoiler },
                        className,
                    )}
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
            </AlertProcessContext.Provider>
        );
    }),
    {
        Spoiler: AlertProcessSpoiler,
    },
);

AlertProcess.displayName = "AlertProcess";
AlertProcess.Spoiler = AlertProcessSpoiler;
