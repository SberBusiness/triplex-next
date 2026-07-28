import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Col } from "../Col";
import { Row } from "../../Row/Row";
import { RowContext } from "../../Row/RowContext";
import { EComponentSize } from "../../../enums/EComponentSize";

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

        it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const)("should apply class col-%i for size prop", (size) => {
            render(
                <Col data-testid="col-div" size={size}>
                    <MockChild />
                </Col>,
            );
            expect(getColDiv()).toHaveClass(`col-${size}`);
        });

        it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const)(
            "should apply class offset-%i for offset prop",
            (offset) => {
                render(
                    <Col data-testid="col-div" offset={offset}>
                        <MockChild />
                    </Col>,
                );
                expect(getColDiv()).toHaveClass(`offset-${offset}`);
            },
        );

        it("should apply offset-0 class for zero offset", () => {
            render(
                <Col data-testid="col-div" offset={0}>
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            expect(col).toHaveClass("offset-0");
            expect(col).toHaveClass("col-12");
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

        it("should not apply visibility classes when hidden and block are false", () => {
            render(
                <Col data-testid="col-div" hidden={false} block={false}>
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            expect(col).not.toHaveClass("d-none");
            expect(col).not.toHaveClass("d-block");
        });

        it("should merge custom className with generated grid classes", () => {
            render(
                <Col data-testid="col-div" className="custom-class" size={6}>
                    <MockChild />
                </Col>,
            );
            const col = getColDiv();
            expect(col).toHaveClass("custom-class");
            expect(col).toHaveClass("col-6");
            expect(col).toHaveClass("gridHorizontalGapSM");
        });
    });

    describe("forwardRef", () => {
        it("should forward ref to the root div element", () => {
            const ref = React.createRef<HTMLDivElement>();
            render(
                <Col data-testid="col-div" ref={ref}>
                    <MockChild />
                </Col>,
            );
            expect(ref.current).toBeInstanceOf(HTMLDivElement);
            expect(ref.current).toBe(getColDiv());
        });
    });

    describe("gapSize from RowContext", () => {
        it("should apply gridHorizontalGapSM when rendered without Row (context default)", () => {
            render(
                <Col data-testid="col-div">
                    <MockChild />
                </Col>,
            );

            const col = getColDiv();
            expect(col).toHaveClass("gridHorizontalGapSM");
            expect(col).not.toHaveClass("gridHorizontalGapMD");
        });

        it("should apply gridHorizontalGapSM when inside Row with gridHorizontalGap SM", () => {
            render(
                <Row gridHorizontalGap={EComponentSize.SM}>
                    <Col data-testid="col-div">
                        <MockChild />
                    </Col>
                </Row>,
            );

            const col = getColDiv();
            expect(col).toHaveClass("gridHorizontalGapSM");
            expect(col).not.toHaveClass("gridHorizontalGapMD");
        });

        it("should apply gridHorizontalGapMD when inside Row with gridHorizontalGap MD", () => {
            render(
                <Row gridHorizontalGap={EComponentSize.MD}>
                    <Col data-testid="col-div">
                        <MockChild />
                    </Col>
                </Row>,
            );

            const col = getColDiv();
            expect(col).toHaveClass("gridHorizontalGapMD");
            expect(col).not.toHaveClass("gridHorizontalGapSM");
        });

        it("should apply gridHorizontalGapSM for all columns in the same row", () => {
            render(
                <Row gridHorizontalGap={EComponentSize.SM}>
                    <Col data-testid="col-1">First</Col>
                    <Col data-testid="col-2">Second</Col>
                </Row>,
            );

            expect(screen.getByTestId("col-1")).toHaveClass("gridHorizontalGapSM");
            expect(screen.getByTestId("col-2")).toHaveClass("gridHorizontalGapSM");
        });

        it("should use gridHorizontalGap from explicit RowContext.Provider", () => {
            render(
                <RowContext.Provider value={{ gridHorizontalGap: EComponentSize.SM }}>
                    <Col data-testid="col-div">
                        <MockChild />
                    </Col>
                </RowContext.Provider>,
            );

            expect(getColDiv()).toHaveClass("gridHorizontalGapSM");
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
