import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CheckboxTreeExtended } from "../CheckboxTreeExtended";
import { ICheckboxTreeExtendedCheckboxProvideProps } from "../components/CheckboxTreeExtendedNode";
import { ICheckboxTreeExtendedNodeProps } from "../index";
import { EComponentSize } from "../../../enums/EComponentSize";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";

/** Заголовок ноды, внутри которого отрисован чекбокс с переданной подписью. */
const getNodeHeader = (label: string) => screen.getByLabelText(label).closest(".checkboxTreeExtendedNodeHeader");

describe("CheckboxTreeExtendedNode", () => {
    it("renders checkbox from render-prop and nested nodes from children", () => {
        render(
            <CheckboxTreeExtended>
                <CheckboxTreeExtended.Node
                    id="1"
                    checkbox={(props) => (
                        <CheckboxTreeExtended.Checkbox {...props}>Группа 1</CheckboxTreeExtended.Checkbox>
                    )}
                >
                    <CheckboxTreeExtended.Node
                        id="1-1"
                        checkbox={(props) => (
                            <CheckboxTreeExtended.Checkbox {...props}>Значение 1-1</CheckboxTreeExtended.Checkbox>
                        )}
                    />
                </CheckboxTreeExtended.Node>
            </CheckboxTreeExtended>,
        );

        expect(screen.getByLabelText("Группа 1")).toBeInTheDocument();
        expect(screen.getByLabelText("Значение 1-1")).toBeInTheDocument();
    });

    it("provides opened=true to render-prop, so node stays static", () => {
        const provideProps: ICheckboxTreeExtendedCheckboxProvideProps[] = [];

        render(
            <CheckboxTreeExtended>
                <CheckboxTreeExtended.Node
                    id="1"
                    opened={false}
                    checkbox={(props) => {
                        provideProps.push(props);

                        return <CheckboxTreeExtended.Checkbox {...props}>Группа 1</CheckboxTreeExtended.Checkbox>;
                    }}
                >
                    <CheckboxTreeExtended.Node
                        id="1-1"
                        checkbox={(props) => (
                            <CheckboxTreeExtended.Checkbox {...props}>Значение 1-1</CheckboxTreeExtended.Checkbox>
                        )}
                    />
                </CheckboxTreeExtended.Node>
            </CheckboxTreeExtended>,
        );

        expect(provideProps.length).toBeGreaterThan(0);
        expect(provideProps.every(({ opened }) => opened === true)).toBe(true);
        // Вложенная нода отрисована, потому что нода принудительно раскрыта.
        expect(screen.getByLabelText("Значение 1-1")).toBeInTheDocument();
    });

    it("merges className into the node, keeping its own class", () => {
        render(
            <CheckboxTreeExtended>
                <CheckboxTreeExtended.Node
                    id="1"
                    className="custom-node"
                    checkbox={(props) => (
                        <CheckboxTreeExtended.Checkbox {...props}>Группа 1</CheckboxTreeExtended.Checkbox>
                    )}
                />
            </CheckboxTreeExtended>,
        );

        // Собственный класс отвечает за отступы вложенной ветки — className потребителя не должен его затирать.
        expect(getNodeHeader("Группа 1")?.closest("li")).toHaveClass("checkboxTreeExtendedNode", "custom-node");
    });

    it("does not render the expand arrow while the tree is static", () => {
        render(
            <CheckboxTreeExtended>
                <CheckboxTreeExtended.Node
                    id="1"
                    checkbox={(props) => (
                        <CheckboxTreeExtended.Checkbox {...props}>Группа 1</CheckboxTreeExtended.Checkbox>
                    )}
                >
                    <CheckboxTreeExtended.Node
                        id="1-1"
                        checkbox={(props) => (
                            <CheckboxTreeExtended.Checkbox {...props}>Значение 1-1</CheckboxTreeExtended.Checkbox>
                        )}
                    />
                </CheckboxTreeExtended.Node>
            </CheckboxTreeExtended>,
        );

        // isStaticCheckboxTreeExtended === true — у ноды с детьми стрелка раскрытия не отрисовывается.
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("applies size class %s to node header", (size, expectedClass) => {
        render(
            <CheckboxTreeExtended size={size}>
                <CheckboxTreeExtended.Node
                    id="1"
                    checkbox={(props) => (
                        <CheckboxTreeExtended.Checkbox {...props}>Группа 1</CheckboxTreeExtended.Checkbox>
                    )}
                />
            </CheckboxTreeExtended>,
        );

        expect(getNodeHeader("Группа 1")).toHaveClass("checkboxTreeExtendedNodeHeader", expectedClass, "opened");
    });

    it("prevents default on mousedown next to the checkbox, but not on the checkbox itself", () => {
        render(
            <CheckboxTreeExtended>
                <CheckboxTreeExtended.Node
                    id="1"
                    checkbox={(props) => (
                        <CheckboxTreeExtended.Checkbox {...props}>Группа 1</CheckboxTreeExtended.Checkbox>
                    )}
                />
            </CheckboxTreeExtended>,
        );

        const header = getNodeHeader("Группа 1");
        const label = screen.getByLabelText("Группа 1").closest("label");

        // fireEvent возвращает false, если сработал preventDefault.
        expect(fireEvent.mouseDown(header as Element)).toBe(false);
        expect(fireEvent.mouseDown(label as Element)).toBe(true);
    });

    it("exposes ICheckboxTreeExtendedNodeProps through the barrel, so a wrapper can be typed with it", () => {
        // Обёртка узла на стороне потребителя — то, ради чего тип экспортируется.
        const NodeWrapper: React.FC<ICheckboxTreeExtendedNodeProps> = (props) => (
            <CheckboxTreeExtended.Node {...props} />
        );

        render(
            <CheckboxTreeExtended>
                <NodeWrapper
                    id="1"
                    className="custom-node"
                    checkbox={(props) => (
                        <CheckboxTreeExtended.Checkbox {...props}>Группа 1</CheckboxTreeExtended.Checkbox>
                    )}
                />
            </CheckboxTreeExtended>,
        );

        expect(screen.getByLabelText("Группа 1").closest("li")).toHaveClass("checkboxTreeExtendedNode", "custom-node");
    });

    it("keeps TreeView semantics and forwards HTML attributes to the node", () => {
        render(
            <CheckboxTreeExtended>
                <CheckboxTreeExtended.Node
                    id="node"
                    opened={false}
                    role="presentation"
                    aria-expanded={false}
                    aria-label="Узел"
                    data-node="custom-data"
                    title="Описание узла"
                    checkbox={(props) => (
                        <CheckboxTreeExtended.Checkbox {...props}>Значение</CheckboxTreeExtended.Checkbox>
                    )}
                />
            </CheckboxTreeExtended>,
        );

        const node = screen.getByRole("treeitem", { name: "Узел" });

        expect(node.tagName).toBe("LI");
        expect(node).toHaveAttribute("id", "node");
        expect(node).toHaveAttribute("aria-expanded", "true");
        expect(node).toHaveAttribute("tabindex", "0");
        expect(node).toHaveAttribute("data-node", "custom-data");
        expect(node).toHaveAttribute("title", "Описание узла");
        expect(node).not.toHaveAttribute("opened");
    });

    it("forwards focus, blur and click events with the original checkbox target", () => {
        const onFocus = vi.fn();
        const onBlur = vi.fn();
        const onClick = vi.fn();

        render(
            <CheckboxTreeExtended>
                <CheckboxTreeExtended.Node
                    id="node"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onClick={onClick}
                    checkbox={(props) => (
                        <CheckboxTreeExtended.Checkbox {...props}>Значение</CheckboxTreeExtended.Checkbox>
                    )}
                />
            </CheckboxTreeExtended>,
        );

        const checkbox = screen.getByRole("checkbox", { name: "Значение" });

        fireEvent.focus(checkbox);
        expect(onFocus).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ target: checkbox, type: "focus" }));

        fireEvent.blur(checkbox);
        expect(onBlur).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ target: checkbox, type: "blur" }));

        fireEvent.click(checkbox);
        expect(onClick).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ target: checkbox, type: "click" }));
    });

    it("provides activity to branches and leaves while navigating the static tree", async () => {
        const user = userEvent.setup();
        const branchCheckbox = vi.fn((props: ICheckboxTreeExtendedCheckboxProvideProps) => (
            <CheckboxTreeExtended.Checkbox {...props}>Группа</CheckboxTreeExtended.Checkbox>
        ));
        const leafCheckbox = vi.fn((props: ICheckboxTreeExtendedCheckboxProvideProps) => (
            <CheckboxTreeExtended.Checkbox {...props}>Потомок</CheckboxTreeExtended.Checkbox>
        ));
        const siblingCheckbox = vi.fn((props: ICheckboxTreeExtendedCheckboxProvideProps) => (
            <CheckboxTreeExtended.Checkbox {...props}>Сосед</CheckboxTreeExtended.Checkbox>
        ));

        render(
            <CheckboxTreeExtended>
                <CheckboxTreeExtended.Node id="branch" opened={false} checkbox={branchCheckbox}>
                    <CheckboxTreeExtended.Node id="leaf" checkbox={leafCheckbox} />
                </CheckboxTreeExtended.Node>
                <CheckboxTreeExtended.Node id="sibling" checkbox={siblingCheckbox} />
            </CheckboxTreeExtended>,
        );

        expect(branchCheckbox).toHaveBeenLastCalledWith({ active: false, opened: true });
        expect(leafCheckbox).toHaveBeenLastCalledWith({ active: false, opened: true });

        await user.click(screen.getByRole("checkbox", { name: "Группа" }));
        expect(branchCheckbox).toHaveBeenLastCalledWith({ active: true, opened: true });

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_DOWN });
        expect(leafCheckbox).toHaveBeenLastCalledWith({ active: true, opened: true });
        expect(branchCheckbox).toHaveBeenLastCalledWith({ active: false, opened: true });
        expect(screen.getByRole("checkbox", { name: "Потомок" })).toHaveFocus();

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_DOWN });
        expect(siblingCheckbox).toHaveBeenLastCalledWith({ active: true, opened: true });
        expect(screen.getByRole("checkbox", { name: "Сосед" })).toHaveFocus();

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_UP });
        expect(leafCheckbox).toHaveBeenLastCalledWith({ active: true, opened: true });
        expect(screen.getByRole("checkbox", { name: "Потомок" })).toHaveFocus();
    });

    it.each([{ prevNodeId: "first" }, { nextNodeId: "second" }])(
        "uses %o to insert a node into keyboard order",
        async (positionProps) => {
            const user = userEvent.setup();
            const tree = (withInserted: boolean) => (
                <CheckboxTreeExtended>
                    <CheckboxTreeExtended.Node
                        id="first"
                        checkbox={(props) => (
                            <CheckboxTreeExtended.Checkbox {...props}>Первый</CheckboxTreeExtended.Checkbox>
                        )}
                    />
                    <CheckboxTreeExtended.Node
                        id="second"
                        checkbox={(props) => (
                            <CheckboxTreeExtended.Checkbox {...props}>Второй</CheckboxTreeExtended.Checkbox>
                        )}
                    />
                    {withInserted && (
                        <CheckboxTreeExtended.Node
                            id="inserted"
                            {...positionProps}
                            checkbox={(props) => (
                                <CheckboxTreeExtended.Checkbox {...props}>Вставленный</CheckboxTreeExtended.Checkbox>
                            )}
                        />
                    )}
                </CheckboxTreeExtended>
            );
            const { rerender } = render(tree(false));

            rerender(tree(true));

            const insertedCheckbox = screen.getByRole("checkbox", { name: "Вставленный" });
            const insertedNode = insertedCheckbox.closest("li");

            expect(insertedNode).not.toHaveAttribute("prevNodeId");
            expect(insertedNode).not.toHaveAttribute("nextNodeId");

            await user.click(screen.getByRole("checkbox", { name: "Первый" }));
            fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_DOWN });
            expect(insertedCheckbox).toHaveFocus();

            fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_DOWN });
            expect(screen.getByRole("checkbox", { name: "Второй" })).toHaveFocus();
        },
    );
});
