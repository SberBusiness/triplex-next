import React, { useMemo, useRef, useState } from "react";
import {
    Button,
    Checkbox,
    CheckboxYGroup,
    DropdownMobileBody,
    DropdownMobileClose,
    DropdownMobileFooter,
    DropdownMobileHeader,
    DropdownMobileInput,
    EButtonTheme,
    EComponentSize,
    EFontType,
    ETextSize,
    ETooltipSize,
    FormField,
    FormFieldClear,
    FormFieldDescription,
    FormFieldInput,
    FormFieldLabel,
    FormFieldPostfix,
    HelpBox,
    Link,
    MultiselectField,
    Tag,
    TagGroup,
    Text,
} from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";
import "../MultiselectField.less";

interface IOption {
    id: string;
    label: string;
}

/** Фиксированный список опций для production-like примера. */
const OPTIONS: IOption[] = [
    { id: "production-option-1", label: "Значение 1" },
    { id: "production-option-2", label: "Значение 2" },
    { id: "production-option-3", label: "Значение 3" },
];

export const ProductionExample = () => (
    <div style={{ maxWidth: "320px" }}>
        <ProductionMultiselect />
        <FormFieldDescription>
            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                (21) Description{" "}
                <Link href="#" onClick={(event) => event.preventDefault()}>
                    Link text
                </Link>
            </Text>
        </FormFieldDescription>
    </div>
);

const ProductionMultiselect = () => {
    /** Ref на target для корректного позиционирования dropdown. */
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
        <MultiselectField
            renderTarget={(props) => (
                <MultiselectField.Target
                    {...props}
                    ref={targetRef}
                    size={EComponentSize.MD}
                    onClear={handleClearAll}
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
