import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Stories, Heading } from "@storybook/addon-docs/blocks";
import {
    SelectExtendedField,
    SelectExtendedFieldTarget,
    SelectExtendedFieldDropdown,
    DropdownListItem,
    EComponentSize,
    EDropdownWidth,
} from "@sberbusiness/triplex-next";

export default {
    title: "Components/SelectExtendedField",
    component: SelectExtendedField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={SelectExtendedField} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof SelectExtendedField>;

// Данные для примеров
const options = [
    { id: "option1", value: "option1", label: "Первая опция" },
    { id: "option2", value: "option2", label: "Вторая опция" },
    { id: "option3", value: "option3", label: "Третья опция" },
    { id: "option4", value: "option4", label: "Четвертая опция" },
    { id: "option5", value: "option5", label: "Пятая опция" },
];

export const Default: StoryObj<typeof SelectExtendedField> = {
    parameters: {
        controls: { disable: true },
    },
    render: function Render() {
        const [selectedValue, setSelectedValue] = useState<string>("");

        const selectedOption = options.find((option) => option.value === selectedValue);

        const handleSelect = (value: string, setOpened: (opened: boolean) => void) => {
            setSelectedValue(value);
            setOpened(false);
        };

        return (
            <div style={{ maxWidth: 300 }}>
                <SelectExtendedField
                    renderTarget={({ opened, setOpened }) => (
                        <SelectExtendedFieldTarget
                            opened={opened}
                            size={EComponentSize.LG}
                            setOpened={setOpened}
                            fieldLabel="Выберите опцию"
                            label={selectedOption?.label}
                            placeholder="Выберите опцию из списка"
                        />
                    )}
                >
                    {({ opened, dropdownRef, targetRef, setOpened }) => (
                        <SelectExtendedFieldDropdown
                            width={EDropdownWidth.TARGET}
                            opened={opened}
                            forwardedRef={dropdownRef}
                            targetRef={targetRef}
                            setOpened={setOpened}
                        >
                            <SelectExtendedFieldDropdown.List dropdownOpened={opened}>
                                {options.map((option) => (
                                    <DropdownListItem
                                        key={option.value}
                                        id={option.value}
                                        selected={selectedValue === option.value}
                                        onSelect={() => handleSelect(option.value, setOpened)}
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
    },
};
