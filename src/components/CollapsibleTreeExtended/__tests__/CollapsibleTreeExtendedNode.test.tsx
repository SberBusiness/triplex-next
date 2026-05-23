import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CollapsibleTreeExtended } from "../CollapsibleTreeExtended";
import {
    ICollapsibleTreeExtendedNodeBodyProvideProps,
    ICollapsibleTreeExtendedNodeHeaderProvideProps,
} from "../components/CollapsibleTreeExtendedNode";

/**
 * Хелпер, отрисовывающий ноду с минимально-достаточным контентом:
 * - в renderHeader — кликабельная кнопка, переключающая состояние через переданный toggle;
 * - в renderBody — leaf-нода с произвольным текстом, чтобы у родительской ноды были дети.
 */
const renderNode = ({
    opened,
    toggle,
    onToggle,
    withChildren = true,
}: {
    opened?: boolean;
    toggle?: (opened: boolean) => void;
    onToggle?: (opened: boolean) => void;
    withChildren?: boolean;
}) => {
    const headerProps = { current: null as ICollapsibleTreeExtendedNodeHeaderProvideProps | null };
    const bodyProps = { current: null as ICollapsibleTreeExtendedNodeBodyProvideProps | null };

    const ui = (currentOpened: boolean | undefined) => (
        <CollapsibleTreeExtended>
            <CollapsibleTreeExtended.Node
                id="branch"
                opened={currentOpened}
                toggle={toggle}
                onToggle={onToggle}
                renderHeader={(props) => {
                    headerProps.current = props;
                    return (
                        <button type="button" onClick={() => props.toggle(!props.opened)}>
                            header
                        </button>
                    );
                }}
                renderBody={(props) => {
                    bodyProps.current = props;
                    if (!withChildren) {
                        return null;
                    }
                    return (
                        <CollapsibleTreeExtended.Node
                            id="leaf"
                            opened
                            toggle={() => undefined}
                            renderHeader={() => <span>leaf header</span>}
                            renderBody={() => null}
                        />
                    );
                }}
            />
        </CollapsibleTreeExtended>
    );

    const utils = render(ui(opened));
    return {
        ...utils,
        headerProps,
        bodyProps,
        rerender: (next: boolean | undefined) => utils.rerender(ui(next)),
    };
};

const getBranchTreeItem = () => {
    // У первого treeitem (ветка) — id=branch.
    const items = screen.getAllByRole("treeitem");
    return items[0];
};

describe("CollapsibleTreeExtendedNode", () => {
    describe("controlled", () => {
        it("читает opened из props и пробрасывает его в renderHeader/renderBody", () => {
            const { headerProps, bodyProps } = renderNode({ opened: true });

            expect(headerProps.current?.opened).toBe(true);
            expect(bodyProps.current?.opened).toBe(true);
            expect(getBranchTreeItem()).toHaveAttribute("aria-expanded", "true");
        });

        it("обновляет opened при rerender с новым значением props.opened", () => {
            const { headerProps, rerender } = renderNode({ opened: false });
            expect(headerProps.current?.opened).toBe(false);

            rerender(true);

            expect(headerProps.current?.opened).toBe(true);
            expect(getBranchTreeItem()).toHaveAttribute("aria-expanded", "true");
        });

        it("вызывает props.toggle при клике и НЕ переключает внутреннее состояние", () => {
            const toggle = vi.fn();
            renderNode({ opened: false, toggle });

            fireEvent.click(screen.getByRole("button", { name: "header" }));

            expect(toggle).toHaveBeenCalledTimes(1);
            expect(toggle).toHaveBeenCalledWith(true);
            // Поскольку props.opened не поменялся, aria-expanded остаётся false.
            expect(getBranchTreeItem()).toHaveAttribute("aria-expanded", "false");
        });

        it("не вызывает props.toggle, если новое значение совпадает с текущим", () => {
            const toggle = vi.fn();
            const { headerProps } = renderNode({ opened: true, toggle });

            // Эмулируем вызов toggle(true) при текущем opened=true.
            headerProps.current?.toggle(true);

            expect(toggle).not.toHaveBeenCalled();
        });
    });

    describe("uncontrolled", () => {
        it("стартует в свёрнутом состоянии, когда opened не задан", () => {
            const { headerProps } = renderNode({});

            expect(headerProps.current?.opened).toBe(false);
            expect(getBranchTreeItem()).toHaveAttribute("aria-expanded", "false");
        });

        it("переключает внутреннее состояние по клику и обновляет opened в render-props", () => {
            const { headerProps } = renderNode({});

            fireEvent.click(screen.getByRole("button", { name: "header" }));

            expect(headerProps.current?.opened).toBe(true);
            expect(getBranchTreeItem()).toHaveAttribute("aria-expanded", "true");

            fireEvent.click(screen.getByRole("button", { name: "header" }));

            expect(headerProps.current?.opened).toBe(false);
            expect(getBranchTreeItem()).toHaveAttribute("aria-expanded", "false");
        });

        it("не вызывает props.toggle в uncontrolled-режиме", () => {
            const toggle = vi.fn();
            renderNode({ toggle });

            fireEvent.click(screen.getByRole("button", { name: "header" }));

            expect(toggle).not.toHaveBeenCalled();
        });
    });

    describe("переключение режима controlled ↔ uncontrolled", () => {
        it("controlled → uncontrolled: новый клик меняет внутреннее состояние, а не props.toggle", () => {
            const toggle = vi.fn();
            const { rerender } = renderNode({ opened: false, toggle });

            // Переход в uncontrolled: opened = undefined.
            rerender(undefined);
            expect(getBranchTreeItem()).toHaveAttribute("aria-expanded", "false");

            // Клик после перехода в uncontrolled — props.toggle вызываться не должен.
            fireEvent.click(screen.getByRole("button", { name: "header" }));

            expect(toggle).not.toHaveBeenCalled();
            expect(getBranchTreeItem()).toHaveAttribute("aria-expanded", "true");
        });

        it("uncontrolled → controlled: новый клик идёт через props.toggle, а внутренний state игнорируется", () => {
            const toggle = vi.fn();
            const { headerProps, rerender } = renderNode({ toggle });

            // Сначала в uncontrolled переключаем во внутреннем состоянии в true.
            fireEvent.click(screen.getByRole("button", { name: "header" }));
            expect(headerProps.current?.opened).toBe(true);

            // Переход в controlled с opened=false — теперь читаем из props.
            rerender(false);
            expect(headerProps.current?.opened).toBe(false);

            // Клик в controlled — вызов props.toggle.
            fireEvent.click(screen.getByRole("button", { name: "header" }));

            expect(toggle).toHaveBeenCalledTimes(1);
            expect(toggle).toHaveBeenCalledWith(true);
        });
    });

    describe("render-props", () => {
        it("renderHeader получает корректные provide-props", () => {
            const { headerProps } = renderNode({ opened: true });

            expect(headerProps.current).toMatchObject({
                opened: true,
                animating: expect.any(Boolean),
                activeNode: expect.any(Boolean),
                hasChildNodes: expect.any(Boolean),
                isLastNode: expect.any(Boolean),
                toggle: expect.any(Function),
            });
        });

        it("renderBody получает корректные provide-props", () => {
            const { bodyProps } = renderNode({ opened: true });

            expect(bodyProps.current).toMatchObject({
                opened: true,
                animating: expect.any(Boolean),
                activeNode: expect.any(Boolean),
                hasChildNodes: expect.any(Boolean),
                toggle: expect.any(Function),
            });
        });

        it("hasChildNodes=true для ветки с дочерней нодой", () => {
            const { headerProps } = renderNode({ opened: true, withChildren: true });

            expect(headerProps.current?.hasChildNodes).toBe(true);
        });

        it("hasChildNodes=false, если renderBody не отрисовал дочерних нод", () => {
            const { headerProps } = renderNode({ opened: true, withChildren: false });

            expect(headerProps.current?.hasChildNodes).toBe(false);
        });
    });

    describe("структура DOM", () => {
        it("оборачивает дочерний контент в TreeView.Group (role=group) при наличии детей", () => {
            renderNode({ opened: true, withChildren: true });

            // role=group появляется только если у ноды есть дети — это <ul role="group">.
            expect(screen.getByRole("group")).toBeInTheDocument();
        });

        it("не оборачивает в TreeView.Group, если детей нет", () => {
            renderNode({ opened: true, withChildren: false });

            expect(screen.queryByRole("group")).not.toBeInTheDocument();
        });
    });
});
