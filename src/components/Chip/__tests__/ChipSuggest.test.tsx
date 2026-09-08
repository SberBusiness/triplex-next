import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { ChipSuggest } from "@sberbusiness/triplex-next/components/Chip/ChipSuggest/ChipSuggest";
import { IChipSuggestProps } from "@sberbusiness/triplex-next/components/Chip/ChipSuggest/types";
import { EChipType } from "@sberbusiness/triplex-next/components/Chip/enums";
import { ISuggestOption } from "@sberbusiness/triplex-next/components/Suggest/types";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

const TARGET_TEST_ID = "chip-suggest";

const options: ISuggestOption[] = [
    { id: "1", label: "Первая опция" },
    { id: "2", label: "Вторая опция" },
];

const renderChipSuggest = (props: Partial<IChipSuggestProps> = {}, ref?: React.Ref<HTMLDivElement>) =>
    render(
        <ChipSuggest
            value={undefined}
            options={options}
            size={EComponentSize.MD}
            onSelect={() => {}}
            onFilter={() => {}}
            label="Выберите опцию"
            {...props}
            targetProps={{ clearSelected: () => {}, "data-testid": TARGET_TEST_ID, ...props.targetProps }}
            ref={ref}
        />,
    );

const getTarget = () => screen.getByTestId(TARGET_TEST_ID);

describe("ChipSuggest", () => {
    test("renders label and role button when value not selected", () => {
        renderChipSuggest();

        const chip = getTarget();
        expect(chip).toBeInTheDocument();
        expect(chip).toHaveAttribute("role", "button");
        expect(chip).toHaveTextContent("Выберите опцию");
    });

    test("renders selected value when value is provided", () => {
        renderChipSuggest({ value: options[0] });

        expect(getTarget()).toHaveTextContent(options[0].label);
    });

    test("renders displayedValue instead of value label when provided", () => {
        renderChipSuggest({ value: options[0], displayedValue: "Custom Display" });

        expect(getTarget()).toHaveTextContent("Custom Display");
    });

    test("ignores displayedValue while no value is selected", () => {
        renderChipSuggest({ displayedValue: "Custom Display" });

        expect(getTarget()).toHaveTextContent("Выберите опцию");
    });

    describe("root element", () => {
        test("forwards ref to the root element", () => {
            const ref = React.createRef<HTMLDivElement>();
            renderChipSuggest({}, ref);

            expect(ref.current).toBeInstanceOf(HTMLDivElement);
            expect(ref.current).toContainElement(getTarget());
        });

        // Фиксирует изменение из release notes 1.46.0: setRef обёрнут в useCallback,
        // поэтому стабильный callback-ref не отцепляется и не прицепляется заново на ререндере.
        test("does not reattach callback ref on rerender", () => {
            const ref = vi.fn();
            const { rerender } = renderChipSuggest({}, ref);

            expect(ref).toHaveBeenCalledTimes(1);

            rerender(
                <ChipSuggest
                    value={undefined}
                    options={options}
                    size={EComponentSize.MD}
                    onSelect={() => {}}
                    onFilter={() => {}}
                    label="Выберите опцию"
                    targetProps={{ clearSelected: () => {}, "data-testid": TARGET_TEST_ID }}
                    ref={ref}
                />,
            );

            expect(ref).toHaveBeenCalledTimes(1);
        });

        test("merges className with the chip group class on the root element", () => {
            const ref = React.createRef<HTMLDivElement>();
            renderChipSuggest({ className: "custom-root" }, ref);

            expect(ref.current).toHaveClass("chipGroupItem", "custom-root");
        });
    });

    describe("targetProps", () => {
        test("passes rest props to the target chip", () => {
            renderChipSuggest({ targetProps: { className: "custom-target", disabled: true } });

            const chip = getTarget();
            expect(chip).toHaveClass("chip", "custom-target", "disabled");
        });

        // Проверяется только то, что type с самого ChipSuggest доезжает до чипса.
        // Взаимодействие с targetProps.type намеренно не фиксируется тестом: сейчас
        // targetProps.type не работает, и это известный баг, а не контракт
        // (см. «Инварианты» в ChipSuggest-ai.md).
        test("applies type to the target chip", () => {
            renderChipSuggest({ type: EChipType.TYPE_2 });

            expect(getTarget()).toHaveClass("type2");
        });
    });

    describe("dropdownProps", () => {
        // В jsdom нет настоящего layout, поэтому tabbable со стандартным displayCheck не находит
        // ни одного табуемого узла и FocusTrap падает при активации. Проверка отключается через
        // публичный focusTrapProps — заодно проверяется, что он доходит до FocusTrap.
        const focusTrapProps = {
            focusTrapOptions: {
                tabbableOptions: { displayCheck: "none" as const },
                // Фокус сразу, без setTimeout — чтобы не оставлять висящих таймеров после теста.
                delayInitialFocus: false,
            },
        };

        test("onOpen is called when the target opens the dropdown", () => {
            const onOpen = vi.fn();
            renderChipSuggest({ dropdownProps: { onOpen, focusTrapProps } });

            expect(onOpen).not.toHaveBeenCalled();

            fireEvent.click(getTarget());

            expect(onOpen).toHaveBeenCalledTimes(1);
            expect(getTarget()).toHaveAttribute("aria-expanded", "true");
        });

        test("renders label and options inside the opened dropdown", () => {
            renderChipSuggest({ dropdownProps: { focusTrapProps } });

            fireEvent.click(getTarget());

            options.forEach(({ label }) => expect(screen.getByText(label)).toBeInTheDocument());
            // label используется и на target-элементе, и лейблом поля фильтрации в дропдауне.
            expect(screen.getAllByText("Выберите опцию")).toHaveLength(2);
        });
    });
});
