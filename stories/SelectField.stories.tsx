import React, { useState, useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Primary, Controls, Stories, Heading } from "@storybook/addon-docs/blocks";
import {
    SelectField,
    FormFieldDescription,
    Text,
    ISelectFieldOption,
    EFormFieldStatus,
    ETextSize,
    EFontType,
} from "@sberbusiness/triplex-next";
import { FormGroup } from "../src/components/FormGroup";
import { EComponentSize } from "../src/enums/EComponentSize";

export default {
    title: "Components/SelectField",
    component: SelectField,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={SelectField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof SelectField>;

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
            <div style={{ maxWidth: 300 }}>
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
        },
        placeholder: {
            control: { type: "text" },
        },
        loading: {
            control: { type: "boolean" },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
        },
        descriptionText: {
            control: { type: "text" },
        },
        errorText: {
            control: { type: "text" },
        },
        selectedValue: {
            control: { type: "select" },
            options: [null, ...options.map((_, index) => index)],
            mapping: {
                null: undefined,
                ...Object.fromEntries(options.map((opt, index) => [index, opt])),
            },
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
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
        testRunner: { skip: true },
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
        controls: { disable: true },
        testRunner: { skip: true },
    },
    render: function Render() {
        const [selectedValue, setSelectedValue] = useState<ISelectFieldOption | undefined>();

        const handleChange = (option: ISelectFieldOption) => {
            setSelectedValue(option);
        };

        return (
            <div style={{ maxWidth: 300 }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>SM</div>
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

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>MD</div>
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

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>LG</div>
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
        controls: { disable: true },
    },
};

export const States: StoryObj<typeof SelectField> = {
    render: function Render() {
        const [selectedValue, setSelectedValue] = useState<ISelectFieldOption | undefined>(options[1]);

        const handleChange = (option: ISelectFieldOption) => {
            setSelectedValue(option);
        };

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>DEFAULT</div>
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
                </div>

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>LOADING</div>
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
                </div>

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>ERROR</div>
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
                </div>

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>WARNING</div>
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
                </div>

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>DISABLED</div>
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
                </div>
            </div>
        );
    },
    parameters: {
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
            <div style={{ maxWidth: 300 }}>
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
        controls: { disable: true },
        testRunner: { skip: true },
    },
};

export const VisualTests: StoryObj<typeof SelectField> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: Default.render,
    play: async ({ canvas, userEvent }) => {
        const input = await canvas.findByRole("combobox");
        await userEvent.click(input);
    },
};
