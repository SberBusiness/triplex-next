import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Chip } from "@sberbusiness/triplex-next/components/Chip/Chip";
import { EChipType } from "@sberbusiness/triplex-next/components/Chip/enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

describe("Chip", () => {
    test("renders content and role button", () => {
        render(<Chip>Label</Chip>);
        const chip = screen.getByRole("button");
        expect(chip).toBeInTheDocument();
        expect(chip).toHaveTextContent("Label");
        expect(chip).toHaveAttribute("tabindex", "0");
    });

    test("disabled chip has tabIndex -1", () => {
        render(<Chip disabled>Disabled</Chip>);
        const chip = screen.getByRole("button");
        expect(chip).toHaveAttribute("tabindex", "-1");
    });

    test("renders prefix and postfix content when provided", () => {
        render(
            <Chip prefix={<span data-testid="prefix">P</span>} postfix={<span data-testid="postfix">S</span>}>
                Content
            </Chip>,
        );
        expect(screen.getByTestId("prefix")).toBeInTheDocument();
        expect(screen.getByTestId("postfix")).toBeInTheDocument();
    });

    test("renders notification icon when showNotificationIcon is true", () => {
        const { container } = render(<Chip showNotificationIcon>Label</Chip>);
        expect(container.querySelector(".badgeDot")).toBeInTheDocument();
    });

    test("does not render notification icon by default", () => {
        const { container } = render(<Chip>Label</Chip>);
        expect(container.querySelector(".badgeDot")).not.toBeInTheDocument();
    });

    describe("class names", () => {
        test("applies base class names by default", () => {
            render(<Chip>Label</Chip>);
            const chip = screen.getByRole("button");
            expect(chip).toHaveClass("chip", "chipGroupItem");
            expect(chip).not.toHaveClass("disabled");
            expect(chip).not.toHaveClass("selected");
            expect(chip).not.toHaveClass("withPrefix");
            expect(chip).not.toHaveClass("withPostfix");
        });

        test.each([
            [EChipType.TYPE_1, "type1"],
            [EChipType.TYPE_2, "type2"],
        ])("applies class for type %s", (type, expectedClassName) => {
            render(<Chip type={type}>Label</Chip>);
            expect(screen.getByRole("button")).toHaveClass(expectedClassName);
        });

        test("applies type1 class by default", () => {
            render(<Chip>Label</Chip>);
            expect(screen.getByRole("button")).toHaveClass("type1");
        });

        test.each([
            [EComponentSize.SM, "sm"],
            [EComponentSize.MD, "md"],
            [EComponentSize.LG, "lg"],
        ])("applies class for size %s", (size, expectedClassName) => {
            render(<Chip size={size}>Label</Chip>);
            expect(screen.getByRole("button")).toHaveClass(expectedClassName);
        });

        test("applies md class by default", () => {
            render(<Chip>Label</Chip>);
            expect(screen.getByRole("button")).toHaveClass("md");
        });

        test("applies disabled and selected classes", () => {
            render(
                <Chip disabled selected>
                    Label
                </Chip>,
            );
            expect(screen.getByRole("button")).toHaveClass("disabled", "selected");
        });

        test("applies withPrefix and withPostfix classes when prefix and postfix are provided", () => {
            render(
                <Chip prefix={<span />} postfix={<span />}>
                    Label
                </Chip>,
            );
            expect(screen.getByRole("button")).toHaveClass("withPrefix", "withPostfix");
        });

        test("merges custom className into root element", () => {
            render(<Chip className="custom-class">Label</Chip>);
            const chip = screen.getByRole("button");
            expect(chip).toHaveClass("custom-class");
            expect(chip).toHaveClass("chip");
        });
    });

    describe("keyboard handling", () => {
        test("prevents default on Space to avoid page scrolling", () => {
            const onKeyDown = vi.fn();
            render(<Chip onKeyDown={onKeyDown}>Label</Chip>);

            const notPrevented = fireEvent.keyDown(screen.getByRole("button"), { code: "Space", key: " " });

            expect(notPrevented).toBe(false);
            expect(onKeyDown).toHaveBeenCalledTimes(1);
            expect(onKeyDown.mock.calls[0][0]).toMatchObject({ code: "Space", defaultPrevented: true });
        });

        test("does not prevent default on other keys", () => {
            const onKeyDown = vi.fn();
            render(<Chip onKeyDown={onKeyDown}>Label</Chip>);

            const notPrevented = fireEvent.keyDown(screen.getByRole("button"), { code: "Enter", key: "Enter" });

            expect(notPrevented).toBe(true);
            expect(onKeyDown).toHaveBeenCalledTimes(1);
            expect(onKeyDown.mock.calls[0][0]).toMatchObject({ code: "Enter", defaultPrevented: false });
        });

        test("works without external onKeyDown", () => {
            render(<Chip>Label</Chip>);

            expect(() => fireEvent.keyDown(screen.getByRole("button"), { code: "Space", key: " " })).not.toThrow();
        });
    });

    test("calls onClick handler", () => {
        const onClick = vi.fn();
        render(<Chip onClick={onClick}>Label</Chip>);

        fireEvent.click(screen.getByRole("button"));

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick.mock.calls[0][0]).toMatchObject({ type: "click" });
    });

    test("forwards ref to root span element", () => {
        const ref = React.createRef<HTMLSpanElement>();
        render(<Chip ref={ref}>Label</Chip>);

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toHaveClass("chip");
    });

    test("passes rest props to root element", () => {
        render(
            <Chip id="chip-id" data-testid="chip" aria-expanded>
                Label
            </Chip>,
        );

        const chip = screen.getByTestId("chip");
        expect(chip).toHaveAttribute("id", "chip-id");
        expect(chip).toHaveAttribute("aria-expanded", "true");
    });
});
