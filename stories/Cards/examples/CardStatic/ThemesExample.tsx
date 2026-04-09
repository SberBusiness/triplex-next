import React from "react";
import {
    CardStatic,
    ECardContentPaddingSize,
    ECardRoundingSize,
    ECardTheme,
    EFontType,
    EFontWeightText,
    ETextSize,
    Gap,
    Link,
    Text,
} from "@sberbusiness/triplex-next";

const Body = () => (
    <CardStatic.Content.Body>
        <Text tag="div" size={ETextSize.B3}>
            This message provides context or highlights important information to note.
        </Text>
        <Gap size={8} />
        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
            This message provides additional context or highlights important information to note.
        </Text>
        <Gap size={8} />
        <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
            1234567,00
        </Text>
        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
            Текст пояснения
        </Text>
        <Gap size={8} />
        <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B4}>
            <Link onClick={() => {}}>Link text</Link>
        </Text>
    </CardStatic.Content.Body>
);

export const ThemesExample = () => (
    <div style={{ width: "448px", display: "flex", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>GENERAL</div>
            <CardStatic roundingSize={ECardRoundingSize.MD} theme={ECardTheme.GENERAL}>
                <CardStatic.Content paddingSize={ECardContentPaddingSize.MD}>
                    <CardStatic.Content.Header>
                        <Text size={ETextSize.B3}>Subtitle text</Text>
                    </CardStatic.Content.Header>
                    <Body />
                </CardStatic.Content>
            </CardStatic>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SECONDARY</div>
            <CardStatic roundingSize={ECardRoundingSize.MD} theme={ECardTheme.SECONDARY}>
                <CardStatic.Content paddingSize={ECardContentPaddingSize.MD}>
                    <CardStatic.Content.Header>
                        <Text size={ETextSize.B3}>Subtitle text</Text>
                    </CardStatic.Content.Header>
                    <Body />
                </CardStatic.Content>
            </CardStatic>
        </div>
    </div>
);
