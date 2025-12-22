import React, { useRef, useState } from "react";
import { Controls, Description, Primary, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";
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
import { ICheckboxTreeCheckboxData } from "../../src/components/CheckboxTree/types";
import { TagGroup } from "../../src/components/TagGroup";
import { Tag } from "../../src/components/Tag";
import { EFormFieldStatus } from "../../src/components/FormField/enums";
import { FormFieldDescription } from "../../src/components/FormField/components/FormFieldDescription";
import { Text } from "../../src/components/Typography";
import { ETextSize } from "../../src/components/Typography/enums";
import { EFontType } from "../../src/components/Typography/enums";
import { FormGroup } from "../../src/components/FormGroup";
import { Link } from "../../src/components/Link";
import { DefaulticonStrokePrdIcon20, QuestioncircleFilledSrvIcon16 } from "@sberbusiness/icons-next";
import "./MultiselectField.less";

export default {
    title: "Components/MultiselectField",
    component: MultiselectField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент мульти-списка.

## Особенности

- **Размеры**: SM, MD, LG.

## Состав

- Target — поле ввода
- Dropdown — выпадающий список
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
};

interface IMultiselectFieldPlaygroundProps extends React.ComponentProps<typeof MultiselectField> {
    size?: EComponentSize;
    status?: EFormFieldStatus;
    descriptionText?: string;
    errorText?: string;
}

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
    const targetRef = useRef();
    const [checkboxes, setCheckboxes] = useState(() => structuredClone(checkboxesInitial));
    const [filter, setFilter] = useState("");
    const [filteredCheckboxesId, setFilteredCheckboxesId] = useState<string[]>([]);

    const renderTag = (tagId, tagText, onRemove) => (
        <Tag
            key={tagId}
            id={tagId}
            size={EComponentSize.SM}
            onClick={(event) => event.stopPropagation()}
            onRemove={onRemove}
        >
            {tagText}
        </Tag>
    );

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

    const unselectCheckbox = (id) => {
        const nextCheckboxes = [...checkboxes];
        let changedCheckbox;

        traverseCheckboxes(nextCheckboxes, (checkbox) => {
            if (checkbox.id === id) {
                checkbox.checked = false;
                checkbox.bulk = false;
                changedCheckbox = checkbox;
            }
        });

        if (!changedCheckbox) return;

        checkChildrenCheckboxes(changedCheckbox);
        traverseCheckboxes(nextCheckboxes, checkParentCheckboxes);
        setCheckboxes(nextCheckboxes);
    };

    const unselectAll = () => {
        const nextCheckboxes = [...checkboxes];
        traverseCheckboxes(nextCheckboxes, (checkbox) => {
            checkbox.checked = false;
            checkbox.bulk = false;
        });
        setCheckboxes(nextCheckboxes);
    };

    const renderCountInfoTag = (count, onRemove) => {
        const tagText = `Выбрано ${count} значения`;
        return renderTag("many", tagText, onRemove);
    };

    const renderTags = () => {
        const filtered: ICheckboxTreeCheckboxData[] = [];
        traverseCheckboxes(checkboxes, (checkbox) => {
            if (checkbox.checked && !checkbox.bulk && !checkbox.children) filtered.push(checkbox);
        });

        const length = filtered.length;
        if (length === 0) return null;
        if (length > 3) return renderCountInfoTag(length, () => unselectAll());

        return (
            <TagGroup size={EComponentSize.SM}>
                {filtered.map((checkbox) =>
                    renderTag(checkbox.id, checkbox.label, () => {
                        unselectCheckbox(checkbox.id);
                    }),
                )}
            </TagGroup>
        );
    };

    const renderTarget = (props) => (
        <MultiselectField.Target
            label={renderTags()}
            placeholder="Select to proceed"
            fieldLabel="Label"
            size={args.size}
            status={args.status}
            loading={args.loading}
            {...props}
            ref={targetRef}
            prefix={<DefaulticonStrokePrdIcon20 paletteIndex={5} />}
            postfix={<QuestioncircleFilledSrvIcon16 paletteIndex={5} />}
        />
    );

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
        renderTarget,
        renderDropdown,
    };
}

export const Playground: StoryObj<IMultiselectFieldPlaygroundProps> = {
    args: {
        size: EComponentSize.MD,
        status: EFormFieldStatus.DEFAULT,
        descriptionText: "(21) Description ",
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
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            description: "Состояние компонента",
            table: {
                type: { summary: "EFormFieldStatus" },
                defaultValue: { summary: EFormFieldStatus.DEFAULT },
            },
        },
    },
    parameters: {
        controls: {
            include: ["size", "status", "descriptionText"],
        },
    },
    render: (args) => {
        const { renderTarget, renderDropdown } = createMultiselectFieldStoriesLogic(args);

        const statusToTextTypeMap = {
            [EFormFieldStatus.ERROR]: EFontType.ERROR,
            [EFormFieldStatus.WARNING]: EFontType.WARNING,
            [EFormFieldStatus.DEFAULT]: EFontType.SECONDARY,
        };

        const statusToTextMap = {
            [EFormFieldStatus.ERROR]: "Error text ",
            [EFormFieldStatus.WARNING]: "Warning text ",
            [EFormFieldStatus.DEFAULT]: args.descriptionText || "Description text ",
        };

        return (
            <FormGroup>
                <MultiselectField renderTarget={renderTarget} size={args.size} data-test-id="multiselect">
                    {(dropdownProps) => renderDropdown(dropdownProps)}
                </MultiselectField>

                {(args.descriptionText || args.errorText) && (
                    <FormFieldDescription>
                        <Text
                            tag="div"
                            size={ETextSize.B4}
                            type={statusToTextTypeMap[args.status || EFormFieldStatus.DEFAULT]}
                        >
                            {statusToTextMap[args.status || EFormFieldStatus.DEFAULT]}
                            <Link href="#" onClick={(event) => event.preventDefault()}>
                                Link text
                            </Link>
                        </Text>
                    </FormFieldDescription>
                )}
            </FormGroup>
        );
    },
};

export const DifferentSizes = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const sm = createMultiselectFieldStoriesLogic({ size: EComponentSize.SM, status: EFormFieldStatus.DEFAULT });
        const md = createMultiselectFieldStoriesLogic({ size: EComponentSize.MD, status: EFormFieldStatus.DEFAULT });
        const lg = createMultiselectFieldStoriesLogic({ size: EComponentSize.LG, status: EFormFieldStatus.DEFAULT });

        return (
            <FormGroup>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <FormGroup>
                        <MultiselectField renderTarget={sm.renderTarget}>
                            {(props) => sm.renderDropdown(props)}
                        </MultiselectField>

                        <FormFieldDescription>
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                (21) Description{" "}
                                <Link href="#" onClick={(event) => event.preventDefault()}>
                                    Link text
                                </Link>
                            </Text>
                        </FormFieldDescription>
                    </FormGroup>

                    <FormGroup>
                        <MultiselectField renderTarget={md.renderTarget}>
                            {(props) => md.renderDropdown(props)}
                        </MultiselectField>

                        <FormFieldDescription>
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                (21) Description{" "}
                                <Link href="#" onClick={(event) => event.preventDefault()}>
                                    Link text
                                </Link>
                            </Text>
                        </FormFieldDescription>
                    </FormGroup>

                    <FormGroup>
                        <MultiselectField renderTarget={lg.renderTarget}>
                            {(props) => lg.renderDropdown(props)}
                        </MultiselectField>

                        <FormFieldDescription>
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                (21) Description{" "}
                                <Link href="#" onClick={(event) => event.preventDefault()}>
                                    Link text
                                </Link>
                            </Text>
                        </FormFieldDescription>
                    </FormGroup>
                </div>
            </FormGroup>
        );
    },
};

export const DifferentStatuses = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const disabled = createMultiselectFieldStoriesLogic({ status: EFormFieldStatus.DISABLED });
        const error = createMultiselectFieldStoriesLogic({ status: EFormFieldStatus.ERROR });
        const warning = createMultiselectFieldStoriesLogic({ status: EFormFieldStatus.WARNING });

        return (
            <FormGroup>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <FormGroup>
                        <MultiselectField renderTarget={disabled.renderTarget}>
                            {(props) => disabled.renderDropdown(props)}
                        </MultiselectField>

                        <FormFieldDescription>
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                (21) Description{" "}
                                <Link href="#" onClick={(event) => event.preventDefault()}>
                                    Link text
                                </Link>
                            </Text>
                        </FormFieldDescription>
                    </FormGroup>

                    <FormGroup>
                        <MultiselectField renderTarget={error.renderTarget}>
                            {(props) => error.renderDropdown(props)}
                        </MultiselectField>

                        <FormFieldDescription>
                            <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                                Error text{" "}
                                <Link href="#" onClick={(event) => event.preventDefault()}>
                                    Link text
                                </Link>
                            </Text>
                        </FormFieldDescription>
                    </FormGroup>

                    <FormGroup>
                        <MultiselectField renderTarget={warning.renderTarget}>
                            {(props) => warning.renderDropdown(props)}
                        </MultiselectField>

                        <FormFieldDescription>
                            <Text tag="div" size={ETextSize.B4} type={EFontType.WARNING}>
                                Warning text{" "}
                                <Link href="#" onClick={(event) => event.preventDefault()}>
                                    Link text
                                </Link>
                            </Text>
                        </FormFieldDescription>
                    </FormGroup>
                </div>
            </FormGroup>
        );
    },
};

export const Loading: StoryObj<IMultiselectFieldPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const sm = createMultiselectFieldStoriesLogic({
            size: EComponentSize.SM,
            loading: true,
        });
        const md = createMultiselectFieldStoriesLogic({
            size: EComponentSize.MD,
            loading: true,
        });
        const lg = createMultiselectFieldStoriesLogic({
            size: EComponentSize.LG,
            loading: true,
        });

        return (
            <FormGroup>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <FormGroup>
                        <MultiselectField renderTarget={sm.renderTarget}>
                            {(props) => sm.renderDropdown(props)}
                        </MultiselectField>

                        <FormFieldDescription>
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                (21) Description{" "}
                                <Link href="#" onClick={(event) => event.preventDefault()}>
                                    Link text
                                </Link>
                            </Text>
                        </FormFieldDescription>
                    </FormGroup>

                    <FormGroup>
                        <MultiselectField renderTarget={md.renderTarget}>
                            {(props) => md.renderDropdown(props)}
                        </MultiselectField>

                        <FormFieldDescription>
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                (21) Description{" "}
                                <Link href="#" onClick={(event) => event.preventDefault()}>
                                    Link text
                                </Link>
                            </Text>
                        </FormFieldDescription>
                    </FormGroup>

                    <FormGroup>
                        <MultiselectField renderTarget={lg.renderTarget}>
                            {(props) => lg.renderDropdown(props)}
                        </MultiselectField>

                        <FormFieldDescription>
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                (21) Description{" "}
                                <Link href="#" onClick={(event) => event.preventDefault()}>
                                    Link text
                                </Link>
                            </Text>
                        </FormFieldDescription>
                    </FormGroup>
                </div>
            </FormGroup>
        );
    },
};
