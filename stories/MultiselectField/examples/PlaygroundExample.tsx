import React, { useMemo, useRef, useState } from "react";
import {
    Button,
    CheckboxTreeExtended,
    EButtonTheme,
    EComponentSize,
    EFormFieldStatus,
    ETextSize,
    FormField,
    FormFieldClear,
    FormFieldInput,
    FormFieldLabel,
    FormFieldPostfix,
    ISelectExtendedFieldTargetProvideProps,
    MultiselectField,
    Tag,
    TagGroup,
    Text,
} from "@sberbusiness/triplex-next";

interface INode {
    id: string;
    label: string;
    children?: INode[];
}

interface IPlaygroundExampleProps {
    size?: EComponentSize;
    status?: EFormFieldStatus;
    loading?: boolean;
    forceOpened?: boolean;
    initialSelectedIds?: string[];
    withInput?: boolean;
    withClearButton?: boolean;
    prefix?: React.ReactNode;
    postfix?: React.ReactNode;
}

const createNodes = (): INode[] => {
    const longChildren = [...Array(100).keys()].map((item) => ({
        id: `multiselect-option-2-2-${item}`,
        label: `Значение 2-2-${item}`,
    }));

    return [
        {
            id: "multiselect-option-0",
            label: "Все",
            children: [
                { id: "multiselect-option-1", label: "Группа 1", children: longChildren },
                {
                    id: "multiselect-option-2",
                    label: "Группа 2",
                    children: [
                        { id: "multiselect-option-2-1", label: "Значение 2-1" },
                        { id: "multiselect-option-2-2", label: "Значение 2-2" },
                    ],
                },
                { id: "multiselect-option-3", label: "Значение 3" },
            ],
        },
    ];
};

const getLeafIds = (node: INode): string[] => {
    if (!node.children) {
        return [node.id];
    }

    return node.children.flatMap(getLeafIds);
};

const getButtonSize = (size: EComponentSize) => (size === EComponentSize.LG ? EComponentSize.MD : EComponentSize.SM);

export const PlaygroundExample = ({
    size = EComponentSize.MD,
    status = EFormFieldStatus.DEFAULT,
    loading = false,
    forceOpened = false,
    initialSelectedIds = [],
    withInput = true,
    withClearButton = false,
    prefix,
    postfix,
}: IPlaygroundExampleProps) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const nodes = useMemo(() => createNodes(), []);
    const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);
    const [filter, setFilter] = useState("");

    const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
    const selectedLeafNodes = useMemo(() => {
        const result: INode[] = [];
        const traverse = (node: INode) => {
            if (!node.children && selectedSet.has(node.id)) {
                result.push(node);
            }

            node.children?.forEach(traverse);
        };

        nodes.forEach(traverse);
        return result;
    }, [nodes, selectedSet]);

    const handleToggle = (node: INode, checked: boolean) => {
        const leafIds = getLeafIds(node);
        const leafSet = new Set(leafIds);

        setSelectedIds((prev) => {
            if (checked) {
                return Array.from(new Set([...prev, ...leafIds]));
            }

            return prev.filter((id) => !leafSet.has(id));
        });
    };

    const handleClearAll = () => {
        setSelectedIds([]);
        setFilter("");
    };

    const doesNodeMatchFilter = (node: INode): boolean => {
        const lower = filter.toLowerCase();
        if (!lower.length) {
            return true;
        }

        if (node.label.toLowerCase().includes(lower)) {
            return true;
        }

        return Boolean(node.children?.some(doesNodeMatchFilter));
    };

    const renderNode = (node: INode): React.ReactNode => {
        if (!doesNodeMatchFilter(node)) {
            return null;
        }

        const leafIds = getLeafIds(node);
        const checkedCount = leafIds.filter((id) => selectedSet.has(id)).length;
        const checked = checkedCount > 0;
        const bulk = checked && checkedCount < leafIds.length;

        return (
            <CheckboxTreeExtended.Node
                key={node.id}
                id={node.id}
                opened={Boolean(node.children)}
                checkbox={(props) => (
                    <CheckboxTreeExtended.Checkbox
                        {...props}
                        bulk={bulk}
                        checked={checked}
                        onChange={(event) => handleToggle(node, event.target.checked)}
                    >
                        {node.label}
                    </CheckboxTreeExtended.Checkbox>
                )}
            >
                {node.children?.map(renderNode)}
            </CheckboxTreeExtended.Node>
        );
    };

    const renderTags = () => {
        const handleTagFocus = (event: React.FocusEvent<HTMLSpanElement>) => event.stopPropagation();
        const handleTagBlur = (event: React.FocusEvent<HTMLSpanElement>) => event.stopPropagation();
        const handleTagClick = (event: React.MouseEvent<HTMLSpanElement>) => event.stopPropagation();
        const handleTagKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
            if (event.code === "Enter" || event.code === "Space") {
                event.stopPropagation();
            }
        };

        if (!selectedLeafNodes.length) {
            return null;
        }

        if (selectedLeafNodes.length > 3) {
            return (
                <Tag
                    id="many"
                    size={EComponentSize.SM}
                    onFocus={handleTagFocus}
                    onBlur={handleTagBlur}
                    onClick={handleTagClick}
                    onKeyDown={handleTagKeyDown}
                    onRemove={handleClearAll}
                >
                    {`Выбрано ${selectedLeafNodes.length} значения`}
                </Tag>
            );
        }

        return (
            <TagGroup size={EComponentSize.SM}>
                {selectedLeafNodes.map((node) => (
                    <Tag
                        key={node.id}
                        id={node.id}
                        size={EComponentSize.SM}
                        onFocus={handleTagFocus}
                        onBlur={handleTagBlur}
                        onClick={handleTagClick}
                        onKeyDown={handleTagKeyDown}
                        onRemove={() => handleToggle(node, false)}
                    >
                        {node.label}
                    </Tag>
                ))}
            </TagGroup>
        );
    };

    const renderTarget = (props: ISelectExtendedFieldTargetProvideProps) => (
        <MultiselectField.Target
            {...props}
            label={renderTags()}
            placeholder="Select to proceed"
            fieldLabel="Label"
            size={size}
            status={status}
            loading={loading}
            prefix={prefix}
            postfix={postfix}
            onClear={withClearButton ? handleClearAll : undefined}
            ref={targetRef}
        />
    );

    return (
        <div style={{ maxWidth: "320px" }}>
            <MultiselectField renderTarget={renderTarget}>
                {({ opened, setOpened, targetRef: dropdownTargetRef, dropdownRef }) => (
                    <MultiselectField.Dropdown
                        opened={forceOpened ? true : opened}
                        setOpened={setOpened}
                        targetRef={dropdownTargetRef}
                        ref={dropdownRef}
                        focusTrapProps={{ focusTrapOptions: { initialFocus: false } }}
                    >
                        {withInput && (
                            <MultiselectField.Dropdown.Header>
                                <FormField size={getButtonSize(size)}>
                                    <FormFieldLabel>Type to proceed</FormFieldLabel>
                                    <FormFieldInput
                                        value={filter}
                                        onChange={(event) => setFilter(event.target.value)}
                                    />
                                    <FormFieldPostfix>
                                        <FormFieldClear onClick={() => setFilter("")} />
                                    </FormFieldPostfix>
                                </FormField>
                            </MultiselectField.Dropdown.Header>
                        )}

                        <MultiselectField.Dropdown.Content>
                            <CheckboxTreeExtended size={size}>{nodes.map(renderNode)}</CheckboxTreeExtended>
                            {!!filter.length && !nodes.some(doesNodeMatchFilter) && (
                                <Text size={ETextSize.B3}>Nothing was found.</Text>
                            )}
                        </MultiselectField.Dropdown.Content>

                        <MultiselectField.Dropdown.Footer>
                            <Button
                                theme={EButtonTheme.SECONDARY}
                                size={getButtonSize(size)}
                                onClick={() => setOpened(false)}
                            >
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.LINK} size={getButtonSize(size)} onClick={handleClearAll}>
                                Button link text
                            </Button>
                        </MultiselectField.Dropdown.Footer>
                    </MultiselectField.Dropdown>
                )}
            </MultiselectField>
        </div>
    );
};
