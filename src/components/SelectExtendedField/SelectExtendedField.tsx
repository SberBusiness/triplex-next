import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { isKey, EVENT_KEY_CODES } from "../../utils/keyboard";
import { KeyDownListener } from "../KeyDownListener";
import clsx from "clsx";
import styles from "./styles/SelectExtendedField.module.less";
import { SelectExtendedFieldTarget } from "./components/SelectExtendedFieldTarget";
import { SelectExtendedFieldDropdown } from "./components/SelectExtendedFieldDropdown";
import { IDropdownListItemProps } from "../Dropdown";

/* Свойства опции списка. */
export interface ISelectExtendedFieldDefaultOption extends Omit<
    IDropdownListItemProps,
    "active" | "onSelect" | "selected" | "keyCodesForSelection" | "className" | "key"
> {
    /* Значение опции. */
    value: string;
    /* Название опции. */
    label: React.ReactNode;
}

/* Свойства, передаваемые из Select в функцию рендера target - renderTarget. */
export interface ISelectExtendedFieldTargetProvideProps {
    /* Флаг открытости выпадающего списка. */
    opened: boolean;
    /* Функция открытия/закрытия Select. */
    setOpened: (opened: boolean) => void;
}

/* Свойства, передаваемые из Select в функцию рендера dropdown - children. */
export interface ISelectExtendedFieldDropdownProvideProps {
    /* Флаг открытости выпадающего списка. */
    opened: boolean;
    /* Функция открытия/закрытия Select. */
    setOpened: (opened: boolean) => void;
    targetRef: React.RefObject<HTMLDivElement>;
    dropdownRef: React.RefObject<HTMLDivElement>;
}

/* Свойства компонента SelectExtendedField. */
export interface ISelectExtendedFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** Рендер-функция поля выбора. */
    renderTarget: (props: ISelectExtendedFieldTargetProvideProps) => React.ReactNode;
    /** Рендер-функция выпадающего блока. */
    children: (props: ISelectExtendedFieldDropdownProvideProps) => React.ReactNode;
    /** Функция, срабатывающая при закрытии выпадающего блока. */
    onClose?: () => void;
    /** Функция, срабатывающая при открытии выпадающего блока. */
    onOpen?: () => void;
    /** Закрытие выпадающего блока при нажатии клавиши Tab. */
    closeOnTab?: boolean;
}

/* Базовый компонент Select. На его основе могут строиться Selects с любыми value, options и target. */
export const SelectExtendedField = Object.assign(
    React.forwardRef<HTMLDivElement, ISelectExtendedFieldProps>((props, ref) => {
        const { className, onKeyDown, children, renderTarget, closeOnTab, onClose, onOpen, ...htmlDivAttributes } =
            props;

        const [opened, setOpened] = useState(false);
        const targetRef = useRef<HTMLDivElement | null>(null);
        const dropdownRef = useRef<HTMLDivElement>(null);
        // Stable event handler pattern: колбэки хранятся в рефах, чтобы эффект
        // не перезапускался при смене ссылок на функции между рендерами.
        const onOpenRef = useRef(onOpen);
        const onCloseRef = useRef(onClose);
        // Флаг для пропуска первого срабатывания эффекта при маунте.
        const isMountedRef = useRef(false);

        // useLayoutEffect без зависимостей синхронизирует рефы после каждого коммита,
        // гарантируя актуальность колбэков до запуска useEffect.
        useLayoutEffect(() => {
            onOpenRef.current = onOpen;
            onCloseRef.current = onClose;
        });

        const setRef = (instance: HTMLDivElement | null) => {
            targetRef.current = instance;
            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        const handleSetOpened = useCallback((newOpened: boolean) => {
            setOpened(newOpened);
        }, []);

        const listenMouseDown = useCallback(
            (event: Event) => {
                if (opened) {
                    if (
                        !targetRef.current?.contains(event.target as Node) &&
                        !dropdownRef.current?.contains(event.target as Node)
                    ) {
                        setOpened(false);
                    }
                }
            },
            [opened],
        );

        const closeDropdown = useCallback(() => {
            if (opened) {
                setOpened(false);
            }
        }, [opened]);

        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent<HTMLDivElement>) => {
                const key = event.code || event.keyCode;

                if (closeOnTab && isKey(key, "TAB")) {
                    closeDropdown();
                }

                onKeyDown?.(event);
            },
            [closeOnTab, closeDropdown, onKeyDown],
        );

        useEffect(() => {
            document.addEventListener("mousedown", listenMouseDown);
            return () => {
                document.removeEventListener("mousedown", listenMouseDown);
            };
        }, [listenMouseDown]);

        // Вызываем onOpen/onClose только при реальных переходах opened,
        // пропуская первое срабатывание при маунте (opened = false по умолчанию).
        useEffect(() => {
            if (!isMountedRef.current) {
                isMountedRef.current = true;
                return;
            }

            if (opened) {
                onOpenRef.current?.();
            } else {
                onCloseRef.current?.();
            }
        }, [opened]);

        return (
            <KeyDownListener onMatch={closeDropdown} eventKeyCode={EVENT_KEY_CODES.ESCAPE}>
                <div
                    className={clsx(styles.selectExtendedField, className)}
                    onKeyDown={handleKeyDown}
                    ref={setRef}
                    {...htmlDivAttributes}
                >
                    {renderTarget({ opened, setOpened: handleSetOpened })}
                    {children({
                        dropdownRef,
                        opened,
                        setOpened: handleSetOpened,
                        targetRef,
                    })}
                </div>
            </KeyDownListener>
        );
    }),
    {
        Target: SelectExtendedFieldTarget,
        Dropdown: SelectExtendedFieldDropdown,
    },
);

SelectExtendedField.displayName = "SelectExtendedField";
