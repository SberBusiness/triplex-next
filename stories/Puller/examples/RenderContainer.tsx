import React, { useState } from "react";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    ETextSize,
    Puller,
    PullerBody,
    PullerClose,
    PullerHeader,
    Text,
} from "@sberbusiness/triplex-next";

export const RenderContainer = () => {
    const [opened, setOpened] = useState(false);
    const [container, setContainer] = useState<HTMLElement | null>(null);

    return (
        <div>
            <Button
                theme={EButtonTheme.SECONDARY}
                size={EComponentSize.MD}
                aria-haspopup="dialog"
                aria-expanded={opened}
                onClick={() => setOpened(true)}
            >
                Open
            </Button>
            <div ref={setContainer} style={{ marginTop: 16, padding: 16, outline: "1px dashed currentColor" }}>
                <Text tag="div" size={ETextSize.B3}>
                    Render container
                </Text>
            </div>
            {container && (
                <Puller
                    opened={opened}
                    setOpened={setOpened}
                    renderContainer={container}
                    role="dialog"
                    aria-labelledby="puller-render-container-title"
                >
                    <PullerHeader controlButtons={<PullerClose aria-label="Close" onClick={() => setOpened(false)} />}>
                        <Text id="puller-render-container-title" size={ETextSize.B1}>
                            Title
                        </Text>
                    </PullerHeader>
                    <PullerBody>
                        <Text tag="div" size={ETextSize.B3} style={{ padding: "16px" }}>
                            Puller content.
                        </Text>
                    </PullerBody>
                </Puller>
            )}
        </div>
    );
};
