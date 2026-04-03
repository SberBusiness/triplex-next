import React, { useLayoutEffect, useRef, useState } from "react";
import { MultiselectField } from "../../src/components/MultiselectField";
import { StoryObj } from "@storybook/react";
import {
    DropdownMobileHeader,
    DropdownMobileInput,
    DropdownMobileClose,
    DropdownMobileBody,
    DropdownMobileFooter,
} from "../../src/components/Dropdown";
import { Button, EButtonTheme } from "../../src/components/Button";
import { EComponentSize } from "../../src/enums/EComponentSize";
import {
    FormField,
    FormFieldLabel,
    FormFieldInput,
    FormFieldPostfix,
    FormFieldClear,
} from "../../src/components/FormField";
import { CheckboxTreeExtended } from "../../src/components/CheckboxTreeExtended";
import {
    checkChildrenCheckboxes,
    checkParentCheckboxes,
    traverseCheckboxes,
} from "../../src/components/CheckboxTree/utils";
import { ChipMultiselect } from "../../src/components/Chip";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { ETextSize, Text } from "../../src/components/Typography";
import { EScreenWidth } from "../../src/helpers/breakpoints";
import { AdaptiveUtils } from "../utils/adaptiveUtils";
import "./ChipMultiselect.less";

export default {
    title: "Components/Chips/ChipMultiselect",
    component: ChipMultiselect,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент выбора нескольких значений из списка в виде компонента Chip.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipMultiselect} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
};

export const Playground: StoryObj<typeof ChipMultiselect> = {
    tags: ["!autodocs"],
    args: {
        size: EComponentSize.MD,
        label: "Multiselect label",
        displayedValue: "Multiselect value",
        disabled: false,
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
        disabled: {
            control: { type: "boolean" },
            description: "Состояние disabled",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["size", "label", "displayedValue", "disabled"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: (args) => {
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

        function createMultiselectFieldStoriesLogic(args) {
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
                    <CheckboxTreeExtended size={args.size}>
                        {checkboxes.map((checkbox) => renderCheckboxNode(checkbox))}
                    </CheckboxTreeExtended>
                ) : (
                    <div className={`not-found ${args.size}`}>
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
                        <FormField size={args.size === EComponentSize.LG ? EComponentSize.MD : EComponentSize.SM}>
                            <FormFieldLabel>Type to proceed</FormFieldLabel>
                            <FormFieldInput value={filter} onChange={handleFilterChange} />
                            <FormFieldPostfix>
                                <FormFieldClear onClick={handleClearInput} />
                            </FormFieldPostfix>
                        </FormField>
                    </MultiselectField.Dropdown.Header>
                    <MultiselectField.Dropdown.Content loading={args.loading}>
                        {renderDropdownContent()}
                    </MultiselectField.Dropdown.Content>
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
                checkboxes,
            };
        }

        const { renderDropdown, unselectAll, checkboxes } = createMultiselectFieldStoriesLogic(args);

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

export const Default: StoryObj<typeof ChipMultiselect> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
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
                <CheckboxTreeExtended>
                    {checkboxes.map((checkbox) => renderCheckboxNode(checkbox))}
                </CheckboxTreeExtended>
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
    },
};

export const Sizes: StoryObj<typeof ChipMultiselect> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
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

        function createMultiselectFieldStoriesLogic(args) {
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
                    <CheckboxTreeExtended size={args.size}>
                        {checkboxes.map((checkbox) => renderCheckboxNode(checkbox))}
                    </CheckboxTreeExtended>
                ) : (
                    <div className={`not-found ${args.size}`}>
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
                checkboxes,
            };
        }

        const sm = createMultiselectFieldStoriesLogic({ size: EComponentSize.SM });
        const md = createMultiselectFieldStoriesLogic({ size: EComponentSize.MD });
        const lg = createMultiselectFieldStoriesLogic({ size: EComponentSize.LG });

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
                <ChipMultiselect
                    size={EComponentSize.SM}
                    clearSelected={sm.unselectAll}
                    selected={Boolean(sm.checkboxes.filter((checkbox) => checkbox.checked).length)}
                    label="SM"
                >
                    {(dropdownProps) => sm.renderDropdown(dropdownProps)}
                </ChipMultiselect>
                <ChipMultiselect
                    size={EComponentSize.MD}
                    clearSelected={md.unselectAll}
                    selected={Boolean(md.checkboxes.filter((checkbox) => checkbox.checked).length)}
                    label="MD"
                >
                    {(dropdownProps) => md.renderDropdown(dropdownProps)}
                </ChipMultiselect>
                <ChipMultiselect
                    size={EComponentSize.LG}
                    clearSelected={lg.unselectAll}
                    selected={Boolean(lg.checkboxes.filter((checkbox) => checkbox.checked).length)}
                    label="LG"
                >
                    {(dropdownProps) => lg.renderDropdown(dropdownProps)}
                </ChipMultiselect>
            </div>
        );
    },
};

export const Loading: StoryObj<typeof ChipMultiselect> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
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
                <CheckboxTreeExtended>
                    {checkboxes.map((checkbox) => renderCheckboxNode(checkbox))}
                </CheckboxTreeExtended>
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
                    <FormField size={EComponentSize.SM}>
                        <FormFieldLabel>Type to proceed</FormFieldLabel>
                        <FormFieldInput value={filter} onChange={handleFilterChange} />
                        <FormFieldPostfix>
                            <FormFieldClear onClick={handleClearInput} />
                        </FormFieldPostfix>
                    </FormField>
                </MultiselectField.Dropdown.Header>
                <MultiselectField.Dropdown.Content loading={true}>
                    {renderDropdownContent()}
                </MultiselectField.Dropdown.Content>
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
    },
};

export const VisualTests: StoryObj<typeof ChipMultiselect> = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: () => {
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

        const smChipRef = useRef<HTMLDivElement | null>(null);
        const mdChipRef = useRef<HTMLDivElement | null>(null);
        const lgChipRef = useRef<HTMLDivElement | null>(null);

        function createMultiselectFieldStoriesLogic(args, chipRef) {
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
                    <CheckboxTreeExtended size={args.size}>
                        {checkboxes.map((checkbox) => renderCheckboxNode(checkbox))}
                    </CheckboxTreeExtended>
                ) : (
                    <div className={`not-found ${args.size}`}>
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

            const shouldBeOpened =
                args.size === EComponentSize.SM ? true : !AdaptiveUtils.isAdaptive(EScreenWidth.SM_MAX);

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

            const renderDropdown = ({ targetRef, dropdownRef }) => (
                <MultiselectField.Dropdown
                    opened={shouldBeOpened}
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
                checkboxes,
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
                    selected={Boolean(sm.checkboxes.filter((checkbox) => checkbox.checked).length)}
                    label="SM"
                >
                    {(dropdownProps) => sm.renderDropdown(dropdownProps)}
                </ChipMultiselect>
                <ChipMultiselect
                    ref={mdChipRef}
                    size={EComponentSize.MD}
                    clearSelected={md.unselectAll}
                    selected={Boolean(md.checkboxes.filter((checkbox) => checkbox.checked).length)}
                    label="MD"
                >
                    {(dropdownProps) => md.renderDropdown(dropdownProps)}
                </ChipMultiselect>
                <ChipMultiselect
                    ref={lgChipRef}
                    size={EComponentSize.LG}
                    clearSelected={lg.unselectAll}
                    selected={Boolean(lg.checkboxes.filter((checkbox) => checkbox.checked).length)}
                    label="LG"
                >
                    {(dropdownProps) => lg.renderDropdown(dropdownProps)}
                </ChipMultiselect>
            </div>
        );
    },
};
