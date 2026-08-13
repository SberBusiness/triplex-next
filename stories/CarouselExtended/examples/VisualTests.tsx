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

/** Прокрутка в середину ленты: обе кнопки активны. */
const SCROLL_TO_MIDDLE = 300;
/** Заведомо больше максимума — браузер обрежет до конца ленты при любой её ширине. */
const SCROLL_TO_END = Number.MAX_SAFE_INTEGER;

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
 *
 * Позиция ставится в эффекте, а не в `play`: так контейнер берётся из ref, а не поиском по DOM.
 * `play` в `stories-guide.md` описан для пользовательских взаимодействий (клик, ввод), здесь же
 * это начальное состояние. Осознанный выбор, а не упущенный `play`.
 *
 * Обе позиции заданы константами и не вычисляются из измеренных ширин: измерение зависело бы от
 * метрик шрифта на момент эффекта, и при поздней загрузке шрифтов скриншот «поплыл» бы. Значение
 * для конца ленты браузер сам обрезает до максимума, поэтому оно точное при любой ширине контента.
 */
const ScrolledCarousel = ({ position, label }: IScrolledCarouselProps) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const carousel = carouselRef.current;

        if (carousel === null) {
            return;
        }

        carousel.scrollLeft = position === "end" ? SCROLL_TO_END : SCROLL_TO_MIDDLE;
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
