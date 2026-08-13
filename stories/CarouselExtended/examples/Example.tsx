import React, { useState } from "react";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import {
    ButtonIcon,
    CarouselExtended,
    EComponentSize,
    ICarouselExtendedButtonProvideProps,
    Tag,
} from "@sberbusiness/triplex-next";

const INITIAL_FILTERS = [
    { id: "period", label: "Период: 01.01.2026 — 31.03.2026" },
    { id: "account", label: "Счёт: 40702810000000000001" },
    { id: "counterparty", label: "Контрагент: ООО «Ромашка»" },
    { id: "amount", label: "Сумма: от 10 000 ₽" },
    { id: "status", label: "Статус: исполнено" },
    { id: "currency", label: "Валюта: RUB" },
];

/** Величина прокрутки за один клик по кнопке. */
const SCROLL_STEP = 200;

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

export const Example = () => {
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    const handleRemove = (id: string) => setFilters((prevFilters) => prevFilters.filter((filter) => filter.id !== id));

    return (
        <CarouselExtended
            style={{ display: "flex", alignItems: "center", width: "480px" }}
            buttonPrev={renderPrevButton}
            buttonNext={renderNextButton}
            stepPrev={SCROLL_STEP}
            stepNext={SCROLL_STEP}
        >
            {filters.map(({ id, label }) => (
                <Tag
                    key={id}
                    id={id}
                    size={EComponentSize.MD}
                    style={{ flex: "0 0 auto", marginRight: "8px" }}
                    onRemove={handleRemove}
                >
                    {label}
                </Tag>
            ))}
        </CarouselExtended>
    );
};
