import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MonthYearField } from "../src/components/MonthYearField";
import { EComponentSize } from "../src/enums";
import { EFormFieldStatus } from "../src/components/FormField";
import { Title as TitleDoc, Description, Controls, Stories } from "@storybook/addon-docs/blocks";
import { dateFormatYYYYMMDD, globalLimitRange } from "../src/consts/DateConst";
import { Title, ETitleSize, EFontType } from "../src/components/Typography";
import { Gap } from "../src/components/Gap";
import { EDropdownAlignment } from "../src/components/Dropdown";

export default {
    title: "Components/MonthYearField",
    component: MonthYearField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <TitleDoc />
                    <Description />
                    <Controls of={Default} />
                    <Stories />
                </>
            ),
        },
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: "250px" }}>
                <Story />
            </div>
        ),
    ],
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
        format: {
            table: {
                type: { summary: "string" },
                defaultValue: { summary: dateFormatYYYYMMDD },
            },
            description: "Формат значения.",
        },
        limitRange: {
            table: {
                type: { summary: globalLimitRange },
            },
            description: "Ограничение диапазона дат.",
        },
    },
} satisfies Meta<typeof MonthYearField>;

type Story = StoryObj<typeof MonthYearField>;

export const Playground: Story = {
    args: {
        size: EComponentSize.MD,
        status: EFormFieldStatus.DEFAULT,
        placeholder: "Placeholder",
        label: "Label",
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
            include: ["size", "status", "placeholder", "label"],
        },
    },
    render: (args) => {
        const [value, setValue] = useState("");

        return <MonthYearField value={value} onChange={setValue} {...args} />;
    },
};

export const Default: Story = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [value, setValue] = useState("");

        return <MonthYearField value={value} onChange={setValue} placeholder="Placeholder" label="Label" />;
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
                <MonthYearField
                    value={value}
                    onChange={setValue}
                    placeholder="Placeholder"
                    label="Label"
                    status={EFormFieldStatus.DEFAULT}
                    size={EComponentSize.MD}
                    alignment={EDropdownAlignment.LEFT}
                />
                <Gap size={24} />
                <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                    Состояние ошибки
                </Title>
                <MonthYearField
                    value={value}
                    onChange={setValue}
                    placeholder="Placeholder"
                    label="Label"
                    status={EFormFieldStatus.ERROR}
                    size={EComponentSize.MD}
                    alignment={EDropdownAlignment.LEFT}
                />
                <Gap size={24} />
                <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                    Состояние предупреждения
                </Title>
                <MonthYearField
                    value={value}
                    onChange={setValue}
                    placeholder="Placeholder"
                    label="Label"
                    status={EFormFieldStatus.WARNING}
                    size={EComponentSize.MD}
                    alignment={EDropdownAlignment.LEFT}
                />
                <Gap size={24} />
                <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                    Отключенное состояние
                </Title>
                <MonthYearField
                    value={value}
                    onChange={setValue}
                    placeholder="Placeholder"
                    label="Label"
                    status={EFormFieldStatus.DISABLED}
                    size={EComponentSize.MD}
                    alignment={EDropdownAlignment.LEFT}
                />
            </div>
        );
    },
};
