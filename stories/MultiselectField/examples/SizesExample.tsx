import React, { useMemo, useRef, useState } from "react";
import {
    Button,
    Checkbox,
    CheckboxYGroup,
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
import "../MultiselectField.less";

interface IOption {
    id: string;
    label: string;
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

/** Плоский список опций с уникальным префиксом id для каждого размера. */
const createOptions = (prefix: string): IOption[] => [
    { id: `${prefix}-option-1`, label: "Значение 1" },
    { id: `${prefix}-option-2`, label: "Значение 2" },
    { id: `${prefix}-option-3`, label: "Значение 3" },
];

/** Нормализация размера кнопок для footer в зависимости от размера поля. */
const getButtonSize = (size: EComponentSize) => (size === EComponentSize.LG ? EComponentSize.MD : EComponentSize.SM);

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    /** Ref на target для привязки dropdown. */
    const targetRef = useRef<HTMLDivElement>(null);
    /** Опции для текущего размера. */
    const options = useMemo(() => createOptions(size), [size]);
    /** Id выбранных чекбоксов. */
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    /** Значение фильтра в input dropdown. */
    const [filter, setFilter] = useState("");
    /** Set для быстрых проверок выбранности по id. */
    const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
    const visibleOptions = useMemo(() => {
        const lower = filter.trim().toLowerCase();
        if (!lower.length) {
            return options;
        }

        return options.filter((opt) => opt.label.toLowerCase().includes(lower));
    }, [filter, options]);

    const selectedOptions = useMemo(() => options.filter((opt) => selectedSet.has(opt.id)), [options, selectedSet]);

    const handleToggle = (option: IOption, checked: boolean) => {
        setSelectedIds((prev) => {
            if (checked) {
                if (prev.includes(option.id)) {
                    return prev;
                }

                return [...prev, option.id];
            }

            return prev.filter((id) => id !== option.id);
        });
    };

    const handleClearAll = () => {
        setSelectedIds([]);
        setFilter("");
    };

    const renderCheckboxList = () => (
        <CheckboxYGroup aria-label="Options">
            {visibleOptions.map((opt) => (
                <Checkbox
                    key={opt.id}
                    id={opt.id}
                    size={size}
                    checked={selectedSet.has(opt.id)}
                    onChange={(event) => handleToggle(opt, event.target.checked)}
                >
                    {opt.label}
                </Checkbox>
            ))}
        </CheckboxYGroup>
    );

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

        if (!selectedOptions.length) return null;

        return (
            <TagGroup size={EComponentSize.SM}>
                {selectedOptions.map((opt) => (
                    <Tag
                        key={opt.id}
                        id={opt.id}
                        size={EComponentSize.SM}
                        onFocus={handleTagFocus}
                        onBlur={handleTagBlur}
                        onClick={handleTagClick}
                        onKeyDown={handleTagKeyDown}
                        onRemove={() => handleToggle(opt, false)}
                    >
                        {opt.label}
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
                        {renderCheckboxList()}
                        {!!filter.trim().length && !visibleOptions.length && (
                            <div className={`not-found ${size}`}>
                                <Text size={ETextSize.B3}>Nothing was found.</Text>
                            </div>
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
    );
};
