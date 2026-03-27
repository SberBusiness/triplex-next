import React, { useContext } from "react";
import { FocusTrap, FocusTrapProps } from "focus-trap-react";
import { Dropdown, IDropdownProps, EDropdownWidth } from "../../Dropdown";
import { MultiselectFieldDropdownHeader } from "./MultiselectFieldDropdownHeader";
import { MultiselectFieldDropdownContent } from "./MultiselectFieldDropdownContent";
import { MultiselectFieldDropdownFooter } from "./MultiselectFieldDropdownFooter";
import { MultiselectFieldContext } from "../MultiselectFieldContext";

/** Свойства компонента MultiselectFieldDropdown. */
export interface IMultiselectFieldDropdownProps extends IDropdownProps {
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrapProps;
}

/** Компонент выпадающего блока мильти-списка. */
export const MultiselectFieldDropdown = Object.assign(
    React.forwardRef<HTMLDivElement, IMultiselectFieldDropdownProps>(
        ({ children, focusTrapProps, opened, targetRef, mobileViewProps, ...rest }, ref) => {
            const { size } = useContext(MultiselectFieldContext);

            return (
                <Dropdown
                    width={EDropdownWidth.MIN_TARGET}
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
                    <FocusTrap
                        {...focusTrapProps}
                        focusTrapOptions={{
                            clickOutsideDeactivates: true,
                            preventScroll: true,
                            ...focusTrapProps?.focusTrapOptions,
                        }}
                    >
                        <div role="presentation">{children}</div>
                    </FocusTrap>
                </Dropdown>
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
