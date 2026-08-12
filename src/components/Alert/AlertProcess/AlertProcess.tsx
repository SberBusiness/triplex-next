import React, { useState } from "react";
import {
    InfoStrokeStsIcon20,
    WarningStrokeStsIcon20,
    ErrorStrokeStsIcon20,
    SystemStrokeStsIcon20,
    DefaulticonStrokePrdIcon20,
    CrossStrokeSrvIcon16,
} from "@sberbusiness/icons-next";
import clsx from "clsx";
import { EAlertType } from "../EAlertType";
import { ALERT_TYPE_TO_CLASS_NAME_MAP } from "../AlertTypeUtils";
import { ButtonIcon } from "../../Button/ButtonIcon";
import { AlertProcessSpoiler } from "./components/AlertProcessSpoiler";
import { AlertProcessContext } from "./AlertProcessContext";
import { EAlertProcessBorderRadius } from "./enums";
import styles from "./styles/AlertProcess.module.less";

/** Свойства компонента AlertProcess. */
export interface IAlertProcessProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Тип предупреждения. Определяет фон блока и иконку по умолчанию. */
    type: EAlertType;
    /** Модификатор возможности закрытия предупреждения. По умолчанию false. */
    closable?: boolean;
    /** Функция обработки закрытия. Вызывается после того, как компонент скрыл себя. */
    onClose?: () => void;
    /** Отображаемая иконка. Заменяет иконку по умолчанию, выбранную по type. */
    renderIcon?: React.ReactNode;
    /** Вариант скругления визуальной формы. По умолчанию EAlertProcessBorderRadius.MD. */
    borderRadius?: EAlertProcessBorderRadius;
    /** Содержимое предупреждения. Размеры и цвет текста задаются компонентами Typography. */
    children?: React.ReactNode;
}

/** Маппинг типов предупреждений к иконкам по умолчанию. */
const TYPE_TO_DEFAULT_ICON_MAP: Record<EAlertType, React.ReactNode> = {
    [EAlertType.INFO]: <InfoStrokeStsIcon20 paletteIndex={3} />,
    [EAlertType.WARNING]: <WarningStrokeStsIcon20 paletteIndex={2} />,
    [EAlertType.ERROR]: <ErrorStrokeStsIcon20 paletteIndex={1} />,
    [EAlertType.SYSTEM]: <SystemStrokeStsIcon20 paletteIndex={4} />,
    [EAlertType.FEATURE]: <DefaulticonStrokePrdIcon20 paletteIndex={0} />,
};

/** Маппинг вариантов скругления к CSS-классам. */
const BORDER_RADIUS_TO_CLASS_NAME_MAP: Record<EAlertProcessBorderRadius, string> = {
    [EAlertProcessBorderRadius.MD]: styles.md,
    [EAlertProcessBorderRadius.LG]: styles.lg,
};

/**
 * Компонент процессного предупреждения.
 * Блочное уведомление с фоном и скруглением: иконка по `type`, произвольный контент,
 * опциональная кнопка закрытия и раскрывающийся блок `AlertProcess.Spoiler`.
 * Закрытие не управляется извне — компонент скрывает себя сам и затем вызывает `onClose`.
 */
export const AlertProcess = Object.assign(
    React.forwardRef<HTMLDivElement, IAlertProcessProps>(function AlertProcess(
        {
            children,
            className,
            type,
            renderIcon,
            closable = false,
            onClose,
            borderRadius = EAlertProcessBorderRadius.MD,
            ...rest
        },
        ref,
    ) {
        const [closed, setClosed] = useState(false);
        const [hasSpoiler, setHasSpoiler] = useState(false);

        const handleClose = () => {
            setClosed(true);
            onClose?.();
        };

        if (closed) {
            return null;
        }

        return (
            <AlertProcessContext.Provider value={{ hasSpoiler, setHasSpoiler }}>
                <div
                    className={clsx(
                        styles.alertProcess,
                        BORDER_RADIUS_TO_CLASS_NAME_MAP[borderRadius],
                        ALERT_TYPE_TO_CLASS_NAME_MAP[type](styles),
                        { [styles.withSpoiler]: hasSpoiler },
                        className,
                    )}
                    {...rest}
                    data-tx={process.env.npm_package_version}
                    ref={ref}
                >
                    <div className={styles.themeIcon}>{renderIcon || TYPE_TO_DEFAULT_ICON_MAP[type]}</div>

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
