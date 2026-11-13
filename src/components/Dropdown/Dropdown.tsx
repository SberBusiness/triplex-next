import React from "react";
import { Portal } from "../Portal/Portal";
import { useDropdownOpenCallbacks } from "./useDropdownOpenCallbacks";
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
        useDropdownOpenCallbacks(opened, onOpen, onClose);

        const desktopDropdown = (
            <Portal container={document.body}>
                <DropdownDesktop opened={opened} setOpened={setOpened} {...desktopProps} ref={ref}>
                    {children}
                </DropdownDesktop>
            </Portal>
        );

        if (!pullerProps) {
            return desktopDropdown;
        }

        return (
            <MobileView fallback={desktopDropdown}>
                <Puller opened={opened} setOpened={setOpened} {...pullerProps} ref={ref}>
                    {pullerProps.children || children}
                </Puller>
            </MobileView>
        );
    },
);

Dropdown.displayName = "Dropdown";
