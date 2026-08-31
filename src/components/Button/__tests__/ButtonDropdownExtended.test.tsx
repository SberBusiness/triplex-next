import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ButtonDropdownExtended, IButtonDropdownExtendedProps } from "../ButtonDropdownExtended";
import { Dropdown } from "../../Dropdown/Dropdown";
import { DropdownList } from "../../Dropdown/desktop/DropdownList";

type THarnessProps = Omit<IButtonDropdownExtendedProps, "renderButton" | "renderDropdown" | "dropdownRef">;

/**
 * Обёртка, повторяющая реальный сценарий использования: кнопка-триггер и выпадающий блок,
 * отрисованный в портале (как это делает Dropdown) и связанный с компонентом через dropdownRef.
 */
const Harness = (props: THarnessProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    return (
        <ButtonDropdownExtended
            {...props}
            dropdownRef={dropdownRef}
            renderButton={({ opened, setOpened }) => (
                <button type="button" onClick={() => setOpened(!opened)}>
                    {opened ? "opened" : "closed"}
                </button>
            )}
            renderDropdown={({ opened, className, setOpened }) =>
                opened
                    ? createPortal(
                          <div ref={dropdownRef} className={className} data-testid="dropdown">
                              <button type="button" onClick={() => setOpened(false)}>
                                  close from dropdown
                              </button>
                          </div>,
                          document.body,
                      )
                    : null
            }
        />
    );
};

const getTrigger = () => screen.getByRole("button", { name: /opened|closed/ });

describe("ButtonDropdownExtended", () => {
    it("renders trigger and keeps dropdown closed by default", () => {
        render(<Harness />);

        expect(getTrigger()).toHaveTextContent("closed");
        expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
    });

    it("passes internal className to renderDropdown", () => {
        render(<Harness />);
        fireEvent.click(getTrigger());

        expect(screen.getByTestId("dropdown")).toHaveClass("buttonDropdownExtendedBlock");
    });

    it("merges className into the root element and spreads rest props", () => {
        const { container } = render(<Harness className="custom-class" id="root-id" data-testid="root" />);
        const root = container.firstElementChild;

        expect(root).toHaveClass("buttonDropdownExtended");
        expect(root).toHaveClass("custom-class");
        expect(root).toHaveAttribute("id", "root-id");
        expect(root).toHaveAttribute("data-testid", "root");
    });

    it("exposes Dropdown and DropdownList as static subcomponents", () => {
        expect(ButtonDropdownExtended.Dropdown).toBe(Dropdown);
        expect(ButtonDropdownExtended.DropdownList).toBe(DropdownList);
    });

    describe("uncontrolled mode", () => {
        it("toggles opened state from renderButton", () => {
            render(<Harness />);

            fireEvent.click(getTrigger());
            expect(getTrigger()).toHaveTextContent("opened");
            expect(screen.getByTestId("dropdown")).toBeInTheDocument();

            fireEvent.click(getTrigger());
            expect(getTrigger()).toHaveTextContent("closed");
            expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
        });

        it("closes from renderDropdown", () => {
            render(<Harness />);
            fireEvent.click(getTrigger());

            fireEvent.click(screen.getByRole("button", { name: "close from dropdown" }));

            expect(getTrigger()).toHaveTextContent("closed");
        });

        it("does not call setOpened", () => {
            const setOpened = vi.fn();
            render(<Harness setOpened={setOpened} />);

            fireEvent.click(getTrigger());

            expect(getTrigger()).toHaveTextContent("opened");
            expect(setOpened).not.toHaveBeenCalled();
        });

        it("keeps the uncontrolled mode chosen on mount even if opened arrives later", () => {
            const { rerender } = render(<Harness />);
            fireEvent.click(getTrigger());
            expect(getTrigger()).toHaveTextContent("opened");

            rerender(<Harness opened={false} />);

            expect(getTrigger()).toHaveTextContent("opened");
        });
    });

    describe("controlled mode", () => {
        it("renders the state passed via opened", () => {
            render(<Harness opened setOpened={vi.fn()} />);

            expect(getTrigger()).toHaveTextContent("opened");
            expect(screen.getByTestId("dropdown")).toBeInTheDocument();
        });

        it("calls setOpened instead of changing internal state", () => {
            const setOpened = vi.fn();
            render(<Harness opened setOpened={setOpened} />);

            fireEvent.click(getTrigger());

            expect(setOpened).toHaveBeenCalledTimes(1);
            expect(setOpened).toHaveBeenCalledWith(false);
            expect(getTrigger()).toHaveTextContent("opened");
        });

        it("does not throw when setOpened is not passed", () => {
            render(<Harness opened />);

            expect(() => fireEvent.click(getTrigger())).not.toThrow();
            expect(getTrigger()).toHaveTextContent("opened");
        });
    });

    describe("closing by keyboard", () => {
        it("closes on Escape", () => {
            const setOpened = vi.fn();
            render(<Harness opened setOpened={setOpened} />);

            fireEvent.keyDown(document, { code: "Escape" });

            expect(setOpened).toHaveBeenCalledWith(false);
        });

        it("closes on Tab when closeOnTab is set", () => {
            const setOpened = vi.fn();
            render(<Harness opened setOpened={setOpened} closeOnTab />);

            fireEvent.keyDown(document, { code: "Tab" });

            expect(setOpened).toHaveBeenCalledWith(false);
        });

        it("ignores Tab when closeOnTab is not set", () => {
            const setOpened = vi.fn();
            render(<Harness opened setOpened={setOpened} />);

            fireEvent.keyDown(document, { code: "Tab" });

            expect(setOpened).not.toHaveBeenCalled();
        });

        it("ignores other keys", () => {
            const setOpened = vi.fn();
            render(<Harness opened setOpened={setOpened} closeOnTab />);

            fireEvent.keyDown(document, { code: "Enter" });

            expect(setOpened).not.toHaveBeenCalled();
        });

        it("does not listen while closed", () => {
            const setOpened = vi.fn();
            render(<Harness opened={false} setOpened={setOpened} closeOnTab />);

            fireEvent.keyDown(document, { code: "Escape" });
            fireEvent.keyDown(document, { code: "Tab" });

            expect(setOpened).not.toHaveBeenCalled();
        });

        it("closes in uncontrolled mode", () => {
            render(<Harness />);
            fireEvent.click(getTrigger());

            fireEvent.keyDown(document, { code: "Escape" });

            expect(getTrigger()).toHaveTextContent("closed");
            expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
        });

        it("removes listeners on unmount", () => {
            const setOpened = vi.fn();
            const { unmount } = render(<Harness opened setOpened={setOpened} />);

            unmount();
            fireEvent.keyDown(document, { code: "Escape" });

            expect(setOpened).not.toHaveBeenCalled();
        });

        it("removes listeners after closing", () => {
            const setOpened = vi.fn();
            const { rerender } = render(<Harness opened setOpened={setOpened} />);

            rerender(<Harness opened={false} setOpened={setOpened} />);
            fireEvent.keyDown(document, { code: "Escape" });

            expect(setOpened).not.toHaveBeenCalled();
        });
    });

    describe("closing by click outside", () => {
        const renderWithOutsideNode = (props: THarnessProps) => {
            const result = render(
                <>
                    <Harness {...props} />
                    <div data-testid="outside">outside</div>
                </>,
            );

            return result;
        };

        it("closes on mousedown outside of the trigger and the dropdown", () => {
            const setOpened = vi.fn();
            renderWithOutsideNode({ opened: true, setOpened });

            fireEvent.mouseDown(screen.getByTestId("outside"));

            expect(setOpened).toHaveBeenCalledWith(false);
        });

        it("closes on touchstart outside of the trigger and the dropdown", () => {
            const setOpened = vi.fn();
            renderWithOutsideNode({ opened: true, setOpened });

            fireEvent.touchStart(screen.getByTestId("outside"));

            expect(setOpened).toHaveBeenCalledWith(false);
        });

        it("keeps opened on mousedown inside the trigger container", () => {
            const setOpened = vi.fn();
            renderWithOutsideNode({ opened: true, setOpened });

            fireEvent.mouseDown(getTrigger());

            expect(setOpened).not.toHaveBeenCalled();
        });

        it("keeps opened on mousedown inside the dropdown", () => {
            const setOpened = vi.fn();
            renderWithOutsideNode({ opened: true, setOpened });

            fireEvent.mouseDown(screen.getByTestId("dropdown"));

            expect(setOpened).not.toHaveBeenCalled();
        });

        it("does not listen while closed", () => {
            const setOpened = vi.fn();
            renderWithOutsideNode({ opened: false, setOpened });

            fireEvent.mouseDown(screen.getByTestId("outside"));

            expect(setOpened).not.toHaveBeenCalled();
        });

        it("removes listeners on unmount", () => {
            const setOpened = vi.fn();
            const { unmount } = renderWithOutsideNode({ opened: true, setOpened });
            const outside = screen.getByTestId("outside");

            unmount();
            fireEvent.mouseDown(outside);
            fireEvent.touchStart(outside);

            expect(setOpened).not.toHaveBeenCalled();
        });
    });
    describe("forwardRef", () => {
        const renderWithRef = (ref: React.Ref<HTMLDivElement>) =>
            render(
                <ButtonDropdownExtended
                    ref={ref}
                    data-testid="root"
                    dropdownRef={{ current: null }}
                    renderButton={() => <button type="button">inside</button>}
                    renderDropdown={() => null}
                />,
            );

        it("forwards object ref to the root element", () => {
            const ref = React.createRef<HTMLDivElement>();

            renderWithRef(ref);

            expect(ref.current).toBeInstanceOf(HTMLDivElement);
            expect(ref.current).toBe(screen.getByTestId("root"));
        });

        it("forwards callback ref to the root element", () => {
            const ref = vi.fn();

            renderWithRef(ref);

            expect(ref).toHaveBeenCalledWith(screen.getByTestId("root"));
        });

        it("keeps the internal container ref working while ref is forwarded", () => {
            const setOpened = vi.fn();
            const ref = React.createRef<HTMLDivElement>();

            render(
                <>
                    <ButtonDropdownExtended
                        ref={ref}
                        opened
                        setOpened={setOpened}
                        dropdownRef={{ current: null }}
                        renderButton={() => <button type="button">inside</button>}
                        renderDropdown={() => null}
                    />
                    <div data-testid="outside" />
                </>,
            );

            // Клик внутри корневого элемента не считается кликом снаружи — за это отвечает containerRef.
            fireEvent.mouseDown(screen.getByRole("button", { name: "inside" }));
            expect(setOpened).not.toHaveBeenCalled();

            fireEvent.mouseDown(screen.getByTestId("outside"));
            expect(setOpened).toHaveBeenCalledWith(false);
        });

        it("has displayName", () => {
            expect(ButtonDropdownExtended.displayName).toBe("ButtonDropdownExtended");
        });
    });
});
