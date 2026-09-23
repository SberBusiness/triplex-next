import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SuggestFieldDesktop } from "../desktop/SuggestFieldDesktop";
import { ISuggestFieldDesktopProps } from "../desktop/types";
import { ISuggestFieldOption } from "../types";
import { EFormFieldStatus } from "../../FormField";

const OPTIONS: ISuggestFieldOption[] = [
    { id: "a", label: "Первая опция" },
    { id: "b", label: "Вторая опция" },
];

type TRenderProps = Partial<ISuggestFieldDesktopProps> & Pick<ISuggestFieldDesktopProps, "onSelect" | "onFilter">;

const renderField = ({ onSelect, onFilter, ...props }: TRenderProps) => {
    const result = render(
        <SuggestFieldDesktop
            value={undefined}
            options={OPTIONS}
            label="Лейбл"
            tooltipHint="Подсказка"
            tooltipOpen={false}
            inputProps={{}}
            onSelect={onSelect}
            onFilter={onFilter}
            {...props}
        />,
    );

    const rerenderField = (nextProps: Partial<ISuggestFieldDesktopProps>) =>
        result.rerender(
            <SuggestFieldDesktop
                value={undefined}
                options={OPTIONS}
                label="Лейбл"
                tooltipHint="Подсказка"
                tooltipOpen={false}
                inputProps={{}}
                onSelect={onSelect}
                onFilter={onFilter}
                {...props}
                {...nextProps}
            />,
        );

    return { ...result, rerenderField };
};

const getInput = () => screen.getByRole("combobox");

describe("SuggestFieldDesktop", () => {
    describe("accessibility", () => {
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
    });

    describe("видимость выпадающего списка", () => {
        it("список открывается при фокусе, когда есть опции", async () => {
            const user = userEvent.setup();
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());

            expect(getInput()).toHaveAttribute("aria-expanded", "true");
            expect(screen.getAllByRole("option")).toHaveLength(OPTIONS.length);
        });

        it("список не открывается при фокусе, когда опций нет", async () => {
            const user = userEvent.setup();
            renderField({ options: [], onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());

            expect(getInput()).toHaveAttribute("aria-expanded", "false");
            expect(screen.queryByRole("option")).not.toBeInTheDocument();
        });

        it("список закрывается, когда опции закончились", async () => {
            const user = userEvent.setup();
            const { rerenderField } = renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());
            expect(getInput()).toHaveAttribute("aria-expanded", "true");

            rerenderField({ options: [] });

            expect(getInput()).toHaveAttribute("aria-expanded", "false");
        });

        it("список открывается, когда опции появились у поля в фокусе", async () => {
            const user = userEvent.setup();
            const { rerenderField } = renderField({ options: [], onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());
            expect(getInput()).toHaveAttribute("aria-expanded", "false");

            rerenderField({ options: OPTIONS });

            expect(getInput()).toHaveAttribute("aria-expanded", "true");
        });

        it("Escape закрывает список и не даёт ему открыться заново без действия пользователя", async () => {
            const user = userEvent.setup();
            const { rerenderField } = renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());
            await user.keyboard("{Escape}");

            expect(getInput()).toHaveAttribute("aria-expanded", "false");

            // Перерисовка с тем же набором опций не должна возвращать список.
            rerenderField({});
            expect(getInput()).toHaveAttribute("aria-expanded", "false");
        });

        it("ввод после Escape снова открывает список", async () => {
            const user = userEvent.setup();
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());
            await user.keyboard("{Escape}");
            await user.type(getInput(), "п");

            expect(getInput()).toHaveAttribute("aria-expanded", "true");
        });

        it("список закрывается при потере фокуса", async () => {
            const user = userEvent.setup();
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());
            await user.tab();

            expect(getInput()).toHaveAttribute("aria-expanded", "false");
        });
    });

    describe("значение поля ввода", () => {
        it("поле показывает label выбранной опции", () => {
            renderField({ value: OPTIONS[1], onSelect: vi.fn(), onFilter: vi.fn() });

            expect(getInput()).toHaveValue(OPTIONS[1].label);
        });

        it("смена value перезаписывает поле ввода", () => {
            const { rerenderField } = renderField({ value: OPTIONS[0], onSelect: vi.fn(), onFilter: vi.fn() });

            rerenderField({ value: OPTIONS[1] });

            expect(getInput()).toHaveValue(OPTIONS[1].label);
        });

        it("clearInputOnFocus очищает поле и сбрасывает фильтр", async () => {
            const user = userEvent.setup();
            const onFilter = vi.fn();
            renderField({ value: OPTIONS[0], clearInputOnFocus: true, onSelect: vi.fn(), onFilter });

            await user.click(getInput());

            expect(getInput()).toHaveValue("");
            expect(onFilter).toHaveBeenCalledWith("");
        });

        it("blur с непустым вводом возвращает label выбранной опции", async () => {
            const user = userEvent.setup();
            renderField({ value: OPTIONS[0], onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());
            await user.type(getInput(), "xyz");
            await user.tab();

            expect(getInput()).toHaveValue(OPTIONS[0].label);
        });

        it("blur с пустым вводом сбрасывает выбранное значение", async () => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            renderField({ value: OPTIONS[0], clearInputOnFocus: true, onSelect, onFilter: vi.fn() });

            await user.click(getInput());
            await user.tab();

            expect(onSelect).toHaveBeenCalledWith(undefined);
        });
    });

    describe("колбэки", () => {
        it("onFilter получает текущее значение поля ввода", async () => {
            const user = userEvent.setup();
            const onFilter = vi.fn();
            renderField({ onSelect: vi.fn(), onFilter });

            await user.type(getInput(), "аб");

            expect(onFilter).toHaveBeenNthCalledWith(1, "а");
            expect(onFilter).toHaveBeenNthCalledWith(2, "аб");
        });

        it("выбор опции вызывает onSelect с этой опцией и подставляет её label", async () => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            renderField({ onSelect, onFilter: vi.fn() });

            await user.click(getInput());
            await user.click(screen.getByText(OPTIONS[1].label));

            expect(onSelect).toHaveBeenCalledWith(OPTIONS[1]);
            expect(getInput()).toHaveValue(OPTIONS[1].label);
        });

        it("onClear сбрасывает значение, фильтр и вызывает переданный обработчик", async () => {
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

        it("кнопка очистки не рендерится без onClear", () => {
            renderField({ value: OPTIONS[0], onSelect: vi.fn(), onFilter: vi.fn() });

            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        });

        it("обработчики из inputProps вызываются вместе со внутренними", async () => {
            const user = userEvent.setup();
            const onFocus = vi.fn();
            const onChange = vi.fn();
            const onKeyDown = vi.fn();
            renderField({ inputProps: { onFocus, onChange, onKeyDown }, onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(getInput());
            await user.type(getInput(), "а");

            expect(onFocus).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onKeyDown).toHaveBeenCalledTimes(1);
        });
    });

    describe("onScrollEnd", () => {
        it("после перерисовки срабатывает актуальный обработчик", async () => {
            // Раньше onScrollEnd латчился в ref, который нигде не читался. Ref убран, обработчик
            // уходит в Dropdown напрямую — тест фиксирует, что список зовёт именно последний
            // переданный колбэк, а не тот, что был на первом рендере.
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

    describe("кастомизация", () => {
        it("renderInput заменяет поле ввода", () => {
            renderField({
                renderInput: (props) => <input {...props} data-testid="custom-input" />,
                onSelect: vi.fn(),
                onFilter: vi.fn(),
            });

            expect(screen.getByTestId("custom-input")).toBeInTheDocument();
        });

        it("renderDropdown заменяет выпадающий список", async () => {
            const user = userEvent.setup();
            renderField({
                renderDropdown: ({ opened }) => <div data-testid="custom-dropdown">{String(opened)}</div>,
                onSelect: vi.fn(),
                onFilter: vi.fn(),
            });

            await user.click(getInput());

            expect(screen.getByTestId("custom-dropdown")).toHaveTextContent("true");
        });

        it("status DISABLED блокирует поле ввода", () => {
            renderField({ status: EFormFieldStatus.DISABLED, onSelect: vi.fn(), onFilter: vi.fn() });

            expect(getInput()).toBeDisabled();
        });
    });
});

/** Прокручивает выпадающий список до конца: jsdom не считает размеры сам. */
function scrollListToEnd() {
    const list = screen.getByRole("listbox");

    Object.defineProperty(list, "scrollHeight", { configurable: true, value: 300 });
    Object.defineProperty(list, "clientHeight", { configurable: true, value: 100 });
    list.scrollTop = 200;

    fireEvent.scroll(list);
}
