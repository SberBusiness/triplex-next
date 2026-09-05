import React, { useState } from "react";
import { action } from "storybook/actions";
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

/** Свойства Playground: props компонента и вспомогательные настройки примера. */
export interface IPlaygroundProps {
    /** Размер компонента. */
    size: EComponentSize;
    /** Визуальное состояние поля. */
    status: EFormFieldStatus;
    /** Состояние загрузки: вместо каретки лоадер, поле не открывается. */
    loading: boolean;
    /** Текст, отображаемый пока значение не выбрано. */
    placeholder: string;
    /** Заголовок поля. Передаётся через targetProps. */
    fieldLabel: string;
    /** Описание под полем. */
    withDescription: boolean;
}

const OPTIONS: ISelectFieldOption[] = [
    { id: "option1", value: "option1", label: "Первая опция" },
    { id: "option2", value: "option2", label: "Вторая опция" },
    { id: "option3", value: "option3", label: "Третья опция" },
    { id: "option4", value: "option4", label: "Четвёртая опция" },
    { id: "option5", value: "option5", label: "Пятая опция" },
];

export const Playground = ({ size, status, loading, placeholder, fieldLabel, withDescription }: IPlaygroundProps) => {
    const [value, setValue] = useState<ISelectFieldOption>();

    const handleChange = (option: ISelectFieldOption) => {
        setValue(option);
        action("onChange")(option);
    };

    return (
        <div style={{ maxWidth: "300px" }}>
            <FormGroup>
                <SelectField
                    size={size}
                    status={status}
                    loading={loading}
                    value={value}
                    options={OPTIONS}
                    onChange={handleChange}
                    placeholder={placeholder}
                    targetProps={{ fieldLabel }}
                    mobileTitle={fieldLabel}
                />

                {withDescription && (
                    <FormFieldDescription>
                        <Text
                            tag="div"
                            size={ETextSize.B4}
                            type={status === EFormFieldStatus.ERROR ? EFontType.ERROR : EFontType.SECONDARY}
                        >
                            {status === EFormFieldStatus.ERROR ? "Обязательное поле" : "Описание поля"}
                        </Text>
                    </FormFieldDescription>
                )}
            </FormGroup>
        </div>
    );
};
