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
    Tag,
    TagGroup,
    Text,
    ETextSize,
} from "@sberbusiness/triplex-next";

interface INode {
    id: string;
    label: string;
    children?: INode[];
}

/** Генерация исходного дерева чекбоксов для примера. */
const createNodes = (): INode[] => [
    {
        id: "multiselect-option-0",
        label: "Все",
        children: [
            {
                id: "multiselect-option-1",
                label: "Группа 1",
                children: [...Array(40).keys()].map((item) => ({
                    id: `multiselect-option-1-${item}`,
                    label: `Значение 1-${item}`,
                })),
            },
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

/** Получение всех leaf-id для ноды и ее потомков. */
const getLeafIds = (node: INode): string[] => (node.children ? node.children.flatMap(getLeafIds) : [node.id]);

export const DefaultExample = () => {
    /** Ref на target, который нужен для корректного позиционирования dropdown. */
    const targetRef = useRef<HTMLDivElement>(null);
    /** Мемоизированные исходные ноды дерева, чтобы не пересоздавать их на каждый рендер. */
    const nodes = useMemo(() => createNodes(), []);
    /** Массив id выбранных leaf-чекбоксов. */
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    /** Текущее значение фильтра в поле поиска dropdown. */
    const [filter, setFilter] = useState("");
    /** Set для быстрых O(1) проверок выбранности чекбокса по id. */
    const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

    /** Переключение состояния ноды: выбирает/снимает все leaf-потомки. */
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
                        checked={checked}
                        bulk={bulk}
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

    /** Плоский список выбранных leaf-нод для рендера тегов в target. */
    const selectedLeafNodes = nodes
        .flatMap(getLeafIds)
        .filter((id) => selectedSet.has(id))
        .map((id) => ({ id, label: id.replace("multiselect-option-", "Значение ") }));

    /** Рендер тегов выбранных значений или счетчика, если выбранных значений много. */
    const renderTags = () => {
        const handleTagFocus = (event: React.FocusEvent<HTMLSpanElement>) => event.stopPropagation();
        const handleTagBlur = (event: React.FocusEvent<HTMLSpanElement>) => event.stopPropagation();
        const handleTagClick = (event: React.MouseEvent<HTMLSpanElement>) => event.stopPropagation();
        const handleTagKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
            if (event.code === "Enter" || event.code === "Space") {
                event.stopPropagation();
            }
        };

        if (!selectedLeafNodes.length) return null;
        if (selectedLeafNodes.length > 3) {
            return (
                <Tag
                    id="many"
                    size={EComponentSize.SM}
                    onFocus={handleTagFocus}
                    onBlur={handleTagBlur}
                    onClick={handleTagClick}
                    onKeyDown={handleTagKeyDown}
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
                        onRemove={() => setSelectedIds((prev) => prev.filter((id) => id !== node.id))}
                    >
                        {node.label}
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
