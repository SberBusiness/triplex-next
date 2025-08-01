import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Col } from "../Col";

// Mock child for testing
const MockChild: React.FC = () => <span data-testid="mock-child">Child</span>;

// Helper to get the rendered div
const getColDiv = () => screen.getByTestId("col-div");

describe("Col Component", () => {
    describe("Rendering", () => {
        it("should render with default props", () => {
            render(
                <Col data-testid="col-div">
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            expect(col).toBeInTheDocument();
            expect(col).toHaveClass("col-12");
        });

        it("should render children correctly", () => {
            render(
                <Col data-testid="col-div">
                    <span>First</span>
                    <span>Second</span>
                </Col>,
            );
            expect(screen.getByText("First")).toBeInTheDocument();
            expect(screen.getByText("Second")).toBeInTheDocument();
        });

        it("should apply custom className", () => {
            render(
                <Col data-testid="col-div" className="custom-class">
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            expect(col).toHaveClass("custom-class");
        });

        it("should pass through HTML attributes", () => {
            render(
                <Col data-testid="col-div" id="test-col" aria-label="Test col">
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            expect(col).toHaveAttribute("id", "test-col");
            expect(col).toHaveAttribute("aria-label", "Test col");
        });
    });

    describe("Props", () => {
        it("should apply size and offset classes", () => {
            render(
                <Col data-testid="col-div" size={6} offset={2}>
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            expect(col).toHaveClass("col-6");
            expect(col).toHaveClass("offset-2");
        });

        it("should apply responsive size and offset classes", () => {
            render(
                <Col
                    data-testid="col-div"
                    sizeSm={4}
                    sizeMd={5}
                    sizeLg={6}
                    sizeXl={7}
                    offsetSm={1}
                    offsetMd={2}
                    offsetLg={3}
                    offsetXl={4}
                >
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            const expectedClasses = [
                "col-sm-4",
                "col-md-5",
                "col-lg-6",
                "col-xl-7",
                "offset-sm-1",
                "offset-md-2",
                "offset-lg-3",
                "offset-xl-4",
            ];
            expectedClasses.forEach((cls) => {
                expect(col).toHaveClass(cls);
            });
        });

        it("should apply hidden classes", () => {
            render(
                <Col data-testid="col-div" hidden hiddenSm hiddenMd hiddenLg hiddenXl>
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            const expectedClasses = ["d-none", "d-none-sm", "d-none-md", "d-none-lg", "d-none-xl"];
            expectedClasses.forEach((cls) => {
                expect(col).toHaveClass(cls);
            });
        });

        it("should apply block classes", () => {
            render(
                <Col data-testid="col-div" block blockSm blockMd blockLg blockXl>
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            const expectedClasses = ["d-block", "d-block-sm", "d-block-md", "d-block-lg", "d-block-xl"];
            expectedClasses.forEach((cls) => {
                expect(col).toHaveClass(cls);
            });
        });
    });

    describe("Children", () => {
        it("should accept any valid React node as children", () => {
            expect(() => {
                render(
                    <Col data-testid="col-div">
                        Text
                        {null}
                        {undefined}
                        {false}
                        {true}
                        {42}
                        <span>Element</span>
                    </Col>,
                );
            }).not.toThrow();
        });

        it("should accept null children", () => {
            expect(() => {
                render(<Col data-testid="col-div">{null}</Col>);
            }).not.toThrow();
        });

        it("should accept undefined children", () => {
            expect(() => {
                render(<Col data-testid="col-div">{undefined}</Col>);
            }).not.toThrow();
        });

        it("should accept array of children", () => {
            expect(() => {
                render(<Col data-testid="col-div">{[<span key="1">First</span>, <span key="2">Second</span>]}</Col>);
            }).not.toThrow();
        });
    });

    describe("Accessibility", () => {
        it("should render as a div element", () => {
            render(
                <Col data-testid="col-div">
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            expect(col.tagName).toBe("DIV");
        });

        it("should preserve accessibility attributes", () => {
            render(
                <Col data-testid="col-div" role="group" aria-label="Col container">
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            expect(col).toHaveAttribute("role", "group");
            expect(col).toHaveAttribute("aria-label", "Col container");
        });
    });

    describe("Edge cases", () => {
        it("should handle fragment as child", () => {
            render(
                <Col data-testid="col-div">
                    <React.Fragment>
                        <span>Fragment child</span>
                    </React.Fragment>
                </Col>,
            );
            const col = screen.getByTestId("col-div");
            expect(col).toBeInTheDocument();
            expect(screen.getByText("Fragment child")).toBeInTheDocument();
        });
    });

    describe("Static properties", () => {
        it("should have correct displayName", () => {
            expect(Col.displayName).toBe("Col");
        });
    });
});
