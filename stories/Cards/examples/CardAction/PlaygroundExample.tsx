import React, { useState } from "react";
import { action } from "storybook/actions";
import {
    CardAction,
    ICardActionProps,
    EButtonTheme,
    ECardTheme,
    ECardContentPaddingSize,
    Title,
    ETitleSize,
    EFontWeightTitle,
    Button,
    EComponentSize,
    Text,
    ETextSize,
    EFontType,
    Link,
    Gap,
} from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";

const MEDIA_HEIGHT = "129px";

type TCardActionPlaygroundProps = Pick<
    ICardActionProps,
    "roundingSize" | "theme" | "selected" | "onToggle" | "toggle"
> & {
    paddingSize: ECardContentPaddingSize;
};

export const PlaygroundExample = (args: TCardActionPlaygroundProps) => {
    const { paddingSize, theme, ...cardArgs } = args;
    const [isSelected, setIsSelected] = useState(args?.selected ?? false);

    const handleToggle = (selected: boolean) => {
        setIsSelected(selected);
        args.onToggle?.(selected);
        args.toggle?.(selected);
        action("onToggle")(selected);
        action("toggle")(selected);
    };

    const buttomTheme = isSelected ? EButtonTheme.SECONDARY_LIGHT : EButtonTheme.SECONDARY;
    const isGeneralTheme = theme === ECardTheme.GENERAL;

    return (
        <div style={{ width: "216px" }}>
            <CardAction {...cardArgs} theme={theme} selected={isSelected} toggle={handleToggle}>
                <CardAction.Media style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }} />
                <CardAction.Content paddingSize={paddingSize}>
                    <CardAction.Content.Header>
                        <Title tag="div" size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
                            Title text
                        </Title>
                    </CardAction.Content.Header>
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
                    {isGeneralTheme && (
                        <CardAction.Content.Footer>
                            <Button theme={buttomTheme} size={EComponentSize.SM}>
                                Button text
                            </Button>
                        </CardAction.Content.Footer>
                    )}
                </CardAction.Content>
            </CardAction>
        </div>
    );
};
