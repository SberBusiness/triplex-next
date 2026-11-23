import React from "react";
import { SmartSpot, ESmartSpotAnimation, ESmartSpotShape, ESmartSpotType } from "@sberbusiness/triplex-next";

const TYPES = Object.values(ESmartSpotType);
const SHAPES = Object.values(ESmartSpotShape);

// Animation None: кадр рисуется один раз, DOM стабилен — скриншот детерминирован.
export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {TYPES.map((type) => (
            <div key={type}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{type.toUpperCase()}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                    {SHAPES.map((shape) => (
                        <div key={shape} style={{ width: 160, height: 160, borderRadius: 16, overflow: "hidden" }}>
                            <SmartSpot type={type} shape={shape} animation={ESmartSpotAnimation.NONE} />
                        </div>
                    ))}
                </div>
            </div>
        ))}
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>BLUR 20 + CHILDREN</div>
            <div style={{ width: 240, height: 160, borderRadius: 16, overflow: "hidden" }}>
                <SmartSpot type={ESmartSpotType.SUCCESS} animation={ESmartSpotAnimation.NONE} blur={20}>
                    <div style={{ padding: 16, fontSize: "16px" }}>Платёж исполнен</div>
                </SmartSpot>
            </div>
        </div>
    </div>
);
