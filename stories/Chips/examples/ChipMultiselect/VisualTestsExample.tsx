import React, { useLayoutEffect, useMemo, useState } from "react";
import {
    MultiselectField,
    PullerHeader,
    PullerInput,
    PullerClose,
    PullerBody,
    PullerFooter,
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
    useMobileView,
    type ISelectExtendedFieldDropdownProvideProps,
} from "@sberbusiness/triplex-next";
import { CHIP_MULTISELECT_VISUAL_TEST_OPTIONS } from "./storyConstants";

/**
 * Открывает или закрывает чип так, как нужно visual-тесту. Открытость задаётся через setOpened, а не кликом по чипу:
 * клик вне шторки перехватывает её ловушка фокуса, и стрелка чипа осталась бы в закрытом положении.
 */
const OpenedSync = ({ opened, setOpened }: Pick<ISelectExtendedFieldDropdownProvideProps, "opened" | "setOpened">) => {
    useLayoutEffect(() => {
        setOpened(opened);
    }, [opened, setOpened]);

    return null;
};

function useMultiselectFieldStoriesLogic(args: { size: EComponentSize }) {
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
                    size={args.size === EComponentSize.LG ? EComponentSize.MD : args.size}
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

    const mobileView = useMobileView();
    const shouldBeOpened = args.size === EComponentSize.SM || !mobileView;

    const renderDropdown = ({ targetRef, dropdownRef }: ISelectExtendedFieldDropdownProvideProps) => (
        <MultiselectField.Dropdown
            opened={shouldBeOpened}
            setOpened={() => {}}
            targetRef={targetRef}
            ref={dropdownRef}
            focusTrapProps={{
                focusTrapOptions: { initialFocus: false },
            }}
            pullerProps={{
                children: (
                    <>
                        <PullerHeader controlButtons={<PullerClose />}>
                            <PullerInput placeholder="Type to proceed" value={filter} onChange={handleFilterChange} />
                        </PullerHeader>
                        <PullerBody>{renderDropdownContent()}</PullerBody>
                        <PullerFooter>
                            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.LINK} size={EComponentSize.SM} onClick={handleClickClearFilter}>
                                Button link text
                            </Button>
                        </PullerFooter>
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

    const renderSyncedDropdown = (dropdownProps: ISelectExtendedFieldDropdownProvideProps) => (
        <>
            <OpenedSync opened={shouldBeOpened} setOpened={dropdownProps.setOpened} />
            {renderDropdown(dropdownProps)}
        </>
    );

    return {
        unselectAll,
        renderDropdown: renderSyncedDropdown,
        selectedIds,
    };
}

export const VisualTestsExample = () => {
    const sm = useMultiselectFieldStoriesLogic({ size: EComponentSize.SM });
    const md = useMultiselectFieldStoriesLogic({ size: EComponentSize.MD });
    const lg = useMultiselectFieldStoriesLogic({ size: EComponentSize.LG });

    return (
        <div style={{ display: "flex", maxWidth: 600, alignItems: "flex-start", justifyContent: "space-between" }}>
            <ChipMultiselect
                size={EComponentSize.SM}
                clearSelected={sm.unselectAll}
                selected={sm.selectedIds.length > 0}
                label="SM"
            >
                {(dropdownProps) => sm.renderDropdown(dropdownProps)}
            </ChipMultiselect>
            <ChipMultiselect
                size={EComponentSize.MD}
                clearSelected={md.unselectAll}
                selected={md.selectedIds.length > 0}
                label="MD"
            >
                {(dropdownProps) => md.renderDropdown(dropdownProps)}
            </ChipMultiselect>
            <ChipMultiselect
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
