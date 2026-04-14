import React from "react";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import { Button, EButtonTheme, EComponentSize, Gap } from "@sberbusiness/triplex-next";

export const BlockModeExample = () => (
    <div style={{ maxWidth: 280 }}>
        <Button block theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
            General
        </Button>
        <Gap size={16} />
        <Button block theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
            Secondary
        </Button>
        <Gap size={16} />
        <Button block theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD}>
            Secondary Light
        </Button>
        <Gap size={16} />
        <Button
            block
            size={EComponentSize.MD}
            theme={EButtonTheme.DANGER}
            icon={<DefaulticonStrokePrdIcon20 paletteIndex={7} />}
        />
    </div>
);
