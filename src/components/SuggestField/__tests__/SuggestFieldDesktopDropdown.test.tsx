import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, onTestFinished, vi } from "vitest";
import { SuggestFieldDesktopDropdown } from "../desktop/SuggestFieldDesktopDropdown";
import { ISuggestFieldDesktopDropdownProps } from "../desktop/types";
import { ISuggestFieldOption } from "../types";
import { EComponentSize } from "../../../enums";

const OPTIONS: ISuggestFieldOption[] = [
    { id: "a", label: "First option" },
    { id: "b", label: "Second option" },
];

type TRenderProps = Partial<ISuggestFieldDesktopDropdownProps> & Pick<ISuggestFieldDesktopDropdownProps, "onSelect">;

const TargetWrapper: React.FC<TRenderProps> = ({ onSelect, ...props }) => {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div ref={targetRef}>
            <SuggestFieldDesktopDropdown
                value={undefined}
                options={OPTIONS}
                size={EComponentSize.MD}
                listId="suggest-list"
                opened={true}
                targetRef={targetRef}
                setOpened={() => {}}
                onSelect={onSelect}
                {...props}
            />
        </div>
    );
};

const renderDropdown = (props: TRenderProps) => render(<TargetWrapper {...props} />);

/**
 * Прокручиваемый контейнер списка. onScroll висит на самом DropdownList,
 * поэтому событие отправляется в элемент с role="listbox".
 */
const getList = () => screen.getByRole("listbox");

/** Эмулирует прокрутку списка до заданной позиции: jsdom не считает размеры сам. */
const scrollList = (scrollTop: number, { scrollHeight = 300, clientHeight = 100 } = {}) => {
    const list = getList();

    Object.defineProperty(list, "scrollHeight", { configurable: true, value: scrollHeight });
    Object.defineProperty(list, "clientHeight", { configurable: true, value: clientHeight });
    list.scrollTop = scrollTop;

    fireEvent.scroll(list);
};

describe("SuggestFieldDesktopDropdown", () => {
    describe("options rendering", () => {
        it("renders each option as a separate list item", () => {
            renderDropdown({ onSelect: vi.fn() });

            const items = screen.getAllByRole("option");
            expect(items).toHaveLength(OPTIONS.length);
            expect(items[0]).toHaveTextContent(OPTIONS[0].label);
            expect(items[1]).toHaveTextContent(OPTIONS[1].label);
        });

        it("marks the selected option", () => {
            renderDropdown({ value: OPTIONS[1], onSelect: vi.fn() });

            const items = screen.getAllByRole("option");
            expect(items[0]).toHaveAttribute("aria-selected", "false");
            expect(items[1]).toHaveAttribute("aria-selected", "true");
        });

        it("renders option content instead of label", () => {
            renderDropdown({
                options: [{ id: "a", label: "First option", content: <b>Custom content</b> }],
                onSelect: vi.fn(),
            });

            expect(screen.getByText("Custom content")).toBeInTheDocument();
            expect(screen.queryByText("First option")).not.toBeInTheDocument();
        });

        it("applies listId to the list", () => {
            renderDropdown({ onSelect: vi.fn() });

            expect(getList()).toHaveAttribute("id", "suggest-list");
        });
    });

    describe("selection", () => {
        it("calls onSelect with the selected option", () => {
            const onSelect = vi.fn();
            renderDropdown({ onSelect });

            fireEvent.click(screen.getByText(OPTIONS[1].label));

            expect(onSelect).toHaveBeenCalledWith(OPTIONS[1]);
        });
    });

    describe("onScrollEnd", () => {
        it("is called when the list is scrolled to the end", () => {
            const onScrollEnd = vi.fn();
            renderDropdown({ onScrollEnd, onSelect: vi.fn() });

            scrollList(200);

            expect(onScrollEnd).toHaveBeenCalledTimes(1);
        });

        it("is not called before the end of the list", () => {
            const onScrollEnd = vi.fn();
            renderDropdown({ onScrollEnd, onSelect: vi.fn() });

            scrollList(100);

            expect(onScrollEnd).not.toHaveBeenCalled();
        });

        it("is not called while the list is loading", () => {
            const onScrollEnd = vi.fn();
            renderDropdown({ onScrollEnd, listLoading: true, onSelect: vi.fn() });

            scrollList(200);

            expect(onScrollEnd).not.toHaveBeenCalled();
        });
    });

    describe("focus", () => {
        it("mousedown keeps focus on the input and calls the passed onMouseDown", () => {
            const onMouseDown = vi.fn();
            renderDropdown({ onMouseDown, onSelect: vi.fn() });

            const event = createMouseDownEvent();
            getList().dispatchEvent(event);

            expect(event.defaultPrevented).toBe(true);
            expect(onMouseDown).toHaveBeenCalledTimes(1);
        });
    });

    describe("customization", () => {
        it("renderList replaces the list", () => {
            renderDropdown({
                renderList: ({ children }) => <div data-testid="custom-list">{children}</div>,
                onSelect: vi.fn(),
            });

            expect(screen.getByTestId("custom-list")).toBeInTheDocument();
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });

        it("renderListItem replaces the list items", () => {
            // DropdownList клонирует элементы списка и вешает на них ref. Тип renderListItem —
            // обычная функция, поэтому ref до кастомного элемента не доходит и React пишет
            // предупреждение. Гасим его, чтобы не шуметь в выводе: см. «Инварианты» в SuggestField-ai.md.
            // Восстановление через onTestFinished, а не последней строкой: иначе упавший expect
            // оставил бы console.error заглушённым до конца файла (restoreMocks не включён).
            const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
            onTestFinished(() => consoleError.mockRestore());

            renderDropdown({
                renderListItem: ({ children, id }) => <div data-testid={`custom-item-${id}`}>{children}</div>,
                onSelect: vi.fn(),
            });

            expect(screen.getByTestId("custom-item-a")).toHaveTextContent(OPTIONS[0].label);
            expect(screen.getByTestId("custom-item-b")).toHaveTextContent(OPTIONS[1].label);
        });
    });
});

/** Нативный mousedown: fireEvent не возвращает событие, а тесту нужен его defaultPrevented. */
function createMouseDownEvent(): MouseEvent {
    return new MouseEvent("mousedown", { bubbles: true, cancelable: true });
}
