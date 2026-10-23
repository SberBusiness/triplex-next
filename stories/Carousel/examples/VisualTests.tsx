import React from "react";
import { Carousel, EButtonIconShape, EOrientation } from "@sberbusiness/triplex-next";

const ITEMS = [0, 1, 2];

interface IVisualCarouselProps {
    testId: string;
    label: string;
    orientation?: EOrientation;
    disabled?: boolean;
    shape?: EButtonIconShape;
    alwaysVisible?: boolean;
}

const VisualCarousel = ({
    testId,
    label,
    orientation = EOrientation.HORIZONTAL,
    disabled,
    shape,
    alwaysVisible,
}: IVisualCarouselProps) => (
    <div>
        <div style={{ marginBottom: 8 }}>{label}</div>
        <Carousel orientation={orientation} aria-label={label} style={{ width: 320, height: 112 }}>
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
                <Carousel.NextButton
                    data-testid={testId}
                    aria-label="Next slide"
                    disabled={disabled}
                    shape={shape}
                    // Без fade, иначе скриншот ловит промежуточную opacity.
                    style={{ transition: "none", opacity: alwaysVisible ? 1 : undefined }}
                />
            </Carousel.Viewport>
        </Carousel>
    </div>
);

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <VisualCarousel testId="carousel-next-focus" label="NextButton: фокус с клавиатуры" />
        <VisualCarousel testId="carousel-next-hover" label="NextButton: наведение" />
        <VisualCarousel testId="carousel-next-end" label="NextButton: конец ленты" alwaysVisible />
        <VisualCarousel
            testId="carousel-next-disabled"
            label="NextButton: disabled, circle, вертикальная карусель"
            orientation={EOrientation.VERTICAL}
            shape={EButtonIconShape.CIRCLE}
            disabled
            alwaysVisible
        />
    </div>
);
