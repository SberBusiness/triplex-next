import React, { useState, useRef, useEffect, useCallback } from "react";
import clsx from "clsx";
import { isKey, EVENT_KEY_CODES } from "../../utils/keyboard";
import { KeyDownListener } from "../KeyDownListener";
import { DropdownListContext, IDropdownListItemProps, useDropdownListKeyboard } from "../Dropdown";
import { useDropdownOpenCallbacks } from "../Dropdown/useDropdownOpenCallbacks";
import { SelectExtendedFieldTarget } from "./components/SelectExtendedFieldTarget";
import { SelectExtendedFieldDropdown } from "./components/SelectExtendedFieldDropdown";
import styles from "./styles/SelectExtendedField.module.less";

/** Свойства опции списка. */
export interface ISelectExtendedFieldDefaultOption extends Omit<
    IDropdownListItemProps,
    "onSelect" | "selected" | "keyCodesForSelection" | "className" | "key"
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
    /** Идентификатор активного элемента DropdownList. Для aria-activedescendant поля выбора. */
    activeDescendant?: string;
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
 * Связывает поле с DropdownList внутри блока: клавиши, нажатые в поле, передаются открытому списку,
 * а renderTarget получает activeDescendant для aria-activedescendant.
 */
export const SelectExtendedField = Object.assign(
    React.forwardRef<HTMLDivElement, ISelectExtendedFieldProps>((props, ref) => {
        const { className, onKeyDown, children, renderTarget, closeOnTab, onClose, onOpen, ...htmlDivAttributes } =
            props;

        const [opened, setOpened] = useState(false);
        const targetRef = useRef<HTMLDivElement | null>(null);
        const dropdownRef = useRef<HTMLDivElement>(null);

        useDropdownOpenCallbacks(opened, onOpen, onClose);

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

        const {
            context: dropdownListContext,
            activeDescendant,
            handleKeyDown: handleDropdownListKeyDown,
        } = useDropdownListKeyboard();

        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent<HTMLDivElement>) => {
                // Клавиши, всплывшие от поля, передаются открытому списку — в фазе bubble, не capture
                // (почему — Dropdown-ai.md → «Инварианты»).
                if (!dropdownRef.current?.contains(event.target as Node)) {
                    handleDropdownListKeyDown(event);
                }

                if (closeOnTab && isKey(event.code || event.keyCode, "TAB")) {
                    closeDropdown();
                }

                onKeyDown?.(event);
            },
            [handleDropdownListKeyDown, closeOnTab, closeDropdown, onKeyDown],
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

        return (
            <KeyDownListener onMatch={closeDropdown} eventKeyCode={EVENT_KEY_CODES.ESCAPE}>
                <DropdownListContext.Provider value={dropdownListContext}>
                    <div
                        className={clsx(styles.selectExtendedField, className)}
                        onKeyDown={handleKeyDown}
                        ref={setTargetRef}
                        {...htmlDivAttributes}
                    >
                        {renderTarget({ opened, setOpened, activeDescendant })}
                        {children({
                            dropdownRef,
                            opened,
                            setOpened,
                            targetRef,
                        })}
                    </div>
                </DropdownListContext.Provider>
            </KeyDownListener>
        );
    }),
    {
        Target: SelectExtendedFieldTarget,
        Dropdown: SelectExtendedFieldDropdown,
    },
);

SelectExtendedField.displayName = "SelectExtendedField";
