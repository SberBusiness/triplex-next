import React, { useMemo, useRef, useState } from "react";
import {
    Button,
    CheckboxTreeExtended,
    EButtonTheme,
    EComponentSize,
    ETooltipSize,
    FormField,
    FormFieldClear,
    FormFieldInput,
    FormFieldLabel,
    FormFieldPostfix,
    HelpBox,
    MultiselectField,
    Text,
    ETextSize,
    Tag,
    TagGroup,
} from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";
interface INode {
    id: string;
    label: string;
    children?: INode[];
}

/** Фиксированный набор нод для демонстрации prefix/postfix. */
const nodes: INode[] = [
    {
        id: "prefix-postfix-option-0",
        label: "Все",
        children: [
            { id: "prefix-postfix-option-1", label: "Значение 1" },
            { id: "prefix-postfix-option-2", label: "Значение 2" },
            { id: "prefix-postfix-option-3", label: "Значение 3" },
        ],
    },
];

/** Получение всех leaf-id для ноды и ее потомков. */
const getLeafIds = (node: INode): string[] => (node.children ? node.children.flatMap(getLeafIds) : [node.id]);

export const WithPrefixAndPostfixExample = () => {
    /** Ref на target для корректной привязки dropdown. */
    const targetRef = useRef<HTMLDivElement>(null);
    /** Id выбранных leaf-чекбоксов. */
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    /** Значение фильтра в input dropdown. */
    const [filter, setFilter] = useState("");
    /** Set для быстрых проверок выбранности. */
    const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
    /** Карта id -> label для отображения человекочитаемых тегов. */
    const labelsById = useMemo(() => {
        const map = new Map<string, string>();

        const collectLabels = (items: INode[]) => {
            items.forEach((item) => {
                map.set(item.id, item.label);
                if (item.children) collectLabels(item.children);
            });
        };

        collectLabels(nodes);
        return map;
    }, []);

    /** Переключение выбранности ноды вместе с ее leaf-потомками. */
    const handleToggle = (node: INode, checked: boolean) => {
        const leafIds = getLeafIds(node);
        const leafSet = new Set(leafIds);

        setSelectedIds((prev) => {
            if (checked) return Array.from(new Set([...prev, ...leafIds]));
            return prev.filter((id) => !leafSet.has(id));
        });
    };

    /** Проверка, подходит ли нода под фильтр сама или через дочерние элементы. */
    const doesNodeMatchFilter = (node: INode): boolean => {
        const lowerFilter = filter.trim().toLowerCase();
        if (!lowerFilter.length) return true;
        if (node.label.toLowerCase().includes(lowerFilter)) return true;
        return Boolean(node.children?.some(doesNodeMatchFilter));
    };

    /** Рекурсивный рендер нод дерева с вычислением checked/bulk. */
    const renderNode = (node: INode): React.ReactNode => {
        if (!doesNodeMatchFilter(node)) return null;

        const leafIds = getLeafIds(node);
        const checkedCount = leafIds.filter((id) => selectedSet.has(id)).length;

        return (
            <CheckboxTreeExtended.Node
                key={node.id}
                id={node.id}
                opened={Boolean(node.children)}
                checkbox={(props) => (
                    <CheckboxTreeExtended.Checkbox
                        {...props}
                        checked={checkedCount > 0}
                        bulk={checkedCount > 0 && checkedCount < leafIds.length}
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

    /** Рендер тегов выбранных значений в target. */
    const renderTags = () => {
        const handleTagFocus = (event: React.FocusEvent<HTMLSpanElement>) => event.stopPropagation();
        const handleTagBlur = (event: React.FocusEvent<HTMLSpanElement>) => event.stopPropagation();
        const handleTagClick = (event: React.MouseEvent<HTMLSpanElement>) => event.stopPropagation();
        const handleTagKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
            if (event.code === "Enter" || event.code === "Space") {
                event.stopPropagation();
            }
        };

        if (!selectedIds.length) return null;

        return (
            <TagGroup size={EComponentSize.SM}>
                {selectedIds.map((id) => (
                    <Tag
                        key={id}
                        id={id}
                        size={EComponentSize.SM}
                        onFocus={handleTagFocus}
                        onBlur={handleTagBlur}
                        onClick={handleTagClick}
                        onKeyDown={handleTagKeyDown}
                        onRemove={() => setSelectedIds((prev) => prev.filter((item) => item !== id))}
                    >
                        {labelsById.get(id) ?? id}
                    </Tag>
                ))}
            </TagGroup>
        );
    };

    return (
        <div style={{ maxWidth: "320px" }}>
            <MultiselectField
                renderTarget={(props) => (
                    <MultiselectField.Target
                        {...props}
                        ref={targetRef}
                        size={EComponentSize.MD}
                        fieldLabel="Label"
                        placeholder="Select to proceed"
                        label={renderTags()}
                        prefix={<DefaulticonStrokePrdIcon24 paletteIndex={5} />}
                        postfix={<HelpBox tooltipSize={ETooltipSize.SM}>HelpBox text</HelpBox>}
                    />
                )}
            >
                {({ opened, setOpened, targetRef: dropdownTargetRef, dropdownRef }) => (
                    <MultiselectField.Dropdown
                        opened={opened}
                        setOpened={setOpened}
                        targetRef={dropdownTargetRef}
                        ref={dropdownRef}
                        focusTrapProps={{ focusTrapOptions: { initialFocus: false } }}
                    >
                        <MultiselectField.Dropdown.Header>
                            <FormField size={EComponentSize.SM}>
                                <FormFieldLabel>Type to proceed</FormFieldLabel>
                                <FormFieldInput value={filter} onChange={(event) => setFilter(event.target.value)} />
                                <FormFieldPostfix>
                                    <FormFieldClear onClick={() => setFilter("")} />
                                </FormFieldPostfix>
                            </FormField>
                        </MultiselectField.Dropdown.Header>
                        <MultiselectField.Dropdown.Content>
                            <CheckboxTreeExtended>{nodes.map(renderNode)}</CheckboxTreeExtended>
                            {!!filter.length && !nodes.some(doesNodeMatchFilter) && (
                                <Text size={ETextSize.B3}>Nothing was found.</Text>
                            )}
                        </MultiselectField.Dropdown.Content>
                        <MultiselectField.Dropdown.Footer>
                            <Button
                                theme={EButtonTheme.SECONDARY}
                                size={EComponentSize.SM}
                                onClick={() => setOpened(false)}
                            >
                                Button text
                            </Button>
                            <Button
                                theme={EButtonTheme.LINK}
                                size={EComponentSize.SM}
                                onClick={() => setSelectedIds([])}
                            >
                                Button link text
                            </Button>
                        </MultiselectField.Dropdown.Footer>
                    </MultiselectField.Dropdown>
                )}
            </MultiselectField>
        </div>
    );
};
