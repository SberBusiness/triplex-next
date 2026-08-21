import React from "react";
import { ETextSize, ExpandAnimation, Text } from "@sberbusiness/triplex-next";

interface IVisualTestCaseProps {
    title: string;
    expanded: boolean;
}

const VisualTestCase = ({ title, expanded }: IVisualTestCaseProps) => (
    <div style={{ width: 280 }}>
        <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{title}</div>

        {/* Рамка нужна, чтобы на скриншоте была видна высота свёрнутого блока. */}
        <div style={{ border: "1px solid #b8b9bd" }}>
            <ExpandAnimation expanded={expanded}>
                <Text tag="div" size={ETextSize.B1} style={{ padding: 8 }}>
                    Содержимое из двух строк, чтобы разница между свёрнутым и развёрнутым состоянием была заметна.
                </Text>
            </ExpandAnimation>
        </div>
    </div>
);

export const VisualTests = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 50, flexWrap: "wrap" }}>
        <VisualTestCase title="Развёрнут" expanded={true} />
        <VisualTestCase title="Свёрнут" expanded={false} />
    </div>
);
