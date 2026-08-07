import React from "react";
import {
    MaskedField,
    FormFieldMaskedInput,
    FormFieldClear,
    Text,
    EComponentSize,
    EFormFieldStatus,
    ETextSize,
    EFontType,
} from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";
import { action } from "storybook/actions";

const { masks, placeholderMasks } = FormFieldMaskedInput.presets;

const captionStyle: React.CSSProperties = { marginBottom: "8px", fontSize: "16px", fontWeight: "700" };
const itemStyle: React.CSSProperties = { width: "300px" };

/**
 * Набор состояний для скриншот-тестов, не покрытых документационными стори:
 * фокус с плейсхолдером маски (через play), заполненные поля всех размеров,
 * частично заполненная маска, префикс/постфикс, описание со счётчиком, статусы с заполненным значением.
 */
export const VisualTests = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}>
        {/* Первое поле — фокус устанавливается play-функцией. */}
        <div style={itemStyle}>
            <div style={captionStyle}>FOCUSED</div>
            <MaskedField
                label="Label"
                maskedInputProps={{
                    mask: masks.date,
                    placeholderMask: placeholderMasks.date,
                    value: "",
                    onChange: action("onChange"),
                }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>PARTIALLY FILLED</div>
            <MaskedField
                label="Label"
                maskedInputProps={{
                    mask: masks.date,
                    placeholderMask: placeholderMasks.date,
                    value: "12",
                    onChange: action("onChange"),
                }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>FILLED SM</div>
            <MaskedField
                size={EComponentSize.SM}
                label="Label"
                maskedInputProps={{ mask: masks.phone, value: "9012345678", onChange: action("onChange") }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>FILLED MD</div>
            <MaskedField
                size={EComponentSize.MD}
                label="Label"
                maskedInputProps={{ mask: masks.phone, value: "9012345678", onChange: action("onChange") }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>FILLED LG</div>
            <MaskedField
                size={EComponentSize.LG}
                label="Label"
                maskedInputProps={{ mask: masks.phone, value: "9012345678", onChange: action("onChange") }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>PREFIX / POSTFIX</div>
            <MaskedField
                label="Label"
                prefix={<DefaulticonStrokePrdIcon24 paletteIndex={5} />}
                postfix={
                    <>
                        <FormFieldClear onClick={action("onClear")} />
                        <DefaulticonStrokePrdIcon24 paletteIndex={5} />
                    </>
                }
                maskedInputProps={{ mask: masks.phone, value: "9012345678", onChange: action("onChange") }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>DESCRIPTION / COUNTER</div>
            <MaskedField
                label="Label"
                description={
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        (21) Description
                    </Text>
                }
                counter={
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        10/10
                    </Text>
                }
                maskedInputProps={{ mask: masks.phone, value: "9012345678", onChange: action("onChange") }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>ERROR FILLED</div>
            <MaskedField
                status={EFormFieldStatus.ERROR}
                label="Label"
                description={
                    <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                        Error text
                    </Text>
                }
                maskedInputProps={{ mask: masks.phone, value: "9012345678", onChange: action("onChange") }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>WARNING FILLED</div>
            <MaskedField
                status={EFormFieldStatus.WARNING}
                label="Label"
                description={
                    <Text tag="div" size={ETextSize.B4} type={EFontType.WARNING}>
                        Warning text
                    </Text>
                }
                maskedInputProps={{ mask: masks.phone, value: "9012345678", onChange: action("onChange") }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>DISABLED FILLED</div>
            <MaskedField
                status={EFormFieldStatus.DISABLED}
                label="Label"
                maskedInputProps={{ mask: masks.phone, value: "9012345678", onChange: action("onChange") }}
            />
        </div>
    </div>
);
