import React from "react";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ButtonIcon, CarouselExtended, ICarouselExtendedButtonProvideProps } from "@sberbusiness/triplex-next";

const MONTHS = ["Январь", "Февраль", "Март"];

/** Величина прокрутки за один клик по кнопке. */
const SCROLL_STEP = 200;

/** Контент помещается в ленту целиком, поэтому компонент передаёт hidden и кнопки не рендерятся. */
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

export const WithShortContent = () => (
    <CarouselExtended
        style={{ display: "flex", alignItems: "center", width: "480px" }}
        buttonPrev={renderPrevButton}
        buttonNext={renderNextButton}
        stepPrev={SCROLL_STEP}
        stepNext={SCROLL_STEP}
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
);
