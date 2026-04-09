import React, { useState } from "react";
import {
    CardAction,
    ECardContentPaddingSize,
    ECardRoundingSize,
    ECardTheme,
    EFontWeightTitle,
    ETextSize,
    ETitleSize,
    Text,
    Title,
} from "@sberbusiness/triplex-next";

export const CardActionDefaultExample = () => {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <div style={{ width: "216px" }}>
            <CardAction
                roundingSize={ECardRoundingSize.MD}
                theme={ECardTheme.GENERAL}
                selected={isSelected}
                toggle={setIsSelected}
            >
                <CardAction.Content paddingSize={ECardContentPaddingSize.MD}>
                    <CardAction.Content.Header>
                        <Title tag="div" size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
                            Title text
                        </Title>
                    </CardAction.Content.Header>
                    <CardAction.Content.Body>
                        <Text tag="div" size={ETextSize.B3}>
                            Body content
                        </Text>
                    </CardAction.Content.Body>
                </CardAction.Content>
            </CardAction>
        </div>
    );
};
