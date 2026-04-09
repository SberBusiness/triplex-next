import React, { useState } from "react";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import {
    CardAction,
    ECardContentPaddingSize,
    ECardRoundingSize,
    ECardTheme,
    EFontType,
    EFontWeightTitle,
    ETextSize,
    ETitleSize,
    Gap,
    Link,
    Text,
    Title,
} from "@sberbusiness/triplex-next";

const MEDIA_HEIGHT = "129px";

const CardBody = () => (
    <CardAction.Content.Body>
        <div style={{ display: "flex", alignItems: "center" }}>
            <DefaulticonStrokePrdIcon20 paletteIndex={5} />
            <Text size={ETextSize.B3} style={{ marginLeft: "8px" }}>
                List item text
            </Text>
        </div>
        <Gap size={8} />
        <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
            This message provides additional context or highlights important information to note.
        </Text>
        <Gap size={8} />
        <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B3}>
            <Link onClick={() => {}}>Link text</Link>
        </Text>
    </CardAction.Content.Body>
);

export const CardActionPaddingSizesExample = () => {
    const [isSelectedSM, setIsSelectedSM] = useState(false);
    const [isSelectedMD, setIsSelectedMD] = useState(false);

    return (
        <div style={{ width: "448px", display: "flex", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
                <CardAction
                    roundingSize={ECardRoundingSize.MD}
                    theme={ECardTheme.GENERAL}
                    selected={isSelectedSM}
                    toggle={setIsSelectedSM}
                >
                    <CardAction.Media
                        style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }}
                    />
                    <CardAction.Content paddingSize={ECardContentPaddingSize.SM}>
                        <CardAction.Content.Header>
                            <Title tag="div" size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
                                Title text
                            </Title>
                        </CardAction.Content.Header>
                        <CardBody />
                    </CardAction.Content>
                </CardAction>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
                <CardAction
                    roundingSize={ECardRoundingSize.MD}
                    theme={ECardTheme.GENERAL}
                    selected={isSelectedMD}
                    toggle={setIsSelectedMD}
                >
                    <CardAction.Media
                        style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }}
                    />
                    <CardAction.Content paddingSize={ECardContentPaddingSize.MD}>
                        <CardAction.Content.Header>
                            <Title tag="div" size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
                                Title text
                            </Title>
                        </CardAction.Content.Header>
                        <CardBody />
                    </CardAction.Content>
                </CardAction>
            </div>
        </div>
    );
};
