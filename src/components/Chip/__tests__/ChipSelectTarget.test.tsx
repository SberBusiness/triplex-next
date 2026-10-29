import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EComponentSize } from "../../../enums";
import { ChipSelectTarget, IChipSelectTargetProps } from "../ChipSelect/ChipSelectTarget";
import { EChipType } from "../enums";

const renderTarget = (props: Partial<IChipSelectTargetProps> = {}, ref?: React.Ref<HTMLSpanElement>) =>
    render(
        <ChipSelectTarget opened={false} setOpened={() => {}} onClear={() => {}} {...props} ref={ref}>
            Выберите опцию
        </ChipSelectTarget>,
    );

const getTarget = () => screen.getByRole("button", { name: "Выберите опцию" });
const getClearButton = () => within(getTarget()).getByRole("button");

describe("ChipSelectTarget", () => {
    it("forwards ref, className and span attributes", () => {
        const ref = React.createRef<HTMLSpanElement>();
        renderTarget({ className: "custom-target", "aria-controls": "options", id: "target" }, ref);

        const target = getTarget();
        expect(ref.current).toBe(target);
        expect(target).toBeInstanceOf(HTMLSpanElement);
        expect(target).toHaveClass("chip", "custom-target");
        expect(target).toHaveAttribute("id", "target");
        expect(target).toHaveAttribute("aria-controls", "options");
        expect(target).toHaveAttribute("aria-expanded", "false");
        expect(target).toHaveAttribute("tabindex", "0");
        expect(within(target).queryByRole("button")).not.toBeInTheDocument();
    });

    it.each([false, true])("requests the opposite opened value on click when opened=%s", (opened) => {
        const setOpened = vi.fn();
        const onClick = vi.fn();
        renderTarget({ opened, setOpened, onClick });
        const target = getTarget();

        fireEvent.click(target);

        expect(setOpened).toHaveBeenCalledExactlyOnceWith(!opened);
        expect(onClick).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ type: "click", target }));
        expect(setOpened.mock.invocationCallOrder[0]).toBeLessThan(onClick.mock.invocationCallOrder[0]);
        // Открытость управляемая: без нового opened target не меняет aria-expanded самостоятельно.
        expect(target).toHaveAttribute("aria-expanded", String(opened));
    });

    it.each(["Enter", "Space"])("opens the closed list on %s and forwards the prevented event", (code) => {
        const setOpened = vi.fn();
        const onKeyDown = vi.fn();
        renderTarget({ setOpened, onKeyDown });
        const target = getTarget();

        expect(fireEvent.keyDown(target, { code })).toBe(false);

        expect(setOpened).toHaveBeenCalledExactlyOnceWith(true);
        expect(onKeyDown).toHaveBeenCalledExactlyOnceWith(
            expect.objectContaining({ code, target, defaultPrevented: true }),
        );
        expect(setOpened.mock.invocationCallOrder[0]).toBeLessThan(onKeyDown.mock.invocationCallOrder[0]);
    });

    it.each(["Enter", "Space"])("keeps the open list open on %s and forwards onKeyDown", (code) => {
        const setOpened = vi.fn();
        const onKeyDown = vi.fn();
        renderTarget({ opened: true, setOpened, onKeyDown });
        const target = getTarget();

        fireEvent.keyDown(target, { code });

        expect(setOpened).not.toHaveBeenCalled();
        expect(onKeyDown).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ code, target }));
    });

    it.each([false, true])("handles Tab without preventing focus traversal when opened=%s", (opened) => {
        const setOpened = vi.fn();
        const onKeyDown = vi.fn();
        renderTarget({ opened, setOpened, onKeyDown });
        const target = getTarget();

        expect(fireEvent.keyDown(target, { code: "Tab" })).toBe(true);

        if (opened) {
            expect(setOpened).toHaveBeenCalledExactlyOnceWith(false);
        } else {
            expect(setOpened).not.toHaveBeenCalled();
        }
        expect(onKeyDown).toHaveBeenCalledExactlyOnceWith(
            expect.objectContaining({ code: "Tab", target, defaultPrevented: false }),
        );
    });

    it("forwards other keys without requesting a change in opened", () => {
        const setOpened = vi.fn();
        const onKeyDown = vi.fn();
        renderTarget({ setOpened, onKeyDown });
        const target = getTarget();

        fireEvent.keyDown(target, { code: "ArrowDown" });

        expect(setOpened).not.toHaveBeenCalled();
        expect(onKeyDown).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ code: "ArrowDown", target }));
    });

    it("calls onClear without toggling the open list or bubbling the click", async () => {
        const user = userEvent.setup();
        const onClear = vi.fn();
        const setOpened = vi.fn();
        const onClick = vi.fn();
        renderTarget({ selected: true, opened: true, onClear, setOpened, onClick });

        await user.click(getClearButton());

        expect(onClear).toHaveBeenCalledExactlyOnceWith();
        expect(setOpened).not.toHaveBeenCalled();
        expect(onClick).not.toHaveBeenCalled();
        expect(getTarget()).toHaveAttribute("aria-expanded", "true");
        expect(getTarget()).toHaveClass("selected");
    });

    it.each(["{Enter}", "[Space]"])("activates clear with %s without reaching the target handlers", async (key) => {
        const user = userEvent.setup();
        const onClear = vi.fn();
        const setOpened = vi.fn();
        const onKeyDown = vi.fn();
        const onClick = vi.fn();
        renderTarget({ selected: true, onClear, setOpened, onKeyDown, onClick });

        getClearButton().focus();
        await user.keyboard(key);

        expect(onClear).toHaveBeenCalledExactlyOnceWith();
        expect(setOpened).not.toHaveBeenCalled();
        expect(onKeyDown).not.toHaveBeenCalled();
        expect(onClick).not.toHaveBeenCalled();
    });

    it.each([
        { size: EComponentSize.SM, iconSize: 16 },
        { size: EComponentSize.MD, iconSize: 20 },
        { size: EComponentSize.LG, iconSize: 24 },
    ])("passes $size to the chip and both automatic postfix variants", ({ size, iconSize }) => {
        const { rerender } = renderTarget({ size });
        expect(getTarget()).toHaveClass(size);
        expect(getTarget().querySelector("svg")).toHaveAttribute("name", `CaretdownStrokeSrvIcon${iconSize}`);

        rerender(
            <ChipSelectTarget size={size} selected opened={true} setOpened={() => {}} onClear={() => {}}>
                Выберите опцию
            </ChipSelectTarget>,
        );

        expect(getTarget()).toHaveClass(size, "selected");
        expect(getTarget()).toHaveAttribute("aria-expanded", "true");
        expect(getClearButton().querySelector("svg")).toHaveAttribute("name", `CrossStrokeSrvIcon${iconSize}`);
    });

    it.each([
        { type: EChipType.TYPE_1, className: "type1" },
        { type: EChipType.TYPE_2, className: "type2" },
    ])("passes chip type $type", ({ type, className }) => {
        renderTarget({ type });
        expect(getTarget()).toHaveClass(className);
    });

    it("excludes a disabled unselected target from Tab", async () => {
        const user = userEvent.setup();
        renderTarget({ disabled: true });

        expect(getTarget()).toHaveClass("disabled");
        expect(getTarget()).toHaveAttribute("tabindex", "-1");
        await user.tab();
        expect(getTarget()).not.toHaveFocus();
    });

    it("renders inherited prefix and a custom postfix instead of automatic clear", () => {
        renderTarget({ selected: true, prefix: <span>Prefix</span>, postfix: <span>Postfix</span> });

        const target = screen.getByRole("button");
        expect(target).toHaveTextContent("Prefix");
        expect(target).toHaveTextContent("Postfix");
        expect(within(target).queryByRole("button")).not.toBeInTheDocument();
    });
});
