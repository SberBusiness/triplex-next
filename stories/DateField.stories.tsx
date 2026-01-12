import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DateField } from "../src/components/DateField";
import { EComponentSize } from "../src/enums";
import { EFormFieldStatus } from "../src/components/FormField";
import { Title as DocsTitle, Description, Controls, Stories } from "@storybook/addon-docs/blocks";
import { dateFormatYYYYMMDD, globalLimitRange } from "../src/consts/DateConst";
import { EFontType, ETitleSize, Title } from "../src/components/Typography";
import { Gap } from "../src/components/Gap";

export default {
    title: "Components/DateField",
    component: DateField,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <div style={{ maxWidth: "250px" }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Controls of={Default} />
                    <Stories />
                </>
            ),
        },
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            table: {
                type: { summary: "EComponentSize" },
            },
            description: "Размер компонента.",
        },
        value: {
            table: {
                type: { summary: "string" },
            },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            table: {
                type: { summary: "EFormFieldStatus" },
            },
            description: "Состояние компонента.",
        },
        label: {
            table: {
                type: { summary: "string" },
            },
            description: "Текст лейбла, отображаемый над полем ввода.",
        },
        placeholderMask: {
            table: {
                type: { summary: "string" },
            },
        },
        format: {
            table: {
                type: { summary: "string" },
                defaultValue: { summary: dateFormatYYYYMMDD },
            },
            description: "Формат даты.",
        },
        limitRange: {
            table: {
                type: { summary: globalLimitRange },
            },
            description: "Ограничение диапазона дат.",
        },
        disabledDays: {
            table: {
                type: { summary: "string[]" },
            },
            description: "Массив дат, которые нельзя выбрать.",
        },
        invalidDateHint: {
            table: {
                type: { summary: "string" },
            },
        },
        onChange: {
            table: {
                type: { summary: "() => void" },
            },
        },
        onDropdownOpen: {
            table: {
                type: { summary: "() => void" },
            },
            description: "Функция, вызывающаяся при открытии Dropdown.",
        },
        onDropdownClose: {
            table: {
                type: { summary: "() => void" },
            },
            description: "Функция, вызывающаяся при закрытии Dropdown.",
        },
        targetProps: {
            table: {
                type: { summary: "object" },
            },
        },
    },
} satisfies Meta<typeof DateField>;

type Story = StoryObj<typeof DateField>;

export const Playground: Story = {
    args: {
        size: EComponentSize.MD,
        status: EFormFieldStatus.DEFAULT,
        placeholderMask: "дд.мм.гггг",
        label: "Label",
        invalidDateHint: "Указана недоступная для выбора дата.",
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            table: {
                type: { summary: "EComponentSize" },
            },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            table: {
                type: { summary: "EFormFieldStatus" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["size", "status", "placeholderMask", "label", "invalidDateHint"],
        },
    },
    render: (args) => {
        const [value, setValue] = useState("");

        return <DateField value={value} onChange={setValue} {...args} />;
    },
};

export const Default: Story = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [value, setValue] = useState("");

        return <DateField value={value} onChange={setValue} label="Label" placeholderMask="дд.мм.гггг" />;
    },
};

export const States: Story = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [value, setValue] = useState("");

        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                    Обычное состояние
                </Title>
                <DateField
                    value={value}
                    onChange={setValue}
                    label="Label"
                    placeholderMask="дд.мм.гггг"
                    status={EFormFieldStatus.DEFAULT}
                />
                <Gap size={24} />
                <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                    Состояние ошибки
                </Title>
                <DateField
                    value={value}
                    onChange={setValue}
                    label="Label"
                    placeholderMask="дд.мм.гггг"
                    status={EFormFieldStatus.ERROR}
                />
                <Gap size={24} />
                <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                    Состояние предупреждения
                </Title>
                <DateField
                    value={value}
                    onChange={setValue}
                    label="Label"
                    placeholderMask="дд.мм.гггг"
                    status={EFormFieldStatus.WARNING}
                />
                <Gap size={24} />
                <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                    Отключенное состояние
                </Title>
                <DateField
                    value={value}
                    onChange={setValue}
                    label="Label"
                    placeholderMask="дд.мм.гггг"
                    status={EFormFieldStatus.DISABLED}
                />
            </div>
        );
    },
};
