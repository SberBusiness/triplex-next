import React from "react";
import { Amount, IAmountProps } from "../../src/components/Amount";
import { Row } from "../../src/components/Row";
import { Col } from "../../src/components/Col";
import { StoryObj } from "@storybook/react";
import { EFontType, EFontWeightText, ETextSize, Text } from "../../src/components/Typography";

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

interface IAmountStoriesProps extends IAmountProps {
    size: ETextSize;
    type: EFontType;
}

export const Playground: StoryObj<IAmountStoriesProps> = {
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
        size: {
            table: {
                disable: true,
            },
        },
        type: {
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
        return (
            <Text size={ETextSize.B2} type={EFontType.PRIMARY}>
                <Amount {...args} />
            </Text>
        );
    },
};

export const Default: StoryObj<IAmountStoriesProps> = {
    name: "Default",
    render: () => {
        const commonProps = { currency: "RUB", currencyTitle: "Российские рубли" };

        const data = [
            {
                title: "Обычный",
                element: (
                    <Text size={ETextSize.B2}>
                        <Amount value="8967452.3145" {...commonProps} />
                    </Text>
                ),
            },
            {
                title: "Без копеек",
                element: (
                    <Text size={ETextSize.B2}>
                        <Amount value="8967452.31" fractionLength={0} {...commonProps} />
                    </Text>
                ),
            },
            {
                title: "С 4 знаками после разделителя",
                element: (
                    <Text size={ETextSize.B2}>
                        <Amount key="2" value="8967452.31" fractionLength={4} {...commonProps} />
                    </Text>
                ),
            },
            {
                title: "Положительный",
                element: (
                    <Text size={ETextSize.B3}>
                        <Amount value="+8967452.31" {...commonProps} />
                    </Text>
                ),
            },
            {
                title: "Положительный (цвет)",
                element: (
                    <Text size={ETextSize.B3} type={EFontType.BRAND}>
                        <Amount value="+8967452.31" {...commonProps} />
                    </Text>
                ),
            },
            {
                title: "Отрицательный",
                element: (
                    <Text size={ETextSize.B3}>
                        <Amount value="-8967452.31" {...commonProps} />
                    </Text>
                ),
            },
            {
                title: "Отрицательный (цвет)",
                element: (
                    <Text size={ETextSize.B3} type={EFontType.ERROR}>
                        <Amount value="-8967452.31" {...commonProps} />
                    </Text>
                ),
            },
            {
                title: "Без валюты",
                element: (
                    <Text size={ETextSize.B2}>
                        <Amount value="8967452.31" />
                    </Text>
                ),
            },
            {
                title: "Большая сумма (50 миллиардов)",
                element: (
                    <Text size={ETextSize.B2}>
                        <Amount value="50000000000.31" {...commonProps} />
                    </Text>
                ),
            },
            {
                title: "Адаптивная большая сумма (50 миллиардов)",
                element: (
                    <Text size={ETextSize.B2}>
                        <Amount value="50000000000.31" {...commonProps} adaptive />
                    </Text>
                ),
            },
            {
                title: "Акцент",
                element: (
                    <Text size={ETextSize.B3} weight={EFontWeightText.SEMIBOLD}>
                        <Amount value="8967452.31" {...commonProps} />
                    </Text>
                ),
            },
        ];

        return (
            <>
                {data.map(({ title, element }, index) => (
                    <Row key={index}>
                        <Col size={4}>
                            <Text size={ETextSize.B2}>{title}</Text>
                        </Col>
                        <Col size={4}>{element}</Col>
                    </Row>
                ))}
            </>
        );
    },
};
