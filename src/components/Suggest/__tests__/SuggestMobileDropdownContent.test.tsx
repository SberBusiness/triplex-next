import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Suggest } from "../Suggest";
import { SuggestMobileDropdownContent } from "../SuggestMobileDropdownContent";
import { ISuggestOption, ISuggestProps } from "../types";
import { EComponentSize } from "../../../enums/EComponentSize";

const OPTIONS: ISuggestOption[] = [
    { id: "a", label: "Первая опция" },
    { id: "b", label: "Вторая опция" },
];

const renderContent = (props: Partial<ISuggestProps> = {}) =>
    render(
        <Suggest
            value={undefined}
            options={OPTIONS}
            size={EComponentSize.MD}
            onSelect={() => {}}
            onFilter={() => {}}
            {...props}
        >
            <SuggestMobileDropdownContent />
        </Suggest>,
    );

describe("SuggestMobileDropdownContent", () => {
    test("renders every option as a list item", () => {
        renderContent();

        const items = screen.getAllByRole("option");
        expect(items).toHaveLength(OPTIONS.length);
        expect(items[0]).toHaveTextContent(OPTIONS[0].label);
        expect(items[1]).toHaveTextContent(OPTIONS[1].label);
    });

    test("marks the selected option", () => {
        renderContent({ value: OPTIONS[1] });

        const items = screen.getAllByRole("option");
        expect(items[0]).toHaveAttribute("aria-selected", "false");
        expect(items[1]).toHaveAttribute("aria-selected", "true");
    });

    test("renders custom content of an option instead of its label", () => {
        renderContent({ options: [{ id: "a", label: "Первая опция", content: <b>Кастомное содержимое</b> }] });

        expect(screen.getByText("Кастомное содержимое")).toBeInTheDocument();
        expect(screen.queryByText("Первая опция")).not.toBeInTheDocument();
    });

    test("renders noOptionsText and no list when there are no options", () => {
        renderContent({ options: [], noOptionsText: "Ничего не найдено" });

        expect(screen.getByText("Ничего не найдено")).toBeInTheDocument();
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    test("calls onSelect with the clicked option", async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();

        renderContent({ onSelect });

        await user.click(screen.getAllByRole("option")[1]);

        expect(onSelect).toHaveBeenCalledWith(OPTIONS[1]);
    });

    test("calls onFilter with the typed value", async () => {
        const user = userEvent.setup();
        const onFilter = vi.fn();

        renderContent({ onFilter });

        await user.type(screen.getByRole("textbox"), "П");

        expect(onFilter).toHaveBeenCalledWith("П");
    });

    test("clears the input on focus when clearInputOnFocus is set and the input is filled", () => {
        const onFilter = vi.fn();

        renderContent({ value: OPTIONS[0], clearInputOnFocus: true, onFilter });

        fireEvent.focus(screen.getByRole("textbox"));

        expect(onFilter).toHaveBeenCalledWith("");
    });

    test("does not clear the input on focus without clearInputOnFocus", () => {
        const onFilter = vi.fn();

        renderContent({ value: OPTIONS[0], onFilter });

        fireEvent.focus(screen.getByRole("textbox"));

        expect(onFilter).not.toHaveBeenCalled();
    });

    test("does not clear an already empty input on focus", () => {
        const onFilter = vi.fn();

        renderContent({ clearInputOnFocus: true, onFilter });

        fireEvent.focus(screen.getByRole("textbox"));

        expect(onFilter).not.toHaveBeenCalled();
    });

    test("resets the input to the label of the selected value on close", async () => {
        const user = userEvent.setup();

        renderContent({ value: OPTIONS[0] });

        const input = screen.getByRole("textbox");
        await user.type(input, "фильтр");
        expect(input).toHaveValue(`${OPTIONS[0].label}фильтр`);

        await user.click(screen.getByRole("button"));

        expect(input).toHaveValue(OPTIONS[0].label);
    });

    test("renders the loader only when loading is set", () => {
        const { rerender } = renderContent();

        expect(document.querySelector(".dropdownMobileLoader")).toBeNull();

        rerender(
            <Suggest
                value={undefined}
                options={OPTIONS}
                size={EComponentSize.MD}
                loading={true}
                onSelect={() => {}}
                onFilter={() => {}}
            >
                <SuggestMobileDropdownContent />
            </Suggest>,
        );

        expect(document.querySelector(".dropdownMobileLoader")).not.toBeNull();
    });

    test("calls onScrollEnd only when the list is scrolled to the bottom", () => {
        const onScrollEnd = vi.fn();

        renderContent({ onScrollEnd });

        const body = document.querySelector(".suggestDropdownMobileBody")!;
        const setScroll = (scrollTop: number) => {
            Object.defineProperty(body, "scrollHeight", { value: 300, configurable: true });
            Object.defineProperty(body, "clientHeight", { value: 100, configurable: true });
            Object.defineProperty(body, "scrollTop", { value: scrollTop, configurable: true });
        };

        setScroll(100);
        fireEvent.scroll(body);
        expect(onScrollEnd).not.toHaveBeenCalled();

        setScroll(200);
        fireEvent.scroll(body);
        expect(onScrollEnd).toHaveBeenCalledTimes(1);
    });

    test("does not call onScrollEnd when the handler is not passed", () => {
        renderContent();

        const body = document.querySelector(".suggestDropdownMobileBody")!;
        Object.defineProperty(body, "scrollHeight", { value: 300, configurable: true });
        Object.defineProperty(body, "clientHeight", { value: 100, configurable: true });
        Object.defineProperty(body, "scrollTop", { value: 200, configurable: true });

        expect(() => fireEvent.scroll(body)).not.toThrow();
    });
});
