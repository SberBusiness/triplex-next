import React, { useContext } from "react";
import clsx from "clsx";
import { CalendarStrokeSrvIcon16, CalendarStrokeSrvIcon20, CalendarStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { DatePickerExtendedContext } from "../DatePickerExtended/DatePickerExtendedContext";
import { DateFieldContext } from "./DateFieldContext";
import { MaskedField } from "../TextField/MaskedField";
import { FormFieldClear } from "../FormField/components/FormFieldClear";
import { ButtonIcon } from "../Button/ButtonIcon";
import { useMobileView } from "../MobileView";
import { isKey } from "../../utils/keyboard";
import { EComponentSize } from "../../enums";
import { EFormFieldStatus } from "../FormField/enums";
import { IDateFieldTargetProps } from "./types";
import styles from "./styles/DateFieldTarget.module.less";

/** Соответствие размера имени класса поля ввода. */
const SIZE_TO_INPUT_CLASS_NAME_MAP = {
    [EComponentSize.SM]: styles.minWidthSM,
    [EComponentSize.MD]: styles.minWidthMD,
    [EComponentSize.LG]: styles.minWidthLG,
};

/** Соответствие размера иконке календаря. */
const SIZE_TO_CALENDAR_ICON_MAP = {
    [EComponentSize.SM]: <CalendarStrokeSrvIcon16 paletteIndex={5} />,
    [EComponentSize.MD]: <CalendarStrokeSrvIcon20 paletteIndex={5} />,
    [EComponentSize.LG]: <CalendarStrokeSrvIcon24 paletteIndex={5} />,
};

export const DateFieldTarget = React.forwardRef<HTMLDivElement, IDateFieldTargetProps>(
    ({ className, size = EComponentSize.MD, postfix, maskedInputProps, onClear, ...restProps }, ref) => {
        const { dropdownOpen, setDropdownOpen } = useContext(DatePickerExtendedContext);
        const { inputFocusedRef, triggerChangeFromInput } = useContext(DateFieldContext);
        const { status } = restProps;
        const {
            className: inputClassName,
            onFocus: onInputFocus,
            onBlur: onInputBlur,
            onKeyDown: onInputKeyDown,
            onMouseDown: onInputMouseDown,
            ...restInputProps
        } = maskedInputProps;
        const adaptive = useMobileView();
        const disabled = status === EFormFieldStatus.DISABLED;

        const handleInputFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
            inputFocusedRef.current = true;
            onInputFocus?.(event);
        };

        const handleInputBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
            inputFocusedRef.current = false;

            if (!dropdownOpen) {
                triggerChangeFromInput();
            }

            onInputBlur?.(event);
        };

        const handleMouseDown: React.MouseEventHandler<HTMLInputElement> = (event) => {
            if (!dropdownOpen) {
                if (adaptive) {
                    event.preventDefault();
                }
                // setTimeout для корректной работы label
                setTimeout(() => setDropdownOpen(true));
            }

            onInputMouseDown?.(event);
        };

        const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
            if (isKey(event.code, "ENTER")) {
                setDropdownOpen(!dropdownOpen);
            } else if (isKey(event.code, "SPACE")) {
                event.preventDefault();
                setDropdownOpen(!dropdownOpen);
            }

            onInputKeyDown?.(event);
        };

        const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => setDropdownOpen(!dropdownOpen);

        const renderPostfixContent = () => (
            <>
                {onClear && <FormFieldClear onClick={onClear} />}
                <ButtonIcon active={dropdownOpen} disabled={disabled} onClick={handleButtonClick}>
                    {SIZE_TO_CALENDAR_ICON_MAP[size]}
                </ButtonIcon>
                {postfix}
            </>
        );

        return (
            <MaskedField
                className={clsx(styles.dateFieldTarget, className)}
                size={size}
                maskedInputProps={{
                    ...restInputProps,
                    className: clsx(SIZE_TO_INPUT_CLASS_NAME_MAP[size], inputClassName),
                    disabled: disabled,
                    onFocus: handleInputFocus,
                    onBlur: handleInputBlur,
                    onMouseDown: handleMouseDown,
                    onKeyDown: handleInputKeyDown,
                }}
                postfix={renderPostfixContent()}
                {...restProps}
                ref={ref}
            />
        );
    },
);
