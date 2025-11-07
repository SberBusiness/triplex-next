import React from "react";
import { ISuggestFieldOption } from "@sberbusiness/triplex-next/components/SuggestField/types";
import { ISuggestFieldDesktopDropdownListItemProps } from "@sberbusiness/triplex-next/components/SuggestField/desktop/types";
import { DropdownListItem } from "@sberbusiness/triplex-next/components/Dropdown";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import { DataTestId } from "@sberbusiness/triplex-next/consts/DataTestId";

const KEY_CODES_SELECTABLE = [EVENT_KEY_CODES.ENTER];

/** Компонент элемента списка опций для SuggestFieldDesktop. */
const SuggestFieldDesktopDropdownListItemBase = <T extends ISuggestFieldOption = ISuggestFieldOption>(
    { children, option, onSelect, onMouseDown, dataTestId, ...restProps }: ISuggestFieldDesktopDropdownListItemProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
) => {
    const handleSelect = () => {
        onSelect(option);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        onMouseDown?.(event);
    };

    return (
        <DropdownListItem
            title={option.label}
            keyCodesForSelection={KEY_CODES_SELECTABLE}
            onSelect={handleSelect}
            onMouseDown={handleMouseDown}
            data-test-id={dataTestId && `${dataTestId}${DataTestId.Suggest.dropdown}${DataTestId.Dropdown.listItem}`}
            {...restProps}
            ref={ref}
        >
            {option.content || option.label}
        </DropdownListItem>
    );
};

export const SuggestFieldDesktopDropdownListItem = React.forwardRef(SuggestFieldDesktopDropdownListItemBase) as <
    T extends ISuggestFieldOption = ISuggestFieldOption,
>(
    props: ISuggestFieldDesktopDropdownListItemProps<T> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element;
