import React, { useContext } from "react";
import { CalendarStrokeSrvIcon16, CalendarStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import { TextField, ITextFieldProps } from "../TextField/TextField";
import { DatePickerExtendedContext } from "../DatePickerExtended/DatePickerExtendedContext";
import { MonthYearFieldContext } from "./MonthYearFieldContext";
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

export const MonthYearFieldTarget: React.FC<ITextFieldProps> = ({
    size = EComponentSize.MD,
    postfix,
    inputProps,
    ...restProps
}) => {
    const { dropdownOpen, setDropdownOpen } = useContext(DatePickerExtendedContext);
    const { onChange } = useContext(MonthYearFieldContext);
    const { status } = restProps;
    const { onKeyDown: onInputKeyDown, onClick: onInputClick, ...restInputProps } = inputProps;
    const disabled = status === EFormFieldStatus.DISABLED;

    const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
        setDropdownOpen(!dropdownOpen);
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
            <ButtonIcon
                role="presentation"
                tabIndex={-1}
                active={dropdownOpen}
                disabled={disabled}
                onClick={handleButtonClick}
            >
                {sizeToCalendarIconMap[size]}
            </ButtonIcon>
        </React.Fragment>
    );

    return (
        <TextField
            size={size}
            inputProps={{
                readOnly: true,
                disabled: disabled,
                onClick: handleInputClick,
                onKeyDown: handleInputKeyDown,
                ...restInputProps,
            }}
            postfix={postfix !== undefined ? postfix : renderPostfixContent()}
            {...restProps}
        />
    );
};
