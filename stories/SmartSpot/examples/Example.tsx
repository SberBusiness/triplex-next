import React from "react";
import { DesignTokensCore, ESmartSpotAnimation, SmartSpot } from "@sberbusiness/triplex-next";

export const Example = () => {
    const [blur, setBlur] = React.useState(60);

    return (
        <div style={{ display: "grid", gap: 16, width: 520, maxWidth: "100%" }}>
            <label style={{ display: "grid", gap: 8 }}>
                Общее размытие · {blur} px
                <input
                    type="range"
                    min={0}
                    max={300}
                    value={blur}
                    aria-label="Общее размытие"
                    aria-valuetext={`${blur} px`}
                    onChange={(event) => setBlur(event.currentTarget.valueAsNumber)}
                />
            </label>
            <div
                style={{
                    position: "relative",
                    height: 300,
                    overflow: "hidden",
                    borderRadius: 16,
                }}
            >
                <div style={{ position: "absolute", inset: 0, filter: `blur(${blur}px)` }}>
                    <SmartSpot
                        animation={ESmartSpotAnimation.DRIFT}
                        blur={0}
                        style={{
                            backgroundColor: DesignTokensCore.ColorSuccess[80].value,
                            position: "absolute",
                            left: "calc(50% - 110px)",
                            top: -194,
                            width: 294,
                            opacity: 0.5,
                        }}
                    />
                    <SmartSpot
                        animation={ESmartSpotAnimation.DRIFT}
                        blur={0}
                        style={{
                            backgroundColor: DesignTokensCore.ColorSuccess[50].value,
                            position: "absolute",
                            left: "calc(50% - 183px)",
                            top: -60,
                            width: 281,
                        }}
                    />
                    <SmartSpot
                        animation={ESmartSpotAnimation.DRIFT}
                        blur={0}
                        style={{
                            backgroundColor: DesignTokensCore.ColorBrand[60].value,
                            position: "absolute",
                            left: "calc(50% - 130px)",
                            top: -47,
                            width: 200,
                            opacity: 0.53,
                        }}
                    />
                    <SmartSpot
                        animation={ESmartSpotAnimation.DRIFT}
                        blur={0}
                        style={{
                            backgroundColor: DesignTokensCore.ColorSuccess[80].value,
                            position: "absolute",
                            left: "calc(50% - 130px)",
                            top: -47,
                            width: 145,
                            opacity: 0.53,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
