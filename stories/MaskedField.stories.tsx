import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import {
    MaskedField,
    FormFieldMaskedInput,
    FormFieldClear,
    HelpBox,
    Text,
    Link,
    EComponentSize,
    EFormFieldStatus,
    ETooltipSize,
    ETooltipPreferPlace,
    ETextSize,
    EFontType,
} from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon20, DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";

export default {
    title: "Components/TextFields/MaskedField",
    component: MaskedField,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={MaskedField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof MaskedField>;

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

        const { labelText, descriptionText, maskType, placeholder, ...maskedFieldProps } = args;

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
            <div style={{ maxWidth: 300 }}>
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
                        placeholder: placeholder,
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
        },
        labelText: {
            control: { type: "text" },
        },
        descriptionText: {
            control: { type: "text" },
        },
        maskType: {
            control: { type: "select" },
            options: Object.keys(FormFieldMaskedInput.presets.masks),
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
        },
        placeholder: {
            control: { type: "text" },
        },
        prefix: {
            control: { type: "text" },
        },
        postfix: {
            control: { type: "text" },
        },
    },
    args: {
        status: EFormFieldStatus.DEFAULT,
        size: EComponentSize.LG,
        prefix: "",
        postfix: "",
        placeholder: "Placeholder",
        labelText: "Label",
        descriptionText: "(21) Description",
        maskType: "phone",
        className: "",
    },
    parameters: {
        controls: {
            include: [
                "status",
                "labelText",
                "descriptionText",
                "maskType",
                "size",
                "className",
                "prefix",
                "postfix",
                "placeholder",
            ],
        },
        testRunner: { skip: true },
    },
};

export const Default: StoryObj<typeof MaskedField> = {
    render: () => {
        const [phoneValue, setPhoneValue] = useState("");

        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPhoneValue(e.target.value);
        };

        return (
            <div style={{ maxWidth: 300 }}>
                <MaskedField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            (21) Description{" "}
                        </Text>
                    }
                    maskedInputProps={{
                        value: phoneValue,
                        onChange: handlePhoneChange,
                        mask: FormFieldMaskedInput.presets.masks.phone,
                    }}
                    label="Label"
                />
            </div>
        );
    },
    parameters: {
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
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>DEFAULT</div>
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
                </div>

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>ERROR</div>
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
                </div>

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>WARNING</div>
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
                </div>

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>DISABLED</div>
                    <MaskedField
                        status={EFormFieldStatus.DISABLED}
                        description={
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                Disabled text
                            </Text>
                        }
                        maskedInputProps={{
                            value: "",
                            mask: FormFieldMaskedInput.presets.masks.phone,
                        }}
                        label="Label"
                    />
                </div>
            </div>
        );
    },
    parameters: {
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
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>SM</div>
                    <MaskedField
                        size={EComponentSize.SM}
                        maskedInputProps={{
                            value: valueSM,
                            onChange: handleChangeSM,
                            mask: FormFieldMaskedInput.presets.masks.phone,
                        }}
                        label="Label"
                    />
                </div>

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>MD</div>
                    <MaskedField
                        size={EComponentSize.MD}
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

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>LG</div>
                    <MaskedField
                        size={EComponentSize.LG}
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
        controls: { disable: true },
    },
};

export const Production: StoryObj<typeof MaskedField> = {
    name: "Example: production",
    render: () => {
        const [phoneValue, setPhoneValue] = useState("");

        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPhoneValue(e.target.value);
        };

        return (
            <div style={{ maxWidth: 300 }}>
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
        controls: { disable: true },
    },
};
