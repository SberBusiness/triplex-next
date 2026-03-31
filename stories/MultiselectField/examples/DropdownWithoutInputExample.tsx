import React, { useMemo, useRef, useState } from "react";
import {
    Button,
    CheckboxTreeExtended,
    EButtonTheme,
    EComponentSize,
    MultiselectField,
    Tag,
    TagGroup,
} from "@sberbusiness/triplex-next";

interface INode {
    id: string;
    label: string;
    children?: INode[];
}

/** Фиксированный набор нод для версии dropdown без поля фильтра. */
const nodes: INode[] = [
    {
        id: "without-input-option-0",
        label: "Все",
        children: [
            { id: "without-input-option-1", label: "Значение 1" },
            { id: "without-input-option-2", label: "Значение 2" },
            { id: "without-input-option-3", label: "Значение 3" },
        ],
    },
];

/** Получение всех leaf-id для ноды и ее потомков. */
const getLeafIds = (node: INode): string[] => (node.children ? node.children.flatMap(getLeafIds) : [node.id]);

export const DropdownWithoutInputExample = () => {
    /** Ref на target для корректного позиционирования dropdown. */
    const targetRef = useRef<HTMLDivElement>(null);
    /** Id выбранных leaf-чекбоксов. */
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
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

    /** Рекурсивный рендер нод дерева с состояниями checked/bulk. */
    const renderNode = (node: INode): React.ReactNode => {
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
                        <MultiselectField.Dropdown.Content>
                            <CheckboxTreeExtended>{nodes.map(renderNode)}</CheckboxTreeExtended>
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
