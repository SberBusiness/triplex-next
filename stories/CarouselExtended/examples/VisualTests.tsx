import React, { useEffect, useRef } from "react";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ButtonIcon, CarouselExtended, ICarouselExtendedButtonProvideProps } from "@sberbusiness/triplex-next";

const MONTHS = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
];

const SCROLL_STEP = 200;

/** Позиция прокрутки ленты на момент снятия скриншота. */
type TScrollPosition = "middle" | "end";

const renderPrevButton = ({ hidden, ...buttonProps }: ICarouselExtendedButtonProvideProps) =>
    hidden ? null : (
        <ButtonIcon aria-label="Прокрутить назад" {...buttonProps}>
            <CaretleftStrokeSrvIcon24 paletteIndex={5} />
        </ButtonIcon>
    );

const renderNextButton = ({ hidden, ...buttonProps }: ICarouselExtendedButtonProvideProps) =>
    hidden ? null : (
        <ButtonIcon aria-label="Прокрутить вперёд" {...buttonProps}>
            <CaretrightStrokeSrvIcon24 paletteIndex={5} />
        </ButtonIcon>
    );

interface IScrolledCarouselProps {
    /** Позиция, в которую лента прокручивается сразу после монтирования. */
    position: TScrollPosition;
    /** Подпись варианта. */
    label: string;
}

/**
 * Лента, прокрученная программно: прокрутка кнопками анимирована, и скриншот мог бы попасть
 * в середину анимации. Ref компонента указывает на прокручиваемый контейнер, поэтому позиция
 * выставляется напрямую.
 */
const ScrolledCarousel = ({ position, label }: IScrolledCarouselProps) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const carousel = carouselRef.current;

        if (carousel === null) {
            return;
        }

        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

        carousel.scrollLeft = position === "end" ? maxScrollLeft : Math.round(maxScrollLeft / 2);
        // Браузер рассылает scroll-событие асинхронно — дублируем его синхронно,
        // чтобы состояние кнопок пересчиталось сразу после прокрутки.
        carousel.dispatchEvent(new Event("scroll"));
    }, [position]);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{label}</div>
            <CarouselExtended
                style={{ display: "flex", alignItems: "center", width: "480px" }}
                buttonPrev={renderPrevButton}
                buttonNext={renderNextButton}
                stepPrev={SCROLL_STEP}
                stepNext={SCROLL_STEP}
                ref={carouselRef}
            >
                {MONTHS.map((month) => (
                    <div
                        key={month}
                        style={{
                            flex: "0 0 auto",
                            marginRight: "8px",
                            padding: "8px 16px",
                            border: "1px solid rgb(200, 202, 205)",
                            borderRadius: "8px",
                        }}
                    >
                        {month}
                    </div>
                ))}
            </CarouselExtended>
        </div>
    );
};

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <ScrolledCarousel position="middle" label="Середина ленты: активны обе кнопки" />
        <ScrolledCarousel position="end" label="Конец ленты: кнопка вперёд заблокирована" />
    </div>
);
