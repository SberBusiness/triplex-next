import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useSuggest } from "../useSuggest";
import { ISuggestOption } from "../types";

const OPTION_A: ISuggestOption = { id: "a", label: "Первая опция" };
const OPTION_B: ISuggestOption = { id: "b", label: "Вторая опция" };

const renderUseSuggest = (props: Partial<Parameters<typeof useSuggest>[0]> = {}) =>
    renderHook((hookProps: Parameters<typeof useSuggest>[0]) => useSuggest(hookProps), {
        initialProps: {
            value: undefined,
            onSelect: vi.fn(),
            onFilter: vi.fn(),
            ...props,
        } as Parameters<typeof useSuggest>[0],
    });

describe("useSuggest", () => {
    test("initializes inputValue from value label", () => {
        const { result } = renderUseSuggest({ value: OPTION_A });

        expect(result.current.inputValue).toBe(OPTION_A.label);
    });

    test("initializes inputValue with empty string when value is undefined", () => {
        const { result } = renderUseSuggest();

        expect(result.current.inputValue).toBe("");
        expect(result.current.dropdownOpen).toBe(false);
        expect(result.current.activeDescendant).toBeUndefined();
    });

    test("generates unique dropdownListId per hook instance", () => {
        const first = renderUseSuggest();
        const second = renderUseSuggest();

        expect(first.result.current.dropdownListId).toMatch(/^dropdown-list-/);
        expect(first.result.current.dropdownListId).not.toBe(second.result.current.dropdownListId);
    });

    test("syncs inputValue when external value changes", () => {
        const { result, rerender } = renderUseSuggest({ value: OPTION_A });

        act(() => result.current.onFilter("Втор"));
        expect(result.current.inputValue).toBe("Втор");

        rerender({ value: OPTION_B, onSelect: vi.fn(), onFilter: vi.fn() });

        expect(result.current.inputValue).toBe(OPTION_B.label);
    });

    test("resets inputValue to empty string when external value is cleared", () => {
        const { result, rerender } = renderUseSuggest({ value: OPTION_A });

        rerender({ value: undefined, onSelect: vi.fn(), onFilter: vi.fn() });

        expect(result.current.inputValue).toBe("");
    });

    test("onFilter updates inputValue and calls the prop with the new value", () => {
        const onFilter = vi.fn();
        const { result } = renderUseSuggest({ onFilter });

        act(() => result.current.onFilter("Пер"));

        expect(result.current.inputValue).toBe("Пер");
        expect(onFilter).toHaveBeenCalledWith("Пер");
    });

    test("onSelect closes dropdown, puts option label into input and calls the prop with the option", () => {
        const onSelect = vi.fn();
        const { result } = renderUseSuggest({ onSelect });

        act(() => result.current.setDropdownOpen(true));
        expect(result.current.dropdownOpen).toBe(true);

        act(() => result.current.onSelect(OPTION_B));

        expect(result.current.dropdownOpen).toBe(false);
        expect(result.current.inputValue).toBe(OPTION_B.label);
        expect(onSelect).toHaveBeenCalledWith(OPTION_B);
    });

    test("onSelect(undefined) keeps the label of the current value in the input", () => {
        const onSelect = vi.fn();
        const { result } = renderUseSuggest({ value: OPTION_A, onSelect });

        act(() => result.current.onFilter("фильтр"));
        expect(result.current.inputValue).toBe("фильтр");

        act(() => result.current.onSelect(undefined));

        // Поле не очищается: closeDropdown получает undefined и откатывается к label текущего value.
        expect(result.current.inputValue).toBe(OPTION_A.label);
        expect(result.current.dropdownOpen).toBe(false);
        expect(onSelect).toHaveBeenCalledWith(undefined);
    });

    test("closeDropdown restores label of the current value when called without argument", () => {
        const { result } = renderUseSuggest({ value: OPTION_A });

        act(() => result.current.onFilter("что-то другое"));
        act(() => result.current.closeDropdown());

        expect(result.current.inputValue).toBe(OPTION_A.label);
        expect(result.current.dropdownOpen).toBe(false);
    });

    test("closeDropdown puts the passed value into input and resets activeDescendant", () => {
        const { result } = renderUseSuggest({ value: OPTION_A });

        act(() => result.current.setActiveDescendant("a"));
        expect(result.current.activeDescendant).toBe("a");

        act(() => result.current.closeDropdown("явное значение"));

        expect(result.current.inputValue).toBe("явное значение");
        expect(result.current.activeDescendant).toBeUndefined();
    });

    test("closeDropdown uses the latest value after it changed", () => {
        const { result, rerender } = renderUseSuggest({ value: OPTION_A });

        rerender({ value: OPTION_B, onSelect: vi.fn(), onFilter: vi.fn() });
        act(() => result.current.onFilter("фильтр"));
        act(() => result.current.closeDropdown());

        expect(result.current.inputValue).toBe(OPTION_B.label);
    });
});
