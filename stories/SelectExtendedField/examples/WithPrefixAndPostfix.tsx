import React, { useState } from "react";
import { DefaulticonStrokePrdIcon20, QuestioncircleFilledSrvIcon16 } from "@sberbusiness/icons-next";
import {
    DropdownListItem,
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

export const WithPrefixAndPostfix = () => {
    const [selectedId, setSelectedId] = useState<string | undefined>("option1");

    const selectedOption = OPTIONS.find((option) => option.id === selectedId);

    return (
        <div style={{ maxWidth: "300px" }}>
            <SelectExtendedField
                closeOnTab
                renderTarget={({ opened, setOpened }) => (
                    <SelectExtendedFieldTarget
                        opened={opened}
                        setOpened={setOpened}
                        fieldLabel="Выберите опцию"
                        label={selectedOption?.label}
                        placeholder="Не выбрано"
                        prefix={<DefaulticonStrokePrdIcon20 paletteIndex={5} />}
                        postfix={<QuestioncircleFilledSrvIcon16 paletteIndex={5} />}
                    />
                )}
            >
                {({ opened, setOpened, targetRef, dropdownRef }) => (
                    <SelectExtendedFieldDropdown
                        opened={opened}
                        setOpened={setOpened}
                        targetRef={targetRef}
                        forwardedRef={dropdownRef}
                        width={EDropdownWidth.TARGET}
                    >
                        <SelectExtendedFieldDropdown.List dropdownOpened={opened}>
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
