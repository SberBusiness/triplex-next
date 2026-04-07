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
    EFormFieldStatus,
    ETextSize,
    FormField,
    FormFieldClear,
    FormFieldInput,
    FormFieldLabel,
    FormFieldPostfix,
    ISelectExtendedFieldTargetProvideProps,
    MultiselectField,
    Tag,
    TagGroup,
    Text,
} from "@sberbusiness/triplex-next";
import "../MultiselectField.less";

interface IOption {
    id: string;
    label: string;
}

interface IPlaygroundExampleProps {
    size?: EComponentSize;
    status?: EFormFieldStatus;
    loading?: boolean;
    forceOpened?: boolean;
    initialSelectedIds?: string[];
    initialFilter?: string;
    withInput?: boolean;
    withClearButton?: boolean;
    prefix?: React.ReactNode;
    postfix?: React.ReactNode;
}

const createOptions = (): IOption[] => {
    const group1Long = [...Array(100).keys()].map((item) => ({
        id: `multiselect-option-2-2-${item}`,
        label: `Значение 2-2-${item}`,
    }));

    return [
        ...group1Long,
        { id: "multiselect-option-2-1", label: "Значение 2-1" },
        { id: "multiselect-option-2-2", label: "Значение 2-2" },
        { id: "multiselect-option-3", label: "Значение 3" },
    ];
};

const getButtonSize = (size: EComponentSize) => (size === EComponentSize.LG ? EComponentSize.MD : EComponentSize.SM);

export const PlaygroundExample = ({
    size = EComponentSize.MD,
    status = EFormFieldStatus.DEFAULT,
    loading = false,
    forceOpened = false,
    initialSelectedIds = [],
    initialFilter = "",
    withInput = true,
    withClearButton = false,
    prefix,
    postfix,
}: IPlaygroundExampleProps) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const options = useMemo(() => createOptions(), []);
    const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);
    const [filter, setFilter] = useState(initialFilter);

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

    const renderTags = () => {
        const handleTagFocus = (event: React.FocusEvent<HTMLSpanElement>) => event.stopPropagation();
        const handleTagBlur = (event: React.FocusEvent<HTMLSpanElement>) => event.stopPropagation();
        const handleTagClick = (event: React.MouseEvent<HTMLSpanElement>) => event.stopPropagation();
        const handleTagKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
            if (event.code === "Enter" || event.code === "Space") {
                event.stopPropagation();
            }
        };

        if (!selectedOptions.length) {
            return null;
        }

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

    const renderTarget = (props: ISelectExtendedFieldTargetProvideProps) => (
        <MultiselectField.Target
            {...props}
            label={renderTags()}
            placeholder="Select to proceed"
            fieldLabel="Label"
            size={size}
            status={status}
            loading={loading}
            prefix={prefix}
            postfix={postfix}
            onClear={withClearButton ? handleClearAll : undefined}
            ref={targetRef}
        />
    );

    return (
        <div style={{ maxWidth: "320px" }}>
            <MultiselectField renderTarget={renderTarget}>
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
                                        {withInput && (
                                            <DropdownMobileInput
                                                placeholder="Type to proceed"
                                                value={filter}
                                                onChange={(event) => setFilter(event.target.value)}
                                            />
                                        )}
                                    </DropdownMobileHeader>
                                    <DropdownMobileBody>
                                        {renderCheckboxList()}
                                        {!!filter.length && !visibleOptions.length && (
                                            <div className="not-found">
                                                <Text size={ETextSize.B3}>Nothing was found.</Text>
                                            </div>
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
                        {withInput && (
                            <MultiselectField.Dropdown.Header>
                                <FormField size={getButtonSize(size)}>
                                    <FormFieldLabel>Type to proceed</FormFieldLabel>
                                    <FormFieldInput
                                        value={filter}
                                        onChange={(event) => setFilter(event.target.value)}
                                    />
                                    <FormFieldPostfix>
                                        <FormFieldClear onClick={() => setFilter("")} />
                                    </FormFieldPostfix>
                                </FormField>
                            </MultiselectField.Dropdown.Header>
                        )}

                        <MultiselectField.Dropdown.Content>
                            {renderCheckboxList()}
                            {!!filter.length && !visibleOptions.length && (
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
        </div>
    );
};
