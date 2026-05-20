import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CollapsibleTreeNodeHeader, ICollapsibleTreeNodeHeaderProps } from "../components/CollapsibleTreeNodeHeader";

type TRenderProps = Partial<ICollapsibleTreeNodeHeaderProps>;

/**
 * Возвращает дефолтный набор пропов, имитирующий `ICollapsibleTreeExtendedNodeHeaderProvideProps`.
 * Тесты переопределяют интересующие поля.
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

        it("Рендерит svg-шеврон", () => {
            renderHeader({ hasChildNodes: true });
            expect(screen.getByRole("button").querySelector("svg")).not.toBeNull();
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

        it("Не вызывает toggle когда hasChildNodes=false (даже при программном click)", () => {
            const toggle = vi.fn();
            renderHeader({ hasChildNodes: false, toggle });

            // Программный click игнорирует disabled, поэтому проверяем именно ветку handleClick.
            fireEvent.click(screen.getByRole("button"));
            expect(toggle).not.toHaveBeenCalled();
        });

        it("Пробрасывает кастомный onClick параллельно с toggle", () => {
            const toggle = vi.fn();
            const onClick = vi.fn();
            renderHeader({ hasChildNodes: true, opened: false, toggle, onClick });

            fireEvent.click(screen.getByRole("button"));
            expect(onClick).toHaveBeenCalledTimes(1);
            expect(onClick.mock.calls[0][0]).toMatchObject({ type: "click" });
            expect(toggle).toHaveBeenCalledWith(true);
        });
    });

    it("Мерджит кастомный className через clsx (не затирая базовый)", () => {
        renderHeader({ className: "custom-header" });

        const button = screen.getByRole("button");
        expect(button.className).toMatch(/custom-header/);
        expect(button.className).toMatch(/collapsibleTreeNodeHeader/);
    });

    it("Пробрасывает прочие HTML-атрибуты на button", () => {
        renderHeader({ "data-test-id": "header-1", id: "node-header-1" } as TRenderProps);

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("data-test-id", "header-1");
        expect(button).toHaveAttribute("id", "node-header-1");
    });

    it("Не позволяет переопределить инварианты button через {...props} (type, disabled, aria-expanded)", () => {
        renderHeader({
            hasChildNodes: false,
            opened: true,
            // Эти значения должны быть проигнорированы — внутренние значения важнее.
            type: "submit",
            disabled: false,
            "aria-expanded": "true",
        } as TRenderProps);

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
