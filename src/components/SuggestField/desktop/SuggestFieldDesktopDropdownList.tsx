import React from "react";
import { ISuggestFieldOption } from "@sberbusiness/triplex-next/components/SuggestField/types";
import { ISuggestFieldDesktopDropdownListProps } from "@sberbusiness/triplex-next/components/SuggestField/desktop/types";
import { DropdownList } from "@sberbusiness/triplex-next/components/Dropdown";
import { SuggestFieldDesktopDropdownListItem } from "@sberbusiness/triplex-next/components/SuggestField/desktop/SuggestFieldDesktopDropdownListItem";

/** Компонент списка опций для SuggestFieldDesktop. */
export const SuggestFieldDesktopDropdownList = <T extends ISuggestFieldOption = ISuggestFieldOption>({
    className,
    value,
    options,
    onSelect,
    onMouseDown,
    renderItem,
    dataTestId,
    ...restProps
}: ISuggestFieldDesktopDropdownListProps<T>) => {
    const Item = renderItem === undefined ? SuggestFieldDesktopDropdownListItem : renderItem;

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        onMouseDown?.(event);
    };

    return (
        <DropdownList onMouseDown={handleMouseDown} {...restProps}>
            {options?.map((option) => (
                <Item
                    key={option.id}
                    id={option.id}
                    option={option}
                    selected={option.id === value?.id}
                    onSelect={onSelect}
                    dataTestId={dataTestId}
                />
            ))}
        </DropdownList>
    );
};
