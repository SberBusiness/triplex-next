import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { MaskedField } from "../../src/components/TextField";
import { Text, ETextSize, EFontType, Title, ETitleSize } from "../../src/components/Typography";
import { EFormFieldSize, EFormFieldStatus } from "../../src/components/FormField/enums";
import { Gap } from "../../src/components/Gap";
import { FormFieldClear, FormFieldMaskedInput } from "../../src/components/FormField";
import { Title as DocsTitle, Description, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Link } from "../../src/components/Link";
import { HelpBox } from "../../src/components/HelpBox/HelpBox";
import { ETooltipPreferPlace, ETooltipSize } from "../../src/components/Tooltip/enums";
import { DefaulticonStrokePrdIcon20, DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";

export default {
    title: "Components/TextFields/MaskedField",
    component: MaskedField,
    parameters: {
        docs: {
            description: {
                component: `
Компонент MaskedField представляет собой поле ввода с маской для структурированных данных, построенное на основе TextField.
Для более гибкой настройки можно использовать маскированный ввод на основе компонента FormField.
Основан на https://github.com/text-mask/text-mask.

## Основные возможности

- **Размеры** - SM (маленький), MD (средний), LG (большой - по умолчанию)
- **Маскированный ввод** - автоматическое форматирование данных
- **Валидация** - проверка корректности введенных данных

## Доступные маски

### Финансовые
- Номер счета (00000 000 0 00000000000)
- БИК (000000000)
- Номер карты (0000 0000 0000 0000)
- КБК (00000000000000000000)
- КПП (000000000)
- УИН (00000000000000000000)

### Идентификационные
- ИНН (0000000000)
- ОГРН (0000000000000)
- ОКТМО (00000000)
- СНИЛС (000-000-000 00)
- Водительское удостоверение (00 00 000000)

### Контактные
- Номер телефона (+7 (XXX) XXX-XX-XX)
- Добавочный номер (000)
- Почтовый индекс (000000)

### Географические
- Широта (00.000000)
- Долгота (00.000000)

### Транспортные
- Номер автомобиля (A000AA00)

### Дата и время
- Дата (дд.мм.гггг)

### ЖКХ
- Номер счета ЖКУ (00АА000000)
- Идентификатор ЖКУ (00АА000000-00)
- Платёжный документ ЖКУ (00АА000000-00-0000)

### Паспортные данные
- Серия паспорта (00 00)
- Номер паспорта (000000)
- Код подразделения (000-000)
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

interface IMaskedPlaygroundProps extends React.ComponentProps<typeof MaskedField> {
    labelText?: string;
    descriptionText?: string;
    maskType?:
        | keyof typeof FormFieldMaskedInput.presets.masks
        | "passportSeries"
        | "passportNumber"
        | "passportDepartmentCode";
}

export const Playground: StoryObj<IMaskedPlaygroundProps> = {
    render: (args) => {
        const [value, setValue] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        const { labelText, descriptionText, maskType, ...maskedFieldProps } = args;

        const getMaskConfig = () => {
            switch (maskType) {
                case "account":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.account,
                    };
                case "cardNumber":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.cardNumber,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.cardNumber,
                    };
                case "date":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.date,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.date,
                    };
                case "time":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.time,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.time,
                    };
                case "phone":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.phone,
                    };
                case "phoneExtension":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.phoneExtension,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.phoneExtension,
                    };
                case "snils":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.snils,
                    };
                case "bic":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.bic,
                    };
                case "swiftCode":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.swiftCode,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.swiftCode,
                    };
                case "inn":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.inn,
                    };
                case "kbk":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.kbk,
                    };
                case "kpp":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.kpp,
                    };
                case "oktmo":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.oktmo,
                    };
                case "uin":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.uin,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.uin,
                    };
                case "ogrn":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.ogrn,
                    };
                case "zhkuPaymentDocumentId":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.zhkuPaymentDocumentId,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.zhkuPaymentDocumentId,
                    };
                case "zhkuId":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.zhkuId,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.zhkuId,
                    };
                case "zhkuAccount":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.zhkuAccount,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.zhkuAccount,
                    };
                case "passportSeries":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.passport.series,
                    };
                case "passportNumber":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.passport.number,
                    };
                case "passportDepartmentCode":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.passport.departmentCode,
                    };
                case "carNumber":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.carNumber,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.carNumber,
                    };
                case "driversLicense":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.driversLicense,
                    };
                case "postalCode":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.postalCode,
                    };
                case "latitude":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.latitude,
                    };
                case "longitude":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.longitude,
                    };
                default:
                    return {
                        mask: FormFieldMaskedInput.presets.masks.phone,
                    };
            }
        };

        const maskConfig = getMaskConfig();

        return (
            <div style={{ width: "304px" }}>
                <MaskedField
                    {...maskedFieldProps}
                    description={
                        descriptionText ? (
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                {descriptionText}
                            </Text>
                        ) : null
                    }
                    maskedInputProps={{
                        value: value,
                        onChange: handleChange,
                        ...maskConfig,
                    }}
                    label={labelText || "Label"}
                />
            </div>
        );
    },
    argTypes: {
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            description: "Состояние поля",
            table: {
                type: { summary: "EFormFieldStatus" },
                defaultValue: { summary: "EFormFieldStatus.DEFAULT" },
            },
        },
        labelText: {
            control: { type: "text" },
            description: "Текст лейбла",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "Label" },
            },
        },
        descriptionText: {
            control: { type: "text" },
            description: "Текст описания",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "(21) Description" },
            },
        },
        maskType: {
            control: { type: "select" },
            options: Object.keys(FormFieldMaskedInput.presets.masks),
            description: "Тип маски",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "phone" },
            },
        },
        size: {
            control: { type: "select" },
            options: [EFormFieldSize.SM, EFormFieldSize.MD, EFormFieldSize.LG],
            description: "Размер поля ввода",
            table: {
                type: { summary: "EFormFieldSize" },
                defaultValue: { summary: "EFormFieldSize.LG" },
            },
        },
        className: {
            control: { type: "text" },
            description: "Дополнительные CSS классы",
            table: {
                type: { summary: "string" },
            },
        },
    },
    args: {
        status: EFormFieldStatus.DEFAULT,
        size: EFormFieldSize.LG,
        labelText: "Label",
        descriptionText: "(21) Description",
        maskType: "phone",
        className: "",
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация MaskedField с расширенными controls. Позволяет настраивать тип маски, текст лейбла, описание и состояния компонента.",
            },
        },
        controls: {
            include: ["status", "labelText", "descriptionText", "maskType", "size", "className"],
        },
    },
};

export const Default: StoryObj<typeof MaskedField> = {
    render: () => {
        const [phoneValue, setPhoneValue] = useState("");

        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPhoneValue(e.target.value);
        };

        return (
            <div style={{ maxWidth: "304px" }}>
                <MaskedField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            (21) Description{" "}
                            <Link href="#" onClick={(event) => event.preventDefault()}>
                                Link text
                            </Link>
                        </Text>
                    }
                    maskedInputProps={{
                        value: phoneValue,
                        onChange: handlePhoneChange,
                        mask: FormFieldMaskedInput.presets.masks.phone,
                    }}
                    label="Label"
                    postfix={
                        <>
                            <FormFieldClear onClick={() => setPhoneValue("")} />
                            <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                                Text
                            </HelpBox>
                        </>
                    }
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Базовый пример использования MaskedInputField с маской номера телефона.",
            },
        },
        controls: { disable: true },
    },
};

export const States: StoryObj<typeof MaskedField> = {
    render: () => {
        const [phoneValue, setPhoneValue] = useState("");
        const [phoneValueError, setPhoneValueError] = useState("");
        const [phoneValueWarning, setPhoneValueWarning] = useState("");
        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPhoneValue(e.target.value);
        };

        const handlePhoneChangeError = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPhoneValueError(e.target.value);
        };

        const handlePhoneChangeWarning = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPhoneValueWarning(e.target.value);
        };

        return (
            <div style={{ maxWidth: "304px" }}>
                <MaskedField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            (21) Description
                        </Text>
                    }
                    maskedInputProps={{
                        value: phoneValue,
                        onChange: handlePhoneChange,
                        mask: FormFieldMaskedInput.presets.masks.phone,
                    }}
                    label="Label"
                />

                <Gap size={24} />

                <MaskedField
                    status={EFormFieldStatus.ERROR}
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                            Error text
                        </Text>
                    }
                    maskedInputProps={{
                        value: phoneValueError,
                        onChange: handlePhoneChangeError,
                        mask: FormFieldMaskedInput.presets.masks.phone,
                    }}
                    label="Label"
                />

                <Gap size={24} />

                <MaskedField
                    status={EFormFieldStatus.WARNING}
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.WARNING}>
                            Warning text
                        </Text>
                    }
                    maskedInputProps={{
                        value: phoneValueWarning,
                        onChange: handlePhoneChangeWarning,
                        mask: FormFieldMaskedInput.presets.masks.phone,
                    }}
                    label="Label"
                />

                <Gap size={24} />

                <MaskedField
                    status={EFormFieldStatus.DISABLED}
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Disabled text
                        </Text>
                    }
                    maskedInputProps={{
                        value: "9999999999",
                        mask: FormFieldMaskedInput.presets.masks.phone,
                    }}
                    label="Label"
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Различные состояния MaskedInputField: обычное, с ошибкой, отключенное.",
            },
        },
        controls: { disable: true },
    },
};

export const Sizes: StoryObj<typeof MaskedField> = {
    render: () => {
        const [valueSM, setValueSM] = useState("");
        const [valueMD, setValueMD] = useState("");
        const [valueLG, setValueLG] = useState("");

        const handleChangeSM = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueSM(e.target.value);
        };

        const handleChangeMD = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueMD(e.target.value);
        };

        const handleChangeLG = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueLG(e.target.value);
        };

        return (
            <div style={{ maxWidth: "400px" }}>
                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Size SM (small)
                    </Title>
                    <MaskedField
                        size={EFormFieldSize.SM}
                        maskedInputProps={{
                            value: valueSM,
                            onChange: handleChangeSM,
                            mask: FormFieldMaskedInput.presets.masks.phone,
                        }}
                        label="Label"
                    />
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Size MD (medium)
                    </Title>
                    <MaskedField
                        size={EFormFieldSize.MD}
                        maskedInputProps={{
                            value: valueMD,
                            onChange: handleChangeMD,
                            mask: FormFieldMaskedInput.presets.masks.phone,
                        }}
                        label="Label"
                        prefix={<DefaulticonStrokePrdIcon20 paletteIndex={5} />}
                        postfix={<DefaulticonStrokePrdIcon20 paletteIndex={5} />}
                    />
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Size LG (large) - default
                    </Title>
                    <MaskedField
                        size={EFormFieldSize.LG}
                        maskedInputProps={{
                            value: valueLG,
                            onChange: handleChangeLG,
                            mask: FormFieldMaskedInput.presets.masks.phone,
                        }}
                        label="Label"
                        prefix={<DefaulticonStrokePrdIcon24 paletteIndex={5} />}
                        postfix={<DefaulticonStrokePrdIcon24 paletteIndex={5} />}
                    />
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Демонстрация различных размеров MaskedInputField: SM (маленький), MD (средний), LG (большой - по умолчанию). Каждый размер имеет свои отступы и высоту для разных случаев использования.",
            },
        },
        controls: { disable: true },
    },
};

export const AllMasks: StoryObj<typeof MaskedField> = {
    render: () => {
        const [values, setValues] = useState<Record<string, string>>({});

        const handleChange = (maskType: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setValues((prev) => ({ ...prev, [maskType]: e.target.value }));
        };

        const getMaskConfig = (maskType: string) => {
            switch (maskType) {
                case "account":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.account,
                    };
                case "bic":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.bic,
                    };
                case "carNumber":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.carNumber,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.carNumber,
                    };
                case "cardNumber":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.cardNumber,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.cardNumber,
                    };
                case "date":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.date,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.date,
                    };
                case "driversLicense":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.driversLicense,
                    };
                case "inn":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.inn,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.inn,
                    };
                case "kbk":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.kbk,
                    };
                case "kpp":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.kpp,
                    };
                case "latitude":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.latitude,
                    };
                case "longitude":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.longitude,
                    };
                case "ogrn":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.ogrn,
                    };
                case "oktmo":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.oktmo,
                    };
                case "phone":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.phone,
                    };
                case "phoneExtension":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.phoneExtension,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.phoneExtension,
                    };
                case "swiftCode":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.swiftCode,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.swiftCode,
                    };
                case "time":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.time,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.time,
                    };
                case "postalCode":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.postalCode,
                    };
                case "snils":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.snils,
                    };
                case "uin":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.uin,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.uin,
                    };
                case "zhkuAccount":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.zhkuAccount,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.zhkuAccount,
                    };
                case "zhkuId":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.zhkuId,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.zhkuId,
                    };
                case "zhkuPaymentDocumentId":
                    return {
                        mask: FormFieldMaskedInput.presets.masks.zhkuPaymentDocumentId,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.zhkuPaymentDocumentId,
                    };
                default:
                    return {
                        mask: FormFieldMaskedInput.presets.masks.phone,
                    };
            }
        };

        const getLabel = (maskType: string): string => {
            switch (maskType) {
                case "account":
                    return "Номер счета";
                case "bic":
                    return "БИК";
                case "carNumber":
                    return "Номер автомобиля";
                case "cardNumber":
                    return "Номер карты";
                case "date":
                    return "Дата";
                case "driversLicense":
                    return "Водительское удостоверение";
                case "inn":
                    return "ИНН";
                case "kbk":
                    return "КБК";
                case "kpp":
                    return "КПП";
                case "latitude":
                    return "Широта";
                case "longitude":
                    return "Долгота";
                case "ogrn":
                    return "ОГРН";
                case "oktmo":
                    return "ОКТМО";
                case "phone":
                    return "Номер телефона";
                case "phoneExtension":
                    return "Добавочный номер";
                case "postalCode":
                    return "Почтовый индекс";
                case "snils":
                    return "СНИЛС";
                case "swiftCode":
                    return "swift";
                case "time":
                    return "time";
                case "uin":
                    return "УИН";
                case "zhkuAccount":
                    return "Номер счета ЖКУ";
                case "zhkuId":
                    return "Идентификатор ЖКУ";
                case "zhkuPaymentDocumentId":
                    return "Платёжный документ ЖКУ";
                case "passportSeries":
                    return "Серия паспорта";
                case "passportNumber":
                    return "Номер паспорта";
                case "passportDepartmentCode":
                    return "Код подразделения";
                default:
                    return maskType;
            }
        };

        const maskTypes = Object.keys(FormFieldMaskedInput.presets.masks).filter((key) => key !== "passport");

        return (
            <div style={{ width: "100%", maxWidth: "800px" }}>
                <h3>Все доступные маски</h3>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                        gap: "24px",
                    }}
                >
                    {maskTypes.map((maskType) => {
                        const maskConfig = getMaskConfig(maskType);
                        const value = values[maskType] || "";

                        return (
                            <MaskedField
                                key={maskType}
                                maskedInputProps={{
                                    value: value,
                                    onChange: handleChange(maskType),
                                    ...maskConfig,
                                }}
                                label={getLabel(maskType)}
                            />
                        );
                    })}

                    <MaskedField
                        maskedInputProps={{
                            value: values["passportSeries"] || "",
                            onChange: handleChange("passportSeries"),
                            mask: FormFieldMaskedInput.presets.masks.passport.series,
                        }}
                        label="Серия паспорта"
                    />

                    <MaskedField
                        maskedInputProps={{
                            value: values["passportNumber"] || "",
                            onChange: handleChange("passportNumber"),
                            mask: FormFieldMaskedInput.presets.masks.passport.number,
                        }}
                        label="Номер паспорта"
                    />

                    <MaskedField
                        maskedInputProps={{
                            value: values["passportDepartmentCode"] || "",
                            onChange: handleChange("passportDepartmentCode"),
                            mask: FormFieldMaskedInput.presets.masks.passport.departmentCode,
                        }}
                        label="Код подразделения"
                    />
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Демонстрация всех доступных масок MaskedField. Показывает, как выглядят и работают различные типы масок для ввода структурированных данных.",
            },
        },
        controls: { disable: true },
    },
};
