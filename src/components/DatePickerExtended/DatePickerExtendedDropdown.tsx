import React, { useContext } from "react";
import FocusTrap from "focus-trap-react";
import { Dropdown, IDropdownProps } from "../Dropdown/Dropdown";
import { DatePickerExtendedContext } from "./DatePickerExtendedContext";
import { DropdownMobileHeader, DropdownMobileClose, DropdownMobileBody } from "../Dropdown/mobile";
import styles from "./styles/DatePickerExtended.module.less";

/** Свойства компонента DatePickerExtendedDropdown. */
export interface IDatePickerExtendedDropdownProps extends IDropdownProps {
    /** Рендер-функция календаря. */
    renderCalendar: (adaptiveMode: boolean) => React.ReactNode;
    /** Рендер-функция целевого элемента в заголовке DropdownMobile. */
    renderHeaderTarget: () => React.ReactNode;
    /** Свойства компонента FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrap.Props;
}

/** Выпадающее меню компонента DatePickerExtended. */
export const DatePickerExtendedDropdown = React.forwardRef<HTMLDivElement, IDatePickerExtendedDropdownProps>(
    (props, ref) => {
        const { children, targetRef, setOpened, renderHeaderTarget, renderCalendar, focusTrapProps, ...rest } = props;
        const { mouseUsedRef, setDropdownOpen } = useContext(DatePickerExtendedContext);

        /** Отрисовка содержимого в мобильном режиме. */
        const renderMobileContent = () => (
            <>
                <DropdownMobileHeader controlButtons={<DropdownMobileClose onClick={() => setDropdownOpen(false)} />}>
                    {renderHeaderTarget()}
                </DropdownMobileHeader>
                <DropdownMobileBody>{renderCalendar(true)}</DropdownMobileBody>
            </>
        );

        return (
            <Dropdown
                role="dialog"
                aria-modal="true"
                targetRef={targetRef}
                mobileViewProps={{
                    children: renderMobileContent(),
                    className: styles.datePickerExtendedMobileDropdown,
                }}
                setOpened={setOpened}
                {...rest}
                ref={ref}
            >
                <FocusTrap
                    {...focusTrapProps}
                    focusTrapOptions={{
                        clickOutsideDeactivates: true,
                        fallbackFocus: targetRef.current!,
                        initialFocus: !mouseUsedRef.current && undefined,
                        returnFocusOnDeactivate: !mouseUsedRef.current,
                        ...focusTrapProps?.focusTrapOptions,
                    }}
                >
                    <div role="presentation">{renderCalendar(false)}</div>
                </FocusTrap>
            </Dropdown>
        );
    },
);

DatePickerExtendedDropdown.displayName = "DatePickerExtendedDropdown";
