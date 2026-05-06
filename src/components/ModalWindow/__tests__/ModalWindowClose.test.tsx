import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { ModalWindowClose } from "../components/ModalWindowClose";

afterEach(() => {
    cleanup();
});

describe("ModalWindowClose", () => {
    it("renders a button element", () => {
        render(<ModalWindowClose onClick={() => {}} />);

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("calls onClick when the button is clicked", () => {
        const onClick = vi.fn();

        render(<ModalWindowClose onClick={onClick} />);

        fireEvent.click(screen.getByRole("button"));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("uses default title 'Закрыть' that can be overridden via props", () => {
        const { rerender } = render(<ModalWindowClose onClick={() => {}} />);
        expect(screen.getByRole("button")).toHaveAttribute("title", "Закрыть");

        rerender(<ModalWindowClose onClick={() => {}} title="Custom title" />);
        expect(screen.getByRole("button")).toHaveAttribute("title", "Custom title");
    });

    it("triggers Escape-listener via TriggerClickOnKeyDownEvent", () => {
        // ModalWindowClose оборачивает Button в TriggerClickOnKeyDownEvent
        // с EVENT_KEY_CODES.ESCAPE — нажатие Escape должно эмулировать
        // программный клик на ref'е кнопки. В jsdom для проверки
        // достаточно убедиться, что click() на кнопке зовёт onClick:
        // проверим, что keyCode 27 на window не падает и при наличии
        // offsetParent триггерит handler. Подменим offsetParent через
        // Object.defineProperty, чтобы обойти jsdom-ограничение.
        const onClick = vi.fn();

        render(<ModalWindowClose onClick={onClick} />);

        const button = screen.getByRole("button");
        Object.defineProperty(button, "offsetParent", {
            configurable: true,
            get: () => document.body,
        });

        fireEvent.keyDown(window, { keyCode: 27 });
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
