import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import {
    FormField,
    FormFieldInput,
    FormFieldLabel,
    FormFieldClear,
    FormFieldPrefix,
    FormFieldPostfix,
    FormFieldDescription,
    FormFieldTextarea,
    FormFieldSidebar
} from "../src/components/FormField";
import { EFormFieldSize } from "../src/components/FormField/FormField";

export default {
    title: "Components/FormField",
    parameters: {
        docs: {
            description: {
                component: `
Компонент FormField представляет собой универсальное поле ввода с поддержкой различных элементов:

## Основные возможности

- **FormFieldInput** - текстовое поле ввода
- **FormFieldTextarea** - многострочное поле ввода
- **FormFieldLabel** - плавающий лейбл
- **FormFieldClear** - кнопка очистки
- **FormFieldPrefix/Postfix** - элементы слева/справа от поля
- **FormFieldDescription** - описание под полем
- **FormFieldSidebar** - боковая панель

## Размеры

- **LG** - большой размер (48px высота)
                `
            }
        }
    },
    tags: ["autodocs"],
};

export const FormFieldBasic: StoryObj<typeof FormField> = {
    render: () => {
        const [value, setValue] = useState('');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <FormField>
                <FormFieldLabel>Имя пользователя</FormFieldLabel>
                <FormFieldInput value={value} onChange={handleChange} />
            </FormField>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Базовые примеры использования FormField с различными типами полей ввода."
            }
        }
    }
};

export const FormFieldWithPrefixAndPostfix: StoryObj<typeof FormField> = {
    render: () => {
        const [value, setValue] = useState('');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <FormField>
                <FormFieldPrefix>₽</FormFieldPrefix>
                <FormFieldLabel>Сумма</FormFieldLabel>
                <FormFieldInput value={value} onChange={handleChange} />
                <FormFieldPostfix>
                    <FormFieldClear onClick={() => setValue('')} />
                </FormFieldPostfix>
            </FormField>
        )
    },
    parameters: {
        docs: {
            description: {
                story: "FormField с префиксами и постфиксами. Префиксы отображаются слева от поля, постфиксы - справа."
            }
        }
    }
};

export const FormFieldStates: StoryObj<typeof FormField> = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
            <FormField>
                <FormFieldLabel>Обычное состояние</FormFieldLabel>
                <FormFieldInput />
            </FormField>

            <FormField error>
                <FormFieldLabel>С ошибкой</FormFieldLabel>
                <FormFieldInput defaultValue="Неверное значение" />
                <FormFieldDescription style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>
                    Это поле обязательно для заполнения
                </FormFieldDescription>
            </FormField>

            <FormField disabled>
                <FormFieldLabel>Отключено</FormFieldLabel>
                <FormFieldInput defaultValue="Недоступно" />
            </FormField>

            <FormField>
                <FormFieldLabel>С значением</FormFieldLabel>
                <FormFieldInput defaultValue="Заполненное поле" />
            </FormField>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные состояния FormField: обычное, с ошибкой, отключенное, с заполненным значением."
            }
        }
    }
};

export const FormFieldTextareaStory: StoryObj<typeof FormFieldTextarea> = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
            <FormField>
                <FormFieldLabel>Описание</FormFieldLabel>
                <FormFieldTextarea placeholder="Введите описание..." />
            </FormField>

            <FormField>
                <FormFieldLabel>Комментарий</FormFieldLabel>
                <FormFieldTextarea
                    defaultValue="Это многострочное поле ввода с предзаполненным значением."
                    rows={4}
                />
            </FormField>

            <FormField error>
                <FormFieldLabel>Описание с ошибкой</FormFieldLabel>
                <FormFieldTextarea placeholder="Обязательное поле..." />
                <FormFieldDescription style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>
                    Минимум 10 символов
                </FormFieldDescription>
            </FormField>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "FormField с многострочным полем ввода (textarea). Поддерживает все те же состояния, что и обычное поле."
            }
        }
    }
};

export const FormFieldWithSidebar: StoryObj<typeof FormField> = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
                <FormField>
                    <FormFieldLabel>Email</FormFieldLabel>
                    <FormFieldInput type="email" placeholder="example@email.com" />
                </FormField>
                <FormFieldSidebar>
                    <div style={{
                        background: '#f5f5f5',
                        padding: '8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#666'
                    }}>
                        Подсказка
                    </div>
                </FormFieldSidebar>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                <FormField>
                    <FormFieldLabel>Пароль</FormFieldLabel>
                    <FormFieldInput type="password" />
                </FormField>
                <FormFieldSidebar>
                    <div style={{
                        background: '#e3f2fd',
                        padding: '8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#1976d2'
                    }}>
                        💡 Сложный пароль
                    </div>
                </FormFieldSidebar>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "FormField с боковой панелью (sidebar). Полезно для отображения подсказок, справки или дополнительной информации."
            }
        }
    }
};

export const FormFieldInteractive: StoryObj<typeof FormField> = {
    render: () => {
        const [value, setValue] = useState('');
        const [error, setError] = useState(false);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setValue(newValue);
            setError(newValue.length > 0 && newValue.length < 3);
        };

        const handleClear = () => {
            setValue('');
            setError(false);
        };

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
                <FormField error={error}>
                    <FormFieldLabel>Интерактивное поле</FormFieldLabel>
                    <FormFieldInput
                        value={value}
                        onChange={handleChange}
                        placeholder="Введите минимум 3 символа"
                    />
                    {value && (
                        <FormFieldPostfix>
                            <FormFieldClear onClick={handleClear} />
                        </FormFieldPostfix>
                    )}
                    {error && (
                        <FormFieldDescription style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>
                            Минимум 3 символа
                        </FormFieldDescription>
                    )}
                </FormField>

                <div style={{ fontSize: '14px', color: '#666' }}>
                    <p>Текущее значение: "{value}"</p>
                    <p>Длина: {value.length} символов</p>
                    <p>Ошибка: {error ? 'Да' : 'Нет'}</p>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивный пример FormField с валидацией и кнопкой очистки. Демонстрирует динамическое изменение состояний."
            }
        }
    }
};

export const FormFieldWithControls: StoryObj<typeof FormField> = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
            <FormField {...args}>
                <FormFieldLabel>Поле с controls</FormFieldLabel>
                <FormFieldInput placeholder="Введите текст..." />
                <FormFieldPostfix>
                    <FormFieldClear />
                </FormFieldPostfix>
            </FormField>
        </div>
    ),
    argTypes: {
        error: {
            control: { type: 'boolean' },
            description: 'Состояние ошибки',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Отключенное состояние',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        className: {
            control: { type: 'text' },
            description: 'Дополнительные CSS классы',
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        error: false,
        disabled: false,
        className: ''
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация FormField с возможностью изменения состояний через controls панель."
            }
        }
    }
};

