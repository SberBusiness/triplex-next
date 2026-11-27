import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DropdownListContext } from "../../Dropdown/DropdownListContext";
import { useDropdownListKeyboard } from "../../Dropdown/useDropdownListKeyboard";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { PullerList } from "../PullerList";
import { PullerListItem } from "../PullerListItem";

interface IHarnessProps {
    onSelect?: (id: string) => void;
    ids?: string[];
    keyCodesForSelection?: number[];
}

/** Поле ввода, которое передаёт клавиши списку через useDropdownListKeyboard (фокус остаётся в поле). */
const Harness: React.FC<IHarnessProps> = ({ onSelect, ids = ["a", "b", "c"], keyCodesForSelection }) => {
    const { context, activeDescendant, handleKeyDown } = useDropdownListKeyboard();

    return (
        <DropdownListContext.Provider value={context}>
            <input aria-label="Input" aria-activedescendant={activeDescendant} onKeyDown={handleKeyDown} />
            <PullerList>
                {ids.map((id) => (
                    <PullerListItem
                        key={id}
                        id={id}
                        keyCodesForSelection={keyCodesForSelection}
                        onSelect={() => onSelect?.(id)}
                    >
                        {id}
                    </PullerListItem>
                ))}
            </PullerList>
        </DropdownListContext.Provider>
    );
};

const pressKey = (keyCode: number) => fireEvent.keyDown(screen.getByLabelText("Input"), { keyCode });

describe("PullerList keyboard navigation", () => {
    it("has no active item until the keyboard is used", () => {
        render(<Harness />);

        expect(screen.getByLabelText("Input")).not.toHaveAttribute("aria-activedescendant");
        expect(document.querySelector(".active")).toBeNull();
    });

    it("activates the first item on ArrowDown and moves on", () => {
        render(<Harness />);

        pressKey(EVENT_KEY_CODES.ARROW_DOWN);
        expect(screen.getByLabelText("Input")).toHaveAttribute("aria-activedescendant", "a");
        expect(document.getElementById("a")).toHaveClass("active");

        pressKey(EVENT_KEY_CODES.ARROW_DOWN);
        expect(screen.getByLabelText("Input")).toHaveAttribute("aria-activedescendant", "b");
        expect(document.getElementById("a")).not.toHaveClass("active");
    });

    it("wraps around in both directions", () => {
        render(<Harness />);

        pressKey(EVENT_KEY_CODES.ARROW_UP);
        expect(screen.getByLabelText("Input")).toHaveAttribute("aria-activedescendant", "c");

        pressKey(EVENT_KEY_CODES.ARROW_DOWN);
        expect(screen.getByLabelText("Input")).toHaveAttribute("aria-activedescendant", "a");
    });

    it("selects the active item on Enter", () => {
        const onSelect = vi.fn();

        render(<Harness onSelect={onSelect} />);
        pressKey(EVENT_KEY_CODES.ARROW_DOWN);
        pressKey(EVENT_KEY_CODES.ENTER);

        expect(onSelect).toHaveBeenCalledWith("a");
    });

    it("does not select anything on Enter without an active item", () => {
        const onSelect = vi.fn();

        render(<Harness onSelect={onSelect} />);
        pressKey(EVENT_KEY_CODES.ENTER);

        expect(onSelect).not.toHaveBeenCalled();
    });

    it("respects keyCodesForSelection", () => {
        const onSelect = vi.fn();

        render(<Harness onSelect={onSelect} keyCodesForSelection={[EVENT_KEY_CODES.ENTER]} />);
        pressKey(EVENT_KEY_CODES.ARROW_DOWN);
        pressKey(EVENT_KEY_CODES.SPACE);
        expect(onSelect).not.toHaveBeenCalled();

        pressKey(EVENT_KEY_CODES.ENTER);
        expect(onSelect).toHaveBeenCalledWith("a");
    });

    it("moves the active item to the first one when it disappears", () => {
        const { rerender } = render(<Harness />);

        pressKey(EVENT_KEY_CODES.ARROW_DOWN);
        pressKey(EVENT_KEY_CODES.ARROW_DOWN);
        rerender(<Harness ids={["a", "c"]} />);

        expect(screen.getByLabelText("Input")).toHaveAttribute("aria-activedescendant", "a");
    });

    it("leaves keys to the input when the list is empty", () => {
        render(<Harness ids={[]} />);

        const notPrevented = fireEvent.keyDown(screen.getByLabelText("Input"), {
            keyCode: EVENT_KEY_CODES.ARROW_DOWN,
        });

        expect(notPrevented).toBe(true);
    });

    it("does not pass keyCodesForSelection to the DOM", () => {
        render(<Harness keyCodesForSelection={[EVENT_KEY_CODES.ENTER]} />);

        expect(document.getElementById("a")).not.toHaveAttribute("keyCodesForSelection");
    });
});

describe("PullerList without keyboard provider", () => {
    it("renders items without an active highlight", () => {
        render(
            <PullerList>
                <PullerListItem id="a">a</PullerListItem>
            </PullerList>,
        );

        expect(screen.getByRole("option", { name: "a" })).not.toHaveClass("active");
    });
});
