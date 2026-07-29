import React from "react";
import { Carousel, ECarouselScrollMode } from "@sberbusiness/triplex-next";

interface ScrollModeItemProps {
    scrollMode: ECarouselScrollMode;
}

const BASE_ITEM_STYLE: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    height: "256px",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "bold",
    userSelect: "none",
};

const ScrollModeItem = ({ scrollMode }: ScrollModeItemProps) => {
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

    const containerStyle: React.CSSProperties = {
        maxWidth: "512px",
    };

    return (
        <div style={containerStyle}>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{scrollMode.toUpperCase()}</div>
            <Carousel scrollMode={scrollMode}>
                <Carousel.Viewport>
                    <Carousel.Track>
                        {items.map((item, index) => (
                            <Carousel.Item
                                key={item.id}
                                index={index}
                                style={{
                                    ...BASE_ITEM_STYLE,
                                    width: item.size,
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
    );
};

const SCROLL_MODES = Object.values(ECarouselScrollMode);

export const ScrollModes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SCROLL_MODES.map((scrollMode) => (
            <ScrollModeItem key={scrollMode} scrollMode={scrollMode} />
        ))}
    </div>
);
