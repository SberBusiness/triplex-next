import React, { useCallback, useRef, useState } from "react";
import { CaretdownStrokeSrvIcon16, CaretdownStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { Button, EButtonTheme } from "../Button";
import { EComponentSize } from "../../enums/EComponentSize";
import styles from "./styles/Spoiler.module.less";

/** Базовые свойства компонента Spoiler. */
export interface ISpoilerBaseProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Текст кнопки в свёрнутом состоянии — приглашение раскрыть содержимое. */
    labelExpand: string;
    /** Текст кнопки в раскрытом состоянии. Без него в раскрытом состоянии у кнопки остаётся только иконка. */
    labelCollapse?: string;
    /** Обработчик скрытия/раскрытия. Вызывается в обоих режимах и получает следующее состояние. */
    onToggle?: (expanded: boolean) => void;
    /** Содержимое правой части заголовка. Рендерится рядом с кнопкой раскрытия, вне неё. */
    rightBlock?: React.ReactNode;
    /** Размер компонента. По умолчанию EComponentSize.MD. */
    size?: EComponentSize;
}

/** Свойства контролируемого Spoiler. */
export interface ISpoilerControlledProps extends ISpoilerBaseProps {
    /** Контролируемое состояние скрыт/раскрыт. Передача этого свойства переводит компонент в контролируемый режим. */
    expanded: boolean;
    /** Контролирующая функция скрытия/раскрытия. Обязательна в контролируемом режиме: сам компонент состояние не меняет. */
    toggle: (nextExpanded: boolean) => void;
}

/** Свойства неконтролируемого Spoiler. */
export interface ISpoilerUncontrolledProps extends ISpoilerBaseProps {
    /** В неконтролируемом режиме не передаётся — состояние скрыт/раскрыт хранит сам компонент. */
    expanded?: never;
    /** В неконтролируемом режиме не передаётся — состояние меняет сам компонент, сообщая о смене через onToggle. */
    toggle?: never;
}

/** Комбинированные свойства компонента Spoiler. */
export type TSpoilerProps = ISpoilerControlledProps | ISpoilerUncontrolledProps;

/** Соответствие размера компонента иконке раскрытия. */
const SIZE_TO_CARET_ICON_MAP: Record<EComponentSize, React.ReactElement> = {
    [EComponentSize.SM]: <CaretdownStrokeSrvIcon16 paletteIndex={5} className={styles.caretIcon} />,
    [EComponentSize.MD]: <CaretdownStrokeSrvIcon20 paletteIndex={5} className={styles.caretIcon} />,
    [EComponentSize.LG]: <CaretdownStrokeSrvIcon20 paletteIndex={5} className={styles.caretIcon} />,
};

/** Соответствие размера компонента имени класса. */
const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/**
 * Компонент "Спойлер", используется для раскрытия внутреннего содержимого.
 *
 * Работает в двух режимах. Без `expanded` — неконтролируемый: состояние хранится внутри, о его
 * смене компонент сообщает через `onToggle`. С `expanded` — контролируемый: состояние живёт у
 * потребителя, по клику вызывается `toggle` со следующим значением.
 *
 * Корневой элемент — div, на него указывает ref и приходят className и остальные props.
 */
export const Spoiler = React.forwardRef<HTMLDivElement, TSpoilerProps>((props, ref) => {
    const {
        children,
        expanded,
        onToggle,
        toggle,
        className,
        labelExpand,
        labelCollapse,
        rightBlock,
        size = EComponentSize.MD,
        ...restProps
    } = props;

    const controlled = expanded !== undefined;
    const [expandedState, setExpandedState] = useState(expanded);
    const open = controlled ? expanded : expandedState;
    const instanceId = useRef(`Spoiler-${uniqueId()}`);

    const handleToggle = useCallback(() => {
        const nextState = !open;

        if (controlled) {
            toggle?.(nextState);
        } else {
            setExpandedState(nextState);
        }

        onToggle?.(nextState);
    }, [controlled, toggle, open, onToggle]);

    const classNames = clsx(
        styles.spoiler,
        SIZE_TO_CLASS_NAME_MAP[size],
        {
            [styles.opened]: open,
        },
        className,
    );

    return (
        <div {...restProps} className={classNames} data-tx={process.env.npm_package_version} ref={ref}>
            <div className={styles.head}>
                <Button
                    aria-expanded={open}
                    aria-controls={instanceId.current}
                    theme={EButtonTheme.LINK}
                    size={size}
                    onClick={handleToggle}
                >
                    {open ? labelCollapse : labelExpand}

                    {SIZE_TO_CARET_ICON_MAP[size]}
                </Button>
                {rightBlock}
            </div>

            <div id={instanceId.current} className={clsx(styles.content, { [styles.hidden]: !open })}>
                {children}
            </div>
        </div>
    );
});

Spoiler.displayName = "Spoiler";
