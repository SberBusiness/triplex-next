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
    /** Контролируемое состояние открытости. Если передан на первом рендере, компонент работает в контролируемом режиме. */
    opened?: boolean;
    /** Функция, контролирующая состояние открытости. Вызывается только в контролируемом режиме. */
    setOpened?: (opened: boolean) => void;
    /** Функция, отрисовывающая кнопку. */
    renderButton: (props: IButtonDropdownExtendedButtonProvideProps) => React.ReactNode;
    /** Функция, отрисовывающая выпадающий блок. */
    renderDropdown: (props: IButtonDropdownExtendedDropdownProvideProps) => React.ReactNode;
    /** Ссылка на выпадающий блок. Нужна, чтобы клик внутри блока не считался кликом снаружи. */
    dropdownRef: React.RefObject<HTMLElement>;
    /** Закрытие выпадающего блока при нажатии клавиши Tab. */
    closeOnTab?: boolean;
}

/** Тип компонента "Кнопка с выпадающим блоком" со статическими субкомпонентами. */
export interface IButtonDropdownExtendedComponent extends React.FC<IButtonDropdownExtendedProps> {
    /** Выпадающий блок. */
    Dropdown: typeof Dropdown;
    /** Список опций для выпадающего блока. */
    DropdownList: typeof DropdownList;
}

/**
 * Компонент "Кнопка с выпадающим блоком".
 * Позволяет кастомизировать кнопку открытия Dropdown и сам Dropdown через render-функции.
 * Пока блок открыт, слушает документ и закрывает его по Escape, по Tab (при closeOnTab)
 * и по клику вне кнопки и вне выпадающего блока.
 */
export const ButtonDropdownExtended: IButtonDropdownExtendedComponent = (props) => {
    const { className, opened, setOpened, renderButton, renderDropdown, dropdownRef, closeOnTab, ...rest } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    // Режим управления фиксируется на монтировании и дальше не меняется.
    const [isControlled] = useState<boolean>(() => opened !== undefined);
    const [uncontrolledOpened, setUncontrolledOpened] = useState<boolean>(false);

    const computedOpened = isControlled ? !!opened : uncontrolledOpened;

    const handleOpenedChange = useCallback(
        (nextOpened: boolean) => {
            if (isControlled) {
                setOpened?.(nextOpened);
                return;
            }
            setUncontrolledOpened(nextOpened);
        },
        [isControlled, setOpened],
    );

    useEffect(() => {
        if (!computedOpened) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            const key: string | number = event.code || event.keyCode;

            if (isKey(key, "ESCAPE") || (closeOnTab && isKey(key, "TAB"))) {
                handleOpenedChange(false);
            }
        };

        const handleClickOutside = (event: Event) => {
            const button = containerRef.current;
            const dropdown = dropdownRef.current;
            const targetNode = event.target as Node | null;

            if (targetNode && !button?.contains(targetNode) && !dropdown?.contains(targetNode)) {
                handleOpenedChange(false);
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
    }, [computedOpened, closeOnTab, dropdownRef, handleOpenedChange]);

    const classNames = clsx(styles.buttonDropdownExtended, className);

    return (
        <div className={classNames} ref={containerRef} {...rest}>
            {renderButton({ opened: computedOpened, setOpened: handleOpenedChange })}
            {renderDropdown({
                className: styles.buttonDropdownExtendedBlock,
                opened: computedOpened,
                setOpened: handleOpenedChange,
            })}
        </div>
    );
};

ButtonDropdownExtended.Dropdown = Dropdown;
ButtonDropdownExtended.DropdownList = DropdownList;
