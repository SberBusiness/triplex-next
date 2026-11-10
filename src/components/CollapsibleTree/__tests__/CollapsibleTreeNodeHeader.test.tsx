import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from "vitest";
import { CollapsibleTreeNodeHeader, ICollapsibleTreeNodeHeaderProps } from "../components/CollapsibleTreeNodeHeader";

type TRenderProps = Partial<ICollapsibleTreeNodeHeaderProps> & { [key: `data-${string}`]: string };

/**
 * Возвращает полный набор provide-props из `ICollapsibleTreeExtendedNodeHeaderProvideProps`.
 * Тесты переопределяют интересующие поля. Полнота набора нужна проверке утечки в `afterEach`.
 */
const getDefaultProps = (): ICollapsibleTreeNodeHeaderProps => ({
    activeNode: false,
    animating: false,
    hasChildNodes: true,
    isLastNode: false,
    opened: false,
    toggle: () => undefined,
});

const renderHeader = (props: TRenderProps = {}, children: React.ReactNode = "Label") =>
    render(
        <CollapsibleTreeNodeHeader {...getDefaultProps()} {...props}>
            {children}
        </CollapsibleTreeNodeHeader>,
    );

describe("CollapsibleTreeNodeHeader", () => {
    // Утечку provide-props в DOM выдаёт предупреждение React. Оно выводится один раз на модуль,
    // поэтому console.error проверяется после каждого теста — иначе результат зависел бы от порядка и фильтра тестов.
    let consoleError: MockInstance<typeof console.error>;

    beforeEach(() => {
        consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        // mockRestore в vitest 3 сбрасывает историю вызовов, поэтому проверка идёт до него.
        try {
            expect(consoleError).not.toHaveBeenCalled();
        } finally {
            consoleError.mockRestore();
        }
    });

    it("Пробрасывает HTML, ARIA и data-атрибуты на button", () => {
        renderHeader({
            id: "node-header-1",
            title: "Folder",
            "aria-label": "Folder 1",
            "aria-controls": "folder-1-children",
            "data-node-id": "folder-1",
        });

        const button = screen.getByRole("button", { name: "Folder 1" });
        expect(button).toHaveAttribute("id", "node-header-1");
        expect(button).toHaveAttribute("title", "Folder");
        expect(button).toHaveAttribute("aria-controls", "folder-1-children");
        expect(button).toHaveAttribute("data-node-id", "folder-1");
    });

    it("Рендерит children внутри button", () => {
        renderHeader({}, "Folder 1");

        const button = screen.getByRole("button", { name: /Folder 1/ });
        expect(button).toBeInTheDocument();
        expect(button.tagName).toBe("BUTTON");
    });

    it("Имеет type=button (защита от submit в форме)", () => {
        renderHeader();
        expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    describe("hasChildNodes=true", () => {
        it("Кнопка интерактивна, не disabled и имеет класс interactive", () => {
            renderHeader({ hasChildNodes: true });

            const button = screen.getByRole("button");
            expect(button).not.toBeDisabled();
            expect(button.className).toMatch(/interactive/);
        });

        it("Имеет aria-expanded со значением opened", () => {
            renderHeader({ hasChildNodes: true, opened: false });
            expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
        });

        it("aria-expanded=true когда opened=true", () => {
            renderHeader({ hasChildNodes: true, opened: true });
            expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
        });

        it("Рендерит декоративный svg-шеврон, не меняющий доступное имя кнопки", () => {
            renderHeader({ hasChildNodes: true });
            const button = screen.getByRole("button", { name: "Label" });
            expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
        });

        it("Шеврон получает класс opened когда opened=true", () => {
            renderHeader({ hasChildNodes: true, opened: true });
            const chevron = screen.getByRole("button").querySelector("svg");
            expect(chevron?.getAttribute("class") ?? "").toMatch(/opened/);
        });

        it("Шеврон не получает класс opened когда opened=false", () => {
            renderHeader({ hasChildNodes: true, opened: false });
            const chevron = screen.getByRole("button").querySelector("svg");
            expect(chevron?.getAttribute("class") ?? "").not.toMatch(/opened/);
        });
    });

    describe("hasChildNodes=false", () => {
        it("Кнопка disabled и без класса interactive", () => {
            renderHeader({ hasChildNodes: false });

            const button = screen.getByRole("button");
            expect(button).toBeDisabled();
            expect(button.className).not.toMatch(/interactive/);
        });

        it("Не имеет aria-expanded", () => {
            renderHeader({ hasChildNodes: false });
            expect(screen.getByRole("button")).not.toHaveAttribute("aria-expanded");
        });

        it("Не рендерит svg-шеврон", () => {
            renderHeader({ hasChildNodes: false });
            expect(screen.getByRole("button").querySelector("svg")).toBeNull();
        });

        it("Не получает active даже при opened=true", () => {
            renderHeader({ hasChildNodes: false, opened: true });

            expect(screen.getByRole("button")).not.toHaveClass("active");
        });
    });

    describe("disabled=true", () => {
        it("Кнопка disabled, с классом disabled и без класса interactive", () => {
            renderHeader({ hasChildNodes: true, disabled: true });

            const button = screen.getByRole("button");
            expect(button).toBeDisabled();
            expect(button.className).toMatch(/disabled/);
            expect(button.className).not.toMatch(/interactive/);
        });

        it("Шеврон рендерится (узел с детьми остаётся визуально веткой)", () => {
            renderHeader({ hasChildNodes: true, disabled: true });
            expect(screen.getByRole("button").querySelector("svg")).not.toBeNull();
        });

        it("Сохраняет aria-expanded (состояние раскрытия остаётся в семантике)", () => {
            renderHeader({ hasChildNodes: true, disabled: true, opened: false });
            expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
        });

        it("Не вызывает toggle и onClick при click на disabled-кнопке", () => {
            const toggle = vi.fn();
            const onClick = vi.fn();
            renderHeader({ hasChildNodes: true, disabled: true, toggle, onClick });

            fireEvent.click(screen.getByRole("button"));
            expect(toggle).not.toHaveBeenCalled();
            expect(onClick).not.toHaveBeenCalled();
        });
    });

    describe("Click", () => {
        it("Вызывает toggle(true) когда opened=false и hasChildNodes=true", () => {
            const toggle = vi.fn();
            renderHeader({ hasChildNodes: true, opened: false, toggle });

            fireEvent.click(screen.getByRole("button"));
            expect(toggle).toHaveBeenCalledTimes(1);
            expect(toggle).toHaveBeenCalledWith(true);
        });

        it("Вызывает toggle(false) когда opened=true и hasChildNodes=true", () => {
            const toggle = vi.fn();
            renderHeader({ hasChildNodes: true, opened: true, toggle });

            fireEvent.click(screen.getByRole("button"));
            expect(toggle).toHaveBeenCalledTimes(1);
            expect(toggle).toHaveBeenCalledWith(false);
        });

        it("Не вызывает toggle и onClick когда hasChildNodes=false", () => {
            const toggle = vi.fn();
            const onClick = vi.fn();
            renderHeader({ hasChildNodes: false, toggle, onClick });

            fireEvent.click(screen.getByRole("button"));
            expect(toggle).not.toHaveBeenCalled();
            expect(onClick).not.toHaveBeenCalled();
        });

        it("Передаёт исходное событие в onClick после toggle", () => {
            const toggle = vi.fn();
            const onClick = vi.fn();
            renderHeader({ hasChildNodes: true, opened: false, toggle, onClick });

            const event = new MouseEvent("click", { bubbles: true });
            fireEvent(screen.getByRole("button"), event);

            expect(onClick).toHaveBeenCalledTimes(1);
            expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ nativeEvent: event, type: "click" }));
            expect(toggle).toHaveBeenCalledWith(true);
            expect(onClick.mock.invocationCallOrder[0]).toBeGreaterThan(toggle.mock.invocationCallOrder[0]);
        });

        it.each(["{Enter}", " "])("Активирует кнопку клавишей %s", async (key) => {
            const user = userEvent.setup();
            const toggle = vi.fn();
            renderHeader({ toggle });

            await user.tab();
            expect(screen.getByRole("button")).toHaveFocus();
            await user.keyboard(key);

            expect(toggle).toHaveBeenCalledTimes(1);
            expect(toggle).toHaveBeenCalledWith(true);
        });
    });

    it("Мерджит кастомный className через clsx (не затирая базовый)", () => {
        renderHeader({ className: "custom-header" });

        const button = screen.getByRole("button");
        expect(button.className).toMatch(/custom-header/);
        expect(button.className).toMatch(/collapsibleTreeNodeHeader/);
    });

    it("Не позволяет переопределить инварианты button через {...props} (type, disabled, aria-expanded)", () => {
        renderHeader({
            hasChildNodes: false,
            opened: true,
            // Эти значения должны быть проигнорированы — внутренние значения важнее.
            type: "submit",
            disabled: false,
            "aria-expanded": "true",
        });

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("type", "button");
        expect(button).toBeDisabled();
        expect(button).not.toHaveAttribute("aria-expanded");
    });

    it("Пробрасывает ref на корневой button (forwardRef-контракт)", () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <CollapsibleTreeNodeHeader {...getDefaultProps()} ref={ref}>
                Label
            </CollapsibleTreeNodeHeader>,
        );

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(ref.current).toBe(screen.getByRole("button"));
    });
});
