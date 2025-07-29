import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Row } from "../Row";

// Mock Col component for testing
const MockCol: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <div data-testid="mock-col">{children}</div>
);
MockCol.displayName = "Col";

// Mock other component to test validation
const MockOtherComponent: React.FC = () => <div data-testid="other-component">Other</div>;
MockOtherComponent.displayName = "OtherComponent";

describe("Row Component", () => {
    beforeEach(() => {
        // Clear console.error before each test to avoid noise from expected errors
        vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("Rendering", () => {
        it("should render with default props", () => {
            render(
                <Row>
                    <MockCol>Test content</MockCol>
                </Row>,
            );

            const rowElement = screen.getByTestId("mock-col").parentElement;
            expect(rowElement).toBeTruthy();
            // Check that the element has a class (CSS modules generate unique class names)
            expect(rowElement?.className).toBeTruthy();
            expect(rowElement?.className.length).toBeGreaterThan(0);
        });

        it("should render children correctly", () => {
            render(
                <Row>
                    <MockCol>First column</MockCol>
                    <MockCol>Second column</MockCol>
                </Row>,
            );

            expect(screen.getByText("First column")).toBeTruthy();
            expect(screen.getByText("Second column")).toBeTruthy();
            expect(screen.getAllByTestId("mock-col")).toHaveLength(2);
        });

        it("should apply custom className", () => {
            render(
                <Row className="custom-class">
                    <MockCol>Test content</MockCol>
                </Row>,
            );

            const rowElement = screen.getByTestId("mock-col").parentElement;
            expect(rowElement?.className).toContain("custom-class");
            // Check that it has both custom class and CSS module class
            expect(rowElement?.className.split(" ").length).toBeGreaterThan(1);
        });

        it("should pass through HTML attributes", () => {
            render(
                <Row data-testid="row-element" id="test-row" aria-label="Test row">
                    <MockCol>Test content</MockCol>
                </Row>,
            );

            const rowElement = screen.getByTestId("row-element");
            expect(rowElement.getAttribute("id")).toBe("test-row");
            expect(rowElement.getAttribute("aria-label")).toBe("Test row");
        });
    });

    describe("paddingBottom prop", () => {
        it("should have padding bottom by default", () => {
            render(
                <Row>
                    <MockCol>Test content</MockCol>
                </Row>,
            );

            const rowElement = screen.getByTestId("mock-col").parentElement;
            expect(rowElement?.className).toBeTruthy();
            // By default, paddingBottom is true, so noPaddingBottom class should not be present
            expect(rowElement?.className).not.toContain("noPaddingBottom");
        });

        it("should remove padding bottom when paddingBottom is false", () => {
            render(
                <Row paddingBottom={false}>
                    <MockCol>Test content</MockCol>
                </Row>,
            );

            const rowElement = screen.getByTestId("mock-col").parentElement;
            expect(rowElement?.className).toBeTruthy();
            // When paddingBottom is false, noPaddingBottom class should be present
            expect(rowElement?.className).toContain("noPaddingBottom");
        });

        it("should have padding bottom when paddingBottom is true", () => {
            render(
                <Row paddingBottom={true}>
                    <MockCol>Test content</MockCol>
                </Row>,
            );

            const rowElement = screen.getByTestId("mock-col").parentElement;
            expect(rowElement?.className).toBeTruthy();
            // When paddingBottom is true, noPaddingBottom class should not be present
            expect(rowElement?.className).not.toContain("noPaddingBottom");
        });
    });

    describe("Children validation", () => {
        it("should accept Col components as children", () => {
            expect(() => {
                render(
                    <Row>
                        <MockCol>Valid child</MockCol>
                    </Row>,
                );
            }).not.toThrow();
        });

        it("should throw error when non-Col component is used as child", () => {
            expect(() => {
                render(
                    <Row>
                        <MockOtherComponent />
                    </Row>,
                );
            }).toThrow("You can use only < Col /> elements");
        });

        it("should throw error when multiple non-Col components are used", () => {
            expect(() => {
                render(
                    <Row>
                        <MockCol>Valid child</MockCol>
                        <MockOtherComponent />
                        <div>Another invalid child</div>
                    </Row>,
                );
            }).toThrow("You can use only < Col /> elements");
        });

        it("should accept text nodes and other valid React nodes", () => {
            expect(() => {
                render(
                    <Row>
                        <MockCol>
                            Text content
                            {null}
                            {undefined}
                            {false}
                            {true}
                            {42}
                        </MockCol>
                    </Row>,
                );
            }).not.toThrow();
        });

        it("should accept empty children", () => {
            expect(() => {
                render(<Row />);
            }).not.toThrow();
        });

        it("should accept null children", () => {
            expect(() => {
                render(<Row>{null}</Row>);
            }).not.toThrow();
        });

        it("should accept undefined children", () => {
            expect(() => {
                render(<Row>{undefined}</Row>);
            }).not.toThrow();
        });

        it("should accept array of Col components", () => {
            expect(() => {
                render(<Row>{[<MockCol key="1">First</MockCol>, <MockCol key="2">Second</MockCol>]}</Row>);
            }).not.toThrow();
        });
    });

    describe("Component lifecycle", () => {
        it("should validate children on mount", () => {
            expect(() => {
                render(
                    <Row>
                        <MockOtherComponent />
                    </Row>,
                );
            }).toThrow("You can use only < Col /> elements");
        });

        it("should validate children on update", () => {
            const { rerender } = render(
                <Row>
                    <MockCol>Valid child</MockCol>
                </Row>,
            );

            expect(() => {
                rerender(
                    <Row>
                        <MockOtherComponent />
                    </Row>,
                );
            }).toThrow("You can use only < Col /> elements");
        });
    });

    describe("Accessibility", () => {
        it("should render as a div element", () => {
            render(
                <Row>
                    <MockCol>Test content</MockCol>
                </Row>,
            );

            const rowElement = screen.getByTestId("mock-col").parentElement;
            expect(rowElement?.tagName).toBe("DIV");
        });

        it("should preserve accessibility attributes", () => {
            render(
                <Row role="group" aria-label="Row container">
                    <MockCol>Test content</MockCol>
                </Row>,
            );

            const rowElement = screen.getByTestId("mock-col").parentElement;
            expect(rowElement?.getAttribute("role")).toBe("group");
            expect(rowElement?.getAttribute("aria-label")).toBe("Row container");
        });
    });

    describe("Edge cases", () => {
        it("should handle component without displayName", () => {
            const ComponentWithoutDisplayName: React.FC = () => <div>No display name</div>;

            expect(() => {
                render(
                    <Row>
                        <ComponentWithoutDisplayName />
                    </Row>,
                );
            }).toThrow("You can use only < Col /> elements");
        });

        it("should handle fragment as child", () => {
            // React.Fragment is not a component type, so it should not throw an error
            expect(() => {
                render(
                    <Row>
                        <React.Fragment>
                            <MockCol>Valid child</MockCol>
                        </React.Fragment>
                    </Row>,
                );
            }).not.toThrow();
        });

        it("should handle function components", () => {
            const FunctionComponent = () => <MockCol>Function component</MockCol>;
            FunctionComponent.displayName = "Col";

            expect(() => {
                render(
                    <Row>
                        <FunctionComponent />
                    </Row>,
                );
            }).not.toThrow();
        });

        it("should handle class components", () => {
            class ClassComponent extends React.Component {
                static displayName = "Col";
                render() {
                    return <MockCol>Class component</MockCol>;
                }
            }

            expect(() => {
                render(
                    <Row>
                        <ClassComponent />
                    </Row>,
                );
            }).not.toThrow();
        });
    });

    describe("Static properties", () => {
        it("should have correct displayName", () => {
            expect(Row.displayName).toBe("Row");
        });

        it("should have correct defaultProps", () => {
            // Row component uses default parameter values instead of defaultProps
            expect(Row.defaultProps).toBeUndefined();
        });
    });
});
