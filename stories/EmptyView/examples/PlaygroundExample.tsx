import React from "react";
import { EmptyView, EEmptyViewSize, Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";
import WaitgradientStsIcon96 from "@sberbusiness/icons-next/WaitgradientStsIcon96";
import WaitgradientStsIcon128 from "@sberbusiness/icons-next/WaitgradientStsIcon128";
import ServicesetupSysIcon96 from "@sberbusiness/icons-next/ServicesetupSysIcon96";
import ServicesetupSysIcon128 from "@sberbusiness/icons-next/ServicesetupSysIcon128";
import NodocumentsMrkIcon96 from "@sberbusiness/icons-next/NodocumentsMrkIcon96";
import NodocumentsMrkIcon128 from "@sberbusiness/icons-next/NodocumentsMrkIcon128";

export const ICONS_SM = {
    Status: <WaitgradientStsIcon96 />,
    System: <ServicesetupSysIcon96 />,
    Marketing: <NodocumentsMrkIcon96 />,
    None: undefined,
} as const;

export const ICONS_MD = {
    Status: <WaitgradientStsIcon128 />,
    System: <ServicesetupSysIcon128 />,
    Marketing: <NodocumentsMrkIcon128 />,
    None: undefined,
} as const;

export type PlaygroundArgs = React.ComponentProps<typeof EmptyView> & {
    /** С кнопками. */
    withButtons: boolean;
    /** Тип иконки. */
    iconType: keyof typeof ICONS_SM;
};

export const PlaygroundExample = ({ withButtons, iconType, size, ...args }: PlaygroundArgs) => {
    const buttonSize = size === EEmptyViewSize.SM ? EComponentSize.SM : EComponentSize.MD;
    const iconsMap = size === EEmptyViewSize.SM ? ICONS_SM : ICONS_MD;

    return (
        <div style={{ maxWidth: "380px" }}>
            <EmptyView
                size={size}
                icon={iconsMap[iconType]}
                buttons={
                    withButtons ? (
                        <>
                            <Button theme={EButtonTheme.SECONDARY} size={buttonSize}>
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.GENERAL} size={buttonSize}>
                                Button text
                            </Button>
                        </>
                    ) : undefined
                }
                {...args}
            />
        </div>
    );
};
