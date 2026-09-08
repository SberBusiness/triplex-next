import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HelpBox } from "../HelpBox";
import { ETooltipSize, ETooltipPreferPlace } from "../../Tooltip/enums";

vi.mock("focus-trap-react", () => {
    const FocusTrap = ({
        active,
        children,
        focusTrapOptions,
    }: {
        active?: boolean;
        children?: React.ReactNode;
        focusTrapOptions?: { clickOutsideDeactivates?: boolean; initialFocus?: string; preventScroll?: boolean };
    }) => (
        <div
            data-testid="focus-trap"
            data-active={String(active)}
            data-initial-focus={String(focusTrapOptions?.initialFocus)}
            data-prevent-scroll={String(focusTrapOptions?.preventScroll)}
            data-click-outside-deactivates={String(focusTrapOptions?.clickOutsideDeactivates)}
        >
            {children}
        </div>
    );
    return { FocusTrap, default: FocusTrap };
});

vi.mock("@sberbusiness/icons-next", () => ({
    QuestioncircleFilledSrvIcon16: ({ paletteIndex }: { paletteIndex?: number }) => (
        <div data-testid="question-icon" data-palette-index={paletteIndex}>
            Question Icon
        </div>
    ),
    CrossStrokeSrvIcon16: ({ paletteIndex }: { paletteIndex?: number }) => (
        <div data-testid="cross-icon" data-palette-index={paletteIndex}>
            Cross Icon
        </div>
    ),
}));

describe("HelpBox", () => {
    it("renders target button with aria-label passed via rest props", () => {
        render(
            <HelpBox tooltipSize={ETooltipSize.LG} preferPlace={ETooltipPreferPlace.BELOW} aria-label="Подсказка">
                Текст подсказки
            </HelpBox>,
        );

        const button = screen.getByRole("button", { name: "Подсказка" });
        expect(button).toBeInTheDocument();
    });

    it("renders tooltip content when open", () => {
        render(
            <HelpBox tooltipSize={ETooltipSize.SM} isOpen>
                Видимый контент тултипа
            </HelpBox>,
        );

        expect(screen.getByText("Видимый контент тултипа")).toBeInTheDocument();
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("applies aria and data attributes to tooltip container", () => {
        render(
            <HelpBox
                tooltipSize={ETooltipSize.LG}
                isOpen
                tooltipAriaAttributes={{ label: "Custom" }}
                tooltipDataAttributes={{ testid: "hb" }}
            >
                Контент
            </HelpBox>,
        );

        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveAttribute("aria-label", "Custom");
        expect(dialog).toHaveAttribute("data-testid", "hb");
    });

    it("calls toggle(false) when close button is pressed in controlled mode", () => {
        const handleToggle = vi.fn();
        render(
            <HelpBox
                tooltipSize={ETooltipSize.LG}
                isOpen
                toggle={handleToggle}
                tooltipXButtonProps={{ "aria-label": "Закрыть" }}
            >
                Контент
            </HelpBox>,
        );

        const close = screen.getByRole("button", { name: "Закрыть" });
        fireEvent.click(close);
        expect(handleToggle).toHaveBeenCalledWith(false);
    });

    it("passes tooltipXButtonProps to close button", () => {
        render(
            <HelpBox tooltipSize={ETooltipSize.LG} isOpen tooltipXButtonProps={{ "aria-label": "Close" }}>
                Контент
            </HelpBox>,
        );

        expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    });

    it("forwards ref to button element", () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <HelpBox tooltipSize={ETooltipSize.LG} ref={ref} aria-label="Подсказка">
                Контент
            </HelpBox>,
        );

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(ref.current).toBe(screen.getByRole("button", { name: "Подсказка" }));
    });

    it("forwards callback ref to button element", () => {
        const setRef = vi.fn();
        render(
            <HelpBox tooltipSize={ETooltipSize.LG} ref={setRef} aria-label="Подсказка">
                Контент
            </HelpBox>,
        );

        expect(setRef).toHaveBeenCalledWith(screen.getByRole("button", { name: "Подсказка" }));
    });

    it("does not reattach a stable callback ref on rerender", () => {
        const setRef = vi.fn();
        const { rerender } = render(
            <HelpBox tooltipSize={ETooltipSize.LG} ref={setRef} aria-label="Подсказка">
                Контент
            </HelpBox>,
        );

        setRef.mockClear();

        rerender(
            <HelpBox tooltipSize={ETooltipSize.LG} ref={setRef} aria-label="Подсказка">
                Другой контент
            </HelpBox>,
        );

        expect(setRef).not.toHaveBeenCalled();
    });

    it("passes className to target button", () => {
        render(
            <HelpBox tooltipSize={ETooltipSize.LG} className="custom-class" aria-label="Подсказка">
                Контент
            </HelpBox>,
        );

        const button = screen.getByRole("button", { name: "Подсказка" });
        expect(button).toHaveClass("custom-class");
    });

    describe("tooltipSize", () => {
        it.each([
            [ETooltipSize.SM, "tooltipSM"],
            [ETooltipSize.LG, "tooltipLG"],
        ])("applies size class for %s", (size, expectedClass) => {
            render(
                <HelpBox tooltipSize={size} isOpen>
                    Контент
                </HelpBox>,
            );

            expect(screen.getByRole("dialog")).toHaveClass(expectedClass);
        });
    });

    describe("icon", () => {
        it("renders question icon with default paletteIndex", () => {
            render(
                <HelpBox tooltipSize={ETooltipSize.LG} aria-label="Подсказка">
                    Контент
                </HelpBox>,
            );

            expect(screen.getByTestId("question-icon")).toHaveAttribute("data-palette-index", "5");
        });

        it("overrides icon props via iconProps", () => {
            render(
                <HelpBox tooltipSize={ETooltipSize.LG} iconProps={{ paletteIndex: 2 }} aria-label="Подсказка">
                    Контент
                </HelpBox>,
            );

            expect(screen.getByTestId("question-icon")).toHaveAttribute("data-palette-index", "2");
        });
    });

    describe("uncontrolled mode", () => {
        it("opens tooltip on target click and reports it through toggle", () => {
            const handleToggle = vi.fn();
            render(
                <HelpBox tooltipSize={ETooltipSize.LG} toggle={handleToggle} aria-label="Подсказка">
                    Контент подсказки
                </HelpBox>,
            );

            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

            fireEvent.click(screen.getByRole("button", { name: "Подсказка" }));

            expect(handleToggle).toHaveBeenCalledWith(true);
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });

        it("closes tooltip on the close button click", () => {
            const handleToggle = vi.fn();
            render(
                <HelpBox
                    tooltipSize={ETooltipSize.LG}
                    toggle={handleToggle}
                    tooltipXButtonProps={{ "aria-label": "Закрыть" }}
                    aria-label="Подсказка"
                >
                    Контент подсказки
                </HelpBox>,
            );

            fireEvent.click(screen.getByRole("button", { name: "Подсказка" }));
            fireEvent.click(screen.getByRole("button", { name: "Закрыть" }));

            expect(handleToggle).toHaveBeenLastCalledWith(false);
            expect(screen.queryByTestId("focus-trap")).not.toBeInTheDocument();
        });
    });

    describe("controlled mode", () => {
        it("does not open tooltip by itself when isOpen is false", () => {
            const handleToggle = vi.fn();
            render(
                <HelpBox tooltipSize={ETooltipSize.LG} isOpen={false} toggle={handleToggle} aria-label="Подсказка">
                    Контент подсказки
                </HelpBox>,
            );

            fireEvent.click(screen.getByRole("button", { name: "Подсказка" }));

            expect(handleToggle).toHaveBeenCalledWith(true);
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        });
    });

    describe("onShow", () => {
        it("calls onShow with the tooltip node when tooltip appears", () => {
            const handleShow = vi.fn();
            render(
                <HelpBox tooltipSize={ETooltipSize.LG} isOpen onShow={handleShow} aria-label="Подсказка">
                    Контент
                </HelpBox>,
            );

            expect(handleShow).toHaveBeenCalledTimes(1);
            expect(handleShow).toHaveBeenCalledWith(screen.getByRole("dialog"));
        });

        it("does not call onShow while tooltip is closed", () => {
            const handleShow = vi.fn();
            render(
                <HelpBox tooltipSize={ETooltipSize.LG} onShow={handleShow} aria-label="Подсказка">
                    Контент
                </HelpBox>,
            );

            expect(handleShow).not.toHaveBeenCalled();
        });
    });

    describe("focus trap", () => {
        it("is not rendered while tooltip is closed", () => {
            render(
                <HelpBox tooltipSize={ETooltipSize.LG} aria-label="Подсказка">
                    Контент
                </HelpBox>,
            );

            expect(screen.queryByTestId("focus-trap")).not.toBeInTheDocument();
        });

        it("is activated with default options and targets the tooltip by generated id", () => {
            render(
                <HelpBox tooltipSize={ETooltipSize.LG} isOpen aria-label="Подсказка">
                    Контент
                </HelpBox>,
            );

            const dialog = screen.getByRole("dialog");
            const focusTrap = screen.getByTestId("focus-trap");

            expect(dialog.id).not.toBe("");
            expect(focusTrap).toHaveAttribute("data-active", "true");
            expect(focusTrap).toHaveAttribute("data-initial-focus", `[id='${dialog.id}']`);
            expect(focusTrap).toHaveAttribute("data-prevent-scroll", "true");
            expect(focusTrap).toHaveAttribute("data-click-outside-deactivates", "true");
        });

        it("merges consumer focusTrapOptions over defaults", () => {
            render(
                <HelpBox
                    tooltipSize={ETooltipSize.LG}
                    isOpen
                    focusTrapProps={{ focusTrapOptions: { preventScroll: false }, children: <div /> }}
                    aria-label="Подсказка"
                >
                    Контент
                </HelpBox>,
            );

            const focusTrap = screen.getByTestId("focus-trap");

            expect(focusTrap).toHaveAttribute("data-prevent-scroll", "false");
            expect(focusTrap).toHaveAttribute("data-click-outside-deactivates", "true");
        });
    });

    it("generates unique tooltip id for every instance", () => {
        render(
            <>
                <HelpBox tooltipSize={ETooltipSize.LG} isOpen aria-label="Первая">
                    Первый контент
                </HelpBox>
                <HelpBox tooltipSize={ETooltipSize.LG} isOpen aria-label="Вторая">
                    Второй контент
                </HelpBox>
            </>,
        );

        const [first, second] = screen.getAllByRole("dialog");

        expect(first.id).not.toBe("");
        expect(second.id).not.toBe("");
        expect(first.id).not.toBe(second.id);
    });
});
