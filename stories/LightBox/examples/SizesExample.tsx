import React, { useState } from "react";
import {
    LightBox,
    ELightBoxSize,
    Page,
    Button,
    EButtonTheme,
    Gap,
    Title,
    Text,
    EFontType,
    ETextSize,
    ETitleSize,
    EHeaderPageType,
    EFooterPageType,
    EBodyPageType,
    Island,
    IslandBody,
    EIslandType,
    FocusTrapUtils,
    EComponentSize,
} from "@sberbusiness/triplex-next";

const POEM_LINES: string[] = [
    "Мой дядя самых честных правил,",
    "Когда не в шутку занемог,",
    "Он уважать себя заставил",
    "И лучше выдумать не мог.",
    "Его пример другим наука;",
    "Но, боже мой, какая скука",
    "С больным сидеть и день и ночь,",
    "Не отходя ни шагу прочь!",
];

const PoemBlock: React.FC = () => (
    <Island type={EIslandType.TYPE_1} size={EComponentSize.MD}>
        <IslandBody>
            {POEM_LINES.map((line) => (
                <React.Fragment key={line}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
        </IslandBody>
    </Island>
);

const SIZES = Object.values(ELightBoxSize);

export const SizesExample = () => {
    const [openedSize, setOpenedSize] = useState<ELightBoxSize | null>(null);

    const handleClose = () => setOpenedSize(null);

    return (
        <div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {SIZES.map((size) => (
                    <Button
                        key={size}
                        theme={EButtonTheme.SECONDARY}
                        size={EComponentSize.MD}
                        onClick={() => setOpenedSize(size)}
                    >
                        {size.toUpperCase()}
                    </Button>
                ))}
            </div>

            {openedSize !== null ? (
                <LightBox isLoading={false} isSideOverlayOpened={false} isTopOverlayOpened={false} size={openedSize}>
                    <LightBox.Content key="content" isLoading={false}>
                        <Page>
                            <Page.Header type={EHeaderPageType.FIRST} sticky>
                                <Page.Header.Title>
                                    <Page.Header.Title.Content>
                                        <Title
                                            tag="h1"
                                            size={ETitleSize.H1}
                                            tabIndex={-1}
                                            {...{ [FocusTrapUtils.firstInteractionElementDataAttr]: true }}
                                        >
                                            LightBox {openedSize.toUpperCase()}
                                        </Title>
                                        <Gap size={8} />
                                        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                                            Размер контента: {openedSize.toUpperCase()}
                                        </Text>
                                    </Page.Header.Title.Content>
                                </Page.Header.Title>
                            </Page.Header>

                            <Page.Body type={EBodyPageType.SECOND}>
                                <PoemBlock />
                                <Gap size={24} />
                                <PoemBlock />
                            </Page.Body>

                            <Page.Footer type={EFooterPageType.FIRST} sticky>
                                <Page.Footer.Description>
                                    <Page.Footer.Description.Controls>
                                        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={handleClose}>
                                            Закрыть
                                        </Button>
                                    </Page.Footer.Description.Controls>
                                </Page.Footer.Description>
                            </Page.Footer>
                        </Page>
                    </LightBox.Content>

                    <LightBox.Controls>
                        <LightBox.Controls.Close title="Закрыть" data-test-id="lightbox-close" onClick={handleClose} />
                    </LightBox.Controls>
                </LightBox>
            ) : null}
        </div>
    );
};
