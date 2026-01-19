import React, { useEffect, useState, useContext } from "react";
import FocusTrap from "focus-trap-react";
import { Dropdown, IDropdownProps } from "../../Dropdown/Dropdown";
import { MultiselectFieldDropdownHeader } from "./MultiselectFieldDropdownHeader";
import { MultiselectFieldDropdownContent } from "./MultiselectFieldDropdownContent";
import { MultiselectFieldDropdownFooter } from "./MultiselectFieldDropdownFooter";
import { MobileView } from "../../MobileView/MobileView";
import { MultiselectFieldContext } from "../MultiselectFieldContext";

/** Свойства компонента MultiselectFieldDropdown. */
export interface IMultiselectFieldDropdownProps extends IDropdownProps {
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrap.Props;
}

/** Компонент выпадающего блока мильти-списка. */
export const MultiselectFieldDropdown = Object.assign(
    React.forwardRef<HTMLDivElement, IMultiselectFieldDropdownProps>(
        ({ children, focusTrapProps, opened, targetRef, mobileViewProps, ...rest }, ref) => {
            const [trapActive, setTrapActive] = useState(false);

            const { size } = useContext(MultiselectFieldContext);

            useEffect(() => {
                const timeoutId = window.setTimeout(() => setTrapActive(opened));
                return () => window.clearTimeout(timeoutId);
            }, [opened]);

            const renderDropdown = () => (
                <Dropdown
                    fixedWidth={false}
                    mobileViewProps={{
                        ...mobileViewProps,
                        className: mobileViewProps?.className,
                    }}
                    targetRef={targetRef}
                    opened={opened}
                    size={size}
                    {...rest}
                    ref={ref}
                >
                    {children}
                </Dropdown>
            );

            return (
                <MobileView
                    fallback={
                        !opened ? null : (
                            <FocusTrap
                                active={trapActive}
                                {...focusTrapProps}
                                focusTrapOptions={{
                                    clickOutsideDeactivates: true,
                                    preventScroll: true,
                                    ...focusTrapProps?.focusTrapOptions,
                                }}
                            >
                                {renderDropdown()}
                            </FocusTrap>
                        )
                    }
                >
                    {renderDropdown()}
                </MobileView>
            );
        },
    ),
    {
        Header: MultiselectFieldDropdownHeader,
        Content: MultiselectFieldDropdownContent,
        Footer: MultiselectFieldDropdownFooter,
    },
);

MultiselectFieldDropdown.displayName = "MultiselectFieldDropdown";
