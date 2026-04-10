import React from "react";
import { DefaulticonStrokePrdIcon32 } from "@sberbusiness/icons-next";
import { ButtonIcon } from "@sberbusiness/triplex-next";

export const PlaygroundExample = (args: React.ComponentProps<typeof ButtonIcon>) => (
    <ButtonIcon {...args}>
        <DefaulticonStrokePrdIcon32 paletteIndex={5} />
    </ButtonIcon>
);
