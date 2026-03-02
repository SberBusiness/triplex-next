import React, { useRef, useState } from "react";
import {
    ArgTypes,
    Controls,
    Description,
    Heading,
    Primary,
    Stories,
    Subheading,
    Title,
} from "@storybook/addon-docs/blocks";
import { StoryObj } from "@storybook/react";
import { MultiselectField } from "../../src/components/MultiselectField";
import {
    DropdownMobileHeader,
    DropdownMobileInput,
    DropdownMobileClose,
    DropdownMobileBody,
    DropdownMobileFooter,
} from "../../src/components/Dropdown";
import { Button, EButtonTheme } from "../../src/components/Button";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { CheckboxTreeExtended } from "../../src/components/CheckboxTreeExtended";
import {
    checkChildrenCheckboxes,
    checkParentCheckboxes,
    traverseCheckboxes,
} from "../../src/components/CheckboxTree/utils";
import { ICheckboxTreeCheckboxData } from "../../src/components/CheckboxTree/types";
import { TagGroup } from "../../src/components/TagGroup";
import { Tag } from "../../src/components/Tag";
import {
    FormFieldDescription,
    FormFieldClear,
    EFormFieldStatus,
    FormFieldInput,
    FormFieldLabel,
    FormField,
    FormFieldPostfix,
} from "../../src/components/FormField";
import { Text, ETextSize, EFontType } from "../../src/components/Typography";
import { FormGroup } from "../../src/components/FormGroup";
import { Link } from "../../src/components/Link";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";
import { isKey } from "../../src/utils/keyboard";
import "./MultiselectField.less";
import { HelpBox } from "../../src/components/HelpBox";
import { ETooltipSize } from "../../src/components/Tooltip/enums";

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
                    <Description />
                    <Heading>Props</Heading>
                    <Subheading>MultiselectField</Subheading>
                    <ArgTypes of={MultiselectField} />
                    <Subheading>MultiselectField.Target</Subheading>
                    <ArgTypes of={MultiselectField.Target} />
                    <Subheading>MultiselectField.Dropdown</Subheading>
                    <ArgTypes of={MultiselectField.Dropdown} />
                    <Heading>Playground</Heading>
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
    postfix?: React.ReactNode;
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

    const renderTag = (tagId: string, tagText: string, onRemove: () => void) => (
        <Tag
            key={tagId}
            id={tagId}
            size={EComponentSize.SM}
            disabled={args.status === EFormFieldStatus.DISABLED}
            onFocus={(event: React.FocusEvent<HTMLSpanElement>) => event.stopPropagation()}
            onBlur={(event: React.FocusEvent<HTMLSpanElement>) => event.stopPropagation()}
            onKeyDown={(event: React.KeyboardEvent<HTMLSpanElement>) => {
                if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
                    event.stopPropagation();
                }
            }}
            onClick={(event: React.MouseEvent<HTMLSpanElement>) => event.stopPropagation()}
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
            <CheckboxTreeExtended size={args.size}>
                {checkboxes.map((checkbox) => renderCheckboxNode(checkbox))}
            </CheckboxTreeExtended>
        ) : (
            <div className="not-found">
                <Text size={ETextSize.B3}>Nothing was found.</Text>
            </div>
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
                    renderTag(checkbox.id, String(checkbox.label), () => {
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
            onClear={args.withClearButton ? unselectAll : undefined}
            {...props}
            ref={targetRef}
            prefix={args.prefix}
            postfix={args.postfix}
        />
    );

    const handleClearFilter = () => {
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
            opened={opened && !args.loading}
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
                            <Button theme={EButtonTheme.SECONDARY} onClick={() => setOpened(false)}>
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.LINK} onClick={handleClearFilter}>
                                Button link text
                            </Button>
                        </DropdownMobileFooter>
                    </>
                ),
            }}
        >
            {!args.withoutInput && (
                <MultiselectField.Dropdown.Header>
                    <FormField size={args.size === EComponentSize.LG ? EComponentSize.MD : EComponentSize.SM}>
                        <FormFieldLabel>Type to proceed</FormFieldLabel>
                        <FormFieldInput value={filter} onChange={handleFilterChange} />
                        <FormFieldPostfix>
                            <FormFieldClear onClick={handleClearInput} />
                        </FormFieldPostfix>
                    </FormField>
                </MultiselectField.Dropdown.Header>
            )}
            <MultiselectField.Dropdown.Content loading={args.dropdownContentLoading}>
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
                    onClick={handleClearFilter}
                >
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
    tags: ["!autodocs"],
    args: {
        size: EComponentSize.MD,
        status: EFormFieldStatus.DEFAULT,
        prefix: "",
        postfix: "",
        descriptionText: "",
    },
    argTypes: {
        prefix: {
            control: { type: "text" },
            description: "Текст префикса",
            table: { type: { summary: "string" } },
        },
        postfix: {
            control: { type: "text" },
            description: "Текст постфикса",
            table: { type: { summary: "string" } },
        },
        descriptionText: {
            control: { type: "text" },
            description: "Текст описания",
            table: { type: { summary: "string" } },
        },
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
            include: ["size", "status", "descriptionText", "prefix", "postfix"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: (args) => {
        const { renderTarget, renderDropdown } = createMultiselectFieldStoriesLogic(args);

        const STATUS_TO_FONT_TYPE_MAP: Record<EFormFieldStatus, EFontType> = {
            [EFormFieldStatus.DISABLED]: EFontType.SECONDARY,
            [EFormFieldStatus.DEFAULT]: EFontType.SECONDARY,
            [EFormFieldStatus.ERROR]: EFontType.ERROR,
            [EFormFieldStatus.WARNING]: EFontType.WARNING,
        };

        return (
            <div style={{ maxWidth: "304px" }}>
                <FormGroup>
                    <MultiselectField renderTarget={renderTarget} size={args.size} data-test-id="multiselect">
                        {(dropdownProps) => renderDropdown(dropdownProps)}
                    </MultiselectField>

                    {args.descriptionText && (
                        <FormFieldDescription>
                            <Text
                                tag="div"
                                size={ETextSize.B4}
                                type={STATUS_TO_FONT_TYPE_MAP[args.status ?? EFormFieldStatus.DEFAULT]}
                            >
                                {args.descriptionText}
                            </Text>
                        </FormFieldDescription>
                    )}
                </FormGroup>
            </div>
        );
    },
};

export const Default: StoryObj<IMultiselectFieldPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: `Базовый пример использования MultiselectField.`,
            },
        },
    },
    render: () => {
        const args = {
            size: EComponentSize.MD,
            status: EFormFieldStatus.DEFAULT,
            loading: false,
        };
        const { renderTarget, renderDropdown } = createMultiselectFieldStoriesLogic(args);

        return (
            <div style={{ maxWidth: "304px" }}>
                <MultiselectField renderTarget={renderTarget} data-test-id="multiselect">
                    {(dropdownProps) => renderDropdown(dropdownProps)}
                </MultiselectField>
            </div>
        );
    },
};

export const Sizes: StoryObj<IMultiselectFieldPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: `MultiselectField в трех размерах: small, medium и large.`,
            },
        },
    },
    render: () => {
        const sm = createMultiselectFieldStoriesLogic({ size: EComponentSize.SM, status: EFormFieldStatus.DEFAULT });
        const md = createMultiselectFieldStoriesLogic({ size: EComponentSize.MD, status: EFormFieldStatus.DEFAULT });
        const lg = createMultiselectFieldStoriesLogic({ size: EComponentSize.LG, status: EFormFieldStatus.DEFAULT });

        return (
            <div style={{ maxWidth: "304px" }}>
                <FormGroup>
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        <FormGroup>
                            <MultiselectField renderTarget={sm.renderTarget} size={EComponentSize.SM}>
                                {(props) => sm.renderDropdown(props)}
                            </MultiselectField>
                        </FormGroup>

                        <FormGroup>
                            <MultiselectField renderTarget={md.renderTarget}>
                                {(props) => md.renderDropdown(props)}
                            </MultiselectField>
                        </FormGroup>

                        <FormGroup>
                            <MultiselectField renderTarget={lg.renderTarget} size={EComponentSize.LG}>
                                {(props) => lg.renderDropdown(props)}
                            </MultiselectField>
                        </FormGroup>
                    </div>
                </FormGroup>
            </div>
        );
    },
};

export const Statuses: StoryObj<IMultiselectFieldPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: `MultiselectField в состояниях: disabled, error и warning, с соответствующими FormFieldDescription.`,
            },
        },
    },
    render: () => {
        const disabled = createMultiselectFieldStoriesLogic({ status: EFormFieldStatus.DISABLED });
        const error = createMultiselectFieldStoriesLogic({ size: EComponentSize.MD, status: EFormFieldStatus.ERROR });
        const warning = createMultiselectFieldStoriesLogic({
            size: EComponentSize.MD,
            status: EFormFieldStatus.WARNING,
        });

        return (
            <div style={{ maxWidth: "304px" }}>
                <FormGroup>
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        <FormGroup>
                            <MultiselectField renderTarget={disabled.renderTarget}>
                                {(props) => disabled.renderDropdown(props)}
                            </MultiselectField>

                            <FormFieldDescription>
                                <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                    Disabled text
                                </Text>
                            </FormFieldDescription>
                        </FormGroup>

                        <FormGroup>
                            <MultiselectField renderTarget={error.renderTarget}>
                                {(props) => error.renderDropdown(props)}
                            </MultiselectField>

                            <FormFieldDescription>
                                <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                                    Error text
                                </Text>
                            </FormFieldDescription>
                        </FormGroup>

                        <FormGroup>
                            <MultiselectField renderTarget={warning.renderTarget}>
                                {(props) => warning.renderDropdown(props)}
                            </MultiselectField>

                            <FormFieldDescription>
                                <Text tag="div" size={ETextSize.B4} type={EFontType.WARNING}>
                                    Warning text
                                </Text>
                            </FormFieldDescription>
                        </FormGroup>
                    </div>
                </FormGroup>
            </div>
        );
    },
};

export const Loading: StoryObj<IMultiselectFieldPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: `MultiselectField в состояниях loading: загрузка в MultiselectField.Target и в MultiselectField.Dropdown.Content.`,
            },
        },
    },
    render: () => {
        const targetLoading = createMultiselectFieldStoriesLogic({
            size: EComponentSize.MD,
            loading: true,
        });

        const dropdownLoading = createMultiselectFieldStoriesLogic({
            size: EComponentSize.MD,
            dropdownContentLoading: true,
        });

        return (
            <div style={{ maxWidth: "304px" }}>
                <FormGroup>
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        <MultiselectField renderTarget={targetLoading.renderTarget}>
                            {(props) => targetLoading.renderDropdown(props)}
                        </MultiselectField>

                        <MultiselectField renderTarget={dropdownLoading.renderTarget}>
                            {(props) => dropdownLoading.renderDropdown(props)}
                        </MultiselectField>
                    </div>
                </FormGroup>
            </div>
        );
    },
};

export const DropdownWithoutInput: StoryObj<IMultiselectFieldPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: `MultiselectField без MultiselectField.Dropdown.Header.`,
            },
        },
    },
    render: () => {
        const args = {
            size: EComponentSize.MD,
            status: EFormFieldStatus.DEFAULT,
            loading: false,
            withoutInput: true,
        };
        const { renderTarget, renderDropdown } = createMultiselectFieldStoriesLogic(args);

        return (
            <div style={{ maxWidth: "304px" }}>
                <MultiselectField renderTarget={renderTarget} data-test-id="multiselect">
                    {(dropdownProps) => renderDropdown(dropdownProps)}
                </MultiselectField>
            </div>
        );
    },
};

export const WithClearButton: StoryObj<IMultiselectFieldPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: `MultiselectField с переданным onClear.`,
            },
        },
    },
    render: () => {
        const args = {
            size: EComponentSize.MD,
            status: EFormFieldStatus.DEFAULT,
            loading: false,
            prefix: <DefaulticonStrokePrdIcon24 paletteIndex={5} />,
            withClearButton: true,
        };

        const { renderTarget, renderDropdown } = createMultiselectFieldStoriesLogic(args);

        return (
            <div style={{ maxWidth: "304px" }}>
                <MultiselectField renderTarget={renderTarget} data-test-id="multiselect">
                    {(dropdownProps) => renderDropdown(dropdownProps)}
                </MultiselectField>
            </div>
        );
    },
};

export const WithPrefixAndPostfix: StoryObj<IMultiselectFieldPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: `MultiselectField с иконкой и HelpBox, переданными в качестве prefix и postfix.`,
            },
        },
    },
    render: () => {
        const args = {
            size: EComponentSize.MD,
            status: EFormFieldStatus.DEFAULT,
            loading: false,
            prefix: <DefaulticonStrokePrdIcon24 paletteIndex={5} />,
            postfix: <HelpBox tooltipSize={ETooltipSize.SM}>HelpBox text</HelpBox>,
        };

        const { renderTarget, renderDropdown } = createMultiselectFieldStoriesLogic(args);

        return (
            <div style={{ maxWidth: "304px" }}>
                <MultiselectField renderTarget={renderTarget} data-test-id="multiselect">
                    {(dropdownProps) => renderDropdown(dropdownProps)}
                </MultiselectField>
            </div>
        );
    },
};

export const Example: StoryObj<IMultiselectFieldPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: `MultiselectField с prefix, postfix, clear button, FormFieldDescription и Link.`,
            },
        },
    },
    render: () => {
        const args = {
            size: EComponentSize.MD,
            status: EFormFieldStatus.DEFAULT,
            loading: false,
            prefix: <DefaulticonStrokePrdIcon24 paletteIndex={5} />,
            postfix: <HelpBox tooltipSize={ETooltipSize.SM}>HelpBox text</HelpBox>,
            withClearButton: true,
        };

        const { renderTarget, renderDropdown } = createMultiselectFieldStoriesLogic(args);

        return (
            <div style={{ maxWidth: "304px" }}>
                <FormGroup>
                    <MultiselectField renderTarget={renderTarget} data-test-id="multiselect">
                        {(dropdownProps) => renderDropdown(dropdownProps)}
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
        );
    },
};
