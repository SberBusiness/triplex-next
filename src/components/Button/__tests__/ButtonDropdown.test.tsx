import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ButtonDropdown } from "../ButtonDropdown";
import { EButtonDotsTheme, EButtonTheme } from "../enums";
import { EComponentSize } from "../../../enums/EComponentSize";

const options = [
    { id: "opt-1", label: "Option 1" },
    { id: "opt-2", label: "Option 2" },
];

/** Корневой контейнер компонента (div из ButtonDropdownExtended). */
const getRoot = (container: HTMLElement) => container.querySelector(".buttonDropdown");

/** Каретка отрисовывается только у не-dots тем. */
const getCaret = () => screen.getByRole("button").querySelector(".caretIcon");

/** Темы, у которых триггер отрисовывает каретку. */
type TCaretTheme = EButtonTheme.GENERAL | EButtonTheme.SECONDARY | EButtonTheme.SECONDARY_LIGHT | EButtonTheme.DANGER;

/**
 * Класс палитры на path каретки. Иконки кодируют paletteIndex хешированным классом,
 * поэтому сравниваем палитры тем между собой, а не с конкретным именем класса.
 */
const getCaretPaletteClassName = () => getCaret()?.querySelector("path")?.getAttribute("class");

describe("ButtonDropdown", () => {
    it("renders options when opened", () => {
        render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
                Actions
            </ButtonDropdown>,
        );
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByText("Option 1")).toBeInTheDocument();
        expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("passes dropdownAttributes to the dropdown element", () => {
        render(
            <ButtonDropdown
                theme={EButtonTheme.GENERAL}
                size={EComponentSize.MD}
                options={options}
                dropdownAttributes={{
                    id: "button-dropdown-menu",
                    className: "custom-dropdown",
                    style: { zIndex: 1500 },
                    "data-testid": "dropdown-menu",
                }}
            >
                Actions
            </ButtonDropdown>,
        );
        fireEvent.click(screen.getByRole("button"));

        const dropdown = document.getElementById("button-dropdown-menu");
        expect(dropdown).not.toBeNull();
        expect(dropdown).toHaveClass("custom-dropdown");
        expect(dropdown).toHaveStyle("z-index: 1500");
        expect(dropdown).toHaveAttribute("data-testid", "dropdown-menu");
    });

    it("renders trigger content and caret", () => {
        render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
                Actions
            </ButtonDropdown>,
        );

        expect(screen.getByRole("button")).toHaveTextContent("Actions");
        expect(getCaret()).toBeInTheDocument();
    });

    it("forwards ref to the trigger button", () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options} ref={ref}>
                Actions
            </ButtonDropdown>,
        );

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(ref.current).toBe(screen.getByRole("button"));
    });

    it("merges className into the root element", () => {
        const { container } = render(
            <ButtonDropdown
                theme={EButtonTheme.GENERAL}
                size={EComponentSize.MD}
                options={options}
                className="custom-root"
            >
                Actions
            </ButtonDropdown>,
        );

        expect(getRoot(container)).toHaveClass("custom-root");
    });

    it("spreads rest props onto the root element", () => {
        const { container } = render(
            <ButtonDropdown
                theme={EButtonTheme.GENERAL}
                size={EComponentSize.MD}
                options={options}
                id="custom-root-id"
                data-testid="button-dropdown-root"
            >
                Actions
            </ButtonDropdown>,
        );

        const root = getRoot(container);
        expect(root).toHaveAttribute("id", "custom-root-id");
        expect(root).toHaveAttribute("data-testid", "button-dropdown-root");
    });

    it("applies block class to the root element and to the trigger", () => {
        const { container } = render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options} block>
                Actions
            </ButtonDropdown>,
        );

        expect(getRoot(container)).toHaveClass("block");
        expect(screen.getByRole("button")).toHaveClass("block");
    });

    it.each([
        [EButtonTheme.GENERAL, "general"],
        [EButtonTheme.SECONDARY, "secondary"],
        [EButtonTheme.SECONDARY_LIGHT, "secondaryLight"],
        [EButtonTheme.DANGER, "danger"],
    ] as const)("applies button theme class for theme %s", (theme, expectedClassName) => {
        render(
            <ButtonDropdown theme={theme} size={EComponentSize.MD} options={options}>
                Actions
            </ButtonDropdown>,
        );

        expect(screen.getByRole("button")).toHaveClass(expectedClassName);
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("applies size class for size %s", (size, expectedClassName) => {
        render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={size} options={options}>
                Actions
            </ButtonDropdown>,
        );

        expect(screen.getByRole("button")).toHaveClass(expectedClassName);
    });

    it.each([
        [EButtonDotsTheme.DOTS_SECONDARY, "secondary"],
        [EButtonDotsTheme.DOTS_SECONDARY_LIGHT, "secondaryLight"],
    ])("renders dots trigger without caret for theme %s", (theme, expectedClassName) => {
        render(
            <ButtonDropdown theme={theme} size={EComponentSize.MD} options={options}>
                Actions
            </ButtonDropdown>,
        );

        const button = screen.getByRole("button");
        expect(button).toHaveClass("dots", expectedClassName);
        expect(button).not.toHaveTextContent("Actions");
        expect(getCaret()).toBeNull();
    });

    it.each([
        [EComponentSize.SM, "DotshorizontalStrokeSrvIcon20"],
        [EComponentSize.MD, "DotshorizontalStrokeSrvIcon24"],
        [EComponentSize.LG, "DotshorizontalStrokeSrvIcon32"],
    ])("renders dots icon matching size %s", (size, expectedIconName) => {
        render(
            <ButtonDropdown theme={EButtonDotsTheme.DOTS_SECONDARY} size={size} options={options}>
                Actions
            </ButtonDropdown>,
        );

        expect(screen.getByRole("button").querySelector("svg")).toHaveAttribute("name", expectedIconName);
    });

    it("applies active class to the trigger while dropdown is opened", () => {
        render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
                Actions
            </ButtonDropdown>,
        );

        const button = screen.getByRole("button");
        expect(button).not.toHaveClass("active");

        fireEvent.click(button);
        expect(button).toHaveClass("active");

        fireEvent.click(button);
        expect(button).not.toHaveClass("active");
    });

    it("does not apply active class to the dots trigger while dropdown is opened", () => {
        render(
            <ButtonDropdown theme={EButtonDotsTheme.DOTS_SECONDARY} size={EComponentSize.MD} options={options}>
                Actions
            </ButtonDropdown>,
        );

        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByRole("button")).not.toHaveClass("active");
    });

    it("renders caret with a light palette on filled themes and a dark one on light themes", () => {
        const getCaretPaletteByTheme = (theme: TCaretTheme) => {
            const { unmount } = render(
                <ButtonDropdown theme={theme} size={EComponentSize.MD} options={options}>
                    Actions
                </ButtonDropdown>,
            );
            const paletteClassName = getCaretPaletteClassName();

            unmount();

            return paletteClassName;
        };

        const general = getCaretPaletteByTheme(EButtonTheme.GENERAL);
        const danger = getCaretPaletteByTheme(EButtonTheme.DANGER);
        const secondary = getCaretPaletteByTheme(EButtonTheme.SECONDARY);
        const secondaryLight = getCaretPaletteByTheme(EButtonTheme.SECONDARY_LIGHT);

        expect(general).toBeTruthy();
        expect(secondary).toBeTruthy();
        expect(danger).toBe(general);
        expect(secondaryLight).toBe(secondary);
        expect(general).not.toBe(secondary);
    });

    it("sets aria attributes on the trigger and links it with the list", () => {
        render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
                Actions
            </ButtonDropdown>,
        );

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("aria-haspopup", "menu");
        expect(button).toHaveAttribute("aria-expanded", "false");

        fireEvent.click(button);

        expect(button).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByRole("listbox")).toHaveAttribute("id", button.getAttribute("aria-controls"));
    });

    it("applies buttonAttributes to the trigger", () => {
        render(
            <ButtonDropdown
                theme={EButtonTheme.GENERAL}
                size={EComponentSize.MD}
                options={options}
                buttonAttributes={{ "aria-label": "More actions", type: "submit" }}
            >
                Actions
            </ButtonDropdown>,
        );

        const button = screen.getByRole("button", { name: "More actions" });
        expect(button).toHaveAttribute("type", "submit");
    });

    it("toggles dropdown on trigger click", () => {
        render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
                Actions
            </ButtonDropdown>,
        );

        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(screen.getByRole("listbox")).toBeInTheDocument();

        fireEvent.click(button);
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it.each(["ArrowDown", "ArrowUp"])("opens dropdown on %s and prevents default scrolling", (key) => {
        render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
                Actions
            </ButtonDropdown>,
        );

        const button = screen.getByRole("button");
        const prevented = !fireEvent.keyDown(button, { code: key });

        expect(prevented).toBe(true);
        expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("toggles dropdown on Space and prevents default click activation", () => {
        render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
                Actions
            </ButtonDropdown>,
        );

        const button = screen.getByRole("button");
        const prevented = !fireEvent.keyDown(button, { code: "Space" });

        expect(prevented).toBe(true);
        expect(screen.getByRole("listbox")).toBeInTheDocument();

        fireEvent.keyDown(button, { code: "Space" });
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("keeps dropdown opened on repeated ArrowDown", () => {
        render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
                Actions
            </ButtonDropdown>,
        );

        const button = screen.getByRole("button");
        fireEvent.keyDown(button, { code: "ArrowDown" });
        fireEvent.keyDown(button, { code: "ArrowDown" });

        expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("does not leak option label into DOM attributes", () => {
        render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
                Actions
            </ButtonDropdown>,
        );

        fireEvent.click(screen.getByRole("button"));
        screen.getAllByRole("option").forEach((option) => expect(option).not.toHaveAttribute("label"));
    });

    it("renders dropdown opened in controlled mode via opened prop", () => {
        render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options} opened>
                Actions
            </ButtonDropdown>,
        );

        expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("closes dropdown on Escape", () => {
        render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
                Actions
            </ButtonDropdown>,
        );

        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByRole("listbox")).toBeInTheDocument();

        fireEvent.keyDown(document, { code: "Escape" });

        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("does not open dropdown when disabled", () => {
        render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options} disabled>
                Actions
            </ButtonDropdown>,
        );

        const button = screen.getByRole("button");
        expect(button).toBeDisabled();

        fireEvent.click(button);

        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("calls option onSelect and closes dropdown on option click", () => {
        const onSelect = vi.fn();
        render(
            <ButtonDropdown
                theme={EButtonTheme.GENERAL}
                size={EComponentSize.MD}
                options={[options[0], { ...options[1], onSelect }]}
            >
                Actions
            </ButtonDropdown>,
        );

        fireEvent.click(screen.getByRole("button"));
        fireEvent.click(screen.getByText("Option 2"));

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith();
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("marks selected option with aria-selected", () => {
        render(
            <ButtonDropdown
                theme={EButtonTheme.GENERAL}
                size={EComponentSize.MD}
                options={options}
                selected={options[1]}
            >
                Actions
            </ButtonDropdown>,
        );

        fireEvent.click(screen.getByRole("button"));

        const [first, second] = screen.getAllByRole("option");
        expect(first).toHaveAttribute("aria-selected", "false");
        expect(second).toHaveAttribute("aria-selected", "true");
    });
});
