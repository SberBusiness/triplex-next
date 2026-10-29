import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Suggest } from "@sberbusiness/triplex-next/components/Suggest/Suggest";
import { ChipSuggestTarget } from "@sberbusiness/triplex-next/components/Chip/ChipSuggest/ChipSuggestTarget";
import { IChipSuggestTargetProps } from "@sberbusiness/triplex-next/components/Chip/ChipSuggest/types";
import { ISuggestOption } from "@sberbusiness/triplex-next/components/Suggest/types";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EChipType } from "../enums";

const TARGET_TEST_ID = "chip-suggest-target";

const OPTIONS: ISuggestOption[] = [
    { id: "1", label: "Первая опция" },
    { id: "2", label: "Вторая опция" },
];

/**
 * ChipSuggestTarget берёт value и dropdownOpen из SuggestContext, поэтому рендерится только внутри Suggest.
 * Сам выпадающий список в этих тестах не нужен: состояние видно по aria-expanded на target-элементе.
 */
const renderTarget = (
    targetProps: Partial<IChipSuggestTargetProps<ISuggestOption>> = {},
    value?: ISuggestOption,
    ref?: React.Ref<HTMLSpanElement>,
) =>
    render(
        <Suggest value={value} options={OPTIONS} size={EComponentSize.MD} onSelect={() => {}} onFilter={() => {}}>
            <ChipSuggestTarget data-testid={TARGET_TEST_ID} {...targetProps} ref={ref}>
                Выберите опцию
            </ChipSuggestTarget>
        </Suggest>,
    );

/** У кнопки очистки такая же role="button", как у самого Chip, поэтому target ищется по data-testid. */
const getTarget = () => screen.getByTestId(TARGET_TEST_ID);

/**
 * Кнопка очистки — единственный role="button" ВНУТРИ чипса: сам чипс служит контейнером
 * поиска и в результат within() не попадает, поэтому семантический запрос однозначен.
 */
const getClearButton = () => within(getTarget()).getByRole("button");
const queryClearButton = () => within(getTarget()).queryByRole("button");

describe("ChipSuggestTarget", () => {
    test("renders children and is collapsed by default", () => {
        renderTarget();

        const target = getTarget();
        expect(target).toHaveTextContent("Выберите опцию");
        expect(target).toHaveAttribute("aria-expanded", "false");
        expect(target).not.toHaveClass("selected");
    });

    test("marks target as selected when value is set in context", () => {
        renderTarget({}, OPTIONS[0]);

        expect(getTarget()).toHaveClass("selected");
    });

    // Стрелка выпадающего списка — <span> без семантики, отдельным unit-тестом не покрывается:
    // её видимое состояние держит скриншот-регрессия (story VisualTests), а факт раскрытия
    // списка проверяется ниже по aria-expanded в блоке «dropdown toggling».
    describe("postfix", () => {
        test("renders no clear button while value is not selected", () => {
            renderTarget();

            expect(queryClearButton()).not.toBeInTheDocument();
        });

        test("renders clear button when value is selected", () => {
            renderTarget({}, OPTIONS[0]);

            expect(getClearButton()).toBeInTheDocument();
        });
    });

    describe("dropdown toggling", () => {
        test("click toggles dropdown and calls onClick with the event", () => {
            const onClick = vi.fn();
            renderTarget({ onClick });

            fireEvent.click(getTarget());

            expect(getTarget()).toHaveAttribute("aria-expanded", "true");
            expect(onClick).toHaveBeenCalledTimes(1);
            expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click" }));

            fireEvent.click(getTarget());

            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
        });

        test.each([["Enter"], ["Space"]])("%s key toggles dropdown and calls onKeyDown", (code) => {
            const onKeyDown = vi.fn();
            renderTarget({ onKeyDown });

            fireEvent.keyDown(getTarget(), { code });

            expect(getTarget()).toHaveAttribute("aria-expanded", "true");
            expect(onKeyDown).toHaveBeenCalledTimes(1);
            expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ code }));

            fireEvent.keyDown(getTarget(), { code });

            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
        });

        test("does not toggle dropdown on other keys", () => {
            renderTarget();

            fireEvent.keyDown(getTarget(), { code: "ArrowDown" });

            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
        });
    });

    describe("clear button", () => {
        test("click calls clearSelected and does not toggle dropdown", () => {
            const clearSelected = vi.fn();
            renderTarget({ clearSelected }, OPTIONS[0]);

            fireEvent.click(getClearButton());

            expect(clearSelected).toHaveBeenCalledTimes(1);
            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
        });

        test.each([["Enter"], ["Space"]])("%s key on clear button does not toggle dropdown", (code) => {
            renderTarget({ clearSelected: () => {} }, OPTIONS[0]);

            fireEvent.keyDown(getClearButton(), { code });

            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
        });
    });

    describe("props forwarding", () => {
        test("forwards ref to the root span", () => {
            const ref = React.createRef<HTMLSpanElement>();
            renderTarget({}, undefined, ref);

            expect(ref.current).toBeInstanceOf(HTMLSpanElement);
            expect(ref.current).toBe(getTarget());
        });

        test("merges className and passes rest props to Chip", () => {
            renderTarget({ className: "custom-target", disabled: true });

            const target = getTarget();
            expect(target).toHaveClass("chip", "custom-target", "disabled");
            expect(target).toHaveAttribute("tabindex", "-1");
        });

        test.each([
            { size: EComponentSize.SM, iconSize: 16 },
            { size: EComponentSize.MD, iconSize: 20 },
            { size: EComponentSize.LG, iconSize: 24 },
        ])("passes $size to the chip and clear button", ({ size, iconSize }) => {
            renderTarget({ size, "aria-controls": "options" }, OPTIONS[0]);

            expect(getTarget()).toHaveClass(size);
            expect(getTarget()).toHaveAttribute("aria-controls", "options");
            expect(getClearButton().querySelector("svg")).toHaveAttribute("name", `CrossStrokeSrvIcon${iconSize}`);
        });

        test.each([
            { type: EChipType.TYPE_1, className: "type1" },
            { type: EChipType.TYPE_2, className: "type2" },
        ])("passes chip type $type", ({ type, className }) => {
            renderTarget({ type });
            expect(getTarget()).toHaveClass(className);
        });

        test("keeps a callback ref attached while toggling and clears it on unmount", () => {
            const ref = vi.fn();
            const { unmount } = renderTarget({}, undefined, ref);
            const target = getTarget();

            fireEvent.click(target);
            expect(ref).toHaveBeenCalledExactlyOnceWith(target);

            unmount();
            expect(ref).toHaveBeenLastCalledWith(null);
        });

        test("exposes a component displayName for React DevTools", () => {
            expect(ChipSuggestTarget).toHaveProperty("displayName", "ChipSuggestTarget");
        });
    });

    describe("native clear activation", () => {
        test.each(["{Enter}", "[Space]"])("%s clears without closing the open dropdown", async (key) => {
            const user = userEvent.setup();
            const clearSelected = vi.fn();
            const onClick = vi.fn();
            const onKeyDown = vi.fn();
            renderTarget({ clearSelected, onClick, onKeyDown }, OPTIONS[0]);
            fireEvent.click(getTarget());
            expect(getTarget()).toHaveAttribute("aria-expanded", "true");
            onClick.mockClear();

            getClearButton().focus();
            await user.keyboard(key);

            expect(clearSelected).toHaveBeenCalledExactlyOnceWith();
            expect(onClick).not.toHaveBeenCalled();
            expect(onKeyDown).not.toHaveBeenCalled();
            expect(getTarget()).toHaveAttribute("aria-expanded", "true");
        });

        test("accepts an omitted clearSelected without changing the selection", () => {
            renderTarget({}, OPTIONS[0]);

            fireEvent.click(getClearButton());

            expect(getTarget()).toHaveClass("selected");
            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
        });

        test("updates the postfix when the consumer clears the controlled context value", async () => {
            const user = userEvent.setup();
            const ControlledTarget = () => {
                const [value, setValue] = React.useState<ISuggestOption | undefined>(OPTIONS[0]);

                return (
                    <Suggest
                        value={value}
                        options={OPTIONS}
                        size={EComponentSize.MD}
                        onSelect={setValue}
                        onFilter={() => {}}
                    >
                        <ChipSuggestTarget data-testid={TARGET_TEST_ID} clearSelected={() => setValue(undefined)}>
                            Выберите опцию
                        </ChipSuggestTarget>
                    </Suggest>
                );
            };
            render(<ControlledTarget />);
            expect(getTarget()).toHaveClass("selected");

            await user.click(getClearButton());

            expect(getTarget()).not.toHaveClass("selected");
            expect(queryClearButton()).not.toBeInTheDocument();
            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
            expect(getTarget().querySelector("svg")).toHaveAttribute("name", "CaretdownStrokeSrvIcon20");
        });
    });
});
