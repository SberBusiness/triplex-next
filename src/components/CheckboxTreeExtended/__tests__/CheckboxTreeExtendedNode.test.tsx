import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CheckboxTreeExtended } from "../CheckboxTreeExtended";
import { ICheckboxTreeExtendedCheckboxProvideProps } from "../components/CheckboxTreeExtendedNode";
import { EComponentSize } from "../../../enums/EComponentSize";

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
});
