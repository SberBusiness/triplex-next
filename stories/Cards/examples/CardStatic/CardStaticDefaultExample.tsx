import React from "react";
import {
    CardStatic,
    ECardContentPaddingSize,
    ECardRoundingSize,
    ECardTheme,
    ETextSize,
    Text,
} from "@sberbusiness/triplex-next";

export const CardStaticDefaultExample = () => (
    <div style={{ width: "216px" }}>
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
);
