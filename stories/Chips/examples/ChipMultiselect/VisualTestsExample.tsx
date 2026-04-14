import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
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
    EScreenWidth,
    type ISelectExtendedFieldDropdownProvideProps,
} from "@sberbusiness/triplex-next";
import { AdaptiveUtils } from "../../../utils/adaptiveUtils";
import { CHIP_MULTISELECT_VISUAL_TEST_OPTIONS } from "./storyConstants";

export const VisualTestsExample = () => {
    const smChipRef = useRef<HTMLDivElement | null>(null);
    const mdChipRef = useRef<HTMLDivElement | null>(null);
    const lgChipRef = useRef<HTMLDivElement | null>(null);

    function createMultiselectFieldStoriesLogic(
        args: { size: EComponentSize },
        chipRef: React.RefObject<HTMLDivElement | null>,
    ) {
        const [selectedIds, setSelectedIds] = useState<string[]>([]);
        const [filter, setFilter] = useState("");
        const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
        const visibleOptions = useMemo(() => {
            const lower = filter.trim().toLowerCase();
            if (!lower.length) {
                return CHIP_MULTISELECT_VISUAL_TEST_OPTIONS;
            }

            return CHIP_MULTISELECT_VISUAL_TEST_OPTIONS.filter((opt) => opt.label.toLowerCase().includes(lower));
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

        const shouldBeOpened = args.size === EComponentSize.SM ? true : !AdaptiveUtils.isAdaptive(EScreenWidth.SM_MAX);

        useLayoutEffect(() => {
            const el = chipRef.current;
            if (!el) {
                return;
            }

            const isExpanded = el.getAttribute("aria-expanded") === "true";
            if (shouldBeOpened && !isExpanded) {
                el.click();
            }

            if (!shouldBeOpened && isExpanded) {
                el.click();
            }
        }, [shouldBeOpened, chipRef]);

        const renderDropdown = ({ targetRef, dropdownRef }: ISelectExtendedFieldDropdownProvideProps) => (
            <MultiselectField.Dropdown
                opened={shouldBeOpened}
                setOpened={() => {}}
                targetRef={targetRef}
                ref={dropdownRef}
                focusTrapProps={{
                    focusTrapOptions: { initialFocus: false },
                }}
                mobileViewProps={{
                    children: (
                        <>
                            <DropdownMobileHeader controlButtons={<DropdownMobileClose />}>
                                <DropdownMobileInput
                                    placeholder="Type to proceed"
                                    value={filter}
                                    onChange={handleFilterChange}
                                />
                            </DropdownMobileHeader>
                            <DropdownMobileBody>{renderDropdownContent()}</DropdownMobileBody>
                            <DropdownMobileFooter>
                                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
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
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.LINK} size={EComponentSize.SM} onClick={handleClickClearFilter}>
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

    const sm = createMultiselectFieldStoriesLogic({ size: EComponentSize.SM }, smChipRef);
    const md = createMultiselectFieldStoriesLogic({ size: EComponentSize.MD }, mdChipRef);
    const lg = createMultiselectFieldStoriesLogic({ size: EComponentSize.LG }, lgChipRef);

    return (
        <div style={{ display: "flex", maxWidth: 600, alignItems: "flex-start", justifyContent: "space-between" }}>
            <ChipMultiselect
                ref={smChipRef}
                size={EComponentSize.SM}
                clearSelected={sm.unselectAll}
                selected={sm.selectedIds.length > 0}
                label="SM"
            >
                {(dropdownProps) => sm.renderDropdown(dropdownProps)}
            </ChipMultiselect>
            <ChipMultiselect
                ref={mdChipRef}
                size={EComponentSize.MD}
                clearSelected={md.unselectAll}
                selected={md.selectedIds.length > 0}
                label="MD"
            >
                {(dropdownProps) => md.renderDropdown(dropdownProps)}
            </ChipMultiselect>
            <ChipMultiselect
                ref={lgChipRef}
                size={EComponentSize.LG}
                clearSelected={lg.unselectAll}
                selected={lg.selectedIds.length > 0}
                label="LG"
            >
                {(dropdownProps) => lg.renderDropdown(dropdownProps)}
            </ChipMultiselect>
        </div>
    );
};
