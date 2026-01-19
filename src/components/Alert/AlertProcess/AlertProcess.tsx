import React, { useState } from "react";
import { EAlertType } from "../EAlertType";
import { alertTypeToClassNameMap } from "../AlertTypeUtils";
import { ButtonIcon } from "../../Button/ButtonIcon";
import { AlertProcessSpoiler } from "./components/AlertProcessSpoiler";
import { AlertProcessContext } from "./AlertProcessContext";
import styles from "./styles/AlertProcess.module.less";
import {
    InfoStrokeStsIcon20,
    WarningStrokeStsIcon20,
    ErrorStrokeStsIcon20,
    SystemStrokeStsIcon20,
    DefaulticonStrokePrdIcon20,
    CrossStrokeSrvIcon16,
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

const renderDefaultIcon = (type: EAlertType) => {
    switch (type) {
        case EAlertType.INFO:
            return <InfoStrokeStsIcon20 paletteIndex={3} />;
        case EAlertType.WARNING:
            return <WarningStrokeStsIcon20 paletteIndex={2} />;
        case EAlertType.ERROR:
            return <ErrorStrokeStsIcon20 paletteIndex={1} />;
        case EAlertType.SYSTEM:
            return <SystemStrokeStsIcon20 paletteIndex={4} />;
        case EAlertType.FEATURE:
            return <DefaulticonStrokePrdIcon20 paletteIndex={0} />;
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
                                <CrossStrokeSrvIcon16 paletteIndex={5} />
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
