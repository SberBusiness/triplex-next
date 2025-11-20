import { TAriaHTMLAttributes } from "@sberbusiness/triplex-next/utils/html/AriaAttributes";
import React from "react";

/**
 * Свойства, передаваемые в рендер-функцию body.
 */
export interface IAccordionBodyProvideProps {
    // Анимируется в текущий момент.
    animating: boolean;
    // Флаг раскрытости.
    isOpen: boolean;
    // Функция открыть/закрыть.
    toggle: () => void;
}

/**
 * Свойства, передаваемые в рендер-функцию header.
 */
export interface IAccordionHeaderProvideProps {
    // Анимируется в текущий момент.
    animating: boolean;
    // Aria-атрибуты a11y.
    ariaAttributes: TAriaHTMLAttributes;
    // Флаг раскрытости.
    isOpen: boolean;
    // Функция открыть/закрыть.
    toggle: () => void;
}

/**
 * Свойства AccordionBase.
 */
export interface IAccordionBaseProps {
    children?: never;
    // ClassName для ExpandAnimation.
    expandAnimationClassName?: string;
    // Флаг раскрытости.
    isOpen?: boolean;
    // Обработчик открытия/закрытия.
    onToggle?: (isOpen: boolean) => void;
    // Рендер-функция body.
    renderBody: (props: IAccordionBodyProvideProps) => React.ReactNode;
    // Рендер-функция header.
    renderHeader: (props: IAccordionHeaderProvideProps) => JSX.Element;
    // Функция открыть/закрыть.
    toggle?: (isOpen: boolean) => void;
}
