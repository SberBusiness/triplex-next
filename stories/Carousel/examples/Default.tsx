import React from "react";
import { Carousel } from "@sberbusiness/triplex-next";

const BASE_ITEM_STYLE: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "bold",
    userSelect: "none",
};

export const Default = () => {
    const itemSizes = [92, 168, 220, 244, 252, 256, 252, 244, 220, 168, 92];
    const items = itemSizes.map((size, index) => {
        const totalItems = itemSizes.length;
        const hue = (index / (totalItems - 1)) * 280;

        return {
            id: index + 1,
            size,
            backgroundColor: `hsl(${hue}, 50%, 50%)`,
        };
    });

    const boxStyle: React.CSSProperties = {
        width: "100%",
        height: "256px",
        maxWidth: "512px",
    };

    return (
        <div style={boxStyle}>
            <Carousel>
                <Carousel.Viewport>
                    <Carousel.Track>
                        {items.map((item, index) => (
                            <Carousel.Item
                                key={item.id}
                                index={index}
                                style={{
                                    ...BASE_ITEM_STYLE,
                                    width: item.size,
                                    height: "100%",
                                    backgroundColor: item.backgroundColor,
                                }}
                            >
                                {item.id}
                            </Carousel.Item>
                        ))}
                    </Carousel.Track>
                    <Carousel.PrevButton />
                    <Carousel.NextButton />
                </Carousel.Viewport>
            </Carousel>
        </div>
    );
};
