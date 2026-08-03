import React from "react";
import {
    CardStatic,
    ECardContentPaddingSize,
    ECardRoundingSize,
    ECardTheme,
    ETextSize,
    Text,
} from "@sberbusiness/triplex-next";

export const RoundingSizesExample = () => (
    <div style={{ width: "448px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ width: "216px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
            <CardStatic roundingSize={ECardRoundingSize.SM} theme={ECardTheme.GENERAL}>
                <CardStatic.Content paddingSize={ECardContentPaddingSize.MD}>
                    <CardStatic.Content.Header>
                        <Text size={ETextSize.B3}>Subtitle text</Text>
                    </CardStatic.Content.Header>
                    <CardStatic.Content.Body>
                        <Text tag="div" size={ETextSize.B3}>
                            This message provides context or highlights important information to note.
                        </Text>
                    </CardStatic.Content.Body>
                </CardStatic.Content>
            </CardStatic>
        </div>
        <div style={{ width: "216px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
            <CardStatic roundingSize={ECardRoundingSize.MD} theme={ECardTheme.GENERAL}>
                <CardStatic.Content paddingSize={ECardContentPaddingSize.MD}>
                    <CardStatic.Content.Header>
                        <Text size={ETextSize.B3}>Subtitle text</Text>
                    </CardStatic.Content.Header>
                    <CardStatic.Content.Body>
                        <Text tag="div" size={ETextSize.B3}>
                            This message provides context or highlights important information to note.
                        </Text>
                    </CardStatic.Content.Body>
                </CardStatic.Content>
            </CardStatic>
        </div>
        <div style={{ width: "216px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
            <CardStatic roundingSize={ECardRoundingSize.LG} theme={ECardTheme.GENERAL}>
                <CardStatic.Content paddingSize={ECardContentPaddingSize.MD}>
                    <CardStatic.Content.Header>
                        <Text size={ETextSize.B3}>Subtitle text</Text>
                    </CardStatic.Content.Header>
                    <CardStatic.Content.Body>
                        <Text tag="div" size={ETextSize.B3}>
                            This message provides context or highlights important information to note.
                        </Text>
                    </CardStatic.Content.Body>
                </CardStatic.Content>
            </CardStatic>
        </div>
    </div>
);
