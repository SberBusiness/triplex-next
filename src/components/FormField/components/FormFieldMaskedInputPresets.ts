import { TFormFieldMaskedInputMask } from "./FormFieldMaskedInput";

export interface TFormFieldMaskedInputPresets {
    // Предзаготовленный набор плейсхолдеров масок.
    placeholderMasks: {
        // Номер автомобиля A000AA 00.
        carNumber: string;
        // Номер карты 0000 0000 0000 0000 (от 16 до 20 символов).
        cardNumber: string;
        // Дата дд.мм.гггг.
        date: string;
        // ИНН 0000000000 (от 10 до 12 символов).
        inn: string;
        // Доб. номер 000 (от 3 до 4 символов).
        phoneExtension: string;
        // SWIFT код AAAAAAAA (от 8 до 11 символов).
        swiftCode: string;
        // Время чч:мм.
        time: string;
        // УИН 00000000000000000000 (от 20 до 25 символов).
        uin: string;
        // Единый лицевой счёт поставщика услуг (ЖКУ) 00АА000000.
        zhkuAccount: string;
        // Идентификатор ЖКУ 00АА000000-00.
        zhkuId: string;
        // Идентификатор платёжного документа (ЖКУ) 00АА000000-00-0000.
        zhkuPaymentDocumentId: string;
    };
    // Предзаготовленный набор масок.
    masks: {
        // Номер счета 00000 000 0 00000000000.
        account: TFormFieldMaskedInputMask;
        // БИК 000 000 000.
        bic: TFormFieldMaskedInputMask;
        // Номер автомобиля A000AA 00.
        carNumber: TFormFieldMaskedInputMask;
        // Номер карты 0000 0000 0000 0000 (от 16 до 20 символов).
        cardNumber: TFormFieldMaskedInputMask;
        // Дата.
        date: TFormFieldMaskedInputMask;
        // Водительское удостоверение 00 00 000000.
        driversLicense: TFormFieldMaskedInputMask;
        // ИНН 0000000000 (от 10 до 12 символов).
        inn: TFormFieldMaskedInputMask;
        // КБК 00000000000000000000.
        kbk: TFormFieldMaskedInputMask;
        // КПП 000000000.
        kpp: TFormFieldMaskedInputMask;
        // Широта 00.000000.
        latitude: TFormFieldMaskedInputMask;
        // Долгота 00.000000.
        longitude: TFormFieldMaskedInputMask;
        // ОГРН 0000000000000.
        ogrn: TFormFieldMaskedInputMask;
        // ОКТМО 00000000.
        oktmo: TFormFieldMaskedInputMask;
        // Паспорт РФ.
        passport: {
            // Код подразделения 000-000.
            departmentCode: TFormFieldMaskedInputMask;
            // Номер 000000.
            number: TFormFieldMaskedInputMask;
            // Серия 00 00.
            series: TFormFieldMaskedInputMask;
        };
        // Номер телефона.
        phone: TFormFieldMaskedInputMask;
        // Доб. номер 000 (от 3 до 4 символов).
        phoneExtension: TFormFieldMaskedInputMask;
        // SWIFT код AAAAAAAA (от 8 до 11 символов).
        swiftCode: TFormFieldMaskedInputMask;
        // Время чч:мм.
        time: TFormFieldMaskedInputMask;
        // Индекс 000000.
        postalCode: TFormFieldMaskedInputMask;
        // СНЛС 000-000-000 00.
        snils: TFormFieldMaskedInputMask;
        // УИН 00000000000000000000 (от 20 до 25 символов).
        uin: TFormFieldMaskedInputMask;
        // Единый лицевой счёт поставщика услуг (ЖКУ) 00АА000000.
        zhkuAccount: TFormFieldMaskedInputMask;
        // Идентификатор ЖКУ 00АА000000-00.
        zhkuId: TFormFieldMaskedInputMask;
        // Идентификатор платёжного документа (ЖКУ) 00АА000000-00-0000.
        zhkuPaymentDocumentId: TFormFieldMaskedInputMask;
    };
}

export const presets: TFormFieldMaskedInputPresets = {
    // Предзаготовленный набор масок.
    masks: {
        account: [
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            " ",
            /\d/,
            /\d/,
            /\d/,
            " ",
            /\d/,
            " ",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            " ",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
        ],
        // БИК 000000000.
        bic: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        // Номер автомобиля A000AA 00.
        carNumber: [/[а-яА-ЯЁё]/, /\d/, /\d/, /\d/, /[а-яА-ЯЁё]/, /[а-яА-ЯЁё]/, /\d/, /\d/, /\d/],
        // Номер карты 0000 0000 0000 0000 0000.
        cardNumber: [
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            " ",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            " ",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            " ",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            " ",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
        ],
        date: [/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/],
        // Водительское удостоверение 00 00 000000.
        driversLicense: [/\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        // ИНН 0000000000 (от 10 до 12 символов).
        inn: Array<RegExp>(12).fill(/\d/),
        // КБК 00000000000000000000.
        kbk: Array<RegExp>(20).fill(/\d/),
        // КПП 000000000.
        kpp: Array<RegExp>(9).fill(/\d/),
        // Широта 00.000000.
        latitude: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        // Долгота 00.000000.
        longitude: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        // ОГРН 0000000000000.
        ogrn: Array<RegExp>(13).fill(/\d/),
        // ОКТМО 00000000.
        oktmo: Array<RegExp>(8).fill(/\d/),
        // Паспорт РФ.
        passport: {
            // Код подразделения 000-000.
            departmentCode: [/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/],
            // Номер 000000.
            number: Array<RegExp>(6).fill(/\d/),
            // Серия 00 00.
            series: [/\d/, /\d/, " ", /\d/, /\d/],
        },
        // Номер телефона.
        phone: ["+", "7", " ", "(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/],
        // SWIFT код.
        swiftCode: [
            /[a-zA-Z]/,
            /[a-zA-Z]/,
            /[a-zA-Z]/,
            /[a-zA-Z]/,
            /[a-zA-Z]/,
            /[a-zA-Z]/,
            /[a-zA-Z0-9]/,
            /[a-zA-Z0-9]/,
            /[a-zA-Z0-9]/,
            /[a-zA-Z0-9]/,
            /[a-zA-Z0-9]/,
        ],
        // Время чч:мм.
        time: [/\d/, /\d/, ":", /\d/, /\d/],
        // Доб. номер 000 (от 3 до 4 символов).
        phoneExtension: Array<RegExp>(4).fill(/\d/),
        // Индекс 000000.
        postalCode: Array<RegExp>(6).fill(/\d/),
        // СНИЛС 000-000-000 00.
        snils: [/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, " ", /\d/, /\d/],
        // УИН 00000000000000000000 (от 20 до 25 символов).
        uin: Array<RegExp>(25).fill(/\d/),
        // Единый лицевой счёт поставщика услуг (ЖКУ) 00АА000000.
        zhkuAccount: [/\d/, /\d/, /[а-яА-ЯЁё]/, /[а-яА-ЯЁё]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        // Идентификатор ЖКУ 00АА000000-00.
        zhkuId: [/\d/, /\d/, /[а-яА-ЯЁё]/, /[а-яА-ЯЁё]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/],
        // Идентификатор платёжного документа (ЖКУ) 00АА000000-00-0000.
        zhkuPaymentDocumentId: [
            /\d/,
            /\d/,
            /[а-яА-ЯЁё]/,
            /[а-яА-ЯЁё]/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
        ],
    },
    // Предзаготовленный набор плейсхолдеров масок. Пустые пробелы в конце - под дополнительные не подсвеченные символы.
    placeholderMasks: {
        // Номер автомобиля A000AA00.
        carNumber: "A000AA00 ",
        // Номер карты 0000 0000 0000 0000 (от 16 до 20 символов).
        cardNumber: "0000 0000 0000 0000     ",
        // Дата дд.мм.гггг.
        date: "дд.мм.гггг",
        // ИНН 0000000000 (от 10 до 12 символов).
        inn: "0000000000  ",
        // Доб. номер 000 (от 3 до 4 символов).
        phoneExtension: "000 ",
        // SWIFT код AAAAAAAA (от 8 до 11 символов).
        swiftCode: "AAAAAAAA   ",
        // Время чч:мм.
        time: "чч:мм",
        // УИН 00000000000000000000 (от 20 до 25 символов).
        uin: "00000000000000000000     ",
        // Единый лицевой счёт поставщика услуг (ЖКУ) 00АА000000.
        zhkuAccount: "00АА000000",
        // Идентификатор ЖКУ 00АА000000-00.
        zhkuId: "00АА000000-00",
        // Идентификатор платёжного документа (ЖКУ) 00АА000000-00-0000.
        zhkuPaymentDocumentId: "00АА000000-00-0000",
    },
};
