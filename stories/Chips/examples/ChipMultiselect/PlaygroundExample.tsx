import React, { useMemo, useState } from "react";
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
    Checkbox,
    CheckboxYGroup,
    ChipMultiselect,
    ETextSize,
    Text,
    type IChipMultiselectProps,
    type ISelectExtendedFieldDropdownProvideProps,
} from "@sberbusiness/triplex-next";
import { CHIP_MULTISELECT_OPTIONS } from "./storyConstants";

function createMultiselectFieldStoriesLogic(args: IChipMultiselectProps) {
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
                    size={args.size}
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
            <div className={`not-found ${args.size}`}>
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

    const renderDropdown = ({
        opened,
        setOpened,
        targetRef,
        dropdownRef,
    }: ISelectExtendedFieldDropdownProvideProps) => (
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
                <FormField size={args.size === EComponentSize.LG ? EComponentSize.MD : EComponentSize.SM}>
                    <FormFieldLabel>Type to proceed</FormFieldLabel>
                    <FormFieldInput value={filter} onChange={handleFilterChange} />
                    <FormFieldPostfix>
                        <FormFieldClear onClick={handleClearInput} />
                    </FormFieldPostfix>
                </FormField>
            </MultiselectField.Dropdown.Header>
            <MultiselectField.Dropdown.Content>{renderDropdownContent()}</MultiselectField.Dropdown.Content>
            <MultiselectField.Dropdown.Footer>
                <Button
                    theme={EButtonTheme.SECONDARY}
                    size={args.size === EComponentSize.LG ? EComponentSize.MD : EComponentSize.SM}
                    onClick={() => setOpened(false)}
                >
                    Button text
                </Button>
                <Button
                    theme={EButtonTheme.LINK}
                    size={args.size === EComponentSize.LG ? EComponentSize.MD : EComponentSize.SM}
                    onClick={handleClickClearFilter}
                >
                    Button link text
                </Button>
            </MultiselectField.Dropdown.Footer>
        </MultiselectField.Dropdown>
    );

    return {
        unselectAll,
        renderDropdown,
        selectedIds,
    };
}

export const PlaygroundExample = (args: IChipMultiselectProps) => {
    const { renderDropdown, unselectAll, selectedIds } = createMultiselectFieldStoriesLogic(args);

    return (
        <ChipMultiselect
            {...args}
            clearSelected={unselectAll}
            selected={selectedIds.length > 0}
            label={args.label}
            displayedValue={args.displayedValue}
        >
            {(dropdownProps) => renderDropdown(dropdownProps)}
        </ChipMultiselect>
    );
};
