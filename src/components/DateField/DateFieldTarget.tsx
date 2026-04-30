import React, { useContext } from "react";
import { CalendarStrokeSrvIcon16, CalendarStrokeSrvIcon20, CalendarStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { DatePickerExtendedContext } from "../DatePickerExtended/DatePickerExtendedContext";
import { DateFieldContext } from "./DateFieldContext";
import { MaskedField } from "../TextField/MaskedField";
import { FormFieldClear } from "../FormField/components/FormFieldClear";
import { ButtonIcon } from "../Button/ButtonIcon";
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

export const DateFieldTarget: React.FC<IDateFieldTargetProps> = ({
    size = EComponentSize.MD,
    postfix,
    maskedInputProps,
    onClear,
    ...restProps
}) => {
    const { dropdownOpen, setDropdownOpen } = useContext(DatePickerExtendedContext);
    const { inputFocusedRef, triggerChangeFromInput } = useContext(DateFieldContext);
    const { status } = restProps;
    const {
        onFocus: onInputFocus,
        onBlur: onInputBlur,
        onKeyDown: onInputKeyDown,
        onClick: onInputClick,
        ...restInputProps
    } = maskedInputProps;
    const disabled = status === EFormFieldStatus.DISABLED;

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        inputFocusedRef.current = true;
        onInputFocus?.(event);
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        inputFocusedRef.current = false;

        if (!dropdownOpen) {
            triggerChangeFromInput();
        }

        onInputBlur?.(event);
    };

    const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
        if (!dropdownOpen) {
            setDropdownOpen(true);
        }
        onInputClick?.(event);
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (isKey(event.code, "ENTER")) {
            setDropdownOpen(!dropdownOpen);
        } else if (isKey(event.code, "SPACE")) {
            event.preventDefault();
            setDropdownOpen(!dropdownOpen);
        }

        onInputKeyDown?.(event);
    };

    const handleButtonClick = () => setDropdownOpen(!dropdownOpen);

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
                disabled: disabled,
                onFocus: handleInputFocus,
                onBlur: handleInputBlur,
                onClick: handleInputClick,
                onKeyDown: handleInputKeyDown,
                ...restInputProps,
            }}
            postfix={renderPostfixContent()}
            {...restProps}
        />
    );
};
