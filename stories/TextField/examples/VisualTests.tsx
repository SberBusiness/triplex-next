import React from "react";
import {
    TextField,
    FormFieldClear,
    Text,
    EComponentSize,
    EFormFieldStatus,
    ETextSize,
    EFontType,
} from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";
import { action } from "storybook/actions";

const captionStyle: React.CSSProperties = { marginBottom: "8px", fontSize: "16px", fontWeight: "700" };
const itemStyle: React.CSSProperties = { width: "300px" };

/**
 * Набор состояний для скриншот-тестов, не покрытых документационными стори:
 * фокус (через play), заполненные поля всех размеров, префикс/постфикс,
 * описание со счетчиком, статусы с заполненным значением.
 */
export const VisualTests = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}>
        {/* Первое поле — фокус устанавливается play-функцией. */}
        <div style={itemStyle}>
            <div style={captionStyle}>FOCUSED</div>
            <TextField
                label="Label"
                inputProps={{ value: "", onChange: action("onChange"), placeholder: "Type to proceed" }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>FILLED SM</div>
            <TextField
                size={EComponentSize.SM}
                label="Label"
                inputProps={{ value: "Value", onChange: action("onChange") }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>FILLED MD</div>
            <TextField
                size={EComponentSize.MD}
                label="Label"
                inputProps={{ value: "Value", onChange: action("onChange") }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>FILLED LG</div>
            <TextField
                size={EComponentSize.LG}
                label="Label"
                inputProps={{ value: "Value", onChange: action("onChange") }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>PREFIX / POSTFIX</div>
            <TextField
                label="Label"
                prefix={<DefaulticonStrokePrdIcon24 paletteIndex={5} />}
                postfix={
                    <>
                        <FormFieldClear onClick={action("onClear")} />
                        <DefaulticonStrokePrdIcon24 paletteIndex={5} />
                    </>
                }
                inputProps={{ value: "Value", onChange: action("onChange") }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>DESCRIPTION / COUNTER</div>
            <TextField
                label="Label"
                description={
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        (21) Description
                    </Text>
                }
                counter={
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        5/201
                    </Text>
                }
                inputProps={{ value: "Value", onChange: action("onChange") }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>ERROR FILLED</div>
            <TextField
                status={EFormFieldStatus.ERROR}
                label="Label"
                description={
                    <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                        Error text
                    </Text>
                }
                inputProps={{ value: "Value", onChange: action("onChange") }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>WARNING FILLED</div>
            <TextField
                status={EFormFieldStatus.WARNING}
                label="Label"
                description={
                    <Text tag="div" size={ETextSize.B4} type={EFontType.WARNING}>
                        Warning text
                    </Text>
                }
                inputProps={{ value: "Value", onChange: action("onChange") }}
            />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>DISABLED FILLED</div>
            <TextField
                status={EFormFieldStatus.DISABLED}
                label="Label"
                inputProps={{ value: "Value", onChange: action("onChange") }}
            />
        </div>
    </div>
);
