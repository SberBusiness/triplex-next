import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll, describe, expect, it, onTestFinished, vi } from "vitest";
import { SuggestFieldMobile } from "../mobile/SuggestFieldMobile";
import { SuggestFieldMobileDropdown } from "../mobile/SuggestFieldMobileDropdown";
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

/** Подменяет matchMedia так, чтобы MobileView считал экран мобильным (или десктопным при mobile = false). */
const mockScreen = (mobile = true) => {
    vi.stubGlobal(
        "matchMedia",
        vi.fn().mockImplementation((query: string) => ({
            matches: mobile,
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

/** Перехватывает console.error: React сообщает через него о неизвестных DOM-атрибутах и обработчиках. */
const spyConsoleError = () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    onTestFinished(() => spy.mockRestore());

    return spy;
};

let restoreScrollIntoView: () => void;

// Мобильная среда нужна всем тестам файла, поэтому настраивается один раз.
beforeAll(() => {
    mockScreen();
    restoreScrollIntoView = mockScrollIntoView();
});

afterAll(() => {
    restoreScrollIntoView();
    vi.unstubAllGlobals();
});

const getFieldProps = (): ISuggestFieldMobileProps => ({
    value: undefined,
    options: OPTIONS,
    label: "Label",
    tooltipHint: "Hint",
    tooltipOpen: false,
    inputProps: {},
    onSelect: vi.fn(),
    onFilter: vi.fn(),
});

const renderField = (props: Partial<ISuggestFieldMobileProps> = {}) =>
    render(<SuggestFieldMobile {...getFieldProps()} {...props} />);

/** Поле ввода самого SuggestField — единственный combobox на странице. */
const getTarget = () => screen.getByRole("combobox");

/** Поле ввода внутри открытого мобильного дропдауна. */
const getDropdownInput = () => screen.getByRole("textbox");

/** Открывает мобильный дропдаун так же, как это делает пользователь: фокусом на поле. */
const openDropdown = () => fireEvent.focus(getTarget());

/**
 * Кнопка закрытия в шапке мобильного дропдауна. У PullerClose нет доступного имени,
 * поэтому отбирается по пустому name — если подпись когда-нибудь появится, чинить здесь.
 */
const getDropdownCloseButton = () => screen.getByRole("button", { name: "" });

const closeByEscape = () => fireEvent.keyDown(getDropdownInput(), { key: "Escape" });

/**
 * Открывает дропдаун настоящим фокусом поля, закрывает (по умолчанию кнопкой) и дожидается возврата фокуса в поле.
 * Именно focus(), а не fireEvent.focus: ловушка Puller запоминает активный элемент, чтобы вернуть на него фокус.
 * Закрывать можно только после асинхронной активации ловушки — её признак: фокус в поле ввода дропдауна.
 */
const openByRealFocusAndClose = async (close = () => fireEvent.click(getDropdownCloseButton())) => {
    act(() => getTarget().focus());
    await waitFor(() => expect(getDropdownInput()).toHaveFocus());
    close();
    await waitFor(() => expect(getTarget()).toHaveFocus());
};

describe("SuggestFieldMobile", () => {
    describe("trigger input", () => {
        it("is read-only: the value is picked in the dropdown", () => {
            renderField();

            expect(getTarget()).toHaveAttribute("readonly");
        });

        it("passes label and placeholder to the input", () => {
            renderField({ placeholder: "Placeholder" });

            expect(screen.getByLabelText("Label")).toBe(getTarget());
            expect(getTarget()).toHaveAttribute("placeholder", "Placeholder");
        });

        it("shows the label of the selected option", () => {
            renderField({ value: OPTIONS[1] });

            expect(getTarget()).toHaveValue(OPTIONS[1].label);
        });

        it("is empty without a selected value", () => {
            renderField();

            expect(getTarget()).toHaveValue("");
        });

        it("aria-expanded reflects the dropdown state", () => {
            renderField();

            expect(getTarget()).toHaveAttribute("aria-expanded", "false");

            openDropdown();

            expect(getTarget()).toHaveAttribute("aria-expanded", "true");

            fireEvent.click(getDropdownCloseButton());

            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
        });

        it("returns focus to the trigger on close without reopening the dropdown", async () => {
            const onFocus = vi.fn();
            renderField({ inputProps: { onFocus } });

            await openByRealFocusAndClose();

            expect(getTarget()).toHaveFocus();
            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
            // Возвратный фокус — настоящий фокус поля: обработчик потребителя вызывается.
            expect(onFocus).toHaveBeenCalledTimes(2);
        });

        it("opens the dropdown again on the next focus after the focus has been returned", async () => {
            renderField();

            await openByRealFocusAndClose();

            act(() => getTarget().blur());
            act(() => getTarget().focus());

            expect(getTarget()).toHaveAttribute("aria-expanded", "true");
        });

        it("opens the dropdown again on a tap of the field that kept the returned focus", async () => {
            const onClick = vi.fn();
            renderField({ inputProps: { onClick } });

            await openByRealFocusAndClose();

            fireEvent.click(getTarget());

            expect(getTarget()).toHaveAttribute("aria-expanded", "true");
            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it.each([
            { key: "ArrowDown", outcome: "opens" },
            { key: "ArrowUp", outcome: "opens" },
            { key: "Enter", outcome: "does not open" },
        ])(
            "$outcome the dropdown again on $key in the field that kept the returned focus",
            async ({ key, outcome }) => {
                const opens = outcome === "opens";
                const onKeyDown = vi.fn();
                renderField({ inputProps: { onKeyDown } });

                await openByRealFocusAndClose();

                // fireEvent возвращает false после preventDefault: открывающие клавиши
                // отменяют действие по умолчанию, чтобы стрелки не прокручивали страницу.
                const defaultPrevented = !fireEvent.keyDown(getTarget(), { key });

                expect(getTarget()).toHaveAttribute("aria-expanded", String(opens));
                expect(defaultPrevented).toBe(opens);
                expect(onKeyDown).toHaveBeenCalledTimes(1);
            },
        );

        it("opens the dropdown again on ArrowDown after closing it with Escape", async () => {
            renderField();

            await openByRealFocusAndClose(closeByEscape);

            // Возврат фокуса после Escape сам шторку не открывает.
            expect(getTarget()).toHaveAttribute("aria-expanded", "false");

            fireEvent.keyDown(getTarget(), { key: "ArrowDown" });

            expect(getTarget()).toHaveAttribute("aria-expanded", "true");
        });

        it("calls the consumer onDeactivate and onPostDeactivate of the dropdown focus trap", async () => {
            const onDeactivate = vi.fn();
            const onPostDeactivate = vi.fn();
            renderField({
                dropdownProps: {
                    pullerProps: { focusTrapProps: { focusTrapOptions: { onDeactivate, onPostDeactivate } } },
                },
            });

            await openByRealFocusAndClose();

            expect(onPostDeactivate).toHaveBeenCalledTimes(1);
            expect(onDeactivate).toHaveBeenCalledTimes(1);
        });

        it("shows a loader in the field when loading", () => {
            renderField({ loading: true });

            expect(screen.getByLabelText("loading")).toBeInTheDocument();
        });

        it("scrolls the input to the center of the screen after the dropdown closes", () => {
            // В iOS открытие мобильного дропдауна уводит страницу вверх.
            const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
            renderField();

            openDropdown();
            scrollIntoView.mockClear();
            fireEvent.click(getDropdownCloseButton());

            expect(scrollIntoView).toHaveBeenCalledWith({ block: "center" });
        });

        it("calls inputProps.onFocus along with opening the dropdown", () => {
            const onFocus = vi.fn();
            renderField({ inputProps: { onFocus } });

            openDropdown();

            expect(onFocus).toHaveBeenCalledTimes(1);
            expect(getTarget()).toHaveAttribute("aria-expanded", "true");
        });

        it.each([
            {
                scenario: "resets the value and the filter",
                value: OPTIONS[0],
                selectCalls: [[undefined]],
                filterCalls: [[""]],
            },
            {
                scenario: "with an empty label resets the value but not the filter",
                value: { id: "empty", label: "" },
                selectCalls: [[undefined]],
                filterCalls: [],
            },
            {
                scenario: "without a value resets nothing",
                value: undefined,
                selectCalls: [],
                filterCalls: [],
            },
        ])("clear button $scenario and calls onClear", async ({ value, selectCalls, filterCalls }) => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            const onFilter = vi.fn();
            const onClear = vi.fn();
            renderField({ value, onClear, onSelect, onFilter });

            await user.click(screen.getByRole("button"));

            expect(onSelect.mock.calls).toEqual(selectCalls);
            expect(onFilter.mock.calls).toEqual(filterCalls);
            expect(onClear).toHaveBeenCalledTimes(1);
        });

        it("does not render the clear button without onClear", () => {
            renderField({ value: OPTIONS[0] });

            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        });

        it("applies className, data-test-id and the input data-test-id suffix", () => {
            // Суффикс захардкожен, а не взят из DataTestId: на него опираются e2e.
            const { container } = renderField({ className: "custom-class", "data-test-id": "suggest" });

            expect(container.querySelector(".custom-class")).not.toBeNull();
            expect(container.querySelector('[data-test-id="suggest"]')).not.toBeNull();
            expect(getTarget()).toHaveAttribute("data-test-id", "suggest__input");
        });
    });

    describe("dropdown", () => {
        it("does not render the dropdown content before focus", () => {
            renderField();

            expect(screen.queryByRole("option")).not.toBeInTheDocument();
        });

        it("renders all options after focus", () => {
            renderField();

            openDropdown();

            const items = screen.getAllByRole("option");
            expect(items).toHaveLength(OPTIONS.length);
            expect(items[0]).toHaveTextContent(OPTIONS[0].label);
        });

        it("marks the selected option", () => {
            renderField({ value: OPTIONS[1] });

            openDropdown();

            const items = screen.getAllByRole("option");
            expect(items[0]).toHaveAttribute("aria-selected", "false");
            expect(items[1]).toHaveAttribute("aria-selected", "true");
        });

        it("typing in the dropdown calls onFilter", () => {
            const onFilter = vi.fn();
            renderField({ onFilter });

            openDropdown();
            fireEvent.change(getDropdownInput(), { target: { value: "fir" } });

            expect(onFilter).toHaveBeenCalledWith("fir");
        });

        it("selecting an option calls onSelect and closes the dropdown", () => {
            const onSelect = vi.fn();
            renderField({ onSelect });

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
            renderField({ value: OPTIONS[0], onSelect, ...props });

            openDropdown();
            editInput();
            fireEvent.click(getDropdownCloseButton());

            expect(onSelect).not.toHaveBeenCalled();
            expect(getTarget()).toHaveValue(OPTIONS[0].label);
        });

        it("reopening during the close animation does not bring back the erased input", () => {
            // Содержимое ещё смонтировано, автофокус не срабатывает — поле сбрасывается на закрытии.
            renderField({ value: OPTIONS[0] });

            openDropdown();
            fireEvent.change(getDropdownInput(), { target: { value: "" } });
            fireEvent.click(getDropdownCloseButton());
            openDropdown();

            expect(getDropdownInput()).toHaveValue(OPTIONS[0].label);
        });

        it("shows the label of the newly selected option in the dropdown input, not the previous one", () => {
            // Сброс поля на закрытии не должен перетереть label только что выбранной опции.
            const fieldProps = getFieldProps();
            const ControlledField = () => {
                const [value, setValue] = React.useState<ISuggestFieldOption | undefined>(OPTIONS[0]);

                return <SuggestFieldMobile {...fieldProps} value={value} onSelect={setValue} />;
            };
            render(<ControlledField />);

            openDropdown();
            fireEvent.click(screen.getByText(OPTIONS[1].label));
            openDropdown();

            expect(getDropdownInput()).toHaveValue(OPTIONS[1].label);
        });

        it("reopening after the close animation does not bring back the erased input", async () => {
            const onPostDeactivate = vi.fn();
            renderField({
                value: OPTIONS[0],
                dropdownProps: { pullerProps: { focusTrapProps: { focusTrapOptions: { onPostDeactivate } } } },
            });

            openDropdown();
            fireEvent.change(getDropdownInput(), { target: { value: "" } });
            fireEvent.click(getDropdownCloseButton());
            finishCloseAnimation();
            // Ловушка шторки завершает деактивацию (возврат фокуса) асинхронно: до onPostDeactivate фокус
            // поля считается возвратным и шторку не открывает. Пользователь раньше и не успеет.
            await waitFor(() => expect(onPostDeactivate).toHaveBeenCalled());
            openDropdown();

            expect(getDropdownInput()).toHaveValue(OPTIONS[0].label);
        });

        it("clearInputOnFocus clears the dropdown input that is autofocused on open and resets the filter", () => {
            const onFilter = vi.fn();
            renderField({ value: OPTIONS[0], clearInputOnFocus: true, onFilter });

            openDropdown();

            expect(getDropdownInput()).toHaveValue("");
            expect(onFilter).toHaveBeenCalledWith("");
        });

        it("keeps the selected label in the dropdown input without clearInputOnFocus", () => {
            renderField({ value: OPTIONS[0] });

            openDropdown();
            fireEvent.focus(getDropdownInput());

            expect(getDropdownInput()).toHaveValue(OPTIONS[0].label);
        });

        // Поле ввода и отфильтрованный список не должны расходиться после возврата фокуса.
        it("refocusing the dropdown input keeps the typed query without clearInputOnFocus", () => {
            const onFilter = vi.fn();
            renderField({ value: OPTIONS[0], onFilter });

            openDropdown();
            fireEvent.change(getDropdownInput(), { target: { value: "sec" } });
            onFilter.mockClear();
            fireEvent.focus(getDropdownInput());

            expect(getDropdownInput()).toHaveValue("sec");
            expect(onFilter).not.toHaveBeenCalled();
        });

        it("refocusing the dropdown input with clearInputOnFocus clears the typed query and the filter", () => {
            const onFilter = vi.fn();
            renderField({ value: OPTIONS[0], clearInputOnFocus: true, onFilter });

            openDropdown();
            fireEvent.change(getDropdownInput(), { target: { value: "sec" } });
            onFilter.mockClear();
            fireEvent.focus(getDropdownInput());

            expect(getDropdownInput()).toHaveValue("");
            expect(onFilter).toHaveBeenCalledWith("");
        });

        it("clearInputOnFocus does not call onFilter when the dropdown input is already empty", () => {
            const onFilter = vi.fn();
            renderField({ onFilter, clearInputOnFocus: true });

            openDropdown();

            expect(onFilter).not.toHaveBeenCalled();
        });

        it("tooltipOpen shows the hint instead of the list", () => {
            renderField({ tooltipOpen: true });

            openDropdown();

            expect(screen.getByText("Hint")).toBeInTheDocument();
            expect(screen.queryByRole("option")).not.toBeInTheDocument();
        });

        it("calls onScrollEnd when the list is scrolled to the end", () => {
            const onScrollEnd = vi.fn();
            renderField({ onScrollEnd });

            openDropdown();
            scrollBodyToEnd();

            expect(onScrollEnd).toHaveBeenCalledTimes(1);
        });

        it("does not call onScrollEnd while the list is loading", () => {
            const onScrollEnd = vi.fn();
            renderField({ onScrollEnd, dropdownListLoading: true });

            openDropdown();
            scrollBodyToEnd();

            expect(onScrollEnd).not.toHaveBeenCalled();
        });

        it("dropdownProps.pullerProps are passed to the puller without replacing its content", () => {
            renderField({ dropdownProps: { pullerProps: { className: "custom-puller" } } });

            openDropdown();

            expect(document.querySelector(".custom-puller")).toBeInTheDocument();
            expect(screen.getAllByRole("option")).toHaveLength(OPTIONS.length);
        });

        it("ignores desktop dropdownProps and does not pass them to the DOM", () => {
            const consoleError = spyConsoleError();
            renderField({ dropdownProps: { className: "custom-dropdown" } });

            openDropdown();

            // React сообщает о неизвестном DOM-атрибуте через console.error.
            expect(consoleError).not.toHaveBeenCalled();
            expect(document.querySelector(".custom-dropdown")).toBeNull();
        });

        it("dropdownProps.onOpen and onClose are called when the puller opens and closes", () => {
            const onOpen = vi.fn();
            const onClose = vi.fn();
            renderField({ dropdownProps: { onOpen, onClose } });

            expect(onOpen).not.toHaveBeenCalled();

            openDropdown();

            expect(onOpen).toHaveBeenCalledTimes(1);
            expect(onClose).not.toHaveBeenCalled();

            fireEvent.click(getDropdownCloseButton());

            expect(onOpen).toHaveBeenCalledTimes(1);
            expect(onClose).toHaveBeenCalledTimes(1);
        });

        it("opens the puller with options regardless of the screen width", () => {
            mockScreen(false);
            onTestFinished(() => mockScreen());
            renderField();

            openDropdown();

            expect(screen.getAllByRole("option")).toHaveLength(OPTIONS.length);
        });
    });
});

describe("SuggestFieldMobileDropdown", () => {
    const getDropdownProps = () => ({
        value: OPTIONS[0],
        options: OPTIONS,
        tooltipHint: "Hint",
        tooltipOpen: false,
        setOpened: vi.fn(),
        onSelect: vi.fn(),
        onFilter: vi.fn(),
    });

    it("closing through the opened prop also returns the dropdown input to the label", () => {
        // Закрытие снаружи, без setOpened: сброс поля ввода завязан на смену opened.
        const props = getDropdownProps();
        // Открываем из закрытого состояния, как это делает SuggestFieldMobile.
        const { rerender } = render(<SuggestFieldMobileDropdown {...props} opened={false} />);
        rerender(<SuggestFieldMobileDropdown {...props} opened={true} />);

        fireEvent.change(getDropdownInput(), { target: { value: "" } });
        rerender(<SuggestFieldMobileDropdown {...props} opened={false} />);

        // До конца анимации закрытия содержимое шторки ещё смонтировано.
        expect(getDropdownInput()).toHaveValue(OPTIONS[0].label);
    });

    it("keeps the typed query when the label of the same option changes while opened", () => {
        const props = getDropdownProps();
        const { rerender } = render(<SuggestFieldMobileDropdown {...props} opened={true} />);

        fireEvent.change(getDropdownInput(), { target: { value: "sec" } });
        rerender(<SuggestFieldMobileDropdown {...props} value={{ ...OPTIONS[0], label: "Renamed" }} opened={true} />);

        expect(getDropdownInput()).toHaveValue("sec");
    });

    it("shows the updated label of the same option in the dropdown input on open", () => {
        const props = getDropdownProps();
        const renamedValue = { ...OPTIONS[0], label: "Renamed" };
        const { rerender } = render(<SuggestFieldMobileDropdown {...props} opened={false} />);
        rerender(<SuggestFieldMobileDropdown {...props} value={renamedValue} opened={false} />);
        rerender(<SuggestFieldMobileDropdown {...props} value={renamedValue} opened={true} />);

        expect(getDropdownInput()).toHaveValue("Renamed");
    });
});

/**
 * Завершает анимацию закрытия: PullerInner снимает содержимое только по transitionend на
 * подложке, а jsdom переходов не проигрывает. Без этого при повторном открытии осталось бы прежнее
 * поле ввода, и автофокус, который переинициализирует его значение, не сработал бы.
 */
function finishCloseAnimation() {
    const backdrop = document.querySelector(".pullerBackdrop");

    if (backdrop === null) {
        throw new Error("Mobile dropdown backdrop not found");
    }

    fireEvent.transitionEnd(backdrop);
}

/** Прокручивает PullerBody (родителя listbox) до конца: jsdom не считает размеры сам. */
function scrollBodyToEnd() {
    const body = screen.getByRole("listbox").parentElement;

    if (body === null) {
        throw new Error("PullerBody not found: listbox has no parent element");
    }

    Object.defineProperty(body, "scrollHeight", { configurable: true, value: 300 });
    Object.defineProperty(body, "clientHeight", { configurable: true, value: 100 });
    body.scrollTop = 200;

    fireEvent.scroll(body);
}
