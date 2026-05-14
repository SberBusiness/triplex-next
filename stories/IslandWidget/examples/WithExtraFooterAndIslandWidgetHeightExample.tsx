import React, { useState } from "react";
import {
    IslandWidget,
    IslandWidgetWrapper,
    Button,
    EButtonTheme,
    EComponentSize,
    Text,
    ETextSize,
} from "@sberbusiness/triplex-next";

export const WithExtraFooterAndIslandWidgetHeightExample = () => {
    const [extraFooterOpen, setExtraFooterOpen] = useState(false);

    return (
        <>
            <div className="island-widget-control-panel">
                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM} onClick={() => setExtraFooterOpen(true)}>
                    Open Extra Footer
                </Button>
                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM} onClick={() => setExtraFooterOpen(false)}>
                    Close Extra Footer
                </Button>
            </div>

            <IslandWidgetWrapper style={{ height: "500px" }}>
                <IslandWidget
                    renderBody={(props) => <IslandWidget.Body {...props}>Content</IslandWidget.Body>}
                    renderHeader={(props) => (
                        <IslandWidget.Header {...props}>
                            <IslandWidget.Header.Title>Title</IslandWidget.Header.Title>
                            <IslandWidget.Header.Description>Description</IslandWidget.Header.Description>
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
