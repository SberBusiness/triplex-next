import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Col } from "../Col";

// Mock child for testing
const MockChild: React.FC = () => <span data-testid="mock-child">Child</span>;

// Helper to get the rendered div
const getColDiv = () => screen.getByTestId("col-div");

describe("Col Component", () => {
    beforeEach(() => {
        vi.spyOn(console, "error").mockImplementation(() => {});
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("Rendering", () => {
        it("should render with default props", () => {
            render(
                <Col data-testid="col-div">
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            expect(col).toBeTruthy();
            expect(col.className).toBeTruthy();
            expect(col.className.length).toBeGreaterThan(0);
        });

        it("should render children correctly", () => {
            render(
                <Col data-testid="col-div">
                    <span>First</span>
                    <span>Second</span>
                </Col>,
            );
            expect(screen.getByText("First")).toBeTruthy();
            expect(screen.getByText("Second")).toBeTruthy();
        });

        it("should apply custom className", () => {
            render(
                <Col data-testid="col-div" className="custom-class">
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            expect(col.className).toContain("custom-class");
            expect(col.className.split(" ").length).toBeGreaterThan(1);
        });

        it("should pass through HTML attributes", () => {
            render(
                <Col data-testid="col-div" id="test-col" aria-label="Test col">
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            expect(col.getAttribute("id")).toBe("test-col");
            expect(col.getAttribute("aria-label")).toBe("Test col");
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
            expect(col.className).toMatch(/col-6/);
            expect(col.className).toMatch(/offset-2/);
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
            [
                "col-sm-4",
                "col-md-5",
                "col-lg-6",
                "col-xl-7",
                "offset-sm-1",
                "offset-md-2",
                "offset-lg-3",
                "offset-xl-4",
            ].forEach((cls) => {
                expect(col.className).toMatch(new RegExp(cls));
            });
        });

        it("should apply hidden and block classes", () => {
            render(
                <Col
                    data-testid="col-div"
                    hidden
                    hiddenSm
                    hiddenMd
                    hiddenLg
                    hiddenXl
                    block
                    blockSm
                    blockMd
                    blockLg
                    blockXl
                >
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            [
                "d-none",
                "d-none-sm",
                "d-none-md",
                "d-none-lg",
                "d-none-xl",
                "d-block",
                "d-block-sm",
                "d-block-md",
                "d-block-lg",
                "d-block-xl",
            ].forEach((cls) => {
                expect(col.className).toMatch(new RegExp(cls));
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

        it("should accept empty children", () => {
            expect(() => {
                render(<Col data-testid="col-div" />);
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
            expect(col.getAttribute("role")).toBe("group");
            expect(col.getAttribute("aria-label")).toBe("Col container");
        });
    });

    describe("Edge cases", () => {
        it("should handle fragment as child", () => {
            expect(() => {
                render(
                    <Col data-testid="col-div">
                        <React.Fragment>
                            <span>Fragment child</span>
                        </React.Fragment>
                    </Col>,
                );
            }).not.toThrow();
        });
    });

    describe("Static properties", () => {
        it("should have correct displayName", () => {
            expect(Col.displayName).toBe("Col");
        });
    });
});
