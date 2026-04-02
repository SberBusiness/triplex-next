import React, { useCallback } from "react";
import { ISuggestFieldOption } from "../types";
import { ISuggestFieldDesktopDropdownProps } from "./types";
import { Portal } from "../../Portal/Portal";
import { DropdownDesktop, DropdownList, DropdownListItem, EDropdownWidth } from "../../Dropdown";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { DataTestId } from "../../../consts/DataTestId";

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
    onMouseDown,
    onSelect,
    onScrollEnd,
    renderList,
    renderListItem,
    ...restProps
}: ISuggestFieldDesktopDropdownProps<T>) => {
    const List = renderList === undefined ? DropdownList : renderList;
    const ListItem = renderListItem === undefined ? DropdownListItem : renderListItem;

    const handleMouseDown = useCallback<React.MouseEventHandler<HTMLDivElement>>(
        (event) => {
            // Предотвращаем получение фокуса.
            event.preventDefault();
            onMouseDown?.(event);
        },
        [onMouseDown],
    );

    const handleListScroll = useCallback<React.UIEventHandler<HTMLDivElement>>(
        (event) => {
            if (onScrollEnd === undefined || listLoading) {
                return;
            }

            const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;

            if (scrollHeight - scrollTop - clientHeight < 1) {
                onScrollEnd();
            }
        },
        [onScrollEnd, listLoading],
    );

    return (
        <Portal container={document.body}>
            <DropdownDesktop
                size={size}
                targetRef={targetRef}
                data-test-id={dataTestId && `${dataTestId}${DataTestId.Suggest.dropdown}`}
                opened={opened}
                {...restProps}
                width={EDropdownWidth.TARGET}
                onMouseDown={handleMouseDown}
            >
                <List id={listId} size={size} dropdownOpened={opened} loading={listLoading} onScroll={handleListScroll}>
                    {options?.map((option) => (
                        <ListItem
                            key={option.id}
                            id={option.id}
                            keyCodesForSelection={KEY_CODES_SELECTABLE}
                            data-test-id={
                                dataTestId &&
                                `${dataTestId}${DataTestId.Suggest.dropdown}${DataTestId.Dropdown.listItem}`
                            }
                            selected={option.id === value?.id}
                            showNotificationIcon={option.showNotificationIcon}
                            onSelect={() => onSelect(option)}
                        >
                            {option.content || option.label}
                        </ListItem>
                    ))}
                </List>
            </DropdownDesktop>
        </Portal>
    );
};
