import { describe, it, expect, vi } from "vitest";
import { ICheckboxTreeCheckboxData } from "../types";
import { checkChildrenCheckboxes, checkParentCheckboxes, traverseCheckboxes } from "../utils";

const createCheckbox = (id: string, overrides: Partial<ICheckboxTreeCheckboxData> = {}): ICheckboxTreeCheckboxData => ({
    id,
    label: id,
    checked: false,
    ...overrides,
});

describe("CheckboxTree utils", () => {
    describe("traverseCheckboxes", () => {
        it("Should visit every checkbox of the tree", () => {
            const checkboxes = [
                createCheckbox("1", { children: [createCheckbox("1-1"), createCheckbox("1-2")] }),
                createCheckbox("2"),
            ];
            const callback = vi.fn();

            traverseCheckboxes(checkboxes, callback);

            expect(callback).toHaveBeenCalledTimes(4);
        });

        it("Should visit children before their parent", () => {
            const checkboxes = [
                createCheckbox("1", {
                    children: [createCheckbox("1-1", { children: [createCheckbox("1-1-1")] })],
                }),
                createCheckbox("2"),
            ];
            const visited: string[] = [];

            traverseCheckboxes(checkboxes, (checkbox) => visited.push(checkbox.id));

            expect(visited).toEqual(["1-1-1", "1-1", "1", "2"]);
        });

        it("Should do nothing for an empty tree", () => {
            const callback = vi.fn();

            traverseCheckboxes([], callback);

            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe("checkParentCheckboxes", () => {
        it("Should not touch a checkbox without children", () => {
            const checkbox = createCheckbox("1", { checked: true, bulk: true });

            checkParentCheckboxes(checkbox);

            expect(checkbox.checked).toBe(true);
            expect(checkbox.bulk).toBe(true);
        });

        it("Should treat an empty children array as a leaf", () => {
            const checkbox = createCheckbox("1", { checked: false, children: [] });

            checkParentCheckboxes(checkbox);

            // Без guard по length условие "все потомки выбраны" выполнялось бы вырожденно (0 === 0),
            // и узел становился бы выбранным сам по себе на первом же клике по дереву.
            expect(checkbox.checked).toBe(false);
        });

        it("Should mark the parent checked and not bulk when all children are checked", () => {
            const checkbox = createCheckbox("1", {
                bulk: true,
                children: [createCheckbox("1-1", { checked: true }), createCheckbox("1-2", { checked: true })],
            });

            checkParentCheckboxes(checkbox);

            expect(checkbox.checked).toBe(true);
            expect(checkbox.bulk).toBe(false);
        });

        it("Should keep the parent bulk when all children are checked but one of them is bulk", () => {
            const checkbox = createCheckbox("1", {
                children: [
                    createCheckbox("1-1", { checked: true, bulk: true }),
                    createCheckbox("1-2", { checked: true }),
                ],
            });

            checkParentCheckboxes(checkbox);

            expect(checkbox.checked).toBe(true);
            expect(checkbox.bulk).toBe(true);
        });

        it("Should mark the parent checked and bulk when only some children are checked", () => {
            const checkbox = createCheckbox("1", {
                children: [createCheckbox("1-1", { checked: true }), createCheckbox("1-2")],
            });

            checkParentCheckboxes(checkbox);

            expect(checkbox.checked).toBe(true);
            expect(checkbox.bulk).toBe(true);
        });

        it("Should uncheck the parent when no children are checked", () => {
            const checkbox = createCheckbox("1", {
                checked: true,
                bulk: true,
                children: [createCheckbox("1-1"), createCheckbox("1-2")],
            });

            checkParentCheckboxes(checkbox);

            expect(checkbox.checked).toBe(false);
            // Известное ограничение: bulk в этой ветке не сбрасывается. Визуально незаметно —
            // Checkbox рисует иконку только при checked. Фиксируем текущее поведение, а не желаемое.
            expect(checkbox.bulk).toBe(true);
        });

        it("Should recalculate the whole tree bottom-up when combined with traverseCheckboxes", () => {
            const checkboxes = [
                createCheckbox("1", {
                    children: [
                        createCheckbox("1-1", {
                            children: [createCheckbox("1-1-1", { checked: true }), createCheckbox("1-1-2")],
                        }),
                    ],
                }),
            ];

            traverseCheckboxes(checkboxes, checkParentCheckboxes);

            // Родитель считается по уже пересчитанному промежуточному узлу, поэтому частичный выбор поднимается до корня.
            expect(checkboxes[0].children?.[0]).toMatchObject({ checked: true, bulk: true });
            expect(checkboxes[0]).toMatchObject({ checked: true, bulk: true });
        });
    });

    describe("checkChildrenCheckboxes", () => {
        it("Should propagate the checked flag down the whole subtree", () => {
            const checkbox = createCheckbox("1", {
                checked: true,
                children: [createCheckbox("1-1", { children: [createCheckbox("1-1-1")] }), createCheckbox("1-2")],
            });

            checkChildrenCheckboxes(checkbox);

            const visited: boolean[] = [];
            traverseCheckboxes(checkbox.children ?? [], (child) => visited.push(child.checked));

            expect(visited).toEqual([true, true, true]);
        });

        it("Should propagate the unchecked flag down the whole subtree", () => {
            const checkbox = createCheckbox("1", {
                checked: false,
                children: [
                    createCheckbox("1-1", { checked: true, children: [createCheckbox("1-1-1", { checked: true })] }),
                ],
            });

            checkChildrenCheckboxes(checkbox);

            const visited: boolean[] = [];
            traverseCheckboxes(checkbox.children ?? [], (child) => visited.push(child.checked));

            expect(visited).toEqual([false, false]);
        });

        it("Should do nothing for a checkbox without children", () => {
            const checkbox = createCheckbox("1", { checked: true });

            expect(() => checkChildrenCheckboxes(checkbox)).not.toThrow();
            expect(checkbox.children).toBeUndefined();
        });
    });
});
