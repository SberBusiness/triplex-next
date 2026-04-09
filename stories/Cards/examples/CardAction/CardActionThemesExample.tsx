import React, { useState } from "react";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import {
    CardAction,
    ECardContentPaddingSize,
    ECardRoundingSize,
    ECardTheme,
    EComponentSize,
    EFontType,
    EFontWeightTitle,
    ETextSize,
    ETitleSize,
    Button,
    EButtonTheme,
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
        <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
            <DefaulticonStrokePrdIcon20 paletteIndex={5} />
            <Text size={ETextSize.B3} style={{ marginLeft: "8px" }}>
                List item text
            </Text>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
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

export const CardActionThemesExample = () => {
    const [isSelectedGeneral, setIsSelectedGeneral] = useState(false);
    const [isSelectedSecondary, setIsSelectedSecondary] = useState(false);

    return (
        <div style={{ width: "448px", display: "flex", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>GENERAL</div>
                <CardAction
                    roundingSize={ECardRoundingSize.MD}
                    theme={ECardTheme.GENERAL}
                    selected={isSelectedGeneral}
                    toggle={setIsSelectedGeneral}
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
                        <CardAction.Content.Footer>
                            <Button
                                theme={isSelectedGeneral ? EButtonTheme.SECONDARY_LIGHT : EButtonTheme.SECONDARY}
                                size={EComponentSize.SM}
                            >
                                Button text
                            </Button>
                        </CardAction.Content.Footer>
                    </CardAction.Content>
                </CardAction>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SECONDARY</div>
                <CardAction
                    roundingSize={ECardRoundingSize.MD}
                    theme={ECardTheme.SECONDARY}
                    selected={isSelectedSecondary}
                    toggle={setIsSelectedSecondary}
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
