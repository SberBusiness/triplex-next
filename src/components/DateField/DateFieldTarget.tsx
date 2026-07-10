import React, { useContext } from "react";
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

/** Соответствие размера иконке календаря. */
const sizeToCalendarIconMap = {
    [EComponentSize.SM]: <CalendarStrokeSrvIcon16 paletteIndex={5} />,
    [EComponentSize.MD]: <CalendarStrokeSrvIcon20 paletteIndex={5} />,
    [EComponentSize.LG]: <CalendarStrokeSrvIcon24 paletteIndex={5} />,
};

export const DateFieldTarget = React.forwardRef<HTMLDivElement, IDateFieldTargetProps>(
    ({ size = EComponentSize.MD, postfix, maskedInputProps, onClear, ...restProps }, ref) => {
        const { dropdownOpen, setDropdownOpen } = useContext(DatePickerExtendedContext);
        const { inputFocusedRef, triggerChangeFromInput } = useContext(DateFieldContext);
        const { status } = restProps;
        const {
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
                    {sizeToCalendarIconMap[size]}
                </ButtonIcon>
                {postfix}
            </>
        );

        return (
            <MaskedField
                size={size}
                maskedInputProps={{
                    ...restInputProps,
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
