import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dropdown } from "@sberbusiness/triplex-next/components/Dropdown/Dropdown";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";
import { DropdownList } from "@sberbusiness/triplex-next/components/Dropdown/desktop/DropdownList";
import clsx from "clsx";
import styles from "./styles/ButtonDropdownExtended.module.less";

/** Свойства встроенной кнопки. */
export interface IButtonDropdownExtendedButtonProvideProps {
    /** Контролируемое состояние открытости. */
    opened: boolean;
    /** Функция, контролирующая состояние открытости. */
    setOpened: (opened: boolean) => void;
}

/** Свойства встроенного выпадающего блока. */
export interface IButtonDropdownExtendedDropdownProvideProps {
    /** Контролируемое состояние открытости. */
    opened: boolean;
    /** Функция, контролирующая состояние открытости. */
    setOpened: (opened: boolean) => void;
    /** Пробрасываемый стилевой класс. */
    className: string;
}

/** Свойства кнопки с выпадающим блоком. */
export interface IButtonDropdownExtendedProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Контролируемое состояние открытости. */
    opened?: boolean;
    /** Функция, контролирующая состояние открытости. */
    setOpened?: (opened: boolean) => void;
    /** Функция, отрисовывающая кнопку. */
    renderButton: (props: IButtonDropdownExtendedButtonProvideProps) => React.ReactNode;
    /** Функция, отрисовывающая выпадающий блок. */
    renderDropdown: (props: IButtonDropdownExtendedDropdownProvideProps) => React.ReactNode;
    /** Ссылка на выпадающий блок. */
    dropdownRef: React.RefObject<HTMLElement>;
    /** Закрытие выпадающего блока при нажатии клавиши Tab. */
    closeOnTab?: boolean;
}

/**
 * Компонент "Кнопка с выпадающим блоком".
 * Позволяет кастомизировать кнопку открытия Dropdown и сам Dropdown.
 */
export interface IButtonDropdownExtendedComponent extends React.FC<IButtonDropdownExtendedProps> {
    Dropdown: typeof Dropdown;
    DropdownList: typeof DropdownList;
};

export const ButtonDropdownExtended: IButtonDropdownExtendedComponent = (props) => {
    const { className, opened, setOpened, renderButton, renderDropdown, dropdownRef, closeOnTab, ...rest } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const isControlledRef = useRef<boolean>(props.opened !== undefined);
    const [uncontrolledOpened, setUncontrolledOpened] = useState<boolean>(props.opened === undefined ? false : false);

    const computedOpened = isControlledRef.current ? !!opened : uncontrolledOpened;

    const handleOpen = useCallback(
        (nextOpened: boolean) => {
            if (isControlledRef.current) {
                setOpened && setOpened(nextOpened);
                return;
            }
            setUncontrolledOpened(nextOpened);
        },
        [setOpened]
    );

    useEffect(() => {
        if (!computedOpened) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            const key: string | number = event.code || event.keyCode;
            if (computedOpened) {
                if (isKey(key, "ESCAPE") || (closeOnTab && isKey(key, "TAB"))) {
                    handleOpen(false);
                }
            }
        };

        const handleClickOutside = (event: Event) => {
            const button = containerRef.current;
            const dropdown = dropdownRef.current;

            if (computedOpened) {
                const targetNode = event.target as Node | null;
                if (targetNode && !button?.contains(targetNode) && !dropdown?.contains(targetNode)) {
                    handleOpen(false);
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [computedOpened, closeOnTab, dropdownRef, handleOpen, containerRef]);

    const classNames = clsx(styles.buttonDropdownExtended, className);

    return (
        <div className={classNames} ref={containerRef} {...rest}>
            {renderButton({ opened: computedOpened, setOpened: handleOpen })}
            {renderDropdown({
                className: styles.buttonDropdownExtendedBlock,
                opened: computedOpened,
                setOpened: handleOpen,
            })}
        </div>
    );
};

ButtonDropdownExtended.Dropdown = Dropdown;
ButtonDropdownExtended.DropdownList = DropdownList;
