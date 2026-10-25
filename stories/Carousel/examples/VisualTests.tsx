import React from "react";
import { Carousel, EButtonIconShape, EOrientation } from "@sberbusiness/triplex-next";

const ITEMS = [0, 1, 2];

interface IVisualCarouselProps {
    testId: string;
    label: string;
    button: "prev" | "next";
    orientation?: EOrientation;
    disabled?: boolean;
    shape?: EButtonIconShape;
    alwaysVisible?: boolean;
    shiftable?: boolean;
}

const VisualCarousel = ({
    testId,
    label,
    button,
    orientation = EOrientation.HORIZONTAL,
    disabled,
    shape,
    alwaysVisible,
    shiftable,
}: IVisualCarouselProps) => {
    const NavButton = button === "prev" ? Carousel.PrevButton : Carousel.NextButton;
    // Без fade, иначе скриншот ловит промежуточную opacity.
    const style = { transition: "none", opacity: alwaysVisible ? 1 : undefined };

    return (
        <div>
            <div style={{ marginBottom: 8 }}>{label}</div>
            <Carousel orientation={orientation} style={{ width: 320, height: 112 }}>
                <Carousel.Viewport>
                    <Carousel.Track>
                        {ITEMS.map((index) => (
                            <Carousel.Item
                                key={index}
                                index={index}
                                style={{ width: orientation === EOrientation.HORIZONTAL ? 200 : 320, height: 112 }}
                            >
                                Слайд {index + 1}
                            </Carousel.Item>
                        ))}
                    </Carousel.Track>
                    <NavButton
                        data-testid={testId}
                        aria-label={button === "prev" ? "Previous slide" : "Next slide"}
                        disabled={disabled}
                        shape={shape}
                        style={style}
                    />
                    {shiftable && (
                        // Нужна play, чтобы снять PrevButton вне начала ленты.
                        <Carousel.NextButton
                            data-testid={`${testId}-prepare`}
                            aria-label="Next slide"
                            tabIndex={-1}
                            style={{ transition: "none", opacity: 0 }}
                        />
                    )}
                </Carousel.Viewport>
            </Carousel>
        </div>
    );
};

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <VisualCarousel testId="carousel-next-focus" button="next" label="NextButton: фокус с клавиатуры" />
        <VisualCarousel testId="carousel-next-hover" button="next" label="NextButton: наведение" />
        <VisualCarousel testId="carousel-next-end" button="next" label="NextButton: конец ленты" alwaysVisible />
        <VisualCarousel
            testId="carousel-next-disabled"
            button="next"
            label="NextButton: disabled, circle, вертикальная карусель"
            orientation={EOrientation.VERTICAL}
            shape={EButtonIconShape.CIRCLE}
            disabled
            alwaysVisible
        />
        <VisualCarousel testId="carousel-prev-start" button="prev" label="PrevButton: начало ленты" alwaysVisible />
        <VisualCarousel
            testId="carousel-prev-disabled"
            button="prev"
            label="PrevButton: disabled, circle, вертикальная карусель"
            orientation={EOrientation.VERTICAL}
            shape={EButtonIconShape.CIRCLE}
            disabled
            alwaysVisible
            shiftable
        />
    </div>
);
