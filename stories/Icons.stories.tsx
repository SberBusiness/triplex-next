import React from "react";
import { StoryObj } from "@storybook/react";

import {
    WarningStsIcon16,
    WarningStsIcon20,
    SystemStsIcon16,
    SystemStsIcon20,
    WaitStsIcon16,
    WaitStsIcon20,
    SuccessStsIcon16,
    SuccessStsIcon20,
    InfoStsIcon16,
    InfoStsIcon20,
    ErrorStsIcon16,
    ErrorStsIcon20,
    RubStsIcon20,
    HintSrvIcon16,
    CloseSrvxIcon16,
    CloseSrvxIcon24,
    ClosewhiteSrvxIcon16,
    ClosewhiteSrvxIcon24,
    CloseinversionSrvxIcon16,
    CloseinversionSrvxIcon24,
    CaretupSrvxIcon16,
    CaretupSrvxIcon24,
    CaretupwhiteSrvxIcon16,
    CaretupwhiteSrvxIcon20,
    CaretupwhiteSrvxIcon24,
    CaretdownSrvxIcon16,
    CaretdownSrvxIcon24,
    CaretdownwhiteSrvxIcon16,
    CaretdownwhiteSrvxIcon20,
    CaretdownwhiteSrvxIcon24,
    DefaulticonPrdIcon20,
    DefaulticonPrdIcon24,
    DefaulticonPrdIcon32,
} from "@sberbusiness/icons-next";

export default {
    title: "Components/Icons",
    parameters: {
        docs: {
            description: {
                component: `
Библиотека иконок (@sberbusiness/icons-next)

## Использование

\`\`\`tsx
import { WarningStsIcon16 } from '@sberbusiness/icons-next/WarningStsIcon16';

function MyComponent() {
    return <WarningStsIcon16 />;
}
\`\`\`
                `,
            },
        },
    },
    tags: ["autodocs"],
};

const IconDisplay: React.FC<{
    icon: React.ComponentType<unknown>;
    name: string;
    size?: string;
}> = ({ icon: Icon, name }) => (
    <div className="hoverable icons-item-example">
        <Icon />
        <div>{name}</div>
    </div>
);

export const StatusIcons: StoryObj = {
    render: () => (
        <div>
            <h3 style={{ marginBottom: "16px" }}>Status Icons</h3>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: "16px",
                }}
            >
                <IconDisplay icon={WarningStsIcon16} name="WarningStsIcon16" size="16px" />
                <IconDisplay icon={WarningStsIcon20} name="WarningStsIcon20" size="20px" />
                <IconDisplay icon={WaitStsIcon16} name="WaitStsIcon16" size="16px" />
                <IconDisplay icon={WaitStsIcon20} name="WaitStsIcon20" size="20px" />
                <IconDisplay icon={SystemStsIcon16} name="SystemStsIcon16" size="16px" />
                <IconDisplay icon={SystemStsIcon20} name="SystemStsIcon20" size="20px" />
                <IconDisplay icon={SuccessStsIcon16} name="SuccessStsIcon16" size="16px" />
                <IconDisplay icon={SuccessStsIcon20} name="SuccessStsIcon20" size="20px" />
                <IconDisplay icon={InfoStsIcon16} name="InfoStsIcon16" size="16px" />
                <IconDisplay icon={InfoStsIcon20} name="InfoStsIcon20" size="20px" />
                <IconDisplay icon={ErrorStsIcon16} name="ErrorStsIcon16" size="16px" />
                <IconDisplay icon={ErrorStsIcon20} name="ErrorStsIcon20" size="20px" />
                <IconDisplay icon={RubStsIcon20} name="RubStsIcon20" size="20px" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Иконки для отображения различных статусов и состояний: предупреждения, ожидание, системные, успех, информация, ошибки.",
            },
        },
    },
};

export const ServiceIcons: StoryObj = {
    render: () => (
        <div>
            <h3 style={{ marginBottom: "16px" }}>Service Icons</h3>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: "16px",
                }}
            >
                <IconDisplay icon={HintSrvIcon16} name="HintSrvIcon16" size="16px" />
                <IconDisplay icon={CloseSrvxIcon16} name="CloseSrvxIcon16" size="16px" />
                <IconDisplay icon={CloseSrvxIcon24} name="CloseSrvxIcon24" size="24px" />
                <IconDisplay icon={ClosewhiteSrvxIcon16} name="ClosewhiteSrvxIcon16" size="16px" />
                <IconDisplay icon={ClosewhiteSrvxIcon24} name="ClosewhiteSrvxIcon24" size="24px" />
                <IconDisplay icon={CloseinversionSrvxIcon16} name="CloseinversionSrvxIcon16" size="16px" />
                <IconDisplay icon={CloseinversionSrvxIcon24} name="CloseinversionSrvxIcon24" size="24px" />
                <IconDisplay icon={CaretupSrvxIcon16} name="CaretupSrvxIcon16" size="16px" />
                <IconDisplay icon={CaretupSrvxIcon24} name="CaretupSrvxIcon24" size="24px" />
                <IconDisplay icon={CaretupwhiteSrvxIcon16} name="CaretupwhiteSrvxIcon16" size="16px" />
                <IconDisplay icon={CaretupwhiteSrvxIcon20} name="CaretupwhiteSrvxIcon20" size="20px" />
                <IconDisplay icon={CaretupwhiteSrvxIcon24} name="CaretupwhiteSrvxIcon24" size="24px" />
                <IconDisplay icon={CaretdownSrvxIcon16} name="CaretdownSrvxIcon16" size="16px" />
                <IconDisplay icon={CaretdownSrvxIcon24} name="CaretdownSrvxIcon24" size="24px" />
                <IconDisplay icon={CaretdownwhiteSrvxIcon16} name="CaretdownwhiteSrvxIcon16" size="16px" />
                <IconDisplay icon={CaretdownwhiteSrvxIcon20} name="CaretdownwhiteSrvxIcon20" size="20px" />
                <IconDisplay icon={CaretdownwhiteSrvxIcon24} name="CaretdownwhiteSrvxIcon24" size="24px" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Иконки для интерфейсных элементов и навигации: подсказки, закрытие (различные варианты), стрелки вверх и вниз.",
            },
        },
    },
};

export const ProductIcons: StoryObj = {
    render: () => (
        <div>
            <h3 style={{ marginBottom: "16px" }}>Product Icons</h3>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: "16px",
                }}
            >
                <IconDisplay icon={DefaulticonPrdIcon20} name="DefaulticonPrdIcon20" size="20px" />
                <IconDisplay icon={DefaulticonPrdIcon24} name="DefaulticonPrdIcon24" size="24px" />
                <IconDisplay icon={DefaulticonPrdIcon32} name="DefaulticonPrdIcon32" size="32px" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Иконки для продуктов: стандартная иконка продукта в различных размерах.",
            },
        },
    },
};
