import React, { useEffect } from "react";
import {
    EOverlayDirection,
    IOverlayChildrenProvideProps,
    OverlayBase,
} from "@sber-business/triplex/components/Overlay/OverlayBase";
import { DropdownMobileInner } from "@sber-business/triplex/components/Dropdown/mobile/DropdownMobileInner";

/** Свойства компонента DropdownMobile. */
export interface IDropdownMobileProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Открыт. */
    opened: boolean;
    /** Устанавливает флаг opened. */
    setOpened: (opened: boolean) => void;
}

const dropdownMobileBodyOverflowClassName = "cssClass[dropdownMobileBodyOverflow]";

/** Мобильная версия Dropdown. */
export const DropdownMobile = React.forwardRef<HTMLDivElement, IDropdownMobileProps>(
    ({ children, opened, setOpened, ...htmlAttributes }, ref) => {
        useEffect(() => {
            if (opened) {
                // Предотвращение скролла контента страницы.
                document.body.classList.add(dropdownMobileBodyOverflowClassName);
            } else {
                document.body.classList.remove(dropdownMobileBodyOverflowClassName);
            }

            return () => document.body.classList.remove(dropdownMobileBodyOverflowClassName);
        }, [opened]);

        return (
            <OverlayBase setOpened={setOpened} opened={opened} direction={EOverlayDirection.BOTTOM}>
                {(props: IOverlayChildrenProvideProps) => (
                    <DropdownMobileInner
                        {...props}
                        {...htmlAttributes}
                        ref={ref}
                        data-tx={process.env.npm_package_version}
                    >
                        {children}
                    </DropdownMobileInner>
                )}
            </OverlayBase>
        );
    }
);

DropdownMobile.displayName = "DropdownMobile";
