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
    DropdownMobileHeader,
    DropdownMobileClose,
    DropdownMobileInput,
    DropdownMobileBody,
    DropdownMobileFooter,
} from "@sberbusiness/triplex-next";
import "../MultiselectField.less";

interface IOption {
    id: string;
    label: string;
}

/** Фиксированный список опций для демонстрации кнопки очистки. */
const OPTIONS: IOption[] = [
    { id: "with-clear-option-1", label: "Значение 1" },
    { id: "with-clear-option-2", label: "Значение 2" },
    { id: "with-clear-option-3", label: "Значение 3" },
];

export const WithClearButtonExample = () => {
    /** Ref на target для корректной привязки dropdown. */
    const targetRef = useRef<HTMLDivElement>(null);
    /** Id выбранных чекбоксов. */
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    /** Значение фильтра в input dropdown. */
    const [filter, setFilter] = useState("");
    /** Set для быстрых проверок выбранности. */
    const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
    const visibleOptions = useMemo(() => {
        const lower = filter.trim().toLowerCase();
        if (!lower.length) {
            return OPTIONS;
        }

        return OPTIONS.filter((opt) => opt.label.toLowerCase().includes(lower));
    }, [filter]);

    const selectedOptions = useMemo(() => OPTIONS.filter((opt) => selectedSet.has(opt.id)), [selectedSet]);

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

    /** Очистка фильтра и всех выбранных значений. */
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
        <div style={{ maxWidth: "320px" }}>
            <MultiselectField
                renderTarget={(props) => (
                    <MultiselectField.Target
                        {...props}
                        ref={targetRef}
                        onClear={handleClearAll}
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
