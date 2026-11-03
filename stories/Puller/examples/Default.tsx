import React, { useState } from "react";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    ETextSize,
    Puller,
    PullerBody,
    PullerClose,
    PullerFooter,
    PullerHeader,
    Text,
} from "@sberbusiness/triplex-next";

export const Default = () => {
    const [opened, setOpened] = useState(false);

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
            <Puller opened={opened} setOpened={setOpened} role="dialog" aria-labelledby="puller-default-title">
                <PullerHeader controlButtons={<PullerClose aria-label="Close" onClick={() => setOpened(false)} />}>
                    <Text id="puller-default-title" size={ETextSize.B1}>
                        Title
                    </Text>
                </PullerHeader>
                <PullerBody>
                    <Text tag="div" size={ETextSize.B3} style={{ padding: "16px" }}>
                        Puller content. The puller closes via the close button, the footer button or a tap on the
                        backdrop.
                    </Text>
                </PullerBody>
                <PullerFooter>
                    <Button
                        theme={EButtonTheme.GENERAL}
                        size={EComponentSize.MD}
                        block
                        onClick={() => setOpened(false)}
                    >
                        Done
                    </Button>
                </PullerFooter>
            </Puller>
        </div>
    );
};
