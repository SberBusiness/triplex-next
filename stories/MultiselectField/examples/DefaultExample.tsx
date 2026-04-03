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
    Tag,
    TagGroup,
    Text,
    ETextSize,
    DropdownMobileFooter,
    DropdownMobileBody,
    DropdownMobileHeader,
    DropdownMobileInput,
    DropdownMobileClose,
} from "@sberbusiness/triplex-next";
import "../MultiselectField.less";

interface IOption {
    id: string;
    label: string;
}

/** Плоский список опций для примера (раньше задавался как дерево). */
const createOptions = (): IOption[] => {
    const group1 = [...Array(40).keys()].map((item) => ({
        id: `multiselect-option-1-${item}`,
        label: `Значение 1-${item}`,
    }));
    const group2: IOption[] = [
        { id: "multiselect-option-2-1", label: "Значение 2-1" },
        { id: "multiselect-option-2-2", label: "Значение 2-2" },
    ];

    return [...group1, ...group2, { id: "multiselect-option-3", label: "Значение 3" }];
};

export const DefaultExample = () => {
    /** Ref на target, который нужен для корректного позиционирования dropdown. */
    const targetRef = useRef<HTMLDivElement>(null);
    /** Мемоизированные опции, чтобы не пересоздавать их на каждый рендер. */
    const options = useMemo(() => createOptions(), []);
    /** Массив id выбранных leaf-чекбоксов. */
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    /** Текущее значение фильтра в поле поиска dropdown. */
    const [filter, setFilter] = useState("");
    /** Set для быстрых O(1) проверок выбранности чекбокса по id. */
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

        if (!selectedOptions.length) return null;
        if (selectedOptions.length > 3) {
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
                    {`Выбрано ${selectedOptions.length} значения`}
                </Tag>
            );
        }

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
                        mobileViewProps={{
                            children: (
                                <>
                                    <DropdownMobileHeader
                                        controlButtons={<DropdownMobileClose onClick={() => setOpened(false)} />}
                                    >
                                        <DropdownMobileInput
                                            placeholder="Type to proceed"
                                            value={filter}
                                            onChange={(event) => setFilter(event.target.value)}
                                        />
                                    </DropdownMobileHeader>
                                    <DropdownMobileBody>
                                        {renderCheckboxList()}
                                        {!!filter.trim().length && !visibleOptions.length && (
                                            <Text size={ETextSize.B3} className="not-found">
                                                Nothing was found.
                                            </Text>
                                        )}
                                    </DropdownMobileBody>
                                    <DropdownMobileFooter>
                                        <Button
                                            theme={EButtonTheme.SECONDARY}
                                            size={EComponentSize.MD}
                                            onClick={() => setOpened(false)}
                                        >
                                            Button text
                                        </Button>
                                        <Button
                                            theme={EButtonTheme.LINK}
                                            size={EComponentSize.MD}
                                            onClick={handleClearAll}
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
        </div>
    );
};
