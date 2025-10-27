import React from "react";
import { OptionsoffSrvxIcon24 } from "@sberbusiness/icons/OptionsoffSrvxIcon24";
import { OptionsonSrvxIcon24 } from "@sberbusiness/icons/OptionsonSrvxIcon24";
import { Chip, ChipClearButton, IChipProps } from "@sber-business/triplex/components/Chip";

export interface IChipOptionsProps extends Omit<IChipProps, "prefix" | "postfix"> {
    /** Функция отмены выбора. */
    clearSelected: () => void;
}

/**
 * Chip с иконкой выбора опций.
 */
export const ChipOptions = React.forwardRef<HTMLSpanElement, IChipOptionsProps>(
    ({ children, clearSelected, selected, ...rest }, ref) => {
        const handleClickClearButton = (event: React.MouseEvent<HTMLButtonElement>) => {
            // Предотвращение нажатия на родительский элемент Chip.
            event.stopPropagation();

            clearSelected();
        };

        return (
            <Chip
                prefix={selected ? <OptionsonSrvxIcon24 /> : <OptionsoffSrvxIcon24 />}
                postfix={selected ? <ChipClearButton onClick={handleClickClearButton} /> : ""}
                selected={selected}
                {...rest}
                ref={ref}
            >
                {typeof children !== "undefined" ? (
                    <span className="cssClass[chipOptionsContent]">{children}</span>
                ) : (
                    children
                )}
            </Chip>
        );
    },
);

ChipOptions.displayName = "ChipOptions";
