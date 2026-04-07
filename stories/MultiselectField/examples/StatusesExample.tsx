import React, { useMemo, useRef, useState } from "react";
import {
    Button,
    Checkbox,
    CheckboxYGroup,
    EButtonTheme,
    EComponentSize,
    EFormFieldStatus,
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

/** Набор статусов для демонстрации состояний поля. */
const STATUS_ITEMS = [
    { id: "default", label: "DEFAULT", status: EFormFieldStatus.DEFAULT },
    { id: "error", label: "ERROR", status: EFormFieldStatus.ERROR },
    { id: "warning", label: "WARNING", status: EFormFieldStatus.WARNING },
    { id: "disabled", label: "DISABLED", status: EFormFieldStatus.DISABLED },
];

export const StatusesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "320px" }}>
        {STATUS_ITEMS.map((item) => (
            <div key={item.id}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>{item.label}</div>
                <StatusItem status={item.status} idPrefix={item.id} />
            </div>
        ))}
    </div>
);

interface IOption {
    id: string;
    label: string;
}

interface IStatusItemProps {
    idPrefix: string;
    status: EFormFieldStatus;
}

/** Плоский список опций с уникальным префиксом id для каждого статуса. */
const createOptions = (prefix: string): IOption[] => [
    { id: `${prefix}-option-1`, label: "Значение 1" },
    { id: `${prefix}-option-2`, label: "Значение 2" },
    { id: `${prefix}-option-3`, label: "Значение 3" },
];

const StatusItem = ({ idPrefix, status }: IStatusItemProps) => {
    /** Ref на target для корректной привязки dropdown. */
    const targetRef = useRef<HTMLDivElement>(null);
    /** Опции для текущего статуса. */
    const options = useMemo(() => createOptions(idPrefix), [idPrefix]);
    /** Id выбранных чекбоксов. */
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    /** Значение фильтра в input dropdown. */
    const [filter, setFilter] = useState("");
    /** Set для быстрых проверок выбранности. */
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
                    size={EComponentSize.MD}
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
                    status={status}
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
                        {renderCheckboxList()}
                        {!!filter.trim().length && !visibleOptions.length && (
                            <div className="not-found md">
                                <Text size={ETextSize.B3}>Nothing was found.</Text>
                            </div>
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
                        <Button theme={EButtonTheme.LINK} size={EComponentSize.SM} onClick={handleClearAll}>
                            Button link text
                        </Button>
                    </MultiselectField.Dropdown.Footer>
                </MultiselectField.Dropdown>
            )}
        </MultiselectField>
    );
};
