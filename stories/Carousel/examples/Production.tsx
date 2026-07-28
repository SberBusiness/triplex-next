import React, { useState } from "react";
import {
    Carousel,
    CardAction,
    ECardRoundingSize,
    ECardTheme,
    ECardContentPaddingSize,
    Title,
    ETitleSize,
    EFontWeightTitle,
    Text,
    ETextSize,
    EFontType,
    Gap,
    Link,
    Button,
    EButtonTheme,
    EComponentSize,
} from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";

const CARDS_IDS = Array.from({ length: 6 }, (_, i) => i);

const CardBody = () => (
    <CardAction.Content.Body>
        {[1, 2, 3].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", marginTop: item > 1 ? "16px" : "0" }}>
                <DefaulticonStrokePrdIcon20 paletteIndex={5} />
                <Text size={ETextSize.B3} style={{ marginLeft: "8px" }}>
                    List item text
                </Text>
            </div>
        ))}
        <Gap size={8} />
        <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
            This message provides additional context or highlights important information to note.
        </Text>
        <Gap size={8} />
        <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B3}>
            <Link onKeyDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
                Link text
            </Link>
        </Text>
    </CardAction.Content.Body>
);

export const Production = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <div style={{ width: "100%", maxWidth: "752px" }}>
            <Carousel viewportPadding={8}>
                <Carousel.Viewport>
                    <Carousel.Track>
                        {CARDS_IDS.map((id, index) => {
                            const selected = selectedId === id;

                            return (
                                <Carousel.Item
                                    key={id}
                                    index={index}
                                    style={{
                                        width: "216px",
                                        height: "100%",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <CardAction
                                        roundingSize={ECardRoundingSize.MD}
                                        theme={ECardTheme.GENERAL}
                                        selected={selected}
                                        toggle={() => setSelectedId(selected ? null : id)}
                                    >
                                        <CardAction.Media
                                            style={{
                                                backgroundImage: "url(assets/images/evotor.png)",
                                                height: "129px",
                                            }}
                                        />
                                        <CardAction.Content paddingSize={ECardContentPaddingSize.SM}>
                                            <CardAction.Content.Header>
                                                <Title tag="div" size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
                                                    Title Text
                                                </Title>
                                            </CardAction.Content.Header>

                                            <CardBody />

                                            <CardAction.Content.Footer>
                                                <Button
                                                    theme={
                                                        selected ? EButtonTheme.SECONDARY_LIGHT : EButtonTheme.SECONDARY
                                                    }
                                                    size={EComponentSize.SM}
                                                    onKeyDown={(event) => event.stopPropagation()}
                                                    onClick={(event) => event.stopPropagation()}
                                                >
                                                    Button text
                                                </Button>
                                            </CardAction.Content.Footer>
                                        </CardAction.Content>
                                    </CardAction>
                                </Carousel.Item>
                            );
                        })}
                    </Carousel.Track>
                    <Carousel.PrevButton />
                    <Carousel.NextButton />
                </Carousel.Viewport>
            </Carousel>
        </div>
    );
};
