import React, { useContext } from "react";
import clsx from "clsx";
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
import styles from "./styles/MonthYearFieldTarget.module.less";

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

export const MonthYearFieldTarget = React.forwardRef<HTMLDivElement, IMonthYearFieldTargetProps>(
    ({ className, size = EComponentSize.MD, postfix, onClear, inputProps, ...restProps }, ref) => {
        const { dropdownOpen, setDropdownOpen } = useContext(DatePickerExtendedContext);
        const { status } = restProps;
        const {
            className: inputClassName,
            onKeyDown: onInputKeyDown,
            onMouseDown: onInputMouseDown,
            ...restInputProps
        } = inputProps;
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
                    {SIZE_TO_CALENDAR_ICON_MAP[size]}
                </ButtonIcon>
                {postfix}
            </>
        );

        return (
            <TextField
                className={clsx(styles.monthYearFieldTarget, className)}
                size={size}
                inputProps={{
                    ...restInputProps,
                    className: clsx(SIZE_TO_INPUT_CLASS_NAME_MAP[size], inputClassName),
                    readOnly: true,
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
