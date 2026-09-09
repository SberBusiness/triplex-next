import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { IslandAccordion, IIslandAccordionProps } from "../IslandAccordion";
import { IslandAccordionItem, IIslandAccordionItemProps } from "../components/IslandAccordionItem";
import { EComponentSize } from "../../../enums/EComponentSize";
import { EIslandType } from "../../Island";
import { EStepStatus } from "../../Step";

const ITEM_ID = "island-accordion-item";

type TItemProps = Partial<IIslandAccordionItemProps>;

/** Рендер элемента внутри аккордеона — так он получает size и type из контекста. */
const renderItem = (props: TItemProps = {}, accordionProps: Partial<IIslandAccordionProps> = {}) => {
    const utils = render(
        <IslandAccordion {...accordionProps}>
            <IslandAccordion.Item id={ITEM_ID} title="Title" {...props}>
                <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
            </IslandAccordion.Item>
        </IslandAccordion>,
    );

    return utils;
};

/** Кнопка-заголовок доступна по своему содержимому — заголовку элемента. */
const getHeader = (name: string | RegExp = "Title"): HTMLElement => screen.getByRole("button", { name });

const getItem = (): HTMLElement => screen.getByRole("listitem");

/**
 * Раскрывающаяся область: role="region" + aria-labelledby, поэтому доступна по роли.
 * hidden: true — в свёрнутом состоянии область скрыта от accessibility tree,
 * а проверять её нужно в обоих состояниях.
 */
const getRegion = (): HTMLElement => screen.getByRole("region", { hidden: true });

describe("IslandAccordionItem", () => {
    describe("Рендер и базовый контракт", () => {
        it("Should render root li with passed id and title", () => {
            renderItem();

            const item = getItem();

            expect(item.tagName).toBe("LI");
            expect(item).toHaveAttribute("id", ITEM_ID);
            expect(item).toHaveClass("item");
            expect(screen.getByText("Title")).toBeInTheDocument();
        });

        it("Should forward ref to root li element", () => {
            const ref = React.createRef<HTMLLIElement>();

            render(
                <IslandAccordion>
                    <IslandAccordion.Item id={ITEM_ID} title="Title" ref={ref}>
                        Content
                    </IslandAccordion.Item>
                </IslandAccordion>,
            );

            expect(ref.current).toBeInstanceOf(HTMLLIElement);
            expect(ref.current).toHaveAttribute("id", ITEM_ID);
        });

        it("Should merge custom className with base class on root li", () => {
            renderItem({ className: "custom-class" });

            expect(getItem()).toHaveClass("custom-class", "item");
        });

        it("Should spread rest props to root li", () => {
            render(
                <IslandAccordion>
                    <IslandAccordion.Item id={ITEM_ID} title="Title" lang="ru" data-test="island-accordion-item">
                        Content
                    </IslandAccordion.Item>
                </IslandAccordion>,
            );

            const item = getItem();

            expect(item).toHaveAttribute("lang", "ru");
            expect(item).toHaveAttribute("data-test", "island-accordion-item");
        });

        it("Should have displayName", () => {
            expect(IslandAccordionItem.displayName).toBe("IslandAccordionItem");
        });
    });

    describe("Контекст аккордеона", () => {
        it("Should fall back to MD and TYPE_1 when rendered outside IslandAccordion", () => {
            render(
                <ul>
                    <IslandAccordionItem id={ITEM_ID} title="Title">
                        Content
                    </IslandAccordionItem>
                </ul>,
            );

            expect(getItem()).toHaveClass("md", "type1");
        });

        it.each([
            [EComponentSize.SM, "sm"],
            [EComponentSize.MD, "md"],
            [EComponentSize.LG, "lg"],
        ])("Should take size %s from accordion context", (size, expectedClassName) => {
            renderItem({}, { size });

            expect(getItem()).toHaveClass(expectedClassName);
        });

        it.each([
            [EIslandType.TYPE_1, "type1"],
            [EIslandType.TYPE_2, "type2"],
            [EIslandType.TYPE_3, "type3"],
        ])("Should take type %s from accordion context", (type, expectedClassName) => {
            renderItem({}, { type });

            expect(getItem()).toHaveClass(expectedClassName);
        });
    });

    describe("Неуправляемое раскрытие (opened не передан)", () => {
        it("Should be collapsed by default", () => {
            renderItem();

            expect(getHeader()).toHaveAttribute("aria-expanded", "false");
            expect(getItem()).not.toHaveClass("opened");
        });

        it("Should open on header click and call onToggle with new state and id", async () => {
            const user = userEvent.setup();
            const onToggle = vi.fn();

            renderItem({ onToggle });
            await user.click(getHeader());

            expect(getHeader()).toHaveAttribute("aria-expanded", "true");
            expect(getItem()).toHaveClass("opened");
            expect(onToggle).toHaveBeenCalledWith(true, ITEM_ID);
        });

        it("Should collapse back on second header click", async () => {
            const user = userEvent.setup();
            const onToggle = vi.fn();

            renderItem({ onToggle });
            await user.click(getHeader());
            await user.click(getHeader());

            expect(getHeader()).toHaveAttribute("aria-expanded", "false");
            expect(onToggle).toHaveBeenLastCalledWith(false, ITEM_ID);
        });
    });

    describe("Управляемое раскрытие (opened передан)", () => {
        it("Should render expanded when opened is true", () => {
            renderItem({ opened: true });

            expect(getHeader()).toHaveAttribute("aria-expanded", "true");
            expect(getItem()).toHaveClass("opened");
        });

        it("Should not change own state on click, only call onToggle", async () => {
            const user = userEvent.setup();
            const onToggle = vi.fn();

            renderItem({ opened: true, onToggle });
            await user.click(getHeader());

            expect(onToggle).toHaveBeenCalledWith(false, ITEM_ID);
            expect(getHeader()).toHaveAttribute("aria-expanded", "true");
        });

        it("Should follow opened prop changes", () => {
            const { rerender } = render(
                <IslandAccordion>
                    <IslandAccordion.Item id={ITEM_ID} title="Title" opened={false}>
                        Content
                    </IslandAccordion.Item>
                </IslandAccordion>,
            );

            expect(getHeader()).toHaveAttribute("aria-expanded", "false");

            rerender(
                <IslandAccordion>
                    <IslandAccordion.Item id={ITEM_ID} title="Title" opened>
                        Content
                    </IslandAccordion.Item>
                </IslandAccordion>,
            );

            expect(getHeader()).toHaveAttribute("aria-expanded", "true");

            rerender(
                <IslandAccordion>
                    <IslandAccordion.Item id={ITEM_ID} title="Title" opened={false}>
                        Content
                    </IslandAccordion.Item>
                </IslandAccordion>,
            );

            expect(getHeader()).toHaveAttribute("aria-expanded", "false");
        });

        it("Should keep last state when opened becomes undefined", () => {
            const { rerender } = render(
                <IslandAccordion>
                    <IslandAccordion.Item id={ITEM_ID} title="Title" opened>
                        Content
                    </IslandAccordion.Item>
                </IslandAccordion>,
            );

            rerender(
                <IslandAccordion>
                    <IslandAccordion.Item id={ITEM_ID} title="Title" opened={undefined}>
                        Content
                    </IslandAccordion.Item>
                </IslandAccordion>,
            );

            expect(getHeader()).toHaveAttribute("aria-expanded", "true");
        });
    });

    describe("Заблокированный элемент", () => {
        it("Should disable header button and mark root li", () => {
            renderItem({ disabled: true });

            expect(getHeader()).toBeDisabled();
            expect(getItem()).toHaveClass("disabled");
        });

        it("Should not call onToggle on click", async () => {
            const user = userEvent.setup();
            const onToggle = vi.fn();

            renderItem({ disabled: true, onToggle });
            await user.click(getHeader());

            expect(onToggle).not.toHaveBeenCalled();
            expect(getHeader()).toHaveAttribute("aria-expanded", "false");
        });

        it("Should keep content collapsed even when opened is true", () => {
            renderItem({ disabled: true, opened: true });

            // aria-expanded отражает opened, но содержимое остаётся свёрнутым:
            // область есть в DOM и скрыта от accessibility tree.
            expect(getHeader()).toHaveAttribute("aria-expanded", "true");
            expect(screen.queryByRole("region")).not.toBeInTheDocument();
        });
    });

    describe("Кружок с номером шага", () => {
        it("Should render step when both status and num are passed", () => {
            renderItem({ num: 3, status: EStepStatus.ACTIVE });

            expect(screen.getByText("3")).toBeInTheDocument();
        });

        it("Should not render step without status", () => {
            renderItem({ num: 3 });

            expect(screen.queryByText("3")).not.toBeInTheDocument();
        });

        it("Should not render step without num", () => {
            renderItem({ status: EStepStatus.ACTIVE });

            expect(getHeader().textContent).toBe("Title");
        });

        it("Should show stepHint in tooltip on step hover", async () => {
            const user = userEvent.setup();

            renderItem({ num: 3, status: EStepStatus.ACTIVE, stepHint: "Step hint" });
            await user.hover(screen.getByText("3"));

            expect(await screen.findByText("Step hint")).toBeInTheDocument();
        });

        it("Should not show stepHint when item is disabled", async () => {
            const user = userEvent.setup();

            renderItem({ num: 3, status: EStepStatus.ACTIVE, stepHint: "Step hint", disabled: true });
            await user.hover(screen.getByText("3"));

            expect(screen.queryByText("Step hint")).not.toBeInTheDocument();
        });

        it("Should not render anything for num 0", () => {
            renderItem({ num: 0, status: EStepStatus.ACTIVE });

            expect(getHeader().textContent).toBe("Title");
        });
    });

    describe("Кнопка удаления", () => {
        it("Should not render remove button without onRemove", () => {
            renderItem();

            expect(screen.queryByTitle("Удалить")).not.toBeInTheDocument();
        });

        it("Should call onRemove with item id", async () => {
            const user = userEvent.setup();
            const onRemove = vi.fn();

            renderItem({ onRemove });
            await user.click(screen.getByTitle("Удалить"));

            expect(onRemove).toHaveBeenCalledWith(ITEM_ID);
        });

        it("Should not call onRemove when item is disabled", async () => {
            const user = userEvent.setup();
            const onRemove = vi.fn();

            renderItem({ onRemove, disabled: true });
            await user.click(screen.getByTitle("Удалить"));

            expect(onRemove).not.toHaveBeenCalled();
        });
    });

    describe("Accessibility", () => {
        it("Should wire header and expandable region with aria attributes", () => {
            renderItem();

            const header = getHeader();
            const region = getRegion();

            expect(header.getAttribute("aria-controls")).toBe(region.id);
            expect(region.getAttribute("aria-labelledby")).toBe(header.id);
            expect(header.id).not.toBe("");
        });

        it("Should generate unique ids for sibling items", () => {
            render(
                <IslandAccordion>
                    <IslandAccordion.Item id="first" title="First">
                        First content
                    </IslandAccordion.Item>
                    <IslandAccordion.Item id="second" title="Second">
                        Second content
                    </IslandAccordion.Item>
                </IslandAccordion>,
            );

            const firstHeader = screen.getByRole("button", { name: "First" });
            const secondHeader = screen.getByRole("button", { name: "Second" });

            expect(firstHeader.id).not.toBe(secondHeader.id);
        });

        it("Should render header as a button of type button", () => {
            renderItem();

            expect(getHeader()).toHaveAttribute("type", "button");
        });
    });
});
