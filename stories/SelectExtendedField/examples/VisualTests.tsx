import React, { useState } from "react";
import {
    DropdownListItem,
    EComponentSize,
    EDropdownDirection,
    EDropdownWidth,
    SelectExtendedField,
    SelectExtendedFieldDropdown,
    SelectExtendedFieldTarget,
} from "@sberbusiness/triplex-next";

const OPTIONS = [
    { id: "option1", label: "Первая опция" },
    { id: "option2", label: "Вторая опция" },
    { id: "option3", label: "Третья опция" },
    { id: "option4", label: "Четвёртая опция" },
    { id: "option5", label: "Пятая опция" },
];

/** Раскрытый список: подсветка выбранной опции и позиционирование выпадающего блока. Раскрывается play-функцией. */
const OpenedSelect = () => {
    const [selectedId, setSelectedId] = useState<string>("option2");

    const selectedOption = OPTIONS.find((option) => option.id === selectedId);

    return (
        <div style={{ width: "240px" }}>
            <SelectExtendedField
                renderTarget={({ opened, setOpened }) => (
                    <SelectExtendedFieldTarget
                        opened={opened}
                        setOpened={setOpened}
                        size={EComponentSize.MD}
                        fieldLabel="Открыть список"
                        label={selectedOption?.label}
                        placeholder="Не выбрано"
                    />
                )}
            >
                {({ opened, setOpened, targetRef, dropdownRef }) => (
                    <SelectExtendedFieldDropdown
                        opened={opened}
                        setOpened={setOpened}
                        targetRef={targetRef}
                        forwardedRef={dropdownRef}
                        size={EComponentSize.MD}
                        direction={EDropdownDirection.BOTTOM}
                        width={EDropdownWidth.TARGET}
                    >
                        <SelectExtendedFieldDropdown.List dropdownOpened={opened} size={EComponentSize.MD}>
                            {OPTIONS.map((option) => (
                                <DropdownListItem
                                    key={option.id}
                                    id={option.id}
                                    selected={option.id === selectedId}
                                    onSelect={() => {
                                        setSelectedId(option.id);
                                        setOpened(false);
                                    }}
                                >
                                    {option.label}
                                </DropdownListItem>
                            ))}
                        </SelectExtendedFieldDropdown.List>
                    </SelectExtendedFieldDropdown>
                )}
            </SelectExtendedField>
        </div>
    );
};

/** Длинное значение с кнопкой очистки: обрезка текста и совместное размещение кнопки и каретки. */
const LongValueSelect = () => (
    <div style={{ width: "240px" }}>
        <SelectExtendedField
            renderTarget={({ opened, setOpened }) => (
                <SelectExtendedFieldTarget
                    opened={opened}
                    setOpened={setOpened}
                    size={EComponentSize.LG}
                    fieldLabel="Значение не помещается"
                    label="Очень длинное название выбранной опции"
                    onClear={() => {}}
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
                    width={EDropdownWidth.TARGET}
                >
                    <SelectExtendedFieldDropdown.List dropdownOpened={opened} size={EComponentSize.LG}>
                        {OPTIONS.map((option) => (
                            <DropdownListItem key={option.id} id={option.id} onSelect={() => {}}>
                                {option.label}
                            </DropdownListItem>
                        ))}
                    </SelectExtendedFieldDropdown.List>
                </SelectExtendedFieldDropdown>
            )}
        </SelectExtendedField>
    </div>
);

/** Загрузка в маленьком размере: лоадер занимает место каретки. */
const LoadingSmallSelect = () => (
    <div style={{ width: "240px" }}>
        <SelectExtendedField
            renderTarget={({ opened, setOpened }) => (
                <SelectExtendedFieldTarget
                    opened={opened}
                    setOpened={setOpened}
                    size={EComponentSize.SM}
                    loading
                    fieldLabel="Загрузка значений"
                    placeholder="Не выбрано"
                />
            )}
        >
            {({ opened, setOpened, targetRef, dropdownRef }) => (
                <SelectExtendedFieldDropdown
                    opened={opened}
                    setOpened={setOpened}
                    targetRef={targetRef}
                    forwardedRef={dropdownRef}
                    size={EComponentSize.SM}
                    width={EDropdownWidth.TARGET}
                >
                    <SelectExtendedFieldDropdown.List dropdownOpened={opened} size={EComponentSize.SM}>
                        {OPTIONS.map((option) => (
                            <DropdownListItem key={option.id} id={option.id} onSelect={() => {}}>
                                {option.label}
                            </DropdownListItem>
                        ))}
                    </SelectExtendedFieldDropdown.List>
                </SelectExtendedFieldDropdown>
            )}
        </SelectExtendedField>
    </div>
);

export const VisualTests = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap", height: "320px" }}>
        <OpenedSelect />
        <LongValueSelect />
        <LoadingSmallSelect />
    </div>
);
