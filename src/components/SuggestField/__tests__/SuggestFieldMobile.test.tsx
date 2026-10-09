import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { SuggestFieldMobile } from "../mobile/SuggestFieldMobile";
import { ISuggestFieldMobileProps } from "../mobile/types";
import { ISuggestFieldOption } from "../types";

const OPTIONS: ISuggestFieldOption[] = [
    { id: "a", label: "First option" },
    { id: "b", label: "Second option" },
];

/**
 * jsdom не реализует scrollIntoView, а SuggestFieldMobile зовёт его после закрытия дропдауна.
 * Возвращает функцию восстановления: `vi.stubGlobal` для метода прототипа не подходит,
 * а `restoreMocks` в vitest.config.ts не включён.
 */
const mockScrollIntoView = () => {
    const original = Element.prototype.scrollIntoView;

    Object.defineProperty(Element.prototype, "scrollIntoView", {
        configurable: true,
        writable: true,
        value: vi.fn(),
    });

    return () => {
        Object.defineProperty(Element.prototype, "scrollIntoView", {
            configurable: true,
            writable: true,
            value: original,
        });
    };
};

/** Подменяет matchMedia так, чтобы MobileView считал экран мобильным. */
const mockMobileScreen = () => {
    vi.stubGlobal(
        "matchMedia",
        vi.fn().mockImplementation((query: string) => ({
            matches: true,
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    );
};

let restoreScrollIntoView: () => void;

// Мобильная среда нужна всем тестам файла, поэтому настраивается один раз.
beforeAll(() => {
    mockMobileScreen();
    restoreScrollIntoView = mockScrollIntoView();
});

afterAll(() => {
    restoreScrollIntoView();
    vi.unstubAllGlobals();
});

type TRenderProps = Partial<ISuggestFieldMobileProps> & Pick<ISuggestFieldMobileProps, "onSelect" | "onFilter">;

const renderField = (props: TRenderProps) =>
    render(
        <SuggestFieldMobile
            value={undefined}
            options={OPTIONS}
            label="Label"
            tooltipHint="Hint"
            tooltipOpen={false}
            inputProps={{}}
            {...props}
        />,
    );

/** Поле ввода самого SuggestField — единственный combobox на странице. */
const getTarget = () => screen.getByRole("combobox");

/** Поле ввода внутри открытого мобильного дропдауна. */
const getDropdownInput = () => screen.getByRole("textbox");

/** Открывает мобильный дропдаун так же, как это делает пользователь: фокусом на поле. */
const openDropdown = () => fireEvent.focus(getTarget());

/**
 * Кнопка закрытия в шапке мобильного дропдауна. У DropdownMobileClose нет доступного имени,
 * поэтому отбирается по пустому name — если подпись когда-нибудь появится, чинить здесь.
 */
const getDropdownCloseButton = () => screen.getByRole("button", { name: "" });

describe("SuggestFieldMobile", () => {
    describe("trigger input", () => {
        it("is read-only: the value is picked in the dropdown", () => {
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            expect(getTarget()).toHaveAttribute("readonly");
        });

        it("passes label and placeholder to the input", () => {
            renderField({ placeholder: "Placeholder", onSelect: vi.fn(), onFilter: vi.fn() });

            expect(screen.getByLabelText("Label")).toBe(getTarget());
            expect(getTarget()).toHaveAttribute("placeholder", "Placeholder");
        });

        it("shows the label of the selected option", () => {
            renderField({ value: OPTIONS[1], onSelect: vi.fn(), onFilter: vi.fn() });

            expect(getTarget()).toHaveValue(OPTIONS[1].label);
        });

        it("is empty without a selected value", () => {
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            expect(getTarget()).toHaveValue("");
        });

        it("aria-expanded reflects the dropdown state", () => {
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            expect(getTarget()).toHaveAttribute("aria-expanded", "false");

            openDropdown();

            expect(getTarget()).toHaveAttribute("aria-expanded", "true");

            fireEvent.click(getDropdownCloseButton());

            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
        });

        it("shows a loader in the field when loading", () => {
            renderField({ loading: true, onSelect: vi.fn(), onFilter: vi.fn() });

            expect(screen.getByLabelText("loading")).toBeInTheDocument();
        });

        it("scrolls the input to the center of the screen after the dropdown closes", () => {
            // В iOS открытие полноэкранного дропдауна уводит страницу вверх.
            const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();
            scrollIntoView.mockClear();
            fireEvent.click(getDropdownCloseButton());

            expect(scrollIntoView).toHaveBeenCalledWith({ block: "center" });
        });

        it("calls inputProps.onFocus along with opening the dropdown", () => {
            const onFocus = vi.fn();
            renderField({ inputProps: { onFocus }, onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();

            expect(onFocus).toHaveBeenCalledTimes(1);
            expect(getTarget()).toHaveAttribute("aria-expanded", "true");
        });

        it("clear button resets the value and the filter and calls onClear", async () => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            const onFilter = vi.fn();
            const onClear = vi.fn();
            renderField({ value: OPTIONS[0], onClear, onSelect, onFilter });

            await user.click(screen.getByRole("button"));

            expect(onSelect).toHaveBeenCalledWith(undefined);
            expect(onFilter).toHaveBeenCalledWith("");
            expect(onClear).toHaveBeenCalledTimes(1);
        });

        it("clear button with an empty label resets the value but not the filter", async () => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            const onFilter = vi.fn();
            const onClear = vi.fn();
            renderField({ value: { id: "empty", label: "" }, onClear, onSelect, onFilter });

            await user.click(screen.getByRole("button"));

            expect(onSelect).toHaveBeenCalledWith(undefined);
            expect(onFilter).not.toHaveBeenCalled();
            expect(onClear).toHaveBeenCalledTimes(1);
        });

        it("clear button without a value calls only onClear", async () => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            const onFilter = vi.fn();
            const onClear = vi.fn();
            renderField({ onClear, onSelect, onFilter });

            await user.click(screen.getByRole("button"));

            expect(onSelect).not.toHaveBeenCalled();
            expect(onFilter).not.toHaveBeenCalled();
            expect(onClear).toHaveBeenCalledTimes(1);
        });

        it("does not render the clear button without onClear", () => {
            renderField({ value: OPTIONS[0], onSelect: vi.fn(), onFilter: vi.fn() });

            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        });

        it("applies className, data-test-id and the input data-test-id suffix", () => {
            // Суффикс захардкожен, а не взят из DataTestId: на него опираются e2e.
            const { container } = renderField({
                className: "custom-class",
                "data-test-id": "suggest",
                onSelect: vi.fn(),
                onFilter: vi.fn(),
            });

            expect(container.querySelector(".custom-class")).not.toBeNull();
            expect(container.querySelector('[data-test-id="suggest"]')).not.toBeNull();
            expect(getTarget()).toHaveAttribute("data-test-id", "suggest__input");
        });
    });

    describe("dropdown", () => {
        it("does not render the dropdown content before focus", () => {
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            expect(screen.queryByRole("option")).not.toBeInTheDocument();
        });

        it("renders all options after focus", () => {
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();

            const items = screen.getAllByRole("option");
            expect(items).toHaveLength(OPTIONS.length);
            expect(items[0]).toHaveTextContent(OPTIONS[0].label);
        });

        it("marks the selected option", () => {
            renderField({ value: OPTIONS[1], onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();

            const items = screen.getAllByRole("option");
            expect(items[0]).toHaveAttribute("aria-selected", "false");
            expect(items[1]).toHaveAttribute("aria-selected", "true");
        });

        it("typing in the dropdown calls onFilter", () => {
            const onFilter = vi.fn();
            renderField({ onSelect: vi.fn(), onFilter });

            openDropdown();
            fireEvent.change(getDropdownInput(), { target: { value: "fir" } });

            expect(onFilter).toHaveBeenCalledWith("fir");
        });

        it("selecting an option calls onSelect and closes the dropdown", () => {
            const onSelect = vi.fn();
            renderField({ onSelect, onFilter: vi.fn() });

            openDropdown();
            fireEvent.click(screen.getByText(OPTIONS[1].label));

            expect(onSelect).toHaveBeenCalledTimes(1);
            expect(onSelect).toHaveBeenCalledWith(OPTIONS[1]);
            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
        });

        // Значение сбрасывает только кнопка очистки: закрытие без выбора его не трогает, как бы ни изменился ввод.
        it.each([
            {
                scenario: "focus with clearInputOnFocus",
                props: { clearInputOnFocus: true },
                editInput: () => fireEvent.focus(getDropdownInput()),
            },
            {
                scenario: "manual erasing",
                props: {},
                editInput: () => fireEvent.change(getDropdownInput(), { target: { value: "" } }),
            },
        ])("closing after $scenario keeps the value", ({ props, editInput }) => {
            const onSelect = vi.fn();
            renderField({ value: OPTIONS[0], onSelect, onFilter: vi.fn(), ...props });

            openDropdown();
            editInput();
            fireEvent.click(getDropdownCloseButton());

            expect(onSelect).not.toHaveBeenCalled();
            expect(getTarget()).toHaveValue(OPTIONS[0].label);
        });

        it("reopening during the close animation does not bring back the erased input", () => {
            // Содержимое ещё смонтировано, автофокус не срабатывает — поле сбрасывается на закрытии.
            renderField({ value: OPTIONS[0], onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();
            fireEvent.change(getDropdownInput(), { target: { value: "" } });
            fireEvent.click(getDropdownCloseButton());
            openDropdown();

            expect(getDropdownInput()).toHaveValue(OPTIONS[0].label);
        });

        it("shows the label of the newly selected option in the dropdown input, not the previous one", () => {
            // Сброс поля на закрытии не должен перетереть label только что выбранной опции.
            const ControlledField = () => {
                const [value, setValue] = React.useState<ISuggestFieldOption | undefined>(OPTIONS[0]);

                return (
                    <SuggestFieldMobile
                        value={value}
                        options={OPTIONS}
                        tooltipHint="Hint"
                        tooltipOpen={false}
                        inputProps={{}}
                        onSelect={setValue}
                        onFilter={vi.fn()}
                    />
                );
            };
            render(<ControlledField />);

            openDropdown();
            fireEvent.click(screen.getByText(OPTIONS[1].label));
            openDropdown();

            expect(getDropdownInput()).toHaveValue(OPTIONS[1].label);
        });

        it("reopening after the close animation does not bring back the erased input", () => {
            renderField({ value: OPTIONS[0], onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();
            fireEvent.change(getDropdownInput(), { target: { value: "" } });
            fireEvent.click(getDropdownCloseButton());
            finishCloseAnimation();
            openDropdown();

            expect(getDropdownInput()).toHaveValue(OPTIONS[0].label);
        });

        it("clearInputOnFocus clears the dropdown input that is autofocused on open", () => {
            renderField({ value: OPTIONS[0], clearInputOnFocus: true, onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();

            expect(getDropdownInput()).toHaveValue("");
        });

        it("keeps the selected label in the dropdown input without clearInputOnFocus", () => {
            renderField({ value: OPTIONS[0], onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();
            fireEvent.focus(getDropdownInput());

            expect(getDropdownInput()).toHaveValue(OPTIONS[0].label);
        });

        it("tooltipOpen shows the hint instead of the list", () => {
            renderField({ tooltipOpen: true, onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();

            expect(screen.getByText("Hint")).toBeInTheDocument();
            expect(screen.queryByRole("option")).not.toBeInTheDocument();
        });

        it("calls onScrollEnd when the list is scrolled to the end", () => {
            const onScrollEnd = vi.fn();
            renderField({ onScrollEnd, onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();
            scrollBodyToEnd();

            expect(onScrollEnd).toHaveBeenCalledTimes(1);
        });

        it("does not call onScrollEnd while the list is loading", () => {
            const onScrollEnd = vi.fn();
            renderField({ onScrollEnd, dropdownListLoading: true, onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();
            scrollBodyToEnd();

            expect(onScrollEnd).not.toHaveBeenCalled();
        });
    });
});

/**
 * Завершает анимацию закрытия: DropdownMobileInner снимает содержимое только по transitionend на
 * подложке, а jsdom переходов не проигрывает. Без этого при повторном открытии осталось бы прежнее
 * поле ввода, и автофокус, который переинициализирует его значение, не сработал бы.
 */
function finishCloseAnimation() {
    const backdrop = document.querySelector(".dropdownMobileBackdrop");

    if (backdrop === null) {
        throw new Error("Mobile dropdown backdrop not found");
    }

    fireEvent.transitionEnd(backdrop);
}

/** Прокручивает DropdownMobileBody (родителя listbox) до конца: jsdom не считает размеры сам. */
function scrollBodyToEnd() {
    const body = screen.getByRole("listbox").parentElement;

    if (body === null) {
        throw new Error("DropdownMobileBody not found: listbox has no parent element");
    }

    Object.defineProperty(body, "scrollHeight", { configurable: true, value: 300 });
    Object.defineProperty(body, "clientHeight", { configurable: true, value: 100 });
    body.scrollTop = 200;

    fireEvent.scroll(body);
}
