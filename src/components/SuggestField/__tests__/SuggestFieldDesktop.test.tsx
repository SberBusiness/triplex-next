import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SuggestFieldDesktop } from "../desktop/SuggestFieldDesktop";
import { ISuggestFieldDesktopProps } from "../desktop/types";
import { ISuggestFieldOption } from "../types";
import { EFormFieldStatus } from "../../FormField";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";

const OPTIONS: ISuggestFieldOption[] = [
    { id: "a", label: "First option" },
    { id: "b", label: "Second option" },
];

type TRenderProps = Partial<ISuggestFieldDesktopProps> & Pick<ISuggestFieldDesktopProps, "onSelect" | "onFilter">;

type TUser = ReturnType<typeof userEvent.setup>;

const renderField = (props: TRenderProps) => {
    const createField = (nextProps: Partial<ISuggestFieldDesktopProps> = {}) => (
        <SuggestFieldDesktop
            value={undefined}
            options={OPTIONS}
            label="Label"
            tooltipHint="Hint"
            tooltipOpen={false}
            inputProps={{}}
            {...props}
            {...nextProps}
        />
    );

    const result = render(createField());
    const rerenderField = (nextProps: Partial<ISuggestFieldDesktopProps>) => result.rerender(createField(nextProps));

    return { ...result, rerenderField };
};

const getInput = () => screen.getByRole("combobox");

describe("SuggestFieldDesktop", () => {
    describe("rendering", () => {
        it("passes label and placeholder to the input", () => {
            renderField({ placeholder: "Placeholder", onSelect: vi.fn(), onFilter: vi.fn() });

            expect(screen.getByLabelText("Label")).toBe(getInput());
            expect(getInput()).toHaveAttribute("placeholder", "Placeholder");
        });

        it("shows the tooltip while the input is focused when tooltipOpen is set", async () => {
            const user = userEvent.setup();
            renderField({ tooltipOpen: true, onSelect: vi.fn(), onFilter: vi.fn() });

            expect(screen.queryByText("Hint")).not.toBeInTheDocument();

            await user.click(getInput());

            expect(await screen.findByText("Hint")).toBeInTheDocument();
        });

        it("shows a loader in the field when loading", () => {
            renderField({ loading: true, onSelect: vi.fn(), onFilter: vi.fn() });

            expect(screen.getByLabelText("loading")).toBeInTheDocument();
        });

        it("applies data-test-id suffixes to the input, dropdown, list items and tooltip", async () => {
            // Суффиксы используются в e2e (см. «Инварианты» в SuggestField-ai.md). Строки намеренно
            // захардкожены, а не взяты из DataTestId: тест должен покраснеть, если их поменяют.
            const user = userEvent.setup();
            const { baseElement } = renderField({
                "data-test-id": "suggest",
                tooltipOpen: true,
                onSelect: vi.fn(),
                onFilter: vi.fn(),
            });

            await user.click(getInput());
            await screen.findByText("Hint");

            expect(getInput()).toHaveAttribute("data-test-id", "suggest__input");
            expect(baseElement.querySelector('[data-test-id="suggest__dropdown"]')).not.toBeNull();
            expect(baseElement.querySelectorAll('[data-test-id="suggest__dropdown__item"]')).toHaveLength(
                OPTIONS.length,
            );
            expect(baseElement.querySelector('[data-test-id="suggest__tooltip"]')).not.toBeNull();
        });
    });

    describe("accessibility and keyboard", () => {
        it("input is a combobox with list autocomplete", () => {
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            expect(getInput()).toHaveAttribute("aria-autocomplete", "list");
            expect(getInput()).toHaveAttribute("aria-expanded", "false");
        });

        it("aria-controls points at the rendered dropdown list", async () => {
            const user = userEvent.setup();
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());

            expect(screen.getByRole("listbox").id).toBe(getInput().getAttribute("aria-controls"));
        });

        it("aria-activedescendant follows the active option and resets on typing", async () => {
            const user = userEvent.setup();
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            // При открытии DropdownList сразу делает активной первую опцию (или выбранную).
            await user.click(getInput());
            const options = screen.getAllByRole("option");

            expect(getInput()).toHaveAttribute("aria-activedescendant", options[0].id);

            pressKey(EVENT_KEY_CODES.ARROW_DOWN);

            expect(getInput()).toHaveAttribute("aria-activedescendant", options[1].id);

            await user.type(getInput(), "f");

            expect(getInput()).not.toHaveAttribute("aria-activedescendant");
        });

        it("Enter selects the active option", async () => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            renderField({ onSelect, onFilter: vi.fn() });

            await user.click(getInput());
            pressKey(EVENT_KEY_CODES.ARROW_DOWN);
            pressKey(EVENT_KEY_CODES.ENTER);

            expect(onSelect).toHaveBeenCalledWith(OPTIONS[1]);
        });

        it("Space does not select the active option", async () => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            renderField({ onSelect, onFilter: vi.fn() });

            await user.click(getInput());
            pressKey(EVENT_KEY_CODES.SPACE);

            expect(onSelect).not.toHaveBeenCalled();
        });

        it("Escape does not propagate while the list is open and propagates when it is closed", async () => {
            // Иначе Escape закрыл бы ещё и модальное окно вокруг поля.
            const user = userEvent.setup();
            const onParentKeyDown = vi.fn();
            render(
                <div onKeyDown={onParentKeyDown}>
                    <SuggestFieldDesktop
                        value={undefined}
                        options={OPTIONS}
                        tooltipHint="Hint"
                        tooltipOpen={false}
                        inputProps={{}}
                        onSelect={vi.fn()}
                        onFilter={vi.fn()}
                    />
                </div>,
            );

            await user.click(getInput());
            await user.keyboard("{Escape}");

            expect(onParentKeyDown).not.toHaveBeenCalled();

            // Список уже закрыт первым Escape.
            await user.keyboard("{Escape}");

            expect(onParentKeyDown).toHaveBeenCalledTimes(1);
        });
    });

    describe("dropdown visibility", () => {
        it("opens the list on focus when there are options", async () => {
            const user = userEvent.setup();
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());

            expect(getInput()).toHaveAttribute("aria-expanded", "true");
            expect(screen.getAllByRole("option")).toHaveLength(OPTIONS.length);
        });

        it("does not open the list on focus when there are no options", async () => {
            const user = userEvent.setup();
            renderField({ options: [], onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());

            expect(getInput()).toHaveAttribute("aria-expanded", "false");
            expect(screen.queryByRole("option")).not.toBeInTheDocument();
        });

        it("closes the list when options run out", async () => {
            const user = userEvent.setup();
            const { rerenderField } = renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());
            expect(getInput()).toHaveAttribute("aria-expanded", "true");

            rerenderField({ options: [] });

            expect(getInput()).toHaveAttribute("aria-expanded", "false");
        });

        it("opens the list when options appear while the input is focused", async () => {
            const user = userEvent.setup();
            const { rerenderField } = renderField({ options: [], onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());
            expect(getInput()).toHaveAttribute("aria-expanded", "false");

            rerenderField({ options: OPTIONS });

            expect(getInput()).toHaveAttribute("aria-expanded", "true");
        });

        it("Escape closes the list and keeps it closed until the user acts", async () => {
            const user = userEvent.setup();
            const { rerenderField } = renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());
            await user.keyboard("{Escape}");

            expect(getInput()).toHaveAttribute("aria-expanded", "false");

            // Перерисовка с тем же набором опций не должна возвращать список.
            rerenderField({});
            expect(getInput()).toHaveAttribute("aria-expanded", "false");
        });

        it("typing after Escape reopens the list", async () => {
            const user = userEvent.setup();
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());
            await user.keyboard("{Escape}");
            await user.type(getInput(), "f");

            expect(getInput()).toHaveAttribute("aria-expanded", "true");
        });

        it("mousedown on the input after Escape reopens the list", async () => {
            const user = userEvent.setup();
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());
            await user.keyboard("{Escape}");
            await user.click(getInput());

            expect(getInput()).toHaveAttribute("aria-expanded", "true");
        });

        it("does not reopen the list on rerender after an option is selected", async () => {
            const user = userEvent.setup();
            const { rerenderField } = renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());
            await user.click(screen.getByText(OPTIONS[1].label));
            rerenderField({ options: [...OPTIONS] });

            expect(getInput()).toHaveFocus();
            expect(getInput()).toHaveAttribute("aria-expanded", "false");
        });

        it("closes the list on blur", async () => {
            const user = userEvent.setup();
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());
            await user.tab();

            expect(getInput()).toHaveAttribute("aria-expanded", "false");
        });
    });

    describe("input value", () => {
        it("shows the label of the selected option", () => {
            renderField({ value: OPTIONS[1], onSelect: vi.fn(), onFilter: vi.fn() });

            expect(getInput()).toHaveValue(OPTIONS[1].label);
        });

        it("overwrites the input when value changes", () => {
            const { rerenderField } = renderField({ value: OPTIONS[0], onSelect: vi.fn(), onFilter: vi.fn() });

            rerenderField({ value: OPTIONS[1] });

            expect(getInput()).toHaveValue(OPTIONS[1].label);
        });

        it("clearInputOnFocus clears the input and resets the filter", async () => {
            const user = userEvent.setup();
            const onFilter = vi.fn();
            renderField({ value: OPTIONS[0], clearInputOnFocus: true, onSelect: vi.fn(), onFilter });

            await user.click(getInput());

            expect(getInput()).toHaveValue("");
            expect(onFilter).toHaveBeenCalledWith("");
        });

        // Значение сбрасывает только кнопка очистки: blur возвращает label, как бы ни изменился ввод.
        it.each([
            {
                scenario: "typing",
                props: {},
                editInput: (user: TUser) => user.type(getInput(), "xyz"),
            },
            {
                scenario: "manual erasing",
                props: {},
                editInput: (user: TUser) => user.clear(getInput()),
            },
            {
                scenario: "focus with clearInputOnFocus",
                props: { clearInputOnFocus: true },
                editInput: (user: TUser) => user.click(getInput()),
            },
        ])("blur after $scenario keeps the value and restores the label", async ({ props, editInput }) => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            renderField({ value: OPTIONS[0], onSelect, onFilter: vi.fn(), ...props });

            await editInput(user);
            await user.tab();

            expect(onSelect).not.toHaveBeenCalled();
            expect(getInput()).toHaveValue(OPTIONS[0].label);
        });
    });

    describe("callbacks", () => {
        it("calls onFilter with the current input value", async () => {
            const user = userEvent.setup();
            const onFilter = vi.fn();
            renderField({ onSelect: vi.fn(), onFilter });

            await user.type(getInput(), "ab");

            expect(onFilter).toHaveBeenNthCalledWith(1, "a");
            expect(onFilter).toHaveBeenNthCalledWith(2, "ab");
        });

        it("selecting an option calls onSelect with it and shows its label", async () => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            renderField({ onSelect, onFilter: vi.fn() });

            await user.click(getInput());
            await user.click(screen.getByText(OPTIONS[1].label));

            expect(onSelect).toHaveBeenCalledWith(OPTIONS[1]);
            expect(getInput()).toHaveValue(OPTIONS[1].label);
        });

        it("clear button resets the value and the filter and calls onClear", async () => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            const onFilter = vi.fn();
            const onClear = vi.fn();
            renderField({ value: OPTIONS[0], onSelect, onFilter, onClear });

            await user.click(screen.getByRole("button"));

            expect(onSelect).toHaveBeenCalledWith(undefined);
            expect(onFilter).toHaveBeenCalledWith("");
            expect(onClear).toHaveBeenCalledTimes(1);
            expect(getInput()).toHaveValue("");
        });

        it("clear button with a value but an empty input resets only the value", async () => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            const onFilter = vi.fn();
            const onClear = vi.fn();
            renderField({ value: OPTIONS[0], clearInputOnFocus: true, onSelect, onFilter, onClear });

            // Фокус с clearInputOnFocus опустошает поле, значение остаётся.
            await user.click(getInput());
            onFilter.mockClear();
            await user.click(screen.getByRole("button"));

            expect(onSelect).toHaveBeenCalledWith(undefined);
            expect(onFilter).not.toHaveBeenCalled();
            expect(onClear).toHaveBeenCalledTimes(1);
        });

        it("clear button without a value resets only the typed text", async () => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            const onFilter = vi.fn();
            const onClear = vi.fn();
            renderField({ onSelect, onFilter, onClear });

            await user.type(getInput(), "xyz");
            onFilter.mockClear();
            await user.click(screen.getByRole("button"));

            expect(onSelect).not.toHaveBeenCalled();
            expect(onFilter).toHaveBeenCalledWith("");
            expect(onClear).toHaveBeenCalledTimes(1);
            expect(getInput()).toHaveValue("");
        });

        it("does not render the clear button without onClear", () => {
            renderField({ value: OPTIONS[0], onSelect: vi.fn(), onFilter: vi.fn() });

            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        });

        it("calls inputProps handlers alongside the internal ones, not instead of them", async () => {
            const user = userEvent.setup();
            const onFilter = vi.fn();
            const onFocus = vi.fn();
            const onMouseDown = vi.fn();
            const onChange = vi.fn();
            const onKeyDown = vi.fn();
            const onBlur = vi.fn();
            renderField({
                inputProps: { onFocus, onMouseDown, onChange, onKeyDown, onBlur },
                onSelect: vi.fn(),
                onFilter,
            });

            await user.click(getInput());
            await user.type(getInput(), "a", { skipClick: true });

            expect(onFocus).toHaveBeenCalledTimes(1);
            expect(onMouseDown).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onKeyDown).toHaveBeenCalledTimes(1);
            // Внутренние обработчики отработали: список открыт, фильтр получил ввод.
            expect(getInput()).toHaveAttribute("aria-expanded", "true");
            expect(onFilter).toHaveBeenCalledWith("a");

            await user.tab();

            expect(onBlur).toHaveBeenCalledTimes(1);
            expect(getInput()).toHaveAttribute("aria-expanded", "false");
        });
    });

    describe("onScrollEnd", () => {
        it("calls the latest handler after a rerender", async () => {
            // Список должен звать последний переданный колбэк, а не тот, что был на первом рендере.
            const user = userEvent.setup();
            const previousOnScrollEnd = vi.fn();
            const nextOnScrollEnd = vi.fn();
            const { rerenderField } = renderField({
                onScrollEnd: previousOnScrollEnd,
                onSelect: vi.fn(),
                onFilter: vi.fn(),
            });

            await user.click(getInput());
            rerenderField({ onScrollEnd: nextOnScrollEnd });
            scrollListToEnd();

            expect(previousOnScrollEnd).not.toHaveBeenCalled();
            expect(nextOnScrollEnd).toHaveBeenCalledTimes(1);
        });
    });

    describe("customization", () => {
        it("renderInput replaces the input", () => {
            renderField({
                renderInput: (props) => <input {...props} data-testid="custom-input" />,
                onSelect: vi.fn(),
                onFilter: vi.fn(),
            });

            expect(screen.getByTestId("custom-input")).toBeInTheDocument();
        });

        it("renderDropdown replaces the dropdown", async () => {
            const user = userEvent.setup();
            renderField({
                renderDropdown: ({ opened }) => <div data-testid="custom-dropdown">{String(opened)}</div>,
                onSelect: vi.fn(),
                onFilter: vi.fn(),
            });

            await user.click(getInput());

            expect(screen.getByTestId("custom-dropdown")).toHaveTextContent("true");
        });

        it("status DISABLED disables the input", () => {
            renderField({ status: EFormFieldStatus.DISABLED, onSelect: vi.fn(), onFilter: vi.fn() });

            expect(getInput()).toBeDisabled();
        });
    });
});

/**
 * Нажатие клавиши в поле ввода. DropdownList и DropdownListItem слушают keydown на document и
 * сверяют keyCode, которого userEvent не проставляет, поэтому событие отправляется через fireEvent
 * и всплывает до document.
 */
function pressKey(keyCode: number) {
    fireEvent.keyDown(getInput(), { keyCode });
}

/** Прокручивает выпадающий список до конца: jsdom не считает размеры сам. */
function scrollListToEnd() {
    const list = screen.getByRole("listbox");

    Object.defineProperty(list, "scrollHeight", { configurable: true, value: 300 });
    Object.defineProperty(list, "clientHeight", { configurable: true, value: 100 });
    list.scrollTop = 200;

    fireEvent.scroll(list);
}
