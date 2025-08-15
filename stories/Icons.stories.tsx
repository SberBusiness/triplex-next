import React from "react";
import { StoryObj } from "@storybook/react";

import { WarningStsIcon16 } from "@sberbusiness/icons-next/WarningStsIcon16";
import { WarningStsIcon20 } from "@sberbusiness/icons-next/WarningStsIcon20";
import { SystemStsIcon16 } from "@sberbusiness/icons-next/SystemStsIcon16";
import { SystemStsIcon20 } from "@sberbusiness/icons-next/SystemStsIcon20";
import { WaitStsIcon16 } from "@sberbusiness/icons-next/WaitStsIcon16";
import { WaitStsIcon20 } from "@sberbusiness/icons-next/WaitStsIcon20";
import { SuccessStsIcon16 } from "@sberbusiness/icons-next/SuccessStsIcon16";
import { SuccessStsIcon20 } from "@sberbusiness/icons-next/SuccessStsIcon20";
import { InfoStsIcon16 } from "@sberbusiness/icons-next/InfoStsIcon16";
import { InfoStsIcon20 } from "@sberbusiness/icons-next/InfoStsIcon20";
import { ErrorStsIcon16 } from "@sberbusiness/icons-next/ErrorStsIcon16";
import { ErrorStsIcon20 } from "@sberbusiness/icons-next/ErrorStsIcon20";
import { RubStsIcon20 } from "@sberbusiness/icons-next/RubStsIcon20";

import { HintSrvIcon16 } from "@sberbusiness/icons-next/HintSrvIcon16";
import { CloseSrvxIcon16 } from "@sberbusiness/icons-next/CloseSrvxIcon16";
import { CloseSrvxIcon24 } from "@sberbusiness/icons-next/CloseSrvxIcon24";
import { ClosewhiteSrvxIcon16 } from "@sberbusiness/icons-next/ClosewhiteSrvxIcon16";
import { ClosewhiteSrvxIcon24 } from "@sberbusiness/icons-next/ClosewhiteSrvxIcon24";
import { CloseinversionSrvxIcon16 } from "@sberbusiness/icons-next/CloseinversionSrvxIcon16";
import { CloseinversionSrvxIcon24 } from "@sberbusiness/icons-next/CloseinversionSrvxIcon24";
import { CaretupSrvxIcon16 } from "@sberbusiness/icons-next/CaretupSrvxIcon16";
import { CaretupSrvxIcon24 } from "@sberbusiness/icons-next/CaretupSrvxIcon24";
import { CaretupwhiteSrvxIcon16 } from "@sberbusiness/icons-next/CaretupwhiteSrvxIcon16";
import { CaretupwhiteSrvxIcon20 } from "@sberbusiness/icons-next/CaretupwhiteSrvxIcon20";
import { CaretupwhiteSrvxIcon24 } from "@sberbusiness/icons-next/CaretupwhiteSrvxIcon24";
import { CaretdownSrvxIcon16 } from "@sberbusiness/icons-next/CaretdownSrvxIcon16";
import { CaretdownSrvxIcon24 } from "@sberbusiness/icons-next/CaretdownSrvxIcon24";
import { CaretdownwhiteSrvxIcon16 } from "@sberbusiness/icons-next/CaretdownwhiteSrvxIcon16";
import { CaretdownwhiteSrvxIcon20 } from "@sberbusiness/icons-next/CaretdownwhiteSrvxIcon20";
import { CaretdownwhiteSrvxIcon24 } from "@sberbusiness/icons-next/CaretdownwhiteSrvxIcon24";

import { DefaulticonPrdIcon20 } from "@sberbusiness/icons-next/DefaulticonPrdIcon20";
import { DefaulticonPrdIcon24 } from "@sberbusiness/icons-next/DefaulticonPrdIcon24";
import { DefaulticonPrdIcon32 } from "@sberbusiness/icons-next/DefaulticonPrdIcon32";

export default {
    title: "Components/Icons",
    parameters: {
        docs: {
            description: {
                component: `
Библиотека иконок (@sberbusiness/icons-next)

## Категории иконок

### Status Icons 
### Service Icons
### Product Icons

## Использование

\`\`\`tsx
import { WarningStsIcon16 } from '@sberbusiness/icons-next/WarningStsIcon16';

function MyComponent() {
    return <WarningStsIcon16 />;
}
\`\`\`
                `
            }
        }
    },
    tags: ["autodocs"],
};

// Helper component to display icon with label
const IconDisplay: React.FC<{
    icon: React.ComponentType<any>;
    name: string;
    size?: string;
}> = ({ icon: Icon, name, size }) => (
    <div className="hoverable" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        padding: '16px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        minWidth: '120px',
        backgroundColor: '#fafafa'
    }}>
        <Icon />
        <div style={{
            fontSize: '12px',
            textAlign: 'center',
            color: '#666',
            wordBreak: 'break-word'
        }}>
            {name}
            {size && <div style={{ fontSize: '10px', color: '#999' }}>{size}</div>}
        </div>
    </div>
);

export const AllIcons: StoryObj = {
    render: () => (
        <div style={{ padding: '24px' }}>
            {/* Status Icons (Sts) */}
            <section style={{ marginBottom: '32px' }}>
                <h3 style={{ marginBottom: '16px', color: '#555' }}>Status Icons (Статусные иконки) - Sts</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '16px'
                }}>
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
            </section>

            {/* Service Icons (Srv) */}
            <section style={{ marginBottom: '32px' }}>
                <h3 style={{ marginBottom: '16px' }}>Service Icons</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '16px'
                }}>
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
            </section>

            {/* Product Icons (Prd) */}
            <section style={{ marginBottom: '32px' }}>
                <h3 style={{ marginBottom: '16px' }}>Product Icons</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '16px'
                }}>
                    <IconDisplay icon={DefaulticonPrdIcon20} name="DefaulticonPrdIcon20" size="20px" />
                    <IconDisplay icon={DefaulticonPrdIcon24} name="DefaulticonPrdIcon24" size="24px" />
                    <IconDisplay icon={DefaulticonPrdIcon32} name="DefaulticonPrdIcon32" size="32px" />
                </div>
            </section>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Полная галерея всех доступных иконок из библиотеки @sberbusiness/icons-next, организованная по категориям на основе суффиксов в именах: Sts (статусные), Srv (сервисные), Prd (продуктовые)."
            }
        }
    }
};

export const StatusIcons: StoryObj = {
    render: () => (
        <div>
            <h3 style={{ marginBottom: '16px' }}>Status Icons (Статусные иконки) - Sts</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '16px'
            }}>
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
                story: "Иконки для отображения различных статусов и состояний: предупреждения, ожидание, системные, успех, информация, ошибки, рубль (статус валюты)."
            }
        }
    }
};

export const ServiceIcons: StoryObj = {
    render: () => (
        <div>
            <h3 style={{ marginBottom: '16px' }}>Service Icons (Сервисные иконки) - Srv</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '16px'
            }}>
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
                story: "Иконки для интерфейсных элементов и навигации: подсказки, закрытие (различные варианты), стрелки вверх и вниз."
            }
        }
    }
};



export const ProductIcons: StoryObj = {
    render: () => (
        <div>
            <h3 style={{ marginBottom: '16px' }}>Product Icons (Продуктовые иконки) - Prd</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '16px'
            }}>
                <IconDisplay icon={DefaulticonPrdIcon20} name="DefaulticonPrdIcon20" size="20px" />
                <IconDisplay icon={DefaulticonPrdIcon24} name="DefaulticonPrdIcon24" size="24px" />
                <IconDisplay icon={DefaulticonPrdIcon32} name="DefaulticonPrdIcon32" size="32px" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Иконки для продуктов: стандартная иконка продукта в различных размерах."
            }
        }
    }
};
