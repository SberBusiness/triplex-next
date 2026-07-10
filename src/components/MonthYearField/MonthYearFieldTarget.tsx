import React, { useContext } from "react";
import { CalendarStrokeSrvIcon16, CalendarStrokeSrvIcon20, CalendarStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { DatePickerExtendedContext } from "../DatePickerExtended/DatePickerExtendedContext";
import { TextField } from "../TextField/TextField";
import { FormFieldClear } from "../FormField/components/FormFieldClear";
import { ButtonIcon } from "../Button/ButtonIcon";
import { useMobileView } from "../MobileView";
import { isKey } from "../../utils/keyboard";
import { EComponentSize } from "../../enums";
import { EFormFieldStatus } from "../FormField/enums";
import { IMonthYearFieldTargetProps } from "./types";

const sizeToCalendarIconMap = {
    [EComponentSize.SM]: <CalendarStrokeSrvIcon16 paletteIndex={5} />,
    [EComponentSize.MD]: <CalendarStrokeSrvIcon20 paletteIndex={5} />,
    [EComponentSize.LG]: <CalendarStrokeSrvIcon24 paletteIndex={5} />,
};

export const MonthYearFieldTarget = React.forwardRef<HTMLDivElement, IMonthYearFieldTargetProps>(
    ({ size = EComponentSize.MD, postfix, onClear, inputProps, ...restProps }, ref) => {
        const { dropdownOpen, setDropdownOpen } = useContext(DatePickerExtendedContext);
        const { status } = restProps;
        const { onKeyDown: onInputKeyDown, onMouseDown: onInputMouseDown, ...restInputProps } = inputProps;
        const adaptive = useMobileView();
        const disabled = status === EFormFieldStatus.DISABLED;

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

        const handleButtonClick = () => setDropdownOpen(!dropdownOpen);

        const renderPostfixContent = () => (
            <>
                {onClear && <FormFieldClear onClick={onClear} />}
                <ButtonIcon
                    role="presentation"
                    tabIndex={-1}
                    active={dropdownOpen}
                    disabled={disabled}
                    onClick={handleButtonClick}
                >
                    {sizeToCalendarIconMap[size]}
                </ButtonIcon>
                {postfix}
            </>
        );

        return (
            <TextField
                size={size}
                inputProps={{
                    ...restInputProps,
                    readOnly: true,
                    disabled: disabled,
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
