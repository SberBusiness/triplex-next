import React from "react";
import { ISuggestFieldOption } from "@sberbusiness/triplex-next/components/SuggestField/types";
import { ISuggestFieldDesktopDropdownProps } from "@sberbusiness/triplex-next/components/SuggestField/desktop/types";
import { Dropdown, DropdownList, DropdownListItem } from "@sberbusiness/triplex-next/components/Dropdown";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import { DataTestId } from "@sberbusiness/triplex-next/consts/DataTestId";

const KEY_CODES_SELECTABLE = [EVENT_KEY_CODES.ENTER];

export const SuggestFieldDesktopDropdown = <T extends ISuggestFieldOption = ISuggestFieldOption>({
    size,
    value,
    options,
    targetRef,
    listId,
    dataTestId,
    opened,
    listLoading,
    listRef,
    renderList,
    renderListItem,
    onSelect,
    setOpened,
    ...restProps
}: ISuggestFieldDesktopDropdownProps<T>) => {
    const List = renderList === undefined ? DropdownList : renderList;
    const ListItem = renderListItem === undefined ? DropdownListItem : renderListItem;

    return (
        <Dropdown
            size={size}
            targetRef={targetRef}
            data-test-id={dataTestId && `${dataTestId}${DataTestId.Suggest.dropdown}`}
            opened={opened}
            fixedWidth={true}
            setOpened={setOpened}
            {...restProps}
        >
            <List
                id={listId}
                size={size}
                dropdownOpened={opened}
                loading={listLoading}
                // Предотвращаем получение фокуса.
                onMouseDown={(event) => event.preventDefault()}
            >
                {options?.map((option) => (
                    <ListItem
                        key={option.id}
                        id={option.id}
                        keyCodesForSelection={KEY_CODES_SELECTABLE}
                        data-test-id={
                            dataTestId && `${dataTestId}${DataTestId.Suggest.dropdown}${DataTestId.Dropdown.listItem}`
                        }
                        selected={option.id === value?.id}
                        // Предотвращаем получение фокуса.
                        onMouseDown={(event) => event.preventDefault()}
                        onSelect={() => onSelect(option)}
                    >
                        {option.content || option.label}
                    </ListItem>
                ))}
            </List>
        </Dropdown>
    );
};
