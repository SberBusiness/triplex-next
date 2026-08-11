import React, { useState, useRef, useEffect, useCallback } from "react";
import clsx from "clsx";
import { isKey, EVENT_KEY_CODES } from "../../utils/keyboard";
import { KeyDownListener } from "../KeyDownListener";
import { IDropdownListItemProps } from "../Dropdown";
import { SelectExtendedFieldTarget } from "./components/SelectExtendedFieldTarget";
import { SelectExtendedFieldDropdown } from "./components/SelectExtendedFieldDropdown";
import styles from "./styles/SelectExtendedField.module.less";

/** Свойства опции списка. */
export interface ISelectExtendedFieldDefaultOption extends Omit<
    IDropdownListItemProps,
    "active" | "onSelect" | "selected" | "keyCodesForSelection" | "className" | "key"
> {
    /** Значение опции. */
    value: string;
    /** Название опции. */
    label: React.ReactNode;
}

/** Свойства, передаваемые из SelectExtendedField в функцию рендера target - renderTarget. */
export interface ISelectExtendedFieldTargetProvideProps {
    /** Флаг открытости выпадающего блока. */
    opened: boolean;
    /** Функция открытия/закрытия выпадающего блока. */
    setOpened: (opened: boolean) => void;
}

/** Свойства, передаваемые из SelectExtendedField в функцию рендера dropdown - children. */
export interface ISelectExtendedFieldDropdownProvideProps {
    /** Флаг открытости выпадающего блока. */
    opened: boolean;
    /** Функция открытия/закрытия выпадающего блока. */
    setOpened: (opened: boolean) => void;
    /** Ссылка на поле выбора. По ней выпадающий блок считает своё положение. */
    targetRef: React.RefObject<HTMLDivElement>;
    /** Ссылка на выпадающий блок. Нужна, чтобы клик внутри него не закрывал список. */
    dropdownRef: React.RefObject<HTMLDivElement>;
}

/** Свойства компонента SelectExtendedField. */
export interface ISelectExtendedFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** Рендер-функция поля выбора. */
    renderTarget: (props: ISelectExtendedFieldTargetProvideProps) => React.ReactNode;
    /** Рендер-функция выпадающего блока. */
    children: (props: ISelectExtendedFieldDropdownProvideProps) => React.ReactNode;
    /** Функция, срабатывающая при закрытии выпадающего блока. На первом рендере не вызывается. */
    onClose?: () => void;
    /** Функция, срабатывающая при открытии выпадающего блока. На первом рендере не вызывается. */
    onOpen?: () => void;
    /** Закрытие выпадающего блока при нажатии клавиши Tab. По умолчанию false. */
    closeOnTab?: boolean;
}

/**
 * Базовый компонент Select. На его основе строятся Select'ы с любыми value, options и target.
 *
 * Владеет только состоянием открытости: разметку поля выбора отдаёт в renderTarget,
 * разметку выпадающего блока — в children. Закрывает список по Escape, по клику вне
 * поля и выпадающего блока, а при closeOnTab — ещё и по Tab.
 */
export const SelectExtendedField = Object.assign(
    React.forwardRef<HTMLDivElement, ISelectExtendedFieldProps>((props, ref) => {
        const { className, onKeyDown, children, renderTarget, closeOnTab, onClose, onOpen, ...htmlDivAttributes } =
            props;

        const [opened, setOpened] = useState(false);
        const targetRef = useRef<HTMLDivElement | null>(null);
        const dropdownRef = useRef<HTMLDivElement>(null);
        // Предыдущее состояние открытости. Сравнение со значением, а не флаг "смонтирован",
        // делает эффект идемпотентным: повторный маунт в StrictMode не вызывает колбэки.
        const prevOpenedRef = useRef(opened);
        // Актуальные колбэки хранятся в ref, чтобы эффект зависел только от opened
        // и не вызывал onOpen/onClose при смене идентичности колбэков между рендерами.
        const callbacksRef = useRef({ onOpen, onClose });

        const setTargetRef = useCallback(
            (instance: HTMLDivElement | null) => {
                targetRef.current = instance;

                if (typeof ref === "function") {
                    ref(instance);
                } else if (ref) {
                    ref.current = instance;
                }
            },
            [ref],
        );

        const closeDropdown = useCallback(() => {
            setOpened(false);
        }, []);

        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent<HTMLDivElement>) => {
                if (closeOnTab && isKey(event.code || event.keyCode, "TAB")) {
                    closeDropdown();
                }

                onKeyDown?.(event);
            },
            [closeOnTab, closeDropdown, onKeyDown],
        );

        // Пока список открыт, клик вне поля и вне выпадающего блока закрывает его.
        useEffect(() => {
            if (!opened) {
                return;
            }

            const handleDocumentMouseDown = (event: MouseEvent) => {
                const eventTarget = event.target as Node;

                if (!targetRef.current?.contains(eventTarget) && !dropdownRef.current?.contains(eventTarget)) {
                    setOpened(false);
                }
            };

            document.addEventListener("mousedown", handleDocumentMouseDown);

            return () => {
                document.removeEventListener("mousedown", handleDocumentMouseDown);
            };
        }, [opened]);

        useEffect(() => {
            callbacksRef.current = { onOpen, onClose };
        });

        useEffect(() => {
            // Колбэки вызываются только на смену состояния, но не на первом рендере.
            if (prevOpenedRef.current === opened) {
                return;
            }

            prevOpenedRef.current = opened;

            if (opened) {
                callbacksRef.current.onOpen?.();
            } else {
                callbacksRef.current.onClose?.();
            }
        }, [opened]);

        return (
            <KeyDownListener onMatch={closeDropdown} eventKeyCode={EVENT_KEY_CODES.ESCAPE}>
                <div
                    className={clsx(styles.selectExtendedField, className)}
                    onKeyDown={handleKeyDown}
                    ref={setTargetRef}
                    {...htmlDivAttributes}
                >
                    {renderTarget({ opened, setOpened })}
                    {children({
                        dropdownRef,
                        opened,
                        setOpened,
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
