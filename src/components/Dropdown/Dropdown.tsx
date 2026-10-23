import React, { useEffect, useRef } from "react";
import { Portal } from "../Portal/Portal";
import { DropdownDesktop, IDropdownDesktopProps } from "./desktop/DropdownDesktop";
import { MobileView } from "../MobileView/MobileView";
import { Puller, IPullerProps } from "../Puller/Puller";

/** Свойства компонента Dropdown. */
export interface IDropdownProps extends IDropdownDesktopProps {
    /** Функция, вызывающаяся при открытии. */
    onOpen?: () => void;
    /** Функция, вызывающаяся при закрытии. */
    onClose?: () => void;
    /**
     * Свойства шторки Puller для адаптивного режима. Если передан, на мобильной ширине экрана (<768px)
     * вместо десктопного меню рендерится Puller; pullerProps.children заменяет children.
     */
    pullerProps?: Omit<IPullerProps, "opened" | "setOpened">;
}

/**
 * Выпадающее меню.
 * Рендерится через Portal в document.body и позиционируется относительно targetRef.
 */
export const Dropdown = React.forwardRef<HTMLDivElement, IDropdownProps>(
    ({ children, opened, setOpened, onOpen, onClose, pullerProps, ...desktopProps }, ref) => {
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
                {pullerProps ? (
                    <MobileView
                        fallback={
                            <DropdownDesktop opened={opened} setOpened={setOpened} {...desktopProps} ref={ref}>
                                {children}
                            </DropdownDesktop>
                        }
                    >
                        <Puller opened={opened} setOpened={setOpened} {...pullerProps} ref={ref}>
                            {pullerProps.children || children}
                        </Puller>
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
