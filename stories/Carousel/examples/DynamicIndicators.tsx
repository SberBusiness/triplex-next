import React from "react";
import { Carousel, ECarouselScrollMode } from "@sberbusiness/triplex-next";

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

export const DynamicIndicators = () => {
    const itemSizes = Array.from({ length: 20 }, () => 128);

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
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        maxWidth: "512px",
    };

    const containerStyle: React.CSSProperties = {
        width: "100%",
        height: "256px",
    };

    return (
        <div style={boxStyle}>
            <div style={containerStyle}>
                <Carousel scrollMode={ECarouselScrollMode.PAGE}>
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
                    <Carousel.Indicators />
                </Carousel>
            </div>
        </div>
    );
};
