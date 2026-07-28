import React from "react";
import { Carousel, ICarouselProps, ECarouselOrientation } from "@sberbusiness/triplex-next";

export interface PlaygroundArgs extends Pick<ICarouselProps, "orientation" | "scrollMode" | "gap"> {}

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

const ORIENTATION_TO_ITEM_DIMENSIONS_MAP = {
    [ECarouselOrientation.HORIZONTAL]: (size: number): React.CSSProperties => ({
        width: size,
        height: "100%",
    }),
    [ECarouselOrientation.VERTICAL]: (size: number): React.CSSProperties => ({
        width: "100%",
        height: size,
    }),
};

export const Playground = ({ orientation = ECarouselOrientation.HORIZONTAL, ...restArgs }: PlaygroundArgs) => {
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

    const viewportStyle: React.CSSProperties = {
        height: "512px",
    };

    return (
        <div style={containerStyle}>
            <Carousel orientation={orientation} {...restArgs}>
                <Carousel.Viewport style={viewportStyle}>
                    <Carousel.Track>
                        {items.map((item, index) => (
                            <Carousel.Item
                                key={item.id}
                                index={index}
                                style={{
                                    ...BASE_ITEM_STYLE,
                                    ...ORIENTATION_TO_ITEM_DIMENSIONS_MAP[orientation](item.size),
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
