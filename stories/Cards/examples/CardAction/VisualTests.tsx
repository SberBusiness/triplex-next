import React, { useState } from "react";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import {
    CardAction,
    ECardContentPaddingSize,
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

export const VisualTestsExample = () => {
    const [isSelectedFirst, setIsSelectedFirst] = useState(false);
    const [isSelectedSecond, setIsSelectedSecond] = useState(false);

    return (
        <div style={{ width: "448px", display: "flex", gap: "16px" }}>
            <CardAction theme={ECardTheme.GENERAL} selected={isSelectedFirst} toggle={setIsSelectedFirst}>
                <CardAction.Media style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }} />
                <CardAction.Content paddingSize={ECardContentPaddingSize.MD}>
                    <CardAction.Content.Header>
                        <Title tag="div" size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
                            Title text
                        </Title>
                    </CardAction.Content.Header>
                    <CardBody />
                </CardAction.Content>
            </CardAction>
            <CardAction theme={ECardTheme.GENERAL} selected={isSelectedSecond} toggle={setIsSelectedSecond}>
                <CardAction.Media style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }} />
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
    );
};
