import React from "react";
import { Amount } from "../src/components/Amount";
import { Row } from "../src/components/Row";
import { Col } from "../src/components/Col";
import { StoryObj } from "@storybook/react";

export default {
    title: "Components/Amount",
    component: Amount,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент отображения суммы.
                `,
            },
        },
    },
};

export const Playground: StoryObj<typeof Amount> = {
    name: "Playground",
    argTypes: {
        value: {
            control: { type: "text" },
            description: "Значение суммы",
        },
        fractionLength: {
            control: { type: "select" },
            options: [0, 1, 2, 3, 4],
            description: "Количество знаков после запятой",
        },
        currency: {
            control: { type: "text" },
            description: "Сокращённое обозначение валюты",
        },
        currencyTitle: {
            control: { type: "text" },
            description: "Сообщение подсказки названия валюты",
        },
        adaptive: {
            control: { type: "boolean" },
            description: "При большом количестве цифр уменьшает размер шрифта",
        },
        dataTestId: {
            table: {
                disable: true,
            },
        },
    },
    args: {
        value: "8967452.3145",
        fractionLength: 2,
        currency: "RUB",
        currencyTitle: "Российские рубли",
        adaptive: false,
    },
    render: (args) => {
        return <Amount {...args} />;
    },
};

export const Default: StoryObj<typeof Amount> = {
    name: "Default",
    render: () => {
        const commonProps = { currency: "RUB", currencyTitle: "Российские рубли" };

        const data = [
            {
                title: "Обычный",
                element: <Amount value="8967452.3145" {...commonProps} />,
            },
            {
                title: "Без копеек",
                element: <Amount value="8967452.31" fractionLength={0} {...commonProps} />,
            },
            {
                title: "С 4 знаками после разделителя",
                element: <Amount key="2" value="8967452.31" fractionLength={4} {...commonProps} />,
            },
            {
                title: "Положительный",
                element: <Amount value="+8967452.31" {...commonProps} />,
            },
            {
                title: "Отрицательный",
                element: <Amount value="-8967452.31" {...commonProps} />,
            },
            {
                title: "Без валюты",
                element: <Amount value="8967452.31" />,
            },
            {
                title: "Большая сумма (50 миллиардов)",
                element: <Amount value="50000000000.31" {...commonProps} />,
            },
            {
                title: "Адаптивная большая сумма (50 миллиардов)",
                element: <Amount value="50000000000.31" {...commonProps} adaptive />,
            },
        ];

        return (
            <>
                {data.map(({ title, element }, index) => (
                    <Row key={index}>
                        <Col size={4}>{title}</Col>
                        <Col size={4}>{element}</Col>
                    </Row>
                ))}
            </>
        );
    },
};
