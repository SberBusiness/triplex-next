import React, { useState } from "react";
import {
    DropdownListItem,
    EComponentSize,
    EDropdownWidth,
    SelectExtendedField,
    SelectExtendedFieldDropdown,
    SelectExtendedFieldTarget,
} from "@sberbusiness/triplex-next";

const OPTIONS = [
    { id: "option1", label: "Первая опция" },
    { id: "option2", label: "Вторая опция" },
    { id: "option3", label: "Третья опция" },
];

const SIZES = Object.values(EComponentSize);

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [selectedId, setSelectedId] = useState<string>("option1");

    const selectedOption = OPTIONS.find((option) => option.id === selectedId);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
            <SelectExtendedField
                closeOnTab
                renderTarget={({ opened, setOpened }) => (
                    <SelectExtendedFieldTarget
                        opened={opened}
                        setOpened={setOpened}
                        size={size}
                        fieldLabel="Выберите опцию"
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
                        size={size}
                        width={EDropdownWidth.TARGET}
                    >
                        <SelectExtendedFieldDropdown.List dropdownOpened={opened} size={size}>
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

export const Sizes = () => (
    <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
