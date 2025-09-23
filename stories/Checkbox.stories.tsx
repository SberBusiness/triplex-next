import React from "react";
import { Checkbox, ECheckboxSize, CheckboxXGroup, CheckboxYGroup } from "../src/components/Checkbox";
import { Gap } from "../src/components/Gap";
import { Row } from "../src/components/Row";
import { Col } from "../src/components/Col";
import { StoryObj } from "@storybook/react";

export default {
    title: "Components/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент чекбокса с поддержкой различных состояний и режимов.

## Особенности

- **Размеры**: medium (MD), large (LG)
- **Группировка**: по осям X (компонент CheckboxXGroup) и Y (компонент CheckboxYGroup)

## Использование

\`\`\`tsx
import { Checkbox } from '../src/components/Checkbox/Checkbox';

// Базовый чекбокс
<Checkbox onChange={handleChange}>
    Согласен с условиями
</Checkbox>

// Чекбокс в состоянии частичного выбора
<Checkbox bulk checked onChange={handleChange}>
    Выбрать все
</Checkbox>

// Отключенный чекбокс
<Checkbox disabled>
    Недоступная опция
</Checkbox>

// Группа чекбоксов с направлением по оси X
<CheckboxXGroup>
    {[1, 2, 3].map((value, index) => (
        <Checkbox key={index} value={value}>
            Вариант - {index + 1}
        </Checkbox>
    ))}
</CheckboxXGroup>

// Группа чекбоксов с направлением по оси Y
<CheckboxYGroup>
    {[1, 2, 3, 4].map((value, index) => (
        <Checkbox key={index} value={value}>
            Вариант - {index + 1}
        </Checkbox>
    ))}
</CheckboxYGroup>
\`\`\`
                `,
            },
        },
    },
};

export const Playground: StoryObj<typeof Checkbox> = {
    name: "Playground",
    args: {
        children: "Checkbox label",
        size: ECheckboxSize.MD,
        bulk: false,
        disabled: false,
    },
    argTypes: {
        children: {
            control: { type: "text" },
            description: "Контент лейбла чекбокса",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
        checked: {
            control: { type: "boolean" },
            description: "Состояние чекбокса",
            table: {
                type: { summary: "boolean" },
            },
        },
        disabled: {
            control: { type: "boolean" },
            description: "Состояние disabled",
            table: {
                type: { summary: "boolean" },
            },
        },
        bulk: {
            control: { type: "boolean" },
            description: "Режим частичного выбора",
            table: {
                type: { summary: "boolean" },
            },
        },
        size: {
            control: { type: "select" },
            options: Object.values(ECheckboxSize),
            description: "Размер чекбокса",
            table: {
                type: { summary: "ECheckboxSize" },
                defaultValue: { summary: ECheckboxSize.MD },
            },
        },
        labelAttributes: {
            table: {
                disable: true,
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => <Checkbox {...args} />,
};

export const Default: StoryObj<typeof Checkbox> = {
    name: "Default",
    args: {
        children: "Checkbox label",
        size: ECheckboxSize.MD,
    },
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
        checked: {
            table: {
                disable: true,
            },
        },
        disabled: {
            table: {
                disable: true,
            },
        },
        bulk: {
            table: {
                disable: true,
            },
        },
        size: {
            table: {
                disable: true,
            },
        },
        labelAttributes: {
            table: {
                disable: true,
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => (
        <>
            <Checkbox {...args} />
            <Gap size={16} />
            <Checkbox {...args} size={ECheckboxSize.LG} />
        </>
    ),
};

export const XGroup: StoryObj<typeof Checkbox> = {
    name: "X Group",
    args: {
        children: "Checkbox label",
        size: ECheckboxSize.MD,
    },
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
        checked: {
            table: {
                disable: true,
            },
        },
        disabled: {
            table: {
                disable: true,
            },
        },
        bulk: {
            table: {
                disable: true,
            },
        },
        size: {
            table: {
                disable: true,
            },
        },
        labelAttributes: {
            table: {
                disable: true,
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Группа чекбоксов с направлением по оси X",
            },
        },
    },
    render: () => (
        <>
            <CheckboxXGroup aria-labelledby="checkbox-x-group-label" indent={20}>
                {[1, 2, 3].map((value, index) => (
                    <Checkbox key={index} name="checkbox-x-group" value={value}>
                        Checkbox text
                    </Checkbox>
                ))}
            </CheckboxXGroup>
            <Gap size={16} />
            <CheckboxXGroup aria-labelledby="checkbox-x-group-label" indent={20}>
                {[1, 2, 3].map((value, index) => (
                    <Checkbox key={index} name="checkbox-x-group" value={value} size={ECheckboxSize.LG}>
                        Checkbox text
                    </Checkbox>
                ))}
            </CheckboxXGroup>
        </>
    ),
};

export const YGroup: StoryObj<typeof Checkbox> = {
    name: "Y Group",
    args: {
        children: "Checkbox label",
        size: ECheckboxSize.MD,
    },
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
        checked: {
            table: {
                disable: true,
            },
        },
        disabled: {
            table: {
                disable: true,
            },
        },
        bulk: {
            table: {
                disable: true,
            },
        },
        size: {
            table: {
                disable: true,
            },
        },
        labelAttributes: {
            table: {
                disable: true,
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Группа чекбоксов с направлением по оси Y",
            },
        },
    },
    render: () => (
        <Row>
            <Col size={3}>
                <CheckboxYGroup aria-labelledby="checkbox-y-group-label">
                    {[1, 2, 3, 4].map((value, index) => (
                        <Checkbox key={index} name="checkbox-y-group" value={value}>
                            Checkbox text
                        </Checkbox>
                    ))}
                </CheckboxYGroup>
            </Col>
            <Col size={3}>
                <CheckboxYGroup aria-labelledby="checkbox-y-group-label">
                    {[1, 2, 3, 4].map((value, index) => (
                        <Checkbox key={index} name="checkbox-y-group" value={value} size={ECheckboxSize.LG}>
                            Checkbox text
                        </Checkbox>
                    ))}
                </CheckboxYGroup>
            </Col>
        </Row>
    ),
};
