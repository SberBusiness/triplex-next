import React, { useState } from "react";
import { MultiselectField } from "../../src/components/MultiselectField";
import { StoryObj } from "@storybook/react";
import { DropdownMobileHeader } from "../../src/components/Dropdown/mobile/DropdownMobileHeader";
import { DropdownMobileInput } from "../../src/components/Dropdown/mobile/DropdownMobileInput";
import { DropdownMobileClose } from "../../src/components/Dropdown/mobile/DropdownMobileClose";
import { DropdownMobileBody } from "../../src/components/Dropdown/mobile/DropdownMobileBody";
import { DropdownMobileFooter } from "../../src/components/Dropdown/mobile/DropdownMobileFooter";
import { Button } from "../../src/components/Button";
import { EButtonTheme } from "../../src/components/Button";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { FormField } from "../../src/components/FormField";
import { FormFieldInput, FormFieldLabel } from "../../src/components/FormField";
import { CheckboxTreeExtended } from "../../src/components/CheckboxTreeExtended/CheckboxTreeExtended";
import {
    checkChildrenCheckboxes,
    checkParentCheckboxes,
    traverseCheckboxes,
} from "../../src/components/CheckboxTree/utils";
import "./ChipMultiselect.less";
import { ChipMultiselect } from "../../src/components/Chip/ChipMultiselect";

export default {
    title: "Components/Chips/ChipMultiselect",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `

                `,
            },
        },
    },
};

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

function createMultiselectFieldStoriesLogic() {
    const [checkboxes, setCheckboxes] = useState(() => structuredClone(checkboxesInitial));
    const [filter, setFilter] = useState("");
    const [filteredCheckboxesId, setFilteredCheckboxesId] = useState<string[]>([]);

    const handleChange = (checkbox) => (event) => {
        checkbox.checked = checkbox.bulk ? true : event.target.checked;
        checkChildrenCheckboxes(checkbox);
        traverseCheckboxes(checkboxes, checkParentCheckboxes);
        setCheckboxes([...checkboxes]);
    };

    const renderCheckboxNode = (checkbox) => {
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
            <div className="not-found">Ничего не найдено</div>
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

    const handleFilterChange = (event) => {
        const { value } = event.target;
        const filteredCheckboxes = [...checkboxes];
        const filteredCheckboxesId = new Set<string>();

        const setFilteredValue = (checkbox) => {
            if (checkbox.label.toLowerCase().includes(value.toLowerCase())) {
                filteredCheckboxesId.add(checkbox.id);
            } else if (checkbox.children) {
                const intersection = checkbox.children
                    .map((item) => item.id)
                    .filter((id) => Array.from(filteredCheckboxesId).includes(id));

                if (intersection.length) filteredCheckboxesId.add(checkbox.id);
            }
        };

        traverseCheckboxes(filteredCheckboxes, setFilteredValue);

        setFilter(value);
        setFilteredCheckboxesId(Array.from(filteredCheckboxesId));
    };

    const renderDropdown = ({ opened, setOpened, targetRef, dropdownRef }) => (
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
                        <DropdownMobileHeader>
                            <DropdownMobileInput
                                placeholder="Type to proceed"
                                value={filter}
                                onChange={handleFilterChange}
                            />
                            <DropdownMobileClose onClick={() => setOpened(false)} />
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
                </FormField>
            </MultiselectField.Dropdown.Header>
            <MultiselectField.Dropdown.Content>{renderDropdownContent()}</MultiselectField.Dropdown.Content>
            <MultiselectField.Dropdown.Footer>
                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM} onClick={() => setOpened(false)}>
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
        checkboxes,
    };
}

export const Playground: StoryObj<typeof ChipMultiselect> = {
    args: {
        size: EComponentSize.MD,
        label: "Multiselect label",
        displayedValue: "Multiselect value",
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: EComponentSize.MD },
            },
        },
        label: {
            control: { type: "text" },
            description: "Название поля, которое отображается, когда значение не выбрано",
        },
        displayedValue: {
            control: { type: "text" },
            description: "Лейбл, который отображается вместо выбранного значения",
        },
    },
    render: (args) => {
        const { renderDropdown, unselectAll, checkboxes } = createMultiselectFieldStoriesLogic();

        return (
            <ChipMultiselect
                {...args}
                clearSelected={unselectAll}
                selected={Boolean(checkboxes.filter((checkbox) => checkbox.checked).length)}
                label={args.label}
                displayedValue={args.displayedValue}
            >
                {(dropdownProps) => renderDropdown(dropdownProps)}
            </ChipMultiselect>
        );
    },
};

export const DifferentSizes: StoryObj<typeof ChipMultiselect> = {
    args: {
        size: EComponentSize.SM,
        label: "Multiselect label",
        displayedValue: "Multiselect value",
    },
    argTypes: {
        size: {
            table: {
                disable: true,
            },
        },
        label: {
            table: {
                disable: true,
            },
        },
        displayedValue: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => {
        const sm = createMultiselectFieldStoriesLogic();
        const md = createMultiselectFieldStoriesLogic();
        const lg = createMultiselectFieldStoriesLogic();

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
                <ChipMultiselect
                    {...args}
                    clearSelected={sm.unselectAll}
                    selected={Boolean(sm.checkboxes.filter((checkbox) => checkbox.checked).length)}
                    label={args.label}
                    displayedValue={args.displayedValue}
                >
                    {(dropdownProps) => sm.renderDropdown(dropdownProps)}
                </ChipMultiselect>
                <ChipMultiselect
                    {...args}
                    size={EComponentSize.MD}
                    clearSelected={md.unselectAll}
                    selected={Boolean(md.checkboxes.filter((checkbox) => checkbox.checked).length)}
                    label={args.label}
                    displayedValue={args.displayedValue}
                >
                    {(dropdownProps) => md.renderDropdown(dropdownProps)}
                </ChipMultiselect>
                <ChipMultiselect
                    {...args}
                    size={EComponentSize.LG}
                    clearSelected={lg.unselectAll}
                    selected={Boolean(lg.checkboxes.filter((checkbox) => checkbox.checked).length)}
                    label={args.label}
                    displayedValue={args.displayedValue}
                >
                    {(dropdownProps) => lg.renderDropdown(dropdownProps)}
                </ChipMultiselect>
            </div>
        );
    },
};
