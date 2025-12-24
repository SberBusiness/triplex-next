import React, { useState, useEffect } from "react";
import { StoryObj } from "@storybook/react";
import { SelectField, ISelectFieldOption } from "../src/components/SelectField";
import { EFormFieldStatus, FormFieldDescription } from "../src/components/FormField";
import { Text, ETextSize, EFontType, Title, ETitleSize } from "../src/components/Typography";
import { Gap } from "../src/components/Gap";
import { FormGroup } from "../src/components/FormGroup";
import { EComponentSize } from "../src/enums/EComponentSize";
import { Title as DocsTitle, Description, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/SelectField",
    component: SelectField,
    parameters: {
        docs: {
            description: {
                component: `
Упрощенный компонент выбора, построенный на основе SelectExtendedField.

## Особенности:

- **Размеры**: small (SM), medium (MD), large (LG)
- Поддержка всех состояний (disabled, error, warning, loading)

## Использование:
Компонент принимает массив опций и обрабатывает выбор автоматически. Для отображения лейбла поля необходимо передать \`targetProps\` с обязательным свойством \`fieldLabel\`.
                `,
            },
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
    tags: ["autodocs"],
};

const options: ISelectFieldOption[] = [
    { id: "option1", value: "option1", label: "Первая опция" },
    { id: "option2", value: "option2", label: "Вторая опция" },
    { id: "option3", value: "option3", label: "Третья опция" },
    { id: "option4", value: "option4", label: "Четвертая опция" },
    { id: "option5", value: "option5", label: "Пятая опция" },
];

interface ISelectFieldPlaygroundProps {
    fieldLabel?: string;
    placeholder?: string;
    loading?: boolean;
    status?: EFormFieldStatus;
    descriptionText?: string;
    errorText?: string;
    selectedValue?: ISelectFieldOption;
    size?: EComponentSize;
}

export const Playground: StoryObj<ISelectFieldPlaygroundProps> = {
    render: function Render(args) {
        const [selectedValue, setSelectedValue] = useState<ISelectFieldOption | undefined>(args.selectedValue);

        // Синхронизируем selectedValue с args.selectedValue
        useEffect(() => {
            setSelectedValue(args.selectedValue);
        }, [args.selectedValue]);

        const handleChange = (option: ISelectFieldOption) => {
            setSelectedValue(option);
        };

        const { fieldLabel, placeholder, loading, status, descriptionText, errorText, size } = args;

        return (
            <div style={{ maxWidth: "304px" }}>
                <FormGroup>
                    <SelectField
                        size={size || EComponentSize.LG}
                        value={selectedValue}
                        options={options}
                        onChange={handleChange}
                        placeholder={placeholder}
                        loading={loading}
                        status={status}
                        targetProps={{
                            fieldLabel: fieldLabel || "Выберите опцию",
                        }}
                        mobileTitle={fieldLabel || "Выберите опцию"}
                    />

                    {(descriptionText || errorText) && (
                        <FormFieldDescription>
                            <Text
                                tag="div"
                                size={ETextSize.B4}
                                type={status === EFormFieldStatus.ERROR ? EFontType.ERROR : EFontType.SECONDARY}
                            >
                                {status === EFormFieldStatus.ERROR
                                    ? errorText || "Текст ошибки"
                                    : descriptionText || "Описание поля"}
                            </Text>
                        </FormFieldDescription>
                    )}
                </FormGroup>
            </div>
        );
    },
    argTypes: {
        fieldLabel: {
            control: { type: "text" },
            description: "Текст лейбла поля",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "Выберите опцию" },
            },
        },
        placeholder: {
            control: { type: "text" },
            description: "Текст плейсхолдера",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "Выберите опцию из списка" },
            },
        },
        loading: {
            control: { type: "boolean" },
            description: "Состояние загрузки",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            description: "Состояние поля",
            table: {
                type: { summary: "EFormFieldStatus" },
                defaultValue: { summary: "EFormFieldStatus.DEFAULT" },
            },
        },
        descriptionText: {
            control: { type: "text" },
            description: "Текст описания поля",
            table: {
                type: { summary: "string" },
            },
        },
        errorText: {
            control: { type: "text" },
            description: "Текст ошибки",
            table: {
                type: { summary: "string" },
            },
        },
        selectedValue: {
            control: { type: "select" },
            options: [null, ...options.map((_, index) => index)],
            mapping: {
                null: undefined,
                ...Object.fromEntries(options.map((opt, index) => [index, opt])),
            },
            description: "Предварительно выбранное значение",
            table: {
                type: { summary: "ISelectFieldOption | undefined" },
                defaultValue: { summary: "undefined" },
            },
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер поля",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.LG" },
            },
        },
    },
    args: {
        fieldLabel: "Выберите опцию",
        placeholder: "Выберите опцию из списка",
        loading: false,
        status: EFormFieldStatus.DEFAULT,
        descriptionText: "Описание поля",
        errorText: "Текст ошибки",
        selectedValue: undefined,
        size: EComponentSize.LG,
    },
    parameters: {
        docs: {
            description: {
                story: "Позволяет настраивать все основные свойства компонента, включая текст лейбла, текст плейсхолдера, состояния (отключенное, ошибка, загрузка), предварительно выбранное значение и другие.",
            },
        },
        controls: {
            include: [
                "fieldLabel",
                "placeholder",
                "loading",
                "status",
                "descriptionText",
                "errorText",
                "selectedValue",
                "size",
            ],
        },
    },
};

export const Default: StoryObj<typeof SelectField> = {
    name: "Default",
    parameters: {
        docs: {
            description: {
                story: "Базовый пример использования SelectField с простым списком опций.",
            },
        },
        controls: { disable: true },
    },
    render: function Render() {
        const [selectedValue, setSelectedValue] = useState<ISelectFieldOption | undefined>();

        const handleChange = (option: ISelectFieldOption) => {
            setSelectedValue(option);
        };

        return (
            <div style={{ maxWidth: "304px" }}>
                <SelectField
                    size={EComponentSize.MD}
                    value={selectedValue}
                    options={options}
                    onChange={handleChange}
                    placeholder="Выберите опцию из списка"
                    targetProps={{
                        fieldLabel: "Выберите опцию",
                    }}
                    mobileTitle="Выберите опцию"
                />
            </div>
        );
    },
};

export const States: StoryObj<typeof SelectField> = {
    render: function Render() {
        const [selectedValue, setSelectedValue] = useState<ISelectFieldOption | undefined>(options[1]);

        const handleChange = (option: ISelectFieldOption) => {
            setSelectedValue(option);
        };

        return (
            <div style={{ maxWidth: "304px" }}>
                <FormGroup>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Обычное состояние
                    </Title>
                    <SelectField
                        size={EComponentSize.LG}
                        value={selectedValue}
                        options={options}
                        onChange={handleChange}
                        placeholder="Выберите опцию из списка"
                        targetProps={{
                            fieldLabel: "Выберите опцию",
                        }}
                        mobileTitle="Выберите опцию"
                    />
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Состояние загрузки
                    </Title>
                    <SelectField
                        size={EComponentSize.LG}
                        value={selectedValue}
                        options={options}
                        onChange={handleChange}
                        placeholder="Загрузка..."
                        loading
                        targetProps={{
                            fieldLabel: "Загрузка опций",
                        }}
                        mobileTitle="Загрузка опций"
                    />
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Состояние ошибки
                    </Title>
                    <SelectField
                        size={EComponentSize.LG}
                        value={selectedValue}
                        options={options}
                        onChange={handleChange}
                        placeholder="Выберите опцию из списка"
                        status={EFormFieldStatus.ERROR}
                        targetProps={{
                            fieldLabel: "Выберите опцию",
                        }}
                        mobileTitle="Выберите опцию"
                    />
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                            Обязательное поле
                        </Text>
                    </FormFieldDescription>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Состояние предупреждения
                    </Title>
                    <SelectField
                        size={EComponentSize.LG}
                        value={selectedValue}
                        options={options}
                        onChange={handleChange}
                        placeholder="Выберите опцию из списка"
                        status={EFormFieldStatus.WARNING}
                        targetProps={{
                            fieldLabel: "Выберите опцию",
                        }}
                        mobileTitle="Выберите опцию"
                    />
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.WARNING}>
                            Обязательное поле
                        </Text>
                    </FormFieldDescription>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Отключенное состояние
                    </Title>
                    <SelectField
                        size={EComponentSize.LG}
                        value={selectedValue}
                        options={options}
                        onChange={handleChange}
                        placeholder="Поле недоступно"
                        status={EFormFieldStatus.DISABLED}
                        targetProps={{
                            fieldLabel: "Отключенное поле",
                        }}
                        mobileTitle="Отключенное поле"
                    />
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Поле временно недоступно
                        </Text>
                    </FormFieldDescription>
                </FormGroup>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Демонстрация различных состояний SelectField: обычное, загрузка, ошибка, предупреждение и отключенное состояние.",
            },
        },
        controls: { disable: true },
    },
};

export const Sizes: StoryObj<typeof SelectField> = {
    render: function Render() {
        const [selectedValueSM, setSelectedValueSM] = useState<ISelectFieldOption | undefined>();
        const [selectedValueMD, setSelectedValueMD] = useState<ISelectFieldOption | undefined>();
        const [selectedValueLG, setSelectedValueLG] = useState<ISelectFieldOption | undefined>();

        const handleChangeSM = (option: ISelectFieldOption) => {
            setSelectedValueSM(option);
        };

        const handleChangeMD = (option: ISelectFieldOption) => {
            setSelectedValueMD(option);
        };

        const handleChangeLG = (option: ISelectFieldOption) => {
            setSelectedValueLG(option);
        };

        return (
            <div style={{ maxWidth: "400px" }}>
                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Размер SM (маленький)
                    </Title>
                    <SelectField
                        size={EComponentSize.SM}
                        value={selectedValueSM}
                        options={options}
                        onChange={handleChangeSM}
                        placeholder="Выберите опцию из списка"
                        targetProps={{
                            fieldLabel: "Маленькое поле",
                        }}
                        mobileTitle="Маленькое поле"
                    />
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Размер MD (средний)
                    </Title>
                    <SelectField
                        size={EComponentSize.MD}
                        value={selectedValueMD}
                        options={options}
                        onChange={handleChangeMD}
                        placeholder="Выберите опцию из списка"
                        targetProps={{
                            fieldLabel: "Среднее поле",
                        }}
                        mobileTitle="Среднее поле"
                    />
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Размер LG (большой)
                    </Title>
                    <SelectField
                        size={EComponentSize.LG}
                        value={selectedValueLG}
                        options={options}
                        onChange={handleChangeLG}
                        placeholder="Выберите опцию из списка"
                        targetProps={{
                            fieldLabel: "Большое поле",
                        }}
                        mobileTitle="Большое поле"
                    />
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Демонстрация различных размеров SelectField: SM (маленький), MD (средний), LG (большой). Каждый размер имеет свои отступы и высоту для разных случаев использования.",
            },
        },
        controls: { disable: true },
    },
};

export const WithDescription: StoryObj<typeof SelectField> = {
    render: function Render() {
        const [selectedValue, setSelectedValue] = useState<ISelectFieldOption | undefined>();

        const handleChange = (option: ISelectFieldOption) => {
            setSelectedValue(option);
        };

        return (
            <div style={{ maxWidth: "304px" }}>
                <FormGroup>
                    <SelectField
                        size={EComponentSize.LG}
                        value={selectedValue}
                        options={options}
                        onChange={handleChange}
                        placeholder="Выберите опцию из списка"
                        targetProps={{
                            fieldLabel: "Выберите опцию",
                        }}
                        mobileTitle="Выберите опцию из списка"
                    />
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    </FormFieldDescription>
                </FormGroup>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "SelectField с описанием поля. Описание отображается под полем ввода и используется для предоставления дополнительной информации пользователю.",
            },
        },
        controls: { disable: true },
    },
};
