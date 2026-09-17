import React from "react";
import { render, screen, fireEvent, createEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CheckboxTree } from "../CheckboxTree";
import { ICheckboxTreeCheckboxData } from "../types";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";

const getCheckboxes = () => screen.getAllByRole("checkbox");

/** Слушатель навигации висит на window, поэтому keydown отправляется именно туда. */
const fireArrowDown = () => fireEvent(window, createEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_DOWN }));

/** id узла дерева, внутри которого сейчас находится фокус. */
const getFocusedNodeId = () => document.activeElement?.closest("li[role=treeitem]")?.id;

describe("CheckboxTree", () => {
    const getMockCheckboxes = (): ICheckboxTreeCheckboxData[] => [
        {
            id: "1",
            label: "Parent 1",
            checked: false,
            children: [
                {
                    id: "1-1",
                    label: "Child 1-1",
                    checked: false,
                },
                {
                    id: "1-2",
                    label: "Child 1-2",
                    checked: false,
                },
            ],
        },
        {
            id: "2",
            label: "Parent 2",
            checked: false,
        },
    ];

    it("Should render correctly", () => {
        render(<CheckboxTree checkboxes={getMockCheckboxes()} onChange={vi.fn()} />);

        expect(screen.getByText("Parent 1")).toBeInTheDocument();
        expect(screen.getByText("Parent 2")).toBeInTheDocument();
        expect(screen.getByText("Child 1-1")).toBeInTheDocument();
        expect(screen.getByText("Child 1-2")).toBeInTheDocument();

        const checkboxes = getCheckboxes();

        checkboxes.forEach((checkbox) => {
            expect(checkbox).not.toBeChecked();
        });
    });

    it("Should render checkboxes with checked state", () => {
        const checkedCheckboxes: ICheckboxTreeCheckboxData[] = [
            {
                id: "1",
                label: "Checked Parent",
                checked: true,
            },
        ];

        render(<CheckboxTree checkboxes={checkedCheckboxes} onChange={vi.fn()} />);

        const checkbox = getCheckboxes()[0];
        expect(checkbox).toBeChecked();
    });

    it("Should apply size prop correctly", () => {
        const { rerender } = render(
            <CheckboxTree checkboxes={getMockCheckboxes()} onChange={vi.fn()} size={EComponentSize.SM} />,
        );

        const checkboxes = getCheckboxes();
        checkboxes.forEach((checkbox) => {
            const label = checkbox.closest("label");
            expect(label).toHaveClass("sm");
        });

        rerender(<CheckboxTree checkboxes={getMockCheckboxes()} onChange={vi.fn()} size={EComponentSize.LG} />);

        checkboxes.forEach((checkbox) => {
            const label = checkbox.closest("label");
            expect(label).toHaveClass("lg");
        });
    });

    it("Should call onChange when checkbox is clicked", () => {
        const handleChange = vi.fn();
        render(<CheckboxTree checkboxes={getMockCheckboxes()} onChange={handleChange} />);

        const firstCheckbox = getCheckboxes()[0];
        fireEvent.click(firstCheckbox);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ id: "1" })]));
    });

    it("Should pass a new array to onChange", () => {
        const handleChange = vi.fn();
        const checkboxes = getMockCheckboxes();
        render(<CheckboxTree checkboxes={checkboxes} onChange={handleChange} />);

        fireEvent.click(getCheckboxes()[0]);

        // Новый только внешний массив — сами узлы остаются теми же объектами, компонент мутирует их на месте.
        expect(handleChange.mock.calls[0][0]).not.toBe(checkboxes);
        expect(handleChange.mock.calls[0][0]).toHaveLength(checkboxes.length);
        expect(handleChange.mock.calls[0][0][0]).toBe(checkboxes[0]);
    });

    it("Should check all descendants when a parent is checked", () => {
        const handleChange = vi.fn();
        render(<CheckboxTree checkboxes={getMockCheckboxes()} onChange={handleChange} />);

        fireEvent.click(getCheckboxes()[0]);

        const [parent, standalone] = handleChange.mock.calls[0][0];
        expect(parent).toMatchObject({ id: "1", checked: true, bulk: false });
        expect(parent.children).toEqual([
            expect.objectContaining({ id: "1-1", checked: true }),
            expect.objectContaining({ id: "1-2", checked: true }),
        ]);
        // Соседняя ветка не затрагивается.
        expect(standalone).toMatchObject({ id: "2", checked: false });
    });

    it("Should uncheck all descendants when a checked parent is unchecked", () => {
        const handleChange = vi.fn();
        const checkboxes: ICheckboxTreeCheckboxData[] = [
            {
                id: "1",
                label: "Parent 1",
                checked: true,
                bulk: false,
                children: [
                    { id: "1-1", label: "Child 1-1", checked: true },
                    { id: "1-2", label: "Child 1-2", checked: true },
                ],
            },
        ];
        render(<CheckboxTree checkboxes={checkboxes} onChange={handleChange} />);

        fireEvent.click(getCheckboxes()[0]);

        const [parent] = handleChange.mock.calls[0][0];
        expect(parent.checked).toBe(false);
        expect(parent.children).toEqual([
            expect.objectContaining({ id: "1-1", checked: false }),
            expect.objectContaining({ id: "1-2", checked: false }),
        ]);
    });

    it("Should make the parent partially checked when only one child is checked", () => {
        const handleChange = vi.fn();
        render(<CheckboxTree checkboxes={getMockCheckboxes()} onChange={handleChange} />);

        // Порядок чекбоксов в DOM: Parent 1, Child 1-1, Child 1-2, Parent 2.
        fireEvent.click(getCheckboxes()[1]);

        const [parent] = handleChange.mock.calls[0][0];
        expect(parent).toMatchObject({ id: "1", checked: true, bulk: true });
        expect(parent.children).toEqual([
            expect.objectContaining({ id: "1-1", checked: true }),
            expect.objectContaining({ id: "1-2", checked: false }),
        ]);
    });

    it("Should link each node with its neighbours from its own level", () => {
        render(<CheckboxTree checkboxes={getMockCheckboxes()} onChange={vi.fn()} />);

        // Соседи узла передаются как prevNodeId/nextNodeId и задают порядок в абстрактном дереве TreeView.
        // Наблюдаемое следствие: tabIndex=0 получает только первый узел уровня. Если узлу передать соседей
        // чужого уровня, регистрация в дереве и распределение tabIndex ломаются.
        expect(screen.getAllByRole("treeitem").map((node) => node.getAttribute("tabindex"))).toEqual([
            "0",
            "-1",
            "-1",
            "-1",
        ]);
    });

    it("Should select the whole subtree when a partially checked parent is clicked", () => {
        const handleChange = vi.fn();
        const checkboxes: ICheckboxTreeCheckboxData[] = [
            {
                id: "1",
                label: "Parent 1",
                checked: true,
                bulk: true,
                children: [
                    { id: "1-1", label: "Child 1-1", checked: true },
                    { id: "1-2", label: "Child 1-2", checked: false },
                ],
            },
        ];
        render(<CheckboxTree checkboxes={checkboxes} onChange={handleChange} />);

        fireEvent.click(getCheckboxes()[0]);

        const [parent] = handleChange.mock.calls[0][0];
        expect(parent).toMatchObject({ id: "1", checked: true, bulk: false });
        expect(parent.children).toEqual([
            expect.objectContaining({ id: "1-1", checked: true }),
            expect.objectContaining({ id: "1-2", checked: true }),
        ]);
    });

    it("Should forward ref to the root ul", () => {
        const ref = React.createRef<HTMLUListElement>();

        render(<CheckboxTree checkboxes={getMockCheckboxes()} onChange={vi.fn()} ref={ref} />);

        expect(ref.current).toBe(screen.getByRole("tree"));
        expect(ref.current?.tagName).toBe("UL");
    });

    it("Should pass html attributes to the root ul", () => {
        render(
            <CheckboxTree
                checkboxes={getMockCheckboxes()}
                onChange={vi.fn()}
                id="my-tree"
                className="my-class"
                data-test-id="my-test-id"
            />,
        );

        const tree = screen.getByRole("tree");
        expect(tree).toHaveAttribute("id", "my-tree");
        expect(tree).toHaveAttribute("data-test-id", "my-test-id");
        // className складывается с внутренними классами, а не перетирает их.
        expect(tree).toHaveClass("my-class");
        expect(tree.className).not.toBe("my-class");
    });

    it("Should move focus between nodes on ArrowDown", () => {
        render(<CheckboxTree checkboxes={getMockCheckboxes()} onChange={vi.fn()} />);

        const nodes = screen.getAllByRole("treeitem");
        expect(nodes.map((node) => node.id)).toEqual(["1", "1-1", "1-2", "2"]);

        // Настоящий focus, а не fireEvent.focus: активная нода переводит фокус на свой чекбокс,
        // а CheckboxTreeExtendedCheckbox пропускает этот перевод, пока document.activeElement уже содержит его.
        act(() => nodes[0].focus());

        // Первый проход входит в поддерево от его же родителя, поэтому фокус остаётся на нём — см.
        // "Известные ограничения" в CheckboxTree-ai.md. Обходим круг, чтобы проверить саму навигацию.
        [1, 2, 3].forEach(fireArrowDown);
        expect(getFocusedNodeId()).toBe("2");

        fireArrowDown();
        expect(getFocusedNodeId()).toBe("1");

        fireArrowDown();
        expect(getFocusedNodeId()).toBe("1-1");

        fireArrowDown();
        expect(getFocusedNodeId()).toBe("1-2");
    });
});
