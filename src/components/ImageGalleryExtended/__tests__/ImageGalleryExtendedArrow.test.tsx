import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { ImageGalleryExtendedArrow } from "../components/ImageGalleryExtendedArrow";
import { EImageGalleryArrowDirection } from "../enums";

describe("ImageGalleryExtendedArrow", () => {
    it("PREV рендерит стрелку с классом prev", () => {
        render(<ImageGalleryExtendedArrow direction={EImageGalleryArrowDirection.PREV} aria-label="Назад" />);

        const button = screen.getByRole("button", { name: "Назад" });
        expect(button).toHaveClass("arrow", "prev");
        expect(button).not.toHaveClass("next");
    });

    it("NEXT рендерит стрелку с классом next", () => {
        render(<ImageGalleryExtendedArrow direction={EImageGalleryArrowDirection.NEXT} aria-label="Вперёд" />);

        const button = screen.getByRole("button", { name: "Вперёд" });
        expect(button).toHaveClass("arrow", "next");
        expect(button).not.toHaveClass("prev");
    });

    it("прокидывает aria-label на кнопку", () => {
        render(
            <ImageGalleryExtendedArrow
                direction={EImageGalleryArrowDirection.NEXT}
                aria-label="Следующее изображение"
            />,
        );

        expect(screen.getByRole("button", { name: "Следующее изображение" })).toBeInTheDocument();
    });

    it("disabled блокирует onClick", () => {
        const onClick = vi.fn();
        render(
            <ImageGalleryExtendedArrow
                direction={EImageGalleryArrowDirection.NEXT}
                aria-label="Вперёд"
                disabled
                onClick={onClick}
            />,
        );

        const button = screen.getByRole("button", { name: "Вперёд" });
        expect(button).toBeDisabled();
        fireEvent.click(button);
        expect(onClick).not.toHaveBeenCalled();
    });

    it("onClick вызывается по клику", () => {
        const onClick = vi.fn();
        render(
            <ImageGalleryExtendedArrow
                direction={EImageGalleryArrowDirection.PREV}
                aria-label="Назад"
                onClick={onClick}
            />,
        );

        fireEvent.click(screen.getByRole("button", { name: "Назад" }));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("type кнопки — button (не отправляет форму)", () => {
        render(<ImageGalleryExtendedArrow direction={EImageGalleryArrowDirection.NEXT} aria-label="Вперёд" />);

        expect(screen.getByRole("button", { name: "Вперёд" })).toHaveAttribute("type", "button");
    });

    it("мерджит кастомный className в корневую кнопку", () => {
        render(
            <ImageGalleryExtendedArrow
                direction={EImageGalleryArrowDirection.NEXT}
                aria-label="Вперёд"
                className="custom-arrow"
            />,
        );

        expect(screen.getByRole("button", { name: "Вперёд" })).toHaveClass("arrow", "custom-arrow");
    });

    it("пробрасывает ref на корневой <button>", () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <ImageGalleryExtendedArrow ref={ref} direction={EImageGalleryArrowDirection.NEXT} aria-label="Вперёд" />,
        );

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
});
