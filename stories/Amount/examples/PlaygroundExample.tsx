import React from "react";
import { Amount, EFontType, ETextSize, Text } from "@sberbusiness/triplex-next";

export const PlaygroundExample = (args: React.ComponentProps<typeof Amount>) => (
    <Text size={ETextSize.B2} type={EFontType.PRIMARY}>
        <Amount {...args} />
    </Text>
);
