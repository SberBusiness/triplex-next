import React from "react";
import { Carousel, ECarouselOrientation } from "@sberbusiness/triplex-next";

interface OrientationItemProps {
    orientation: ECarouselOrientation;
}

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

const ORIENTATION_TO_ITEM_DIMENSIONS_MAP: Record<ECarouselOrientation, (size: number) => React.CSSProperties> = {
    [ECarouselOrientation.HORIZONTAL]: (size) => ({
        width: size,
        height: "100%",
    }),
    [ECarouselOrientation.VERTICAL]: (size) => ({
        width: "100%",
        height: size / 2,
    }),
};

const ORIENTATION_TO_GAP_MAP: Record<ECarouselOrientation, number> = {
    [ECarouselOrientation.HORIZONTAL]: 16,
    [ECarouselOrientation.VERTICAL]: 8,
};

const OrientationItem = ({ orientation }: OrientationItemProps) => {
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
        height: "256px",
    };

    return (
        <div style={containerStyle}>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{orientation.toUpperCase()}</div>
            <Carousel orientation={orientation} gap={ORIENTATION_TO_GAP_MAP[orientation]}>
                <Carousel.Viewport style={viewportStyle}>
                    <Carousel.Track>
                        {items.map((item, index) => {
                            const itemStyle: React.CSSProperties = {
                                ...BASE_ITEM_STYLE,
                                ...ORIENTATION_TO_ITEM_DIMENSIONS_MAP[orientation](item.size),
                                backgroundColor: item.backgroundColor,
                            };

                            return (
                                <Carousel.Item key={item.id} index={index} style={itemStyle}>
                                    {item.id}
                                </Carousel.Item>
                            );
                        })}
                    </Carousel.Track>
                    <Carousel.PrevButton />
                    <Carousel.NextButton />
                </Carousel.Viewport>
                <Carousel.Indicators />
            </Carousel>
        </div>
    );
};

const ORIENTATIONS = Object.values(ECarouselOrientation);

export const Orientations = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {ORIENTATIONS.map((orientation) => (
            <OrientationItem key={orientation} orientation={orientation} />
        ))}
    </div>
);
