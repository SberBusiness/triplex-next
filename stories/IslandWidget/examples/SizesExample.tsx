import React, { useState } from "react";
import {
    IslandWidget,
    Button,
    ButtonIcon,
    EComponentSize,
    EButtonTheme,
    Link,
    Text,
    ETextSize,
    EFontType,
    DateField,
    EFormFieldStatus,
    EScreenWidth,
    useMatchMedia,
} from "@sberbusiness/triplex-next";
import { SettingsStrokeSrvIcon20 } from "@sberbusiness/icons-next";

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [value, setValue] = useState("");

    const adaptive = useMatchMedia(
        `(max-width: ${EScreenWidth.SM_MAX})`,
        window.innerWidth <= parseInt(EScreenWidth.SM_MAX),
    );

    const buttonSize =
        size === EComponentSize.LG
            ? EComponentSize.MD
            : size === EComponentSize.MD && adaptive
              ? EComponentSize.MD
              : EComponentSize.SM;

    return (
        <IslandWidget
            size={size}
            renderBody={(props) => <IslandWidget.Body {...props}>Content</IslandWidget.Body>}
            renderFooter={(props) => (
                <IslandWidget.Footer {...props}>
                    <IslandWidget.Footer.Content>
                        <Text
                            tag="div"
                            size={size === EComponentSize.LG ? ETextSize.B2 : ETextSize.B3}
                            type={EFontType.SECONDARY}
                        >
                            <Link>Link text</Link>
                        </Text>
                    </IslandWidget.Footer.Content>
                    <IslandWidget.Footer.Controls>
                        <Button theme={EButtonTheme.SECONDARY} size={buttonSize}>
                            Button text
                        </Button>
                        <Button theme={EButtonTheme.GENERAL} size={buttonSize}>
                            Button text
                        </Button>
                    </IslandWidget.Footer.Controls>
                </IslandWidget.Footer>
            )}
            renderHeader={(props) => (
                <IslandWidget.Header {...props}>
                    <IslandWidget.Header.Title>Title</IslandWidget.Header.Title>
                    <IslandWidget.Header.Controls>
                        <ButtonIcon>
                            <SettingsStrokeSrvIcon20 paletteIndex={5} />
                        </ButtonIcon>
                        <DateField
                            value={value}
                            onChange={setValue}
                            className="island-widget-date-field"
                            placeholderMask="дд.мм.гггг"
                            label="дд.мм.гггг"
                            invalidDateHint="Указана недоступная для выбора дата."
                            size={EComponentSize.SM}
                            status={EFormFieldStatus.DEFAULT}
                        />
                    </IslandWidget.Header.Controls>
                    <IslandWidget.Header.Description>Description</IslandWidget.Header.Description>
                </IslandWidget.Header>
            )}
        />
    );
};

const SIZES = Object.values(EComponentSize);

export const SizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
                <SizeItem size={size} />
            </div>
        ))}
    </div>
);
