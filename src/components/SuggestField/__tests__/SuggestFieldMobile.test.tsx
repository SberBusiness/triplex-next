import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { SuggestField } from "../SuggestField";
import { SuggestFieldMobile } from "../mobile/SuggestFieldMobile";
import { ISuggestFieldMobileProps } from "../mobile/types";
import { ISuggestFieldOption } from "../types";

const OPTIONS: ISuggestFieldOption[] = [
    { id: "a", label: "Первая опция" },
    { id: "b", label: "Вторая опция" },
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

// Мобильная среда нужна обоим describe ниже, поэтому настраивается один раз на файл.
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
            label="Лейбл"
            tooltipHint="Подсказка"
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
    describe("поле-триггер", () => {
        it("поле только для чтения: значение выбирается в дропдауне", () => {
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            expect(getTarget()).toHaveAttribute("readonly");
        });

        it("поле показывает label выбранной опции", () => {
            renderField({ value: OPTIONS[1], onSelect: vi.fn(), onFilter: vi.fn() });

            expect(getTarget()).toHaveValue(OPTIONS[1].label);
        });

        it("без выбранного значения поле пустое", () => {
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            expect(getTarget()).toHaveValue("");
        });

        it("aria-expanded отражает состояние дропдауна", () => {
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            expect(getTarget()).toHaveAttribute("aria-expanded", "false");

            openDropdown();

            expect(getTarget()).toHaveAttribute("aria-expanded", "true");
        });

        it("onFocus из inputProps вызывается вместе с открытием дропдауна", () => {
            const onFocus = vi.fn();
            renderField({ inputProps: { onFocus }, onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();

            expect(onFocus).toHaveBeenCalledTimes(1);
            expect(getTarget()).toHaveAttribute("aria-expanded", "true");
        });

        it("с onClear кнопка очистки рендерится и вызывает обработчик", async () => {
            const user = userEvent.setup();
            const onClear = vi.fn();
            renderField({ value: OPTIONS[0], onClear, onSelect: vi.fn(), onFilter: vi.fn() });

            await user.click(screen.getByRole("button"));

            expect(onClear).toHaveBeenCalledTimes(1);
        });

        it("без onClear кнопки очистки нет", () => {
            renderField({ value: OPTIONS[0], onSelect: vi.fn(), onFilter: vi.fn() });

            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        });
    });

    describe("дропдаун", () => {
        it("до фокуса содержимое дропдауна не отрендерено", () => {
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            expect(screen.queryByRole("option")).not.toBeInTheDocument();
        });

        it("после фокуса рендерятся все опции", () => {
            renderField({ onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();

            const items = screen.getAllByRole("option");
            expect(items).toHaveLength(OPTIONS.length);
            expect(items[0]).toHaveTextContent(OPTIONS[0].label);
        });

        it("выбранная опция отмечена", () => {
            renderField({ value: OPTIONS[1], onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();

            const items = screen.getAllByRole("option");
            expect(items[0]).toHaveAttribute("aria-selected", "false");
            expect(items[1]).toHaveAttribute("aria-selected", "true");
        });

        it("ввод в дропдауне вызывает onFilter", () => {
            const onFilter = vi.fn();
            renderField({ onSelect: vi.fn(), onFilter });

            openDropdown();
            fireEvent.change(getDropdownInput(), { target: { value: "перв" } });

            expect(onFilter).toHaveBeenCalledWith("перв");
        });

        it("выбор опции вызывает onSelect и закрывает дропдаун", () => {
            const onSelect = vi.fn();
            renderField({ onSelect, onFilter: vi.fn() });

            openDropdown();
            fireEvent.click(screen.getByText(OPTIONS[1].label));

            expect(onSelect).toHaveBeenCalledWith(OPTIONS[1]);
            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
        });

        it("выбор опции не сбрасывает значение при закрытии", () => {
            const onSelect = vi.fn();
            renderField({ onSelect, onFilter: vi.fn() });

            openDropdown();
            fireEvent.click(screen.getByText(OPTIONS[1].label));

            expect(onSelect).toHaveBeenCalledTimes(1);
            expect(onSelect).not.toHaveBeenCalledWith(undefined);
        });

        it("закрытие с пустым вводом сбрасывает выбранное значение", () => {
            const onSelect = vi.fn();
            renderField({ value: OPTIONS[0], clearInputOnFocus: true, onSelect, onFilter: vi.fn() });

            openDropdown();
            fireEvent.focus(getDropdownInput());
            fireEvent.click(getDropdownCloseButton());

            expect(onSelect).toHaveBeenCalledWith(undefined);
        });

        it("закрытие с непустым вводом не трогает выбранное значение", () => {
            const onSelect = vi.fn();
            renderField({ value: OPTIONS[0], onSelect, onFilter: vi.fn() });

            openDropdown();
            fireEvent.click(getDropdownCloseButton());

            expect(onSelect).not.toHaveBeenCalled();
        });

        it("clearInputOnFocus очищает поле дропдауна, которое получает автофокус при открытии", () => {
            renderField({ value: OPTIONS[0], clearInputOnFocus: true, onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();

            expect(getDropdownInput()).toHaveValue("");
        });

        it("без clearInputOnFocus поле дропдауна сохраняет label выбранной опции", () => {
            renderField({ value: OPTIONS[0], onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();
            fireEvent.focus(getDropdownInput());

            expect(getDropdownInput()).toHaveValue(OPTIONS[0].label);
        });

        it("tooltipOpen показывает подсказку вместо списка", () => {
            renderField({ tooltipOpen: true, onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();

            expect(screen.getByText("Подсказка")).toBeInTheDocument();
            expect(screen.queryByRole("option")).not.toBeInTheDocument();
        });

        it("onScrollEnd вызывается при прокрутке списка до конца", () => {
            const onScrollEnd = vi.fn();
            renderField({ onScrollEnd, onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();
            scrollBodyToEnd();

            expect(onScrollEnd).toHaveBeenCalledTimes(1);
        });

        it("onScrollEnd не вызывается во время догрузки списка", () => {
            const onScrollEnd = vi.fn();
            renderField({ onScrollEnd, dropdownListLoading: true, onSelect: vi.fn(), onFilter: vi.fn() });

            openDropdown();
            scrollBodyToEnd();

            expect(onScrollEnd).not.toHaveBeenCalled();
        });
    });
});

describe("SuggestField на мобильной ширине", () => {
    it("рендерится мобильный вариант: поле только для чтения", () => {
        render(
            <SuggestField
                value={undefined}
                options={OPTIONS}
                tooltipHint="Подсказка"
                tooltipOpen={false}
                inputProps={{}}
                onSelect={vi.fn()}
                onFilter={vi.fn()}
            />,
        );

        expect(getTarget()).toHaveAttribute("readonly");
    });

    it("сам SuggestFieldMobile className и data-test-id применяет", () => {
        // Положительный контроль к тесту ниже: показывает, что props теряются именно
        // в SuggestField.tsx, а не в мобильном компоненте.
        const { container } = renderField({
            className: "custom-class",
            "data-test-id": "suggest",
            onSelect: vi.fn(),
            onFilter: vi.fn(),
        });

        expect(container.querySelector(".custom-class")).not.toBeNull();
        expect(container.querySelector("[data-test-id]")).not.toBeNull();
    });

    it("className и data-test-id до мобильного варианта не доходят", () => {
        // Фиксирует инвариант из SuggestField-ai.md: SuggestField.tsx отдаёт в SuggestFieldMobile
        // явный whitelist props, а в SuggestFieldDesktop — весь {...props}. Поэтому className, id,
        // data-test-id, active и renderInput на мобильной ширине теряются. Расхождение известное,
        // выравнивание меняет наблюдаемое поведение и остаётся решением мейнтейнера — тест
        // покраснеет, если контракт поменяют молча.
        const { container } = render(
            <SuggestField
                value={undefined}
                options={OPTIONS}
                tooltipHint="Подсказка"
                tooltipOpen={false}
                inputProps={{}}
                className="custom-class"
                data-test-id="suggest"
                onSelect={vi.fn()}
                onFilter={vi.fn()}
            />,
        );

        expect(container.querySelector(".custom-class")).toBeNull();
        expect(container.querySelector("[data-test-id]")).toBeNull();
    });
});

/** Прокручивает DropdownMobileBody (родителя listbox) до конца: jsdom не считает размеры сам. */
function scrollBodyToEnd() {
    const body = screen.getByRole("listbox").parentElement;

    if (body === null) {
        throw new Error("DropdownMobileBody не найден: у listbox нет родительского элемента");
    }

    Object.defineProperty(body, "scrollHeight", { configurable: true, value: 300 });
    Object.defineProperty(body, "clientHeight", { configurable: true, value: 100 });
    body.scrollTop = 200;

    fireEvent.scroll(body);
}
