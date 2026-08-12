import React, { useContext, useEffect } from "react";
import { CaretdownStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import { ButtonIcon } from "../../../Button/ButtonIcon";
import { AlertProcessContext } from "../AlertProcessContext";
import styles from "../styles/AlertProcess.module.less";

/** Свойства компонента AlertProcessSpoiler. */
export interface IAlertProcessSpoilerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Контролируемое состояние открытия спойлера. По умолчанию спойлер закрыт. */
    open?: boolean;
    /** Обработчик изменения состояния открытия спойлера. Получает следующее значение open. */
    onOpen?: (open: boolean) => void;
    /** Раскрываемое содержимое спойлера. */
    children?: React.ReactNode;
}

/**
 * Спойлер компонента AlertProcess.
 * Полностью управляемый: собственного состояния открытия не хранит, по клику на кнопку
 * вызывает `onOpen` со следующим значением. Пока смонтирован — сообщает об этом
 * родительскому `AlertProcess` через контекст, чтобы тот зарезервировал место под кнопку.
 *
 * Рендерит два соседних элемента без общей обёртки: раскрываемое содержимое и кнопку
 * раскрытия. Кнопка не может лежать внутри содержимого — в свёрнутом состоянии оно
 * скрыто (`max-height: 0; overflow: hidden`). Корневой элемент компонента — элемент
 * содержимого: он получает `className`, `ref` и остальные props.
 */
export const AlertProcessSpoiler = React.forwardRef<HTMLDivElement, IAlertProcessSpoilerProps>(
    ({ children, className, open, onOpen, ...rest }, ref) => {
        const { setHasSpoiler } = useContext(AlertProcessContext);

        useEffect(() => {
            setHasSpoiler(true);

            return () => {
                setHasSpoiler(false);
            };
        }, [setHasSpoiler]);

        const handleToggle = () => {
            onOpen?.(!open);
        };

        return (
            <>
                <div
                    className={clsx(styles.expandableContent, { [styles.expanded]: open }, className)}
                    {...rest}
                    ref={ref}
                >
                    {children}
                </div>

                <div className={clsx(styles.expandButton, { [styles.expanded]: open })}>
                    <ButtonIcon onClick={handleToggle} aria-expanded={Boolean(open)}>
                        <CaretdownStrokeSrvIcon16 paletteIndex={5} />
                    </ButtonIcon>
                </div>
            </>
        );
    },
);

AlertProcessSpoiler.displayName = "AlertProcessSpoiler";
