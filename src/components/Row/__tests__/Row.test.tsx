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
            expect(rowElement).toBeInTheDocument();
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

            expect(screen.getByText("First column")).toBeInTheDocument();
            expect(screen.getByText("Second column")).toBeInTheDocument();
            expect(screen.getAllByTestId("mock-col")).toHaveLength(2);
        });

        it("should apply custom className", () => {
            render(
                <Row className="custom-class">
                    <MockCol>Test content</MockCol>
                </Row>,
            );

            const rowElement = screen.getByTestId("mock-col").parentElement;
            expect(rowElement).toHaveClass("custom-class");
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
            expect(rowElement).toHaveAttribute("id", "test-row");
            expect(rowElement).toHaveAttribute("aria-label", "Test row");
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
            expect(rowElement).toBeInTheDocument();
            // By default, paddingBottom is true, so noPaddingBottom class should not be present
            expect(rowElement?.className).not.toMatch(/noPaddingBottom/);
        });

        it("should remove padding bottom when paddingBottom is false", () => {
            render(
                <Row paddingBottom={false}>
                    <MockCol>Test content</MockCol>
                </Row>,
            );

            const rowElement = screen.getByTestId("mock-col").parentElement;
            expect(rowElement).toBeInTheDocument();
            // When paddingBottom is false, noPaddingBottom class should be present
            expect(rowElement?.className).toMatch(/noPaddingBottom/);
        });

        it("should have padding bottom when paddingBottom is true", () => {
            render(
                <Row paddingBottom={true}>
                    <MockCol>Test content</MockCol>
                </Row>,
            );

            const rowElement = screen.getByTestId("mock-col").parentElement;
            expect(rowElement).toBeInTheDocument();
            // When paddingBottom is true, noPaddingBottom class should not be present
            expect(rowElement?.className).not.toMatch(/noPaddingBottom/);
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
            expect(rowElement).toHaveAttribute("role", "group");
            expect(rowElement).toHaveAttribute("aria-label", "Row container");
        });
    });

    describe("Edge cases", () => {
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
