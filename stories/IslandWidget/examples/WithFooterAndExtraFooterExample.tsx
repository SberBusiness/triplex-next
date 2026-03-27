import React, { useState } from "react";
import {
    IslandWidget,
    IslandWidgetWrapper,
    Button,
    EButtonTheme,
    EComponentSize,
    Link,
    Text,
    ETextSize,
    ETitleSize,
    Title,
    EFontType,
} from "@sberbusiness/triplex-next";

export const WithFooterAndExtraFooterExample = () => {
    const [extraFooterOpen, setExtraFooterOpen] = useState(false);
    const [bodyHeight, setBodyHeight] = useState(260);

    const handleExtraFooterOpen = (open: boolean) => {
        setExtraFooterOpen(open);
        setBodyHeight(open ? 196 : 260);
    };

    return (
        <>
            <div className="island-widget-control-panel">
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.SM}
                    onClick={() => handleExtraFooterOpen(true)}
                >
                    Open Extra Footer
                </Button>
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.SM}
                    onClick={() => handleExtraFooterOpen(false)}
                >
                    Close Extra Footer
                </Button>
            </div>

            <IslandWidgetWrapper>
                <IslandWidget
                    renderBody={(props) => (
                        <IslandWidget.Body {...props}>
                            <div style={{ height: bodyHeight, transition: "height 0.3s ease-in-out" }}>Content</div>
                        </IslandWidget.Body>
                    )}
                    renderFooter={(props) => (
                        <IslandWidget.Footer {...props}>
                            <IslandWidget.Footer.Content>
                                <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                                    <Link href="#">Link text</Link>
                                </Text>
                            </IslandWidget.Footer.Content>
                            <IslandWidget.Footer.Controls>
                                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                    Button text
                                </Button>
                                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                                    Button text
                                </Button>
                            </IslandWidget.Footer.Controls>
                        </IslandWidget.Footer>
                    )}
                    renderHeader={(props) => (
                        <IslandWidget.Header {...props}>
                            <IslandWidget.Header.Content>
                                <Title size={ETitleSize.H3}>Title</Title>
                            </IslandWidget.Header.Content>
                            <IslandWidget.Header.Description>
                                <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                                    Description
                                </Text>
                            </IslandWidget.Header.Description>
                        </IslandWidget.Header>
                    )}
                />
                <IslandWidget.ExtraFooter open={extraFooterOpen}>
                    <div className="island-widget-extra-footer">
                        <Text size={ETextSize.B3}>Extra footer content</Text>
                    </div>
                </IslandWidget.ExtraFooter>
            </IslandWidgetWrapper>
        </>
    );
};
