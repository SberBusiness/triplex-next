import React, { useMemo, useState } from "react";
import {
    EComponentSize,
    MultiselectField,
    DropdownMobileHeader,
    DropdownMobileInput,
    DropdownMobileClose,
    DropdownMobileBody,
    DropdownMobileFooter,
    EDropdownAlignment,
    Button,
    EButtonTheme,
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
} from "@sberbusiness/triplex-next";

type SizeItemProps = { size: EComponentSize; title: string };

const getDemoOptions = (title: string) => [
    { id: `${title}-multiselect-option-1-1`, label: "Значение 1-1" },
    { id: `${title}-multiselect-option-1-2`, label: "Значение 1-2" },
    { id: `${title}-multiselect-option-1-3`, label: "Значение 1-3" },
    { id: `${title}-multiselect-option-2-1`, label: "Значение 2-1" },
    { id: `${title}-multiselect-option-2-2`, label: "Значение 2-2" },
    { id: `${title}-multiselect-option-3`, label: "Значение 3" },
];

const SizeItem = ({ size, title }: SizeItemProps) => {
    const options = useMemo(() => getDemoOptions(title), [title]);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [filter, setFilter] = useState("");
    const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
    const visibleOptions = useMemo(() => {
        const lower = filter.trim().toLowerCase();
        if (!lower.length) {
            return options;
        }

        return options.filter((opt) => opt.label.toLowerCase().includes(lower));
    }, [filter, options]);

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
                    size={size}
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
            <div className={`not-found ${size}`}>
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
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{title}</div>
            <ChipMultiselect
                size={size}
                clearSelected={unselectAll}
                selected={selectedIds.length > 0}
                label="Multiselect label"
                displayedValue="Multiselect value"
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
                                        controlButtons={<DropdownMobileClose onClick={() => setOpened(false)} />}
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
                            <FormField size={size === EComponentSize.LG ? EComponentSize.MD : EComponentSize.SM}>
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
                                size={size === EComponentSize.LG ? EComponentSize.MD : EComponentSize.SM}
                                onClick={() => setOpened(false)}
                            >
                                Button text
                            </Button>
                            <Button
                                theme={EButtonTheme.LINK}
                                size={size === EComponentSize.LG ? EComponentSize.MD : EComponentSize.SM}
                                onClick={handleClickClearFilter}
                            >
                                Button link text
                            </Button>
                        </MultiselectField.Dropdown.Footer>
                    </MultiselectField.Dropdown>
                )}
            </ChipMultiselect>
        </div>
    );
};

export const SizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
        <SizeItem size={EComponentSize.SM} title="SM" />
        <SizeItem size={EComponentSize.MD} title="MD" />
        <SizeItem size={EComponentSize.LG} title="LG" />
    </div>
);
