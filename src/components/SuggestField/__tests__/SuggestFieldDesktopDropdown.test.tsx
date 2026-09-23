import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SuggestFieldDesktopDropdown } from "../desktop/SuggestFieldDesktopDropdown";
import { ISuggestFieldDesktopDropdownProps } from "../desktop/types";
import { ISuggestFieldOption } from "../types";
import { EComponentSize } from "../../../enums";

const OPTIONS: ISuggestFieldOption[] = [
    { id: "a", label: "Первая опция" },
    { id: "b", label: "Вторая опция" },
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
    describe("рендер опций", () => {
        it("рендерит каждую опцию отдельным элементом списка", () => {
            renderDropdown({ onSelect: vi.fn() });

            const items = screen.getAllByRole("option");
            expect(items).toHaveLength(OPTIONS.length);
            expect(items[0]).toHaveTextContent(OPTIONS[0].label);
            expect(items[1]).toHaveTextContent(OPTIONS[1].label);
        });

        it("отмечает выбранную опцию", () => {
            renderDropdown({ value: OPTIONS[1], onSelect: vi.fn() });

            const items = screen.getAllByRole("option");
            expect(items[0]).toHaveAttribute("aria-selected", "false");
            expect(items[1]).toHaveAttribute("aria-selected", "true");
        });

        it("рендерит content опции вместо label", () => {
            renderDropdown({
                options: [{ id: "a", label: "Первая опция", content: <b>Кастомное содержимое</b> }],
                onSelect: vi.fn(),
            });

            expect(screen.getByText("Кастомное содержимое")).toBeInTheDocument();
            expect(screen.queryByText("Первая опция")).not.toBeInTheDocument();
        });

        it("списку проставляется переданный listId", () => {
            renderDropdown({ onSelect: vi.fn() });

            expect(getList()).toHaveAttribute("id", "suggest-list");
        });

        it("onSelect вызывается с выбранной опцией", () => {
            const onSelect = vi.fn();
            renderDropdown({ onSelect });

            fireEvent.click(screen.getByText(OPTIONS[1].label));

            expect(onSelect).toHaveBeenCalledWith(OPTIONS[1]);
        });
    });

    describe("onScrollEnd", () => {
        it("вызывается, когда список прокручен до конца", () => {
            const onScrollEnd = vi.fn();
            renderDropdown({ onScrollEnd, onSelect: vi.fn() });

            scrollList(200);

            expect(onScrollEnd).toHaveBeenCalledTimes(1);
        });

        it("не вызывается, пока до конца списка есть расстояние", () => {
            const onScrollEnd = vi.fn();
            renderDropdown({ onScrollEnd, onSelect: vi.fn() });

            scrollList(100);

            expect(onScrollEnd).not.toHaveBeenCalled();
        });

        it("не вызывается, пока идёт догрузка списка", () => {
            const onScrollEnd = vi.fn();
            renderDropdown({ onScrollEnd, listLoading: true, onSelect: vi.fn() });

            scrollList(200);

            expect(onScrollEnd).not.toHaveBeenCalled();
        });
    });

    describe("фокус", () => {
        it("mousedown по выпадающему списку не уводит фокус с поля ввода", () => {
            renderDropdown({ onSelect: vi.fn() });

            const event = createMouseDownEvent();
            getList().dispatchEvent(event);

            expect(event.defaultPrevented).toBe(true);
        });

        it("переданный onMouseDown вызывается после внутреннего обработчика", () => {
            const onMouseDown = vi.fn();
            renderDropdown({ onMouseDown, onSelect: vi.fn() });

            getList().dispatchEvent(createMouseDownEvent());

            expect(onMouseDown).toHaveBeenCalledTimes(1);
        });
    });

    describe("кастомизация", () => {
        it("renderList заменяет список", () => {
            renderDropdown({
                renderList: ({ children }) => <div data-testid="custom-list">{children}</div>,
                onSelect: vi.fn(),
            });

            expect(screen.getByTestId("custom-list")).toBeInTheDocument();
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });

        it("renderListItem заменяет элементы списка", () => {
            // DropdownList клонирует элементы списка и вешает на них ref. Тип renderListItem —
            // обычная функция, поэтому ref до кастомного элемента не доходит и React пишет
            // предупреждение. Гасим его, чтобы не шуметь в выводе: см. «Инварианты» в SuggestField-ai.md.
            const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

            renderDropdown({
                renderListItem: ({ children, id }) => <div data-testid={`custom-item-${id}`}>{children}</div>,
                onSelect: vi.fn(),
            });

            expect(screen.getByTestId("custom-item-a")).toHaveTextContent(OPTIONS[0].label);
            expect(screen.getByTestId("custom-item-b")).toHaveTextContent(OPTIONS[1].label);

            consoleError.mockRestore();
        });
    });
});

/** Нативный mousedown: fireEvent не возвращает событие, а тесту нужен его defaultPrevented. */
function createMouseDownEvent(): MouseEvent {
    return new MouseEvent("mousedown", { bubbles: true, cancelable: true });
}
