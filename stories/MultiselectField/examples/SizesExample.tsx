import React, { useMemo, useRef, useState } from "react";
import {
    Button,
    CheckboxTreeExtended,
    EButtonTheme,
    EComponentSize,
    FormField,
    FormFieldClear,
    FormFieldInput,
    FormFieldLabel,
    FormFieldPostfix,
    MultiselectField,
    Text,
    ETextSize,
    Tag,
    TagGroup,
} from "@sberbusiness/triplex-next";

interface INode {
    id: string;
    label: string;
    children?: INode[];
}

/** Набор размеров для демонстрации вариативности компонента. */
const SIZES = [EComponentSize.SM, EComponentSize.MD, EComponentSize.LG];

export const SizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "320px" }}>
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>{size.toUpperCase()}</div>
                <SizeItem size={size} />
            </div>
        ))}
    </div>
);

/** Создание дерева нод с уникальным префиксом для каждого размера. */
const createNodes = (prefix: string): INode[] => [
    {
        id: `${prefix}-option-0`,
        label: "Все",
        children: [
            { id: `${prefix}-option-1`, label: "Значение 1" },
            { id: `${prefix}-option-2`, label: "Значение 2" },
            { id: `${prefix}-option-3`, label: "Значение 3" },
        ],
    },
];

/** Получение всех leaf-id для ноды и ее потомков. */
const getLeafIds = (node: INode): string[] => (node.children ? node.children.flatMap(getLeafIds) : [node.id]);
/** Нормализация размера кнопок для footer в зависимости от размера поля. */
const getButtonSize = (size: EComponentSize) => (size === EComponentSize.LG ? EComponentSize.MD : EComponentSize.SM);

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    /** Ref на target для привязки dropdown. */
    const targetRef = useRef<HTMLDivElement>(null);
    /** Дерево нод для текущего размера. */
    const nodes = useMemo(() => createNodes(size), [size]);
    /** Id выбранных leaf-чекбоксов. */
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    /** Значение фильтра в input dropdown. */
    const [filter, setFilter] = useState("");
    /** Set для быстрых проверок выбранности по id. */
    const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

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

    /** Рекурсивный рендер ноды дерева с вычислением checked/bulk состояния. */
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
                        {id}
                    </Tag>
                ))}
            </TagGroup>
        );
    };

    return (
        <MultiselectField
            renderTarget={(props) => (
                <MultiselectField.Target
                    {...props}
                    ref={targetRef}
                    size={size}
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
                    <MultiselectField.Dropdown.Header>
                        <FormField size={getButtonSize(size)}>
                            <FormFieldLabel>Type to proceed</FormFieldLabel>
                            <FormFieldInput value={filter} onChange={(event) => setFilter(event.target.value)} />
                            <FormFieldPostfix>
                                <FormFieldClear onClick={() => setFilter("")} />
                            </FormFieldPostfix>
                        </FormField>
                    </MultiselectField.Dropdown.Header>
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
                        <Button theme={EButtonTheme.LINK} size={getButtonSize(size)} onClick={() => setSelectedIds([])}>
                            Button link text
                        </Button>
                    </MultiselectField.Dropdown.Footer>
                </MultiselectField.Dropdown>
            )}
        </MultiselectField>
    );
};
