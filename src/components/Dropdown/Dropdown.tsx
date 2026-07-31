import React, { useEffect, useRef } from "react";
import { Portal } from "@sberbusiness/triplex-next/components/Portal/Portal";
import {
    DropdownDesktop,
    IDropdownDesktopProps,
} from "@sberbusiness/triplex-next/components/Dropdown/desktop/DropdownDesktop";
import { DropdownMobile, IDropdownMobileProps } from "./mobile/DropdownMobile";
import { MobileView } from "@sberbusiness/triplex-next/components/MobileView/MobileView";

/** Свойства компонента Dropdown. */
export interface IDropdownProps extends IDropdownDesktopProps {
    /** Функция, вызывающаяся при открытии. */
    onOpen?: () => void;
    /** Функция, вызывающаяся при закрытии. */
    onClose?: () => void;
    /** Свойства отображения в адаптивном режиме. В этом режиме на мобильном устройстве Dropdown рендерится на весь экран. */
    mobileViewProps?: Omit<IDropdownMobileProps, "opened" | "setOpened">;
}

/**
 * Выпадающее меню.
 * Рендерится через Portal в document.body и позиционируется относительно targetRef.
 * Если передан mobileViewProps, на мобильной ширине экрана вместо десктопного меню рендерится
 * полноэкранная мобильная версия (DropdownMobile).
 */
export const Dropdown = React.forwardRef<HTMLDivElement, IDropdownProps>(
    ({ children, opened, setOpened, onOpen, onClose, mobileViewProps, ...desktopProps }, ref) => {
        // Предыдущее состояние открытости. Сравнение со значением вместо флага "смонтирован"
        // делает эффект идемпотентным: повторный маунт в StrictMode не вызывает колбэки.
        const prevOpenedRef = useRef(opened);
        // Актуальные колбэки хранятся в ref, чтобы эффект зависел только от opened
        // и не вызывал onOpen/onClose при смене идентичности колбэков.
        const callbacksRef = useRef({ onOpen, onClose });

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
            <Portal container={document.body}>
                {mobileViewProps ? (
                    <MobileView
                        fallback={
                            <DropdownDesktop opened={opened} setOpened={setOpened} {...desktopProps} ref={ref}>
                                {children}
                            </DropdownDesktop>
                        }
                    >
                        <DropdownMobile opened={opened} setOpened={setOpened} {...mobileViewProps} ref={ref}>
                            {mobileViewProps.children || children}
                        </DropdownMobile>
                    </MobileView>
                ) : (
                    <DropdownDesktop opened={opened} setOpened={setOpened} {...desktopProps} ref={ref}>
                        {children}
                    </DropdownDesktop>
                )}
            </Portal>
        );
    },
);

Dropdown.displayName = "Dropdown";
