import React, { useState } from "react";
import {
    ButtonIcon,
    DateField,
    DateRange,
    EDateRangeShiftUnit,
    IDateRangeButtonProvideProps,
    IDateRangePickerProvideProps,
    TDateRangeValue,
    FormFieldMaskedInput,
    Text,
    ETextSize,
    EFontType,
    Link,
} from "@sberbusiness/triplex-next";

export const ProductionExample = () => {
    const [value, setValue] = useState<TDateRangeValue>(["", ""]);

    const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
    };

    const renderPicker = (props: IDateRangePickerProvideProps) => (
        <DateField
            label="Label"
            placeholderMask={FormFieldMaskedInput.presets.placeholderMasks.date}
            invalidDateHint="Указана недоступная для выбора дата."
            targetProps={{
                description: (
                    <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                        (21) Description{" "}
                        <Link href="#" onClick={handleLinkClick}>
                            Link text
                        </Link>
                    </Text>
                ),
            }}
            {...props}
        />
    );

    const renderButton = (props: IDateRangeButtonProvideProps) => <ButtonIcon {...props} />;

    return (
        <div style={{ maxWidth: "400px" }}>
            <DateRange
                value={value}
                onChange={setValue}
                shiftAmount={1}
                shiftUnit={EDateRangeShiftUnit.MONTH}
                renderPickerFrom={renderPicker}
                renderPickerTo={renderPicker}
                renderButtonBack={renderButton}
                renderButtonForward={renderButton}
            />
        </div>
    );
};
