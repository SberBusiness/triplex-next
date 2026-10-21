import React from "react";
import { Carousel, EButtonIconShape, EOrientation } from "@sberbusiness/triplex-next";

const ITEMS = [0, 1, 2];

interface IVisualCarouselProps {
    id: string;
    label: string;
    orientation?: EOrientation;
    disabled?: boolean;
    shape?: EButtonIconShape;
    alwaysVisible?: boolean;
}

const VisualCarousel = ({
    id,
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
                <Carousel.PrevButton
                    data-testid={id}
                    aria-label={label}
                    disabled={disabled}
                    shape={shape}
                    // Fade отключён для стабильного кадра; focus/hover сохраняют обычное управление opacity.
                    style={{ transition: "none", ...(alwaysVisible ? { opacity: 1 } : {}) }}
                />
                <Carousel.NextButton
                    data-testid={`${id}-prepare`}
                    aria-label="Подготовить состояние предыдущей кнопки"
                    aria-hidden="true"
                    tabIndex={-1}
                    // Служит только для подготовки состояния в play и не попадает в кадр или Tab-порядок.
                    style={{ opacity: 0, transition: "none" }}
                />
            </Carousel.Viewport>
        </Carousel>
    </div>
);

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <VisualCarousel id="carousel-prev-focus" label="PrevButton: фокус с клавиатуры" />
        <VisualCarousel id="carousel-prev-hover" label="PrevButton: наведение" />
        <VisualCarousel id="carousel-prev-start" label="PrevButton: начало ленты" alwaysVisible />
        <VisualCarousel
            id="carousel-prev-disabled"
            label="PrevButton: disabled, circle, вертикальная карусель"
            orientation={EOrientation.VERTICAL}
            shape={EButtonIconShape.CIRCLE}
            disabled
            alwaysVisible
        />
    </div>
);
