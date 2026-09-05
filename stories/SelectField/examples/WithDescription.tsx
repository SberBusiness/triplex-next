import React, { useState } from "react";
import {
    EComponentSize,
    EFontType,
    EFormFieldStatus,
    ETextSize,
    FormFieldDescription,
    FormGroup,
    ISelectFieldOption,
    SelectField,
    Text,
} from "@sberbusiness/triplex-next";

const OPTIONS: ISelectFieldOption[] = [
    { id: "option1", value: "option1", label: "Первая опция" },
    { id: "option2", value: "option2", label: "Вторая опция" },
    { id: "option3", value: "option3", label: "Третья опция" },
];

export const WithDescription = () => {
    const [value, setValue] = useState<ISelectFieldOption>();
    // Поле считается тронутым после первого закрытия списка: до взаимодействия ошибку не показываем.
    const [touched, setTouched] = useState(false);

    const status = touched && !value ? EFormFieldStatus.ERROR : EFormFieldStatus.DEFAULT;

    return (
        <div style={{ maxWidth: "300px" }}>
            <FormGroup>
                <SelectField
                    size={EComponentSize.LG}
                    status={status}
                    value={value}
                    options={OPTIONS}
                    onChange={setValue}
                    onClose={() => setTouched(true)}
                    placeholder="Не выбрано"
                    targetProps={{ fieldLabel: "Выберите опцию" }}
                    mobileTitle="Выберите опцию"
                />
                <FormFieldDescription>
                    <Text
                        tag="div"
                        size={ETextSize.B4}
                        type={status === EFormFieldStatus.ERROR ? EFontType.ERROR : EFontType.SECONDARY}
                    >
                        {status === EFormFieldStatus.ERROR ? "Обязательное поле" : "Значение можно изменить позже"}
                    </Text>
                </FormFieldDescription>
            </FormGroup>
        </div>
    );
};
