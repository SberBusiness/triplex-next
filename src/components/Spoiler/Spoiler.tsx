/* eslint-disable react-hooks/refs */
import React, { useCallback, useRef, useState } from "react";
import { CaretdownStrokeSrvIcon20, CaretdownStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import { Button, EButtonTheme } from "../Button";
import { EComponentSize } from "../../enums/EComponentSize";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import styles from "./styles/Spoiler.module.less";

/** Базовые свойства компонента Spoiler. */
interface ISpoilerBaseProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Текст раскрытия содержимого. */
    labelExpand: string;
    /** Текст скрытия содержимого. */
    labelCollapse?: string;
    /** Обработчик скрытия/раскрытия. */
    onToggle?: (expanded: boolean) => void;
    /** Элемент правого блока. */
    rightBlock?: React.ReactNode;
    /** Размер компонента. */
    size?: EComponentSize;
}

/** Свойства контролируемого Spoiler. */
interface ISpoilerControlledProps extends ISpoilerBaseProps {
    /** Контролируемое состояние скрыт/раскрыт. */
    expanded: boolean;
    /** Контролирующая функция скрытия/раскрытия. */
    toggle: (nextExpanded: boolean) => void;
}

/** Свойства неконтролируемого Spoiler. */
interface ISpoilerUncontrolledProps extends ISpoilerBaseProps {
    /** Контролируемое состояние скрыт/раскрыт. */
    expanded?: never;
    /** Контролирующая функция скрытия/раскрытия. */
    toggle?: never;
}

/** Комбинированные свойства компонента Spoiler. */
type TSpoilerProps = ISpoilerControlledProps | ISpoilerUncontrolledProps;

const sizeToCaretIconMap = {
    [EComponentSize.SM]: <CaretdownStrokeSrvIcon16 paletteIndex={5} className={styles.caretIcon} />,
    [EComponentSize.MD]: <CaretdownStrokeSrvIcon20 paletteIndex={5} className={styles.caretIcon} />,
    [EComponentSize.LG]: <CaretdownStrokeSrvIcon20 paletteIndex={5} className={styles.caretIcon} />,
};

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Компонент "Спойлер", используется для раскрытия внутреннего содержимого. */
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
        ...divHTMLAttributes
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
        sizeToClassNameMap[size],
        {
            [styles.opened]: open,
        },
        className,
    );

    return (
        <div {...divHTMLAttributes} className={classNames} data-tx={process.env.npm_package_version} ref={ref}>
            <div className={styles.head}>
                <Button
                    aria-expanded={open}
                    aria-controls={instanceId.current}
                    className={styles.toggleButton}
                    theme={EButtonTheme.LINK}
                    size={size}
                    onClick={handleToggle}
                >
                    {open ? labelCollapse : labelExpand}

                    {sizeToCaretIconMap[size]}
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
