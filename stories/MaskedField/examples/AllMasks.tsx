import React, { useState } from "react";
import { MaskedField, FormFieldMaskedInput, TFormFieldMaskedInputMask } from "@sberbusiness/triplex-next";

const { masks, placeholderMasks } = FormFieldMaskedInput.presets;

interface IMaskItem {
    /** Ключ пресета, используется как ключ значения в state. */
    key: string;
    /** Лейбл поля. */
    label: string;
    /** Маска из пресетов FormFieldMaskedInput. */
    mask: TFormFieldMaskedInputMask;
    /** Плейсхолдер маски, если он есть в пресетах. */
    placeholderMask?: string;
}

const MASK_ITEMS: Array<IMaskItem> = [
    { key: "account", label: "Номер счёта", mask: masks.account },
    { key: "bic", label: "БИК", mask: masks.bic },
    { key: "carNumber", label: "Номер автомобиля", mask: masks.carNumber, placeholderMask: placeholderMasks.carNumber },
    { key: "cardNumber", label: "Номер карты", mask: masks.cardNumber, placeholderMask: placeholderMasks.cardNumber },
    { key: "date", label: "Дата", mask: masks.date, placeholderMask: placeholderMasks.date },
    { key: "driversLicense", label: "Водительское удостоверение", mask: masks.driversLicense },
    { key: "inn", label: "ИНН", mask: masks.inn, placeholderMask: placeholderMasks.inn },
    { key: "kbk", label: "КБК", mask: masks.kbk },
    { key: "kpp", label: "КПП", mask: masks.kpp },
    { key: "latitude", label: "Широта", mask: masks.latitude },
    { key: "longitude", label: "Долгота", mask: masks.longitude },
    { key: "ogrn", label: "ОГРН", mask: masks.ogrn },
    { key: "oktmo", label: "ОКТМО", mask: masks.oktmo },
    { key: "passportSeries", label: "Серия паспорта", mask: masks.passport.series },
    { key: "passportNumber", label: "Номер паспорта", mask: masks.passport.number },
    { key: "passportDepartmentCode", label: "Код подразделения", mask: masks.passport.departmentCode },
    { key: "phone", label: "Номер телефона", mask: masks.phone },
    {
        key: "phoneExtension",
        label: "Добавочный номер",
        mask: masks.phoneExtension,
        placeholderMask: placeholderMasks.phoneExtension,
    },
    { key: "postalCode", label: "Почтовый индекс", mask: masks.postalCode },
    { key: "snils", label: "СНИЛС", mask: masks.snils },
    { key: "swiftCode", label: "SWIFT-код", mask: masks.swiftCode, placeholderMask: placeholderMasks.swiftCode },
    { key: "time", label: "Время", mask: masks.time, placeholderMask: placeholderMasks.time },
    { key: "uin", label: "УИН", mask: masks.uin, placeholderMask: placeholderMasks.uin },
    {
        key: "zhkuAccount",
        label: "Лицевой счёт ЖКУ",
        mask: masks.zhkuAccount,
        placeholderMask: placeholderMasks.zhkuAccount,
    },
    { key: "zhkuId", label: "Идентификатор ЖКУ", mask: masks.zhkuId, placeholderMask: placeholderMasks.zhkuId },
    {
        key: "zhkuPaymentDocumentId",
        label: "Платёжный документ ЖКУ",
        mask: masks.zhkuPaymentDocumentId,
        placeholderMask: placeholderMasks.zhkuPaymentDocumentId,
    },
];

export const AllMasks = () => {
    const [values, setValues] = useState<Record<string, string>>({});

    const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setValues((prevValues) => ({ ...prevValues, [key]: value }));
    };

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
                maxWidth: "800px",
            }}
        >
            {MASK_ITEMS.map(({ key, label, mask, placeholderMask }) => (
                <MaskedField
                    key={key}
                    label={label}
                    maskedInputProps={{
                        mask,
                        placeholderMask,
                        value: values[key] || "",
                        onChange: handleChange(key),
                    }}
                />
            ))}
        </div>
    );
};
