import React from "react";
import { AlertProcess, EFontType, ETextSize, Text } from "@sberbusiness/triplex-next";

export const Playground = (args: React.ComponentProps<typeof AlertProcess>) => (
    <div style={{ maxWidth: "750px" }}>
        <AlertProcess {...args}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                {args.children}
            </Text>
        </AlertProcess>
    </div>
);
