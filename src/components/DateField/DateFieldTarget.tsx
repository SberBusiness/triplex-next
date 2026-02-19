import React, { useContext } from "react";
import { CalendarStrokeSrvIcon16, CalendarStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import { MaskedField, IMaskedFieldProps } from "../TextField/MaskedField";
import { DatePickerExtendedContext } from "../DatePickerExtended/DatePickerExtendedContext";
import { DateFieldContext } from "./DateFieldContext";
import { EFormFieldStatus } from "../FormField/enums";
import { FormFieldClear } from "../FormField/components/FormFieldClear";
import { EComponentSize } from "../../enums";
import { ButtonIcon } from "../Button/ButtonIcon";
import { isKey } from "../../utils/keyboard";

const sizeToCalendarIconMap = {
    [EComponentSize.SM]: <CalendarStrokeSrvIcon16 paletteIndex={5} />,
    [EComponentSize.MD]: <CalendarStrokeSrvIcon20 paletteIndex={5} />,
    [EComponentSize.LG]: <CalendarStrokeSrvIcon20 paletteIndex={5} />,
};

export const DateFieldTarget: React.FC<IMaskedFieldProps> = ({
    size = EComponentSize.MD,
    postfix,
    maskedInputProps,
    ...restProps
}) => {
    const { dropdownOpen, setDropdownOpen } = useContext(DatePickerExtendedContext);
    const { inputFocusedRef, onChange, triggerChangeFromInput } = useContext(DateFieldContext);
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

    const handleClearClick = () => onChange("");

    const renderPostfixContent = () => (
        <React.Fragment>
            <FormFieldClear onClick={handleClearClick} />
            <ButtonIcon active={dropdownOpen} disabled={disabled} onClick={handleButtonClick}>
                {sizeToCalendarIconMap[size]}
            </ButtonIcon>
            {postfix}
        </React.Fragment>
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
