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

/** Фиксированный список опций для демонстрации loading-состояния. */
const OPTIONS: IOption[] = [
    { id: "loading-option-1", label: "Значение 1" },
    { id: "loading-option-2", label: "Значение 2" },
    { id: "loading-option-3", label: "Значение 3" },
];

export const LoadingExample = () => {
    return (
        <div style={{ maxWidth: "320px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>Loading in target</div>
                <LoadingMultiselect targetLoading />
            </div>

            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>Loading in dropdown</div>
                <LoadingMultiselect dropdownContentLoading />
            </div>
        </div>
    );
};

interface ILoadingMultiselectProps {
    targetLoading?: boolean;
    dropdownContentLoading?: boolean;
    forceOpened?: boolean;
}

const LoadingMultiselect = ({
    targetLoading = false,
    dropdownContentLoading = false,
    forceOpened = false,
}: ILoadingMultiselectProps) => {
    /** Ref на target для привязки dropdown к полю. */
    const targetRef = useRef<HTMLDivElement>(null);
    /** Id выбранных чекбоксов. */
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    /** Значение фильтра в input dropdown. */
    const [filter, setFilter] = useState("");
    /** Быстрый поиск выбранного элемента по id. */
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
                    loading={targetLoading}
                    size={EComponentSize.MD}
                    fieldLabel="Label"
                    placeholder="Select to proceed"
                    label={renderTags()}
                />
            )}
        >
            {({ opened, setOpened, targetRef: dropdownTargetRef, dropdownRef }) => (
                <MultiselectField.Dropdown
                    opened={forceOpened ? true : opened}
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
                                    <Button theme={EButtonTheme.LINK} size={EComponentSize.MD} onClick={handleClearAll}>
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
                    <MultiselectField.Dropdown.Content loading={dropdownContentLoading}>
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
