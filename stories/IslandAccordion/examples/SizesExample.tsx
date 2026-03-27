import React from "react";
import { IslandAccordion, Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);

export const SizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SIZES.map((size, index) => (
            <div key={size}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
                <IslandAccordion size={size}>
                    <IslandAccordion.Item id={`island-accordion-sizes-${size}`} num={index + 1} title="Title">
                        <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
                        <IslandAccordion.Item.Footer>
                            <Button theme={EButtonTheme.LINK} size={size}>
                                Button link text
                            </Button>
                            <Button theme={EButtonTheme.SECONDARY} size={size}>
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.GENERAL} size={size}>
                                Button text
                            </Button>
                        </IslandAccordion.Item.Footer>
                    </IslandAccordion.Item>
                </IslandAccordion>
            </div>
        ))}
    </div>
);
