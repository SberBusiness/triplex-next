import React, { useContext, useEffect } from "react";
import FocusTrap from "focus-trap-react";
import { Dropdown, IDropdownProps, EDropdownWidth } from "../../Dropdown";
import { MultiselectFieldDropdownHeader } from "./MultiselectFieldDropdownHeader";
import { MultiselectFieldDropdownContent } from "./MultiselectFieldDropdownContent";
import { MultiselectFieldDropdownFooter } from "./MultiselectFieldDropdownFooter";
import { MultiselectFieldContext } from "../MultiselectFieldContext";

/** Свойства компонента MultiselectFieldDropdown. */
export interface IMultiselectFieldDropdownProps extends IDropdownProps {
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrap.Props;
}

/**
 * Заглушка на случай, когда потребитель не передал mobileViewProps: Dropdown включает
 * мобильную версию по truthiness этого prop'а, поэтому непустой объект нужен всегда —
 * без него на мобильной ширине отрендерился бы десктопный выпадающий блок.
 */
const ALWAYS_MOBILE_VIEW_PROPS: NonNullable<IDropdownProps["mobileViewProps"]> = {};

/**
 * Компонент выпадающего блока мульти-списка.
 *
 * Оборачивает Dropdown в FocusTrap, поэтому фокус не уходит за пределы блока,
 * пока он открыт. Размер берёт из MultiselectFieldContext.
 */
export const MultiselectFieldDropdown = Object.assign(
    React.forwardRef<HTMLDivElement, IMultiselectFieldDropdownProps>(
        ({ children, focusTrapProps, opened, targetRef, mobileViewProps, ...rest }, ref) => {
            const { size, mouseUsedRef } = useContext(MultiselectFieldContext);

            useEffect(() => {
                if (!opened) {
                    mouseUsedRef.current = false;
                }
            }, [opened, mouseUsedRef]);

            return (
                <Dropdown
                    width={EDropdownWidth.MIN_TARGET}
                    mobileViewProps={mobileViewProps ?? ALWAYS_MOBILE_VIEW_PROPS}
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
                            // После открытия мышью фокус на поле не возвращается — иначе клик
                            // вне блока снова подсветил бы поле выбора.
                            returnFocusOnDeactivate: !mouseUsedRef.current,
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
