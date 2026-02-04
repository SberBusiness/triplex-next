import React, { useEffect } from "react";
import {
    EOverlayDirection,
    IOverlayChildrenProvideProps,
    OverlayBase,
} from "@sberbusiness/triplex-next/components/Overlay/OverlayBase";
import { DropdownMobileInner } from "@sberbusiness/triplex-next/components/Dropdown/mobile/DropdownMobileInner";
import styles from "../styles/DropdownMobile.module.less";

/** Свойства компонента DropdownMobile. */
export interface IDropdownMobileProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Открыт. */
    opened: boolean;
    /** Устанавливает флаг opened. */
    setOpened: (opened: boolean) => void;
}

const dropdownMobileBodyOverflowClassName = styles.dropdownMobileBodyOverflow;

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
    },
);

DropdownMobile.displayName = "DropdownMobile";
