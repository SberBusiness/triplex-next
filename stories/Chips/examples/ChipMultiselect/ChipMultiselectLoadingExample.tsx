import React, { useMemo, useState } from "react";
import {
    EComponentSize,
    MultiselectField,
    FormField,
    FormFieldLabel,
    FormFieldInput,
    FormFieldPostfix,
    FormFieldClear,
    Checkbox,
    CheckboxYGroup,
    ChipMultiselect,
    ETextSize,
    Text,
    DropdownMobileHeader,
    DropdownMobileInput,
    DropdownMobileClose,
    DropdownMobileBody,
    DropdownMobileFooter,
    EDropdownAlignment,
    Button,
    EButtonTheme,
    DropdownMobileLoader,
} from "@sberbusiness/triplex-next";

const CHIP_MULTISELECT_OPTIONS = [
    { id: "multiselect-option-1-1", label: "Значение 1-1" },
    { id: "multiselect-option-1-2", label: "Значение 1-2" },
    { id: "multiselect-option-1-3", label: "Значение 1-3" },
    { id: "multiselect-option-2-1", label: "Значение 2-1" },
    { id: "multiselect-option-2-2", label: "Значение 2-2" },
    { id: "multiselect-option-3", label: "Значение 3" },
];

export const ChipMultiselectLoadingExample = () => {
    const chipSize = EComponentSize.MD;

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [filter, setFilter] = useState("");
    const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
    const visibleOptions = useMemo(() => {
        const lower = filter.trim().toLowerCase();
        if (!lower.length) {
            return CHIP_MULTISELECT_OPTIONS;
        }

        return CHIP_MULTISELECT_OPTIONS.filter((opt) => opt.label.toLowerCase().includes(lower));
    }, [filter]);

    const handleToggle = (optionId: string, checked: boolean) => {
        setSelectedIds((prev) => {
            if (checked) {
                if (prev.includes(optionId)) {
                    return prev;
                }

                return [...prev, optionId];
            }

            return prev.filter((id) => id !== optionId);
        });
    };

    const renderCheckboxList = () => (
        <CheckboxYGroup aria-label="Options">
            {visibleOptions.map((opt) => (
                <Checkbox
                    key={opt.id}
                    id={opt.id}
                    size={chipSize}
                    checked={selectedSet.has(opt.id)}
                    onChange={(event) => handleToggle(opt.id, event.target.checked)}
                >
                    {opt.label}
                </Checkbox>
            ))}
        </CheckboxYGroup>
    );

    const renderDropdownContent = () => {
        const renderCheckboxes = !filter.trim() || visibleOptions.length > 0;
        return renderCheckboxes ? (
            renderCheckboxList()
        ) : (
            <div className={`not-found ${chipSize}`}>
                <Text size={ETextSize.B3}>Nothing was found</Text>
            </div>
        );
    };

    const unselectAll = () => {
        setSelectedIds([]);
        setFilter("");
    };

    const handleClickClearFilter = () => {
        unselectAll();
    };

    const handleClearInput = () => {
        setFilter("");
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    return (
        <ChipMultiselect
            size={chipSize}
            clearSelected={unselectAll}
            selected={selectedIds.length > 0}
            label="Multiselect label"
        >
            {({ opened, setOpened, targetRef, dropdownRef }) => (
                <MultiselectField.Dropdown
                    opened={opened}
                    setOpened={setOpened}
                    targetRef={targetRef}
                    ref={dropdownRef}
                    alignment={EDropdownAlignment.LEFT}
                    focusTrapProps={{ focusTrapOptions: { initialFocus: false } }}
                    mobileViewProps={{
                        children: (
                            <>
                                <DropdownMobileHeader
                                    controlButtons={
                                        <>
                                            <DropdownMobileLoader />
                                            <DropdownMobileClose onClick={() => setOpened(false)} />
                                        </>
                                    }
                                >
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
                                    <Button
                                        theme={EButtonTheme.LINK}
                                        size={EComponentSize.SM}
                                        onClick={handleClickClearFilter}
                                    >
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
                    <MultiselectField.Dropdown.Content loading>
                        {renderDropdownContent()}
                    </MultiselectField.Dropdown.Content>
                    <MultiselectField.Dropdown.Footer>
                        <Button
                            theme={EButtonTheme.SECONDARY}
                            size={EComponentSize.SM}
                            onClick={() => setOpened(false)}
                        >
                            Button text
                        </Button>
                        <Button theme={EButtonTheme.LINK} size={EComponentSize.SM} onClick={handleClickClearFilter}>
                            Button link text
                        </Button>
                    </MultiselectField.Dropdown.Footer>
                </MultiselectField.Dropdown>
            )}
        </ChipMultiselect>
    );
};
