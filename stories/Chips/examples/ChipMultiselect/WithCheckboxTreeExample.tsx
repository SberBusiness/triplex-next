import React, { useState } from "react";
import {
    MultiselectField,
    DropdownMobileHeader,
    DropdownMobileInput,
    DropdownMobileClose,
    DropdownMobileBody,
    DropdownMobileFooter,
    Button,
    EButtonTheme,
    EComponentSize,
    FormField,
    FormFieldLabel,
    FormFieldInput,
    FormFieldPostfix,
    FormFieldClear,
    ChipMultiselect,
    ETextSize,
    Text,
    CheckboxTreeExtended,
    checkChildrenCheckboxes,
    traverseCheckboxes,
    checkParentCheckboxes,
    ICheckboxTreeCheckboxData,
} from "@sberbusiness/triplex-next";

export const WithCheckboxTreeExample = () => {
    const checkboxesInitial = [
        {
            bulk: false,
            checked: false,
            children: [
                {
                    bulk: false,
                    checked: false,
                    children: [
                        {
                            checked: false,
                            id: "multiselect-option-1-1",
                            label: "Значение 1-1",
                        },
                        {
                            checked: false,
                            id: "multiselect-option-1-2",
                            label: "Значение 1-2",
                        },
                        {
                            checked: false,
                            id: "multiselect-option-1-3",
                            label: "Значение 1-3",
                        },
                    ],
                    id: "multiselect-option-1",
                    label: "Группа 1",
                },
                {
                    bulk: false,
                    checked: false,
                    children: [
                        {
                            checked: false,
                            id: "multiselect-option-2-1",
                            label: "Значение 2-1",
                        },
                        {
                            checked: false,
                            id: "multiselect-option-2-2",
                            label: "Значение 2-2",
                        },
                    ],
                    id: "multiselect-option-2",
                    label: "Группа 2",
                },
                {
                    checked: false,
                    id: "multiselect-option-3",
                    label: "Значение 3",
                },
            ],
            id: "multiselect-option-0",
            label: "Все",
        },
    ];

    const [checkboxes, setCheckboxes] = useState(() => structuredClone(checkboxesInitial));
    const [filter, setFilter] = useState("");
    const [filteredCheckboxesId, setFilteredCheckboxesId] = useState<string[]>([]);

    const handleChange = (checkbox: ICheckboxTreeCheckboxData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        checkbox.checked = checkbox.bulk ? true : event.target.checked;
        checkChildrenCheckboxes(checkbox);
        traverseCheckboxes(checkboxes, checkParentCheckboxes);
        setCheckboxes([...checkboxes]);
    };

    const renderCheckboxNode = (checkbox: ICheckboxTreeCheckboxData) => {
        if (filter && !filteredCheckboxesId.includes(checkbox.id)) return null;
        return (
            <CheckboxTreeExtended.Node
                key={checkbox.id}
                id={checkbox.id}
                checkbox={(props) => (
                    <CheckboxTreeExtended.Checkbox
                        {...props}
                        bulk={checkbox.bulk}
                        checked={checkbox.checked}
                        onChange={handleChange(checkbox)}
                    >
                        {checkbox.label}
                    </CheckboxTreeExtended.Checkbox>
                )}
            >
                {checkbox.children && checkbox.children.map((child) => renderCheckboxNode(child))}
            </CheckboxTreeExtended.Node>
        );
    };

    const renderDropdownContent = () => {
        const renderCheckboxes = !filter || (filteredCheckboxesId.length && filter);
        return renderCheckboxes ? (
            <CheckboxTreeExtended>{checkboxes.map((checkbox) => renderCheckboxNode(checkbox))}</CheckboxTreeExtended>
        ) : (
            <div className="not-found md">
                <Text size={ETextSize.B3}>Nothing was found</Text>
            </div>
        );
    };

    const unselectAll = () => {
        const nextCheckboxes = [...checkboxes];
        traverseCheckboxes(nextCheckboxes, (checkbox) => {
            checkbox.checked = false;
            checkbox.bulk = false;
        });
        setCheckboxes(nextCheckboxes);
    };

    const handleClickClearFilter = () => {
        setFilter("");
        setFilteredCheckboxesId([]);
        unselectAll();
    };

    const handleClearInput = () => {
        setFilter("");
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const filteredCheckboxes = [...checkboxes];
        const filteredCheckboxesId = new Set<string>();

        const addMatchedSubtree = (node: ICheckboxTreeCheckboxData) => {
            filteredCheckboxesId.add(node.id);
            node.children?.forEach(addMatchedSubtree);
        };

        const setFilteredValue = (checkbox: ICheckboxTreeCheckboxData) => {
            if (
                checkbox.label &&
                typeof checkbox.label === "string" &&
                checkbox.label.toLowerCase().includes(value.toLowerCase())
            ) {
                addMatchedSubtree(checkbox);
            } else if (checkbox.children) {
                const intersection = checkbox.children
                    .map((item: ICheckboxTreeCheckboxData) => item.id)
                    .filter((id) => Array.from(filteredCheckboxesId).includes(id));

                if (intersection.length) filteredCheckboxesId.add(checkbox.id);
            }
        };

        traverseCheckboxes(filteredCheckboxes, setFilteredValue);

        setFilter(value);
        setFilteredCheckboxesId(Array.from(filteredCheckboxesId));
    };

    const renderDropdown = ({
        opened,
        setOpened,
        targetRef,
        dropdownRef,
    }: {
        opened: boolean;
        setOpened: (opened: boolean) => void;
        targetRef: React.RefObject<HTMLDivElement>;
        dropdownRef: React.RefObject<HTMLDivElement>;
    }) => (
        <MultiselectField.Dropdown
            opened={opened}
            setOpened={setOpened}
            targetRef={targetRef}
            ref={dropdownRef}
            focusTrapProps={{
                focusTrapOptions: { initialFocus: false },
            }}
            mobileViewProps={{
                children: (
                    <>
                        <DropdownMobileHeader controlButtons={<DropdownMobileClose onClick={() => setOpened(false)} />}>
                            <DropdownMobileInput
                                placeholder="Type to proceed"
                                value={filter}
                                onChange={handleFilterChange}
                            />
                        </DropdownMobileHeader>
                        <DropdownMobileBody>{renderDropdownContent()}</DropdownMobileBody>
                        <DropdownMobileFooter>
                            <Button
                                theme={EButtonTheme.GENERAL}
                                size={EComponentSize.SM}
                                onClick={() => setOpened(false)}
                            >
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.LINK} size={EComponentSize.SM} onClick={handleClickClearFilter}>
                                Button link text
                            </Button>
                        </DropdownMobileFooter>
                    </>
                ),
            }}
        >
            <MultiselectField.Dropdown.Header>
                <FormField size={EComponentSize.SM}>
                    <FormFieldLabel>Type to proceed</FormFieldLabel>
                    <FormFieldInput value={filter} onChange={handleFilterChange} />
                    <FormFieldPostfix>
                        <FormFieldClear onClick={handleClearInput} />
                    </FormFieldPostfix>
                </FormField>
            </MultiselectField.Dropdown.Header>
            <MultiselectField.Dropdown.Content>{renderDropdownContent()}</MultiselectField.Dropdown.Content>
            <MultiselectField.Dropdown.Footer>
                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM} onClick={() => setOpened(false)}>
                    Button text
                </Button>
                <Button theme={EButtonTheme.LINK} size={EComponentSize.SM} onClick={handleClickClearFilter}>
                    Button link text
                </Button>
            </MultiselectField.Dropdown.Footer>
        </MultiselectField.Dropdown>
    );

    return (
        <ChipMultiselect
            clearSelected={unselectAll}
            selected={Boolean(checkboxes.filter((checkbox) => checkbox.checked).length)}
            label="Multiselect label"
        >
            {(dropdownProps) => renderDropdown(dropdownProps)}
        </ChipMultiselect>
    );
};
