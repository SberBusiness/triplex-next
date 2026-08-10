import React, { useState } from "react";
import {
    Button,
    Checkbox,
    EButtonTheme,
    EComponentSize,
    EDropdownWidth,
    ETextSize,
    SelectExtendedField,
    SelectExtendedFieldDropdown,
    SelectExtendedFieldTarget,
    Text,
} from "@sberbusiness/triplex-next";

const CATEGORIES = [
    { id: "income", label: "Поступления" },
    { id: "outcome", label: "Списания" },
    { id: "commission", label: "Комиссии" },
];

/**
 * Произвольное содержимое выпадающего блока: чекбоксы и кнопки вместо списка опций.
 * Значение подтверждается кнопкой «Применить», поэтому выбор хранится в двух состояниях.
 */
export const Example = () => {
    const [appliedIds, setAppliedIds] = useState<string[]>(["income"]);
    const [draftIds, setDraftIds] = useState<string[]>(["income"]);

    const appliedLabel = CATEGORIES.filter((category) => appliedIds.includes(category.id))
        .map((category) => category.label)
        .join(", ");

    const toggleDraftId = (id: string) => {
        setDraftIds((ids) => (ids.includes(id) ? ids.filter((draftId) => draftId !== id) : [...ids, id]));
    };

    return (
        <div style={{ maxWidth: "320px" }}>
            <SelectExtendedField
                closeOnTab
                onOpen={() => setDraftIds(appliedIds)}
                renderTarget={({ opened, setOpened }) => (
                    <SelectExtendedFieldTarget
                        opened={opened}
                        setOpened={setOpened}
                        size={EComponentSize.LG}
                        fieldLabel="Категории операций"
                        label={appliedLabel || undefined}
                        placeholder="Все категории"
                    />
                )}
            >
                {({ opened, setOpened, targetRef, dropdownRef }) => (
                    <SelectExtendedFieldDropdown
                        opened={opened}
                        setOpened={setOpened}
                        targetRef={targetRef}
                        forwardedRef={dropdownRef}
                        size={EComponentSize.LG}
                        width={EDropdownWidth.MIN_TARGET}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "16px" }}>
                            <Text tag="div" size={ETextSize.B3}>
                                Показывать операции
                            </Text>
                            {CATEGORIES.map((category) => (
                                <Checkbox
                                    key={category.id}
                                    checked={draftIds.includes(category.id)}
                                    onChange={() => toggleDraftId(category.id)}
                                >
                                    {category.label}
                                </Checkbox>
                            ))}
                            <div style={{ display: "flex", gap: "8px" }}>
                                <Button
                                    theme={EButtonTheme.GENERAL}
                                    size={EComponentSize.MD}
                                    onClick={() => {
                                        setAppliedIds(draftIds);
                                        setOpened(false);
                                    }}
                                >
                                    Применить
                                </Button>
                                <Button
                                    theme={EButtonTheme.SECONDARY}
                                    size={EComponentSize.MD}
                                    onClick={() => setDraftIds([])}
                                >
                                    Сбросить
                                </Button>
                            </div>
                        </div>
                    </SelectExtendedFieldDropdown>
                )}
            </SelectExtendedField>
        </div>
    );
};
