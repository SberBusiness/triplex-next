import React, { useContext, useEffect } from "react";
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

/**
 * Компонент выпадающего блока мульти-списка.
 *
 * Оборачивает Dropdown в FocusTrap, поэтому фокус не уходит за пределы блока,
 * пока он открыт. Размер берёт из MultiselectFieldContext.
 */
export const MultiselectFieldDropdown = Object.assign(
    React.forwardRef<HTMLDivElement, IMultiselectFieldDropdownProps>(
        ({ children, focusTrapProps, opened, targetRef, pullerProps, ...rest }, ref) => {
            const { size, mouseUsedRef } = useContext(MultiselectFieldContext);

            useEffect(() => {
                if (!opened) {
                    mouseUsedRef.current = false;
                }
            }, [opened, mouseUsedRef]);

            // После открытия мышью фокус на поле не возвращается — иначе клик вне блока снова подсветил бы поле выбора.
            // Ловушки читают опцию при монтировании, то есть при открытии, когда mouseUsedRef уже выставлен.
            const returnFocusOnDeactivate = !mouseUsedRef.current;

            // Объект нужен всегда: Dropdown включает мобильную версию по truthiness pullerProps.
            // Ловушка Puller отключена (фокус держит FocusTrap ниже), если её не включили явно (`active: true`).
            // Исключение — свои children шторки: они вне FocusTrap, поэтому ловушка Puller остаётся,
            // а её возврат фокуса подчиняется тому же правилу, что и у FocusTrap ниже.
            const pullerFocusTrapProps = pullerProps?.focusTrapProps;
            const resolvedPullerProps: NonNullable<IDropdownProps["pullerProps"]> = {
                ...pullerProps,
                focusTrapProps: pullerProps?.children
                    ? {
                          ...pullerFocusTrapProps,
                          focusTrapOptions: { returnFocusOnDeactivate, ...pullerFocusTrapProps?.focusTrapOptions },
                      }
                    : { ...pullerFocusTrapProps, active: pullerFocusTrapProps?.active ?? false },
            };

            return (
                <Dropdown
                    width={EDropdownWidth.MIN_TARGET}
                    pullerProps={resolvedPullerProps}
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
                            returnFocusOnDeactivate,
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
