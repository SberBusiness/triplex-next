import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Spoiler } from "../Spoiler";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

const getSpoiler = () => screen.getByTestId("spoiler");
const getToggleButton = () => screen.getByRole("button");
const getContent = () => screen.getByText("Content");

describe("Spoiler", () => {
    it("Should render with default props", () => {
        render(
            <Spoiler labelExpand="Развернуть" data-testid="spoiler">
                Content
            </Spoiler>,
        );
        const spoiler = getSpoiler();
        const button = getToggleButton();

        expect(spoiler).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Развернуть");
        expect(spoiler).toHaveClass("spoiler");
        expect(spoiler).toHaveClass("md");
    });

    it("Should apply size classes correctly", () => {
        const { rerender } = render(
            <Spoiler labelExpand="Развернуть" size={EComponentSize.SM} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        let spoiler = getSpoiler();
        expect(spoiler).toHaveClass("sm");

        rerender(
            <Spoiler labelExpand="Развернуть" size={EComponentSize.MD} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        spoiler = getSpoiler();
        expect(spoiler).toHaveClass("md");

        rerender(
            <Spoiler labelExpand="Развернуть" size={EComponentSize.LG} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        spoiler = getSpoiler();
        expect(spoiler).toHaveClass("lg");
    });

    it("Should apply opened class when expanded", () => {
        render(
            <Spoiler labelExpand="Развернуть" expanded={true} toggle={vi.fn()} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        const spoiler = getSpoiler();
        expect(spoiler).toHaveClass("opened");
    });

    it("Should show labelCollapse when expanded", () => {
        render(
            <Spoiler
                labelExpand="Развернуть"
                labelCollapse="Свернуть"
                expanded={true}
                toggle={vi.fn()}
                data-testid="spoiler"
            >
                Content
            </Spoiler>,
        );
        const button = getToggleButton();
        expect(button).toHaveTextContent("Свернуть");
    });

    it("Should call onToggle callback", () => {
        const onToggle = vi.fn();
        render(
            <Spoiler labelExpand="Развернуть" onToggle={onToggle} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        const button = getToggleButton();

        fireEvent.click(button);
        expect(onToggle).toHaveBeenCalledTimes(1);
        expect(onToggle).toHaveBeenCalledWith(true);
    });

    it("Should forward ref to root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <Spoiler labelExpand="Развернуть" ref={ref} data-testid="spoiler">
                Content
            </Spoiler>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getSpoiler());
    });

    it("Should merge className with own classes on root element", () => {
        render(
            <Spoiler labelExpand="Развернуть" className="custom" data-testid="spoiler">
                Content
            </Spoiler>,
        );
        const spoiler = getSpoiler();

        expect(spoiler).toHaveClass("custom");
        expect(spoiler).toHaveClass("spoiler");
        expect(spoiler).toHaveClass("md");
    });

    it("Should spread rest html attributes to root element", () => {
        render(
            <Spoiler labelExpand="Развернуть" title="Подсказка" lang="ru" data-testid="spoiler">
                Content
            </Spoiler>,
        );
        const spoiler = getSpoiler();

        expect(spoiler).toHaveAttribute("title", "Подсказка");
        expect(spoiler).toHaveAttribute("lang", "ru");
    });

    it("Should hide content while collapsed and show it while expanded", () => {
        const { rerender } = render(
            <Spoiler labelExpand="Развернуть" expanded={false} toggle={vi.fn()} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        expect(getContent()).toHaveClass("hidden");

        rerender(
            <Spoiler labelExpand="Развернуть" expanded={true} toggle={vi.fn()} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        expect(getContent()).not.toHaveClass("hidden");
    });

    it("Should link toggle button to content via aria-controls", () => {
        render(
            <Spoiler labelExpand="Развернуть" data-testid="spoiler">
                Content
            </Spoiler>,
        );

        const contentId = getContent().getAttribute("id");

        expect(contentId).toBeTruthy();
        expect(getToggleButton()).toHaveAttribute("aria-controls", String(contentId));
    });

    it("Should generate unique content id per instance", () => {
        render(
            <>
                <Spoiler labelExpand="Развернуть">First</Spoiler>
                <Spoiler labelExpand="Развернуть">Second</Spoiler>
            </>,
        );

        const [firstButton, secondButton] = screen.getAllByRole("button");

        expect(screen.getByText("First")).toHaveAttribute("id", firstButton.getAttribute("aria-controls"));
        expect(screen.getByText("Second")).toHaveAttribute("id", secondButton.getAttribute("aria-controls"));
        expect(firstButton.getAttribute("aria-controls")).not.toBe(secondButton.getAttribute("aria-controls"));
    });

    it("Should reflect controlled expanded state in aria-expanded", () => {
        const { rerender } = render(
            <Spoiler labelExpand="Развернуть" expanded={false} toggle={vi.fn()} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        expect(getToggleButton()).toHaveAttribute("aria-expanded", "false");

        rerender(
            <Spoiler labelExpand="Развернуть" expanded={true} toggle={vi.fn()} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        expect(getToggleButton()).toHaveAttribute("aria-expanded", "true");
    });

    it("Should toggle own state in uncontrolled mode", () => {
        render(
            <Spoiler labelExpand="Развернуть" labelCollapse="Свернуть" data-testid="spoiler">
                Content
            </Spoiler>,
        );
        const button = getToggleButton();

        expect(getSpoiler()).not.toHaveClass("opened");
        expect(getContent()).toHaveClass("hidden");

        fireEvent.click(button);

        expect(getSpoiler()).toHaveClass("opened");
        expect(getContent()).not.toHaveClass("hidden");
        expect(button).toHaveAttribute("aria-expanded", "true");
        expect(button).toHaveTextContent("Свернуть");

        fireEvent.click(button);

        expect(getSpoiler()).not.toHaveClass("opened");
        expect(getContent()).toHaveClass("hidden");
        expect(button).toHaveAttribute("aria-expanded", "false");
        expect(button).toHaveTextContent("Развернуть");
    });

    it("Should call onToggle with next state on every click in uncontrolled mode", () => {
        const onToggle = vi.fn();
        render(
            <Spoiler labelExpand="Развернуть" labelCollapse="Свернуть" onToggle={onToggle} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        const button = getToggleButton();

        fireEvent.click(button);
        fireEvent.click(button);

        expect(onToggle).toHaveBeenCalledTimes(2);
        expect(onToggle).toHaveBeenNthCalledWith(1, true);
        expect(onToggle).toHaveBeenNthCalledWith(2, false);
    });

    it("Should call toggle with next state and keep state owned by consumer in controlled mode", () => {
        const toggle = vi.fn();
        render(
            <Spoiler
                labelExpand="Развернуть"
                labelCollapse="Свернуть"
                expanded={false}
                toggle={toggle}
                data-testid="spoiler"
            >
                Content
            </Spoiler>,
        );

        fireEvent.click(getToggleButton());

        expect(toggle).toHaveBeenCalledTimes(1);
        expect(toggle).toHaveBeenCalledWith(true);
        // Состояние не меняется само: expanded остался false, пока потребитель не передаст новое значение.
        expect(getSpoiler()).not.toHaveClass("opened");
        expect(getContent()).toHaveClass("hidden");
    });

    it("Should call toggle with false when collapsing in controlled mode", () => {
        const toggle = vi.fn();
        const onToggle = vi.fn();
        render(
            <Spoiler
                labelExpand="Развернуть"
                labelCollapse="Свернуть"
                expanded={true}
                toggle={toggle}
                onToggle={onToggle}
                data-testid="spoiler"
            >
                Content
            </Spoiler>,
        );

        fireEvent.click(getToggleButton());

        expect(toggle).toHaveBeenCalledWith(false);
        expect(onToggle).toHaveBeenCalledWith(false);
    });

    it("Should render rightBlock in head outside the toggle button", () => {
        render(
            <Spoiler labelExpand="Развернуть" rightBlock={<span data-testid="right-block">Right</span>}>
                Content
            </Spoiler>,
        );
        const rightBlock = screen.getByTestId("right-block");

        expect(rightBlock).toBeInTheDocument();
        expect(getToggleButton()).not.toContainElement(rightBlock);
    });

    it("Should render caret icon of matching size", () => {
        // Иконка скрыта от ассистивных технологий (aria-hidden), поэтому ищем её по разметке.
        const getCaretIcon = () => getSpoiler().querySelector("svg");

        const { rerender } = render(
            <Spoiler labelExpand="Развернуть" size={EComponentSize.SM} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        expect(getCaretIcon()).toHaveAttribute("width", "16");

        rerender(
            <Spoiler labelExpand="Развернуть" size={EComponentSize.MD} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        expect(getCaretIcon()).toHaveAttribute("width", "20");

        rerender(
            <Spoiler labelExpand="Развернуть" size={EComponentSize.LG} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        expect(getCaretIcon()).toHaveAttribute("width", "20");
    });
});
