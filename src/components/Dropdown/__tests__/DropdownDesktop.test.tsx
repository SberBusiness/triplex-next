import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DropdownDesktop } from "../desktop/DropdownDesktop";
import { EDropdownAlignment, EDropdownDirection, EDropdownWidth } from "../desktop/enums";
import { EComponentSize } from "../../../enums/EComponentSize";

const VIEWPORT_WIDTH = 1000;
const VIEWPORT_HEIGHT = 800;

/** Прямоугольник управляющего элемента: 100x20 в левом верхнем углу. */
const TARGET_RECT = { top: 100, bottom: 120, left: 200, right: 300, width: 100, height: 20 } as DOMRect;
/** Прямоугольник выпадающего меню: 200x50. */
const DROPDOWN_RECT = { top: 0, bottom: 50, left: 0, right: 200, width: 200, height: 50 } as DOMRect;

/** Текущий прямоугольник управляющего элемента, переопределяется отдельными тестами. */
let targetRect = TARGET_RECT;

const setClientSize = (width: number, height: number) => {
    Object.defineProperty(document.documentElement, "clientWidth", { value: width, configurable: true });
    Object.defineProperty(document.documentElement, "clientHeight", { value: height, configurable: true });
};

interface IDropdownProps extends Partial<React.ComponentProps<typeof DropdownDesktop>> {
    dropdownRef?: React.Ref<HTMLDivElement>;
}

const DropdownWithTarget = ({ dropdownRef, ...props }: IDropdownProps) => {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <>
            <div ref={targetRef} data-testid="target" />
            <DropdownDesktop opened setOpened={() => {}} targetRef={targetRef} ref={dropdownRef} {...props}>
                <span>Dropdown content</span>
            </DropdownDesktop>
        </>
    );
};

const getDropdown = () => document.querySelector(".dropdownDesktop");

describe("DropdownDesktop", () => {
    beforeEach(() => {
        setClientSize(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
        targetRect = TARGET_RECT;
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
            return this.classList.contains("dropdownDesktop") ? DROPDOWN_RECT : targetRect;
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders nothing when closed", () => {
        render(<DropdownWithTarget opened={false} />);

        expect(getDropdown()).toBeNull();
        expect(screen.queryByText("Dropdown content")).toBeNull();
    });

    it("renders children when opened", () => {
        render(<DropdownWithTarget />);

        expect(screen.getByText("Dropdown content")).toBeInTheDocument();
        expect(getDropdown()).not.toBeNull();
    });

    it("applies size class and merges custom className", () => {
        render(<DropdownWithTarget size={EComponentSize.LG} className="custom-class" />);

        expect(getDropdown()).toHaveClass("dropdownDesktop", "lg", "custom-class");
    });

    it("uses MD size by default", () => {
        render(<DropdownWithTarget />);

        expect(getDropdown()).toHaveClass("md");
    });

    it("forwards ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<DropdownWithTarget dropdownRef={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getDropdown());
    });

    it("passes html attributes to the root element", () => {
        render(<DropdownWithTarget id="dropdown-id" role="menu" />);

        expect(getDropdown()).toHaveAttribute("id", "dropdown-id");
        expect(getDropdown()).toHaveAttribute("role", "menu");
    });

    it("merges the style prop over the calculated position", () => {
        render(<DropdownWithTarget style={{ zIndex: 1500 }} />);

        expect(getDropdown()).toHaveStyle("z-index: 1500");
        expect(getDropdown()).toHaveStyle("top: 124px");
    });

    it("toggles the body overflow class while opened", () => {
        const { rerender } = render(<DropdownWithTarget />);

        expect(document.body).toHaveClass("dropdownDesktopOverflowHidden");

        rerender(<DropdownWithTarget opened={false} />);

        expect(document.body).not.toHaveClass("dropdownDesktopOverflowHidden");
    });

    it("removes the body overflow class on unmount", () => {
        const { unmount } = render(<DropdownWithTarget />);

        unmount();

        expect(document.body).not.toHaveClass("dropdownDesktopOverflowHidden");
    });

    describe("vertical position", () => {
        it("opens below the target when there is enough space (AUTO)", () => {
            render(<DropdownWithTarget direction={EDropdownDirection.AUTO} />);

            // bottom управляющего элемента + отступ 4px.
            expect(getDropdown()).toHaveStyle("top: 124px");
        });

        it("opens above the target when there is no space below (AUTO)", () => {
            setClientSize(VIEWPORT_WIDTH, 150);

            render(<DropdownWithTarget direction={EDropdownDirection.AUTO} />);

            // clientHeight - top управляющего элемента + отступ 4px.
            expect(getDropdown()).toHaveStyle("bottom: 54px");
        });

        it("always opens below with direction BOTTOM", () => {
            setClientSize(VIEWPORT_WIDTH, 150);

            render(<DropdownWithTarget direction={EDropdownDirection.BOTTOM} />);

            expect(getDropdown()).toHaveStyle("top: 124px");
        });

        it("always opens above with direction TOP", () => {
            render(<DropdownWithTarget direction={EDropdownDirection.TOP} />);

            expect(getDropdown()).toHaveStyle("bottom: 704px");
        });
    });

    describe("horizontal position", () => {
        it("aligns to the left edge of the target by default", () => {
            render(<DropdownWithTarget />);

            expect(getDropdown()).toHaveStyle("left: 200px");
        });

        it("aligns to the right edge of the target with alignment RIGHT", () => {
            render(<DropdownWithTarget alignment={EDropdownAlignment.RIGHT} />);

            // right управляющего элемента - ширина меню.
            expect(getDropdown()).toHaveStyle("left: 100px");
        });

        it("flips to the right edge when the menu does not fit on the right", () => {
            setClientSize(250, VIEWPORT_HEIGHT);

            render(<DropdownWithTarget alignment={EDropdownAlignment.LEFT} />);

            expect(getDropdown()).toHaveStyle("left: 100px");
        });

        it("never positions the menu outside the left viewport edge", () => {
            // Управляющий элемент у левого края: выравнивание по правому краю увело бы меню за экран.
            targetRect = { top: 100, bottom: 120, left: 0, right: 100, width: 100, height: 20 } as DOMRect;

            render(<DropdownWithTarget alignment={EDropdownAlignment.RIGHT} />);

            expect(getDropdown()).toHaveStyle("left: 0px");
        });
    });

    describe("width", () => {
        it("keeps the content width by default", () => {
            render(<DropdownWithTarget />);

            expect(getDropdown()).not.toHaveStyle("width: 100px");
        });

        it("uses the target width with width TARGET", () => {
            render(<DropdownWithTarget width={EDropdownWidth.TARGET} />);

            expect(getDropdown()).toHaveStyle("width: 100px");
        });

        it("uses the target width as a minimum with width MIN_TARGET", () => {
            render(<DropdownWithTarget width={EDropdownWidth.MIN_TARGET} />);

            expect(getDropdown()).toHaveStyle("min-width: 100px");
        });
    });

    describe("page scroll lock", () => {
        it("prevents wheel events outside the dropdown", () => {
            render(<DropdownWithTarget />);

            const prevented = !fireEvent.wheel(document.body);

            expect(prevented).toBe(true);
        });

        it("does not prevent wheel events inside the dropdown", () => {
            render(<DropdownWithTarget />);

            const prevented = !fireEvent.wheel(screen.getByText("Dropdown content"));

            expect(prevented).toBe(false);
        });

        it("prevents scrolling keys pressed on the document body", () => {
            render(<DropdownWithTarget />);

            const prevented = !fireEvent.keyDown(document.body, { code: "ArrowDown" });

            expect(prevented).toBe(true);
        });

        it("does not prevent keys pressed inside the dropdown", () => {
            render(<DropdownWithTarget />);

            const prevented = !fireEvent.keyDown(screen.getByText("Dropdown content"), { code: "ArrowDown" });

            expect(prevented).toBe(false);
        });

        it("stops preventing wheel events after closing", () => {
            const { rerender } = render(<DropdownWithTarget />);

            rerender(<DropdownWithTarget opened={false} />);

            const prevented = !fireEvent.wheel(document.body);

            expect(prevented).toBe(false);
        });
    });
});
