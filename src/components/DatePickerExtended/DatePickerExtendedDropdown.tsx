import React, { useContext, useRef } from "react";
import { FocusTrap, FocusTrapProps } from "focus-trap-react";
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
    focusTrapProps?: FocusTrapProps;
}

/**
 * Выпадающее меню компонента DatePickerExtended.
 * Внутренний компонент, не экспортируется через barrel.
 */
export const DatePickerExtendedDropdown = React.forwardRef<HTMLDivElement, IDatePickerExtendedDropdownProps>(
    (props, ref) => {
        const { children, targetRef, setOpened, renderHeaderTarget, renderCalendar, focusTrapProps, ...rest } = props;
        const { mouseUsedRef, setDropdownOpen } = useContext(DatePickerExtendedContext);
        const calendarRef = useRef<HTMLDivElement>(null);

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
                        // Контейнер календаря: если внутри ловушки нет ни одного tabbable-элемента
                        // (например, страница лет с отключёнными prev/next и недоступными датами),
                        // фокус остаётся внутри aria-modal диалога, а не уходит на целевой элемент.
                        // Функция, а не элемент: ref на момент рендера может быть ещё не заполнен.
                        // targetRef и document.body — страховка: focus-trap бросает исключение на пустом fallback.
                        fallbackFocus: () => calendarRef.current ?? targetRef.current ?? document.body,
                        // false — не переводить фокус внутрь ловушки при открытии мышью.
                        initialFocus: mouseUsedRef.current ? false : undefined,
                        returnFocusOnDeactivate: !mouseUsedRef.current,
                        ...focusTrapProps?.focusTrapOptions,
                    }}
                >
                    {/*
                     * tabIndex={-1} — чтобы контейнер мог принять fallback-фокус, не попадая в таб-порядок.
                     * role="presentation" здесь не ставится: по спецификации ARIA он игнорируется
                     * на фокусируемом элементе, и рядом с tabIndex только вводил бы в заблуждение.
                     */}
                    <div ref={calendarRef} tabIndex={-1}>
                        {renderCalendar(false)}
                    </div>
                </FocusTrap>
            </Dropdown>
        );
    },
);

DatePickerExtendedDropdown.displayName = "DatePickerExtendedDropdown";
