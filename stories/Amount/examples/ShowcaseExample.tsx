import React from "react";
import { Amount, Col, EFontType, EFontWeightText, ETextSize, Row, Text } from "@sberbusiness/triplex-next";

const COMMON_PROPS = {
    currency: "RUB",
    currencyTitle: "Российские рубли",
};

const DATA = [
    {
        title: "Обычный",
        element: (
            <Text size={ETextSize.B2}>
                <Amount value="8967452.3145" {...COMMON_PROPS} />
            </Text>
        ),
    },
    {
        title: "Без копеек",
        element: (
            <Text size={ETextSize.B2}>
                <Amount value="8967452.31" fractionLength={0} {...COMMON_PROPS} />
            </Text>
        ),
    },
    {
        title: "С 4 знаками после разделителя",
        element: (
            <Text size={ETextSize.B2}>
                <Amount value="8967452.31" fractionLength={4} {...COMMON_PROPS} />
            </Text>
        ),
    },
    {
        title: "Положительный",
        element: (
            <Text size={ETextSize.B3}>
                <Amount value="+8967452.31" {...COMMON_PROPS} />
            </Text>
        ),
    },
    {
        title: "Положительный (цвет)",
        element: (
            <Text size={ETextSize.B3} type={EFontType.BRAND}>
                <Amount value="+8967452.31" {...COMMON_PROPS} />
            </Text>
        ),
    },
    {
        title: "Отрицательный",
        element: (
            <Text size={ETextSize.B3}>
                <Amount value="-8967452.31" {...COMMON_PROPS} />
            </Text>
        ),
    },
    {
        title: "Отрицательный (цвет)",
        element: (
            <Text size={ETextSize.B3} type={EFontType.ERROR}>
                <Amount value="-8967452.31" {...COMMON_PROPS} />
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
                <Amount value="50000000000.31" {...COMMON_PROPS} />
            </Text>
        ),
    },
    {
        title: "Адаптивная большая сумма (50 миллиардов)",
        element: (
            <Text size={ETextSize.B2}>
                <Amount value="50000000000.31" {...COMMON_PROPS} adaptive />
            </Text>
        ),
    },
    {
        title: "Акцент",
        element: (
            <Text size={ETextSize.B3} weight={EFontWeightText.SEMIBOLD}>
                <Amount value="8967452.31" {...COMMON_PROPS} />
            </Text>
        ),
    },
];

export const ShowcaseExample = () => (
    <>
        {DATA.map(({ title, element }) => (
            <Row key={title}>
                <Col size={4}>
                    <Text size={ETextSize.B2}>{title}</Text>
                </Col>
                <Col size={4}>{element}</Col>
            </Row>
        ))}
    </>
);
