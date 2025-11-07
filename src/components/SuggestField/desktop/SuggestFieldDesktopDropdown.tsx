import React from "react";
import { ISuggestFieldOption } from "@sberbusiness/triplex-next/components/SuggestField/types";
import { ISuggestFieldDesktopDropdownProps } from "@sberbusiness/triplex-next/components/SuggestField/desktop/types";
import { Dropdown } from "@sberbusiness/triplex-next/components/Dropdown";
import { SuggestFieldDesktopDropdownList } from "@sberbusiness/triplex-next/components/SuggestField/desktop/SuggestFieldDesktopDropdownList";
import { DataTestId } from "@sberbusiness/triplex-next/consts/DataTestId";

export const SuggestFieldDesktopDropdown = <T extends ISuggestFieldOption = ISuggestFieldOption>({
    size,
    value,
    options,
    targetRef,
    listId,
    opened,
    listLoading,
    listRef,
    renderList,
    renderListItem,
    onSelect,
    setOpened,
    dataTestId,
    ...restProps
}: ISuggestFieldDesktopDropdownProps<T>) => {
    const List = renderList === undefined ? SuggestFieldDesktopDropdownList : renderList;

    return (
        <Dropdown
            size={size}
            targetRef={targetRef}
            opened={opened}
            fixedWidth={true}
            setOpened={setOpened}
            data-test-id={dataTestId && `${dataTestId}${DataTestId.Suggest.dropdown}`}
            {...restProps}
        >
            <List
                id={listId}
                value={value}
                options={options}
                size={size}
                dropdownOpened={opened}
                loading={listLoading}
                onSelect={onSelect}
                onMouseDown={(event) => event.preventDefault()}
                renderItem={renderListItem}
                dataTestId={dataTestId}
            />
        </Dropdown>
    );
};
