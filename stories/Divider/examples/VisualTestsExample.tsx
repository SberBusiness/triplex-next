import React from "react";
import { Divider, EFontType, ETextSize, Text } from "@sberbusiness/triplex-next";

const dividerSizes = [4, 8, 12, 16, 20, 24, 28, 32] as const;

export const VisualTestsExample = () => (
    <div style={{ maxWidth: 600 }}>
        {dividerSizes.map((size) => (
            <div key={size} style={{ marginBottom: 14 }}>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    marginTopSize={size}
                </Text>
                <Divider marginTopSize={size} marginBottomSize={size} />
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    marginBottomSize={size}
                </Text>
            </div>
        ))}
    </div>
);
