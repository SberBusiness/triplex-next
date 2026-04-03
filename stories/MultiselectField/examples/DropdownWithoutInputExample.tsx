import React, { useMemo, useRef, useState } from "react";
import {
    Button,
    Checkbox,
    CheckboxYGroup,
    DropdownMobileBody,
    DropdownMobileFooter,
    EButtonTheme,
    EComponentSize,
    MultiselectField,
    Tag,
    TagGroup,
} from "@sberbusiness/triplex-next";

interface IOption {
    id: string;
    label: string;
}

/** Фиксированный список опций для версии dropdown без поля фильтра. */
const OPTIONS: IOption[] = [
    { id: "without-input-option-1", label: "Значение 1" },
    { id: "without-input-option-2", label: "Значение 2" },
    { id: "without-input-option-3", label: "Значение 3" },
];

export const DropdownWithoutInputExample = () => {
    /** Ref на target для корректного позиционирования dropdown. */
    const targetRef = useRef<HTMLDivElement>(null);
    /** Id выбранных чекбоксов. */
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    /** Set для быстрых проверок выбранности. */
    const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

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
    };

    const renderCheckboxList = () => (
        <CheckboxYGroup aria-label="Options">
            {OPTIONS.map((opt) => (
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
                                    <DropdownMobileBody>{renderCheckboxList()}</DropdownMobileBody>
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
                        <MultiselectField.Dropdown.Content>{renderCheckboxList()}</MultiselectField.Dropdown.Content>
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
