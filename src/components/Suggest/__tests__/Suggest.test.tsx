import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Suggest } from "../Suggest";
import { useSuggestContext } from "../SuggestContext";
import { ISuggestOption, ISuggestProps } from "../types";
import { EComponentSize } from "../../../enums/EComponentSize";

const OPTIONS: ISuggestOption[] = [
    { id: "a", label: "Первая опция" },
    { id: "b", label: "Вторая опция" },
];

/** Управляющий элемент: пишет наружу значения контекста и умеет открывать выпадающий список. */
const Target = () => {
    const { inputValue, dropdownOpen, dropdownListId, setDropdownOpen, onFilter, onSelect } = useSuggestContext();

    return (
        <div>
            <input
                aria-controls={dropdownListId}
                aria-expanded={dropdownOpen}
                value={inputValue}
                onChange={(event) => onFilter(event.target.value)}
            />
            <button type="button" onClick={() => setDropdownOpen(true)}>
                open
            </button>
            <button type="button" onClick={() => onSelect(OPTIONS[1])}>
                select
            </button>
        </div>
    );
};

/** Выпадающий список в портале: заполняет dropdownRef, как это делает реальный Dropdown. */
const Dropdown = () => {
    const { dropdownOpen, dropdownListId, dropdownRef, options, placeholder, noOptionsText, loading } =
        useSuggestContext();

    if (!dropdownOpen) {
        return null;
    }

    return createPortal(
        <div id={dropdownListId} data-testid="dropdown" ref={dropdownRef}>
            <span data-testid="dropdown-placeholder">{placeholder}</span>
            <span data-testid="dropdown-no-options">{noOptionsText}</span>
            <span data-testid="dropdown-loading">{String(loading)}</span>
            {options.map((option) => (
                <span key={option.id}>{option.label}</span>
            ))}
        </div>,
        document.body,
    );
};

/** Пробрасывает наружу suggestRef из контекста, чтобы проверить, на какой элемент он указывает. */
const SuggestRefProbe = ({ onRef }: { onRef: (node: HTMLDivElement | null) => void }) => {
    const { suggestRef } = useSuggestContext();

    useEffect(() => {
        onRef(suggestRef.current);
    });

    return null;
};

const renderSuggest = (props: Partial<ISuggestProps> = {}, children?: React.ReactNode) =>
    render(
        <Suggest
            data-testid="suggest"
            value={undefined}
            options={OPTIONS}
            size={EComponentSize.MD}
            onSelect={() => {}}
            onFilter={() => {}}
            {...props}
        >
            <Target />
            <Dropdown />
            {children}
        </Suggest>,
    );

describe("Suggest", () => {
    test("renders a div wrapper with children", () => {
        renderSuggest();

        const root = screen.getByTestId("suggest");
        expect(root.tagName).toBe("DIV");
        expect(root).toContainElement(screen.getByRole("textbox"));
    });

    test("forwards ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <Suggest
                data-testid="suggest"
                ref={ref}
                value={undefined}
                options={OPTIONS}
                size={EComponentSize.MD}
                onSelect={() => {}}
                onFilter={() => {}}
            />,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByTestId("suggest"));
    });

    test("supports callback ref", () => {
        const setRef = vi.fn();

        render(
            <Suggest
                data-testid="suggest"
                ref={setRef}
                value={undefined}
                options={OPTIONS}
                size={EComponentSize.MD}
                onSelect={() => {}}
                onFilter={() => {}}
            />,
        );

        expect(setRef).toHaveBeenCalledWith(screen.getByTestId("suggest"));
    });

    test("puts the root element into suggestRef of the context", () => {
        const onRef = vi.fn();

        renderSuggest({}, <SuggestRefProbe onRef={onRef} />);

        expect(onRef).toHaveBeenCalledWith(screen.getByTestId("suggest"));
    });

    test("merges className and spreads rest html attributes to the root element", () => {
        renderSuggest({ className: "custom-class", id: "suggest-id", role: "combobox" });

        const root = screen.getByTestId("suggest");
        expect(root).toHaveClass("custom-class");
        expect(root).toHaveAttribute("id", "suggest-id");
        expect(root).toHaveAttribute("role", "combobox");
    });

    test("does not leak non-html props to the root element", () => {
        renderSuggest({ placeholder: "Начните ввод", noOptionsText: "Ничего не найдено", loading: true });

        const root = screen.getByTestId("suggest");
        expect(root).not.toHaveAttribute("size");
        expect(root).not.toHaveAttribute("placeholder");
        expect(root).not.toHaveAttribute("options");
        expect(root).not.toHaveAttribute("loading");
    });

    test("provides presentational props to descendants through the context", async () => {
        const user = userEvent.setup();

        renderSuggest({ placeholder: "Начните ввод", noOptionsText: "Ничего не найдено", loading: true });

        await user.click(screen.getByRole("button", { name: "open" }));

        expect(screen.getByTestId("dropdown-placeholder")).toHaveTextContent("Начните ввод");
        expect(screen.getByTestId("dropdown-no-options")).toHaveTextContent("Ничего не найдено");
        expect(screen.getByTestId("dropdown-loading")).toHaveTextContent("true");
        expect(screen.getByText(OPTIONS[0].label)).toBeInTheDocument();
    });

    test("initializes the input with the label of the selected value", () => {
        renderSuggest({ value: OPTIONS[0] });

        expect(screen.getByRole("textbox")).toHaveValue(OPTIONS[0].label);
    });

    test("calls onFilter from the context with the typed value", async () => {
        const user = userEvent.setup();
        const onFilter = vi.fn();

        renderSuggest({ onFilter });

        await user.type(screen.getByRole("textbox"), "П");

        expect(onFilter).toHaveBeenCalledWith("П");
    });

    test("calls onSelect from the context with the chosen option and closes the dropdown", async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();

        renderSuggest({ onSelect });

        await user.click(screen.getByRole("button", { name: "open" }));
        expect(screen.getByTestId("dropdown")).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: "select" }));

        expect(onSelect).toHaveBeenCalledWith(OPTIONS[1]);
        expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
        expect(screen.getByRole("textbox")).toHaveValue(OPTIONS[1].label);
    });

    test("closes the dropdown on Escape and stops the event from bubbling further", async () => {
        const user = userEvent.setup();
        const onOuterKeyDown = vi.fn();
        const onKeyDown = vi.fn();

        render(
            <div onKeyDown={onOuterKeyDown}>
                <Suggest
                    data-testid="suggest"
                    value={undefined}
                    options={OPTIONS}
                    size={EComponentSize.MD}
                    onSelect={() => {}}
                    onFilter={() => {}}
                    onKeyDown={onKeyDown}
                >
                    <Target />
                    <Dropdown />
                </Suggest>
            </div>,
        );

        await user.click(screen.getByRole("button", { name: "open" }));
        expect(screen.getByTestId("dropdown")).toBeInTheDocument();

        await user.keyboard("{Escape}");

        expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onOuterKeyDown).not.toHaveBeenCalled();
    });

    test("lets Escape bubble when the dropdown is closed", async () => {
        const user = userEvent.setup();
        const onOuterKeyDown = vi.fn();
        const onKeyDown = vi.fn();

        render(
            <div onKeyDown={onOuterKeyDown}>
                <Suggest
                    data-testid="suggest"
                    value={undefined}
                    options={OPTIONS}
                    size={EComponentSize.MD}
                    onSelect={() => {}}
                    onFilter={() => {}}
                    onKeyDown={onKeyDown}
                >
                    <Target />
                </Suggest>
            </div>,
        );

        screen.getByRole("textbox").focus();
        await user.keyboard("{Escape}");

        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onOuterKeyDown).toHaveBeenCalledTimes(1);
    });

    test("closes the dropdown on mousedown outside the component", async () => {
        const user = userEvent.setup();

        renderSuggest();

        await user.click(screen.getByRole("button", { name: "open" }));
        expect(screen.getByTestId("dropdown")).toBeInTheDocument();

        fireEvent.mouseDown(document.body);

        expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
    });

    test("keeps the dropdown open on mousedown inside the component", async () => {
        const user = userEvent.setup();

        renderSuggest();

        await user.click(screen.getByRole("button", { name: "open" }));

        fireEvent.mouseDown(screen.getByRole("textbox"));

        expect(screen.getByTestId("dropdown")).toBeInTheDocument();
    });

    test("keeps the dropdown open on mousedown inside the dropdown rendered in a portal", async () => {
        const user = userEvent.setup();

        renderSuggest();

        await user.click(screen.getByRole("button", { name: "open" }));

        fireEvent.mouseDown(screen.getByTestId("dropdown"));

        expect(screen.getByTestId("dropdown")).toBeInTheDocument();
    });

    test("does not listen for outside mousedown while the dropdown is closed", () => {
        const addEventListener = vi.spyOn(document, "addEventListener");

        renderSuggest();

        expect(addEventListener).not.toHaveBeenCalledWith("mousedown", expect.any(Function));

        addEventListener.mockRestore();
    });
});
