import React from "react";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ButtonIcon, CarouselExtended, ICarouselExtendedButtonProvideProps } from "@sberbusiness/triplex-next";

/** Свойства Playground: props компонента и вспомогательные настройки примера. */
export interface IPlaygroundProps {
    /** Величина (px) прокрутки при клике на кнопку "Назад". */
    stepPrev: number;
    /** Величина (px) прокрутки при клике на кнопку "Вперёд". */
    stepNext: number;
    /** Количество элементов в ленте. */
    itemsCount: number;
    /** Ширина ленты вместе с кнопками. */
    width: number;
}

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

export const Playground = ({ stepPrev, stepNext, itemsCount, width }: IPlaygroundProps) => (
    <CarouselExtended
        style={{ display: "flex", alignItems: "center", width: `${width}px` }}
        buttonPrev={renderPrevButton}
        buttonNext={renderNextButton}
        stepPrev={stepPrev}
        stepNext={stepNext}
    >
        {Array.from({ length: itemsCount }, (item, index) => (
            <div
                key={index}
                style={{
                    flex: "0 0 auto",
                    marginRight: "8px",
                    padding: "8px 16px",
                    border: "1px solid rgb(200, 202, 205)",
                    borderRadius: "8px",
                }}
            >
                Элемент {index + 1}
            </div>
        ))}
    </CarouselExtended>
);
